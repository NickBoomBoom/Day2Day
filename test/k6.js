import http from 'k6/http';
import { check, sleep } from 'k6';
import { Rate } from 'k6/metrics';

// 定义自定义指标：失败率
const failureRate = new Rate('failed_requests');

// 配置测试选项
export const options = {
  scenarios: {
    /* 根据上表配置不同的测试场景 */
    test_10vu_100req: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 10, // 10 VUs * 10 iterations = 100 requests
      maxDuration: '2m',
      tags: { test_scenario: '10vus_100req' },
    },
    test_10vu_500req: {
      executor: 'per-vu-iterations',
      vus: 10,
      iterations: 50, // 10 VUs * 50 iterations = 500 requests
      maxDuration: '5m',
      tags: { test_scenario: '10vus_500req' },
    },
    test_20vu_1000req: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 50, // 20 VUs * 50 iterations = 1000 requests
      maxDuration: '5m',
      tags: { test_scenario: '20vus_1000req' },
    },
    test_20vu_2000req: {
      executor: 'per-vu-iterations',
      vus: 20,
      iterations: 100, // 20 VUs * 100 iterations = 2000 requests
      maxDuration: '10m',
      tags: { test_scenario: '20vus_2000req' },
    },
    test_50vu_5000req: {
      executor: 'per-vu-iterations',
      vus: 50,
      iterations: 100, // 50 VUs * 100 iterations = 5000 requests
      maxDuration: '15m',
      tags: { test_scenario: '50vus_5000req' },
    },
    test_50vu_10000req: {
      executor: 'per-vu-iterations',
      vus: 50,
      iterations: 200, // 50 VUs * 200 iterations = 10000 requests
      maxDuration: '20m',
      tags: { test_scenario: '50vus_10000req' },
    },
    // 对于高并发、大数据量的测试，使用固定持续时间而非迭代次数更合适
    test_100vu_200000req: {
      executor: 'constant-vus',
      vus: 100,
      duration: '2000s', // 持续时间需要根据系统吞吐量估算 (总请求数 / 目标QPS)
      tags: { test_scenario: '100vus_200000req' },
    },
    test_100vu_500000req: {
      executor: 'constant-vus',
      vus: 100,
      duration: '5000s', // 持续时间需要根据系统吞吐量估算
      tags: { test_scenario: '100vus_500000req' },
    },
    test_200vu_1000000req: {
      executor: 'constant-vus',
      vus: 200,
      duration: '10000s', // 持续时间需要根据系统吞吐量估算
      tags: { test_scenario: '200vus_1000000req' },
    },
    test_200vu_2000000req: {
      executor: 'constant-vus',
      vus: 200,
      duration: '20000s', // 持续时间需要根据系统吞吐量估算
      tags: { test_scenario: '200vus_2000000req' },
    },
  },

  // 性能阈值：定义测试通过/失败的标准
  thresholds: {
    'failed_requests': ['rate<0.01'], // 失败率低于1%
    'http_req_duration': ['p(95)<5000'], // 95%的请求响应时间低于5秒
    'http_req_failed': ['rate<0.05'], // HTTP请求失败率低于5%
    'checks{check_name:status_200}': ['rate>0.98'], // 状态码200的检查通过率大于98%
  },

  // 定义全局标签，用于区分不同测试场景的数据
  tags: {
    project: 'website_load_test',
    environment: 'production', // 请根据实际情况修改，例如 'staging'
  },
};

// 默认函数，每个虚拟用户都会反复执行
export default function () {
  // 替换为你想要测试的网站域名
  const url = 'https://sd-pc.tiusolution.com/sd-pc/'; // TODO: 请替换为你的实际域名

  // 发送HTTP GET请求
  const response = http.get(url, {
    tags: { method: 'GET', check_name: 'status_200' },
  });

  // 检查响应
  const checkResult = check(response, {
    'status is 200': (r) => r.status === 200,
    'response time < 2s': (r) => r.timings.duration < 2000,
  });

  // 记录请求成功或失败到自定义指标
  failureRate.add(!checkResult);

  // 每个虚拟用户在每次请求后休眠一段时间，模拟用户思考时间
  // 对于高强度压力测试，可以考虑注释掉sleep或减小时间
  sleep(0.5);
}

// 可选：生成自定义摘要报告
export function handleSummary(data) {
  const scenario = options.scenarios['test_10vu_100req']
  return {
    'stdout': `\n=== 测试场景: ${scenario} 摘要 ===\n` +
      `总迭代次数: ${data.metrics.iterations.values.count}\n` +
      `总请求数: ${data.metrics.http_reqs.values.count}\n` +
      `平均吞吐量 (RPS): ${data.metrics.http_reqs.values.rate.toFixed(2)}/s\n` +
      `平均响应时间: ${data.metrics.http_req_duration.values.avg.toFixed(2)} ms\n` +
      `P95响应时间: ${data.metrics.http_req_duration.values['p(95)'].toFixed(2)} ms\n` +
      `请求失败率: ${(data.metrics.http_req_failed.values.rate * 100).toFixed(2)}%\n` +
      `检查点通过率: ${(data.metrics.checks.values.rate * 100).toFixed(2)}%\n`,
  };
}