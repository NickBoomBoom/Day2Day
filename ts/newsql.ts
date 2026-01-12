import _ from "lodash";
import fs from "fs";
import Decimal from "decimal.js";

/**
 * 精确计算工具类 - 基于 Decimal.js 实现链式调用
 *
 * 主要功能：
 * - 解决 JavaScript 浮点数精度问题
 * - 支持链式调用，便于复杂计算
 * - 提供常用的数学运算方法
 * - 支持多种数据类型输入（number | string | Decimal）
 *
 * 使用场景：
 * - 金融计算（金额、利率等）
 * - 分数统计计算
 * - 需要高精度的数值运算
 *
 * 基本用法示例：
 * ```typescript
 * // 简单运算
 * calc(0.1).add(0.2).toNumber() // 0.3 (而不是 0.30000000000000004)
 *
 * // 链式调用
 * calc(100).percent(20).add(5).toFixedNoRound(2) // "25.00"
 *
 * // 静态方法
 * CalcChain.sum(1.1, 2.2, 3.3).toNumber() // 6.6
 * CalcChain.avg(10, 20, 30).toNumber() // 20
 * ```
 */

class CalcChain {
  private _value: Decimal;

  // 使用示例: const calc = new CalcChain(123.45)
  constructor(value: number | string | Decimal) {
    this._value = new Decimal(value);
  }

  // ➕ 加法
  // 使用示例:
  // - calc(10).add(5).toNumber() // 返回 15
  // - calc(0.1).add(0.2).toNumber() // 返回 0.3 (解决浮点精度问题)
  // - calc('100').add('50.5').toNumber() // 返回 150.5
  add(v: number | string | Decimal): this {
    this._value = this._value.add(v);
    return this;
  }

  // ➖ 减法
  // 使用示例: calc(10).sub(3).toNumber() // 返回 7
  sub(v: number | string | Decimal): this {
    this._value = this._value.sub(v);
    return this;
  }

  // ✖️ 乘法
  // 使用示例: calc(6).mul(4).toNumber() // 返回 24
  mul(v: number | string | Decimal): this {
    this._value = this._value.mul(v);
    return this;
  }

  // ➗ 除法
  // 使用示例: calc(20).div(4).toNumber() // 返回 5
  div(v: number | string | Decimal): this {
    this._value = this._value.div(v);
    return this;
  }

  // 💯 乘以百分比
  // 使用示例: calc(200).percent(25).toNumber() // 返回 50 (200 * 25%)
  percent(v: number | string | Decimal): this {
    this._value = this._value.mul(new Decimal(v).div(100));
    return this;
  }

  // 📈 乘方
  // 使用示例: calc(3).pow(3).toNumber() // 返回 27 (3³)
  pow(v: number | string | Decimal): this {
    this._value = this._value.pow(v);
    return this;
  }

  // 取绝对值
  // 使用示例: calc(-5).abs().toNumber() // 返回 5
  abs(): this {
    this._value = this._value.abs();
    return this;
  }

  // 取反
  // 使用示例: calc(5).neg().toNumber() // 返回 -5
  neg(): this {
    this._value = this._value.neg();
    return this;
  }

  // 🧮 保留指定位数（四舍五入）
  // 使用示例:
  // - calc(3.14159).toFixed(2) // 返回 "3.14"
  // - calc(2.675).toFixed(2) // 返回 "2.68" (四舍五入)
  // - calc(123.456).toFixed(0) // 返回 "123"
  toFixed(digits = 2): string {
    return this._value.toFixed(digits);
  }

  // 🚫 保留指定位数（不四舍五入，只截断）
  // 使用示例:
  // - calc(3.149).toFixedNoRound(2) // 返回 "3.14"
  // - calc(2.689).toFixedNoRound(1) // 返回 "2.6"
  // - calc(123.999).toFixedNoRound(0) // 返回 "123"
  toFixedNoRound(digits = 2): string {
    return this._value
      .toDecimalPlaces(digits, Decimal.ROUND_DOWN)
      .toFixed(digits);
  }

  // 返回 Decimal 对象
  // 使用示例: calc(123.45).toDecimal() // 返回 Decimal 对象
  toDecimal(): Decimal {
    return this._value;
  }

  // 返回 number
  // 使用示例: calc(123.45).toNumber() // 返回 123.45
  toNumber(): number {
    return this._value.toNumber();
  }

  // 返回字符串（不固定小数位）
  // 使用示例: calc(123.45).toString() // 返回 "123.45"
  toString(): string {
    return this._value.toString();
  }

  // 静态求和
  // 使用示例: CalcChain.sum(1, 2, 3).toNumber() // 返回 6
  static sum(...values: (number | string | Decimal)[]): Decimal {
    return values.reduce<Decimal>(
      (acc, v) => acc.add(new Decimal(v)),
      new Decimal(0)
    );
  }

  // 静态平均值
  // 使用示例: CalcChain.avg(1, 2, 3).toNumber() // 返回 2
  static avg(...values: (number | string | Decimal)[]): Decimal {
    if (values.length === 0) return new Decimal(0);
    return CalcChain.sum(...values).div(values.length);
  }
}

// 工厂函数
// 使用示例:
// - calc(10).add(5).toNumber() // 返回 15
// - calc(0.1).add(0.2).toNumber() // 返回 0.3 (精确计算)
const calc = (val: number | string | Decimal): CalcChain => new CalcChain(val);

export { CalcChain, calc };

/**
 * 完整使用示例：
 *
 * 1. 分数计算（避免浮点精度问题）：
 * ```typescript
 * const score1 = 89.5
 * const score2 = 92.3
 * const average = calc(score1).add(score2).div(2).toFixedNoRound(2) // "90.90"
 * ```
 *
 * 2. 复杂的链式计算：
 * ```typescript
 * const result = calc(100)
 *   .percent(15)    // 15%
 *   .add(10)        // 加10
 *   .mul(1.2)       // 乘以1.2
 *   .toFixedNoRound(2) // "28.00"
 * ```
 *
 * 3. 数组统计：
 * ```typescript
 * const scores = [85.5, 90.2, 78.8, 92.1]
 * const total = CalcChain.sum(...scores).toNumber()
 * const average = CalcChain.avg(...scores).toFixed(2)
 * ```
 */

const res = [
  {
    isActive: true,
    testPaperProblemId: 30442,
    problemId: null,
    teachingModuleId: 4108,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0,
    submitId: 1041676,
    studentAnswer: null,
    submitTime: "2025-12-15T04:31:59.000Z",
    submitCount: 1,
    submitStatus: 1,
    submitStatusName: "通过",
    submitScore: 0,
    submitComment: null,
    teacherScore: null,
    teacherComment: null,
    isGraded: true,
    isPassed: true,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:33:26.563Z",
    updatedAt: "2025-12-15T04:33:26.563Z",
    id: null,
  },
  {
    isActive: true,
    testPaperProblemId: 30443,
    problemId: 16138,
    teachingModuleId: null,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0.1,
    submitId: 1041670,
    studentAnswer: '["1"]',
    submitTime: "2025-12-15T04:30:47.000Z",
    submitCount: 1,
    submitStatus: 1,
    submitStatusName: "通过",
    submitScore: 0.1,
    submitComment:
      '[{"sourceFrom":"stdAnswer","rating":100,"comment":[{"rating":100,"comment":"本题考查的是Python中用于输出字符串到屏幕的基础函数。选择B（print()）是正确的。print()函数是Python中最常用的输出函数，可以将字符串、数字等内容显示在屏幕上。值得注意的是，input()用于接收用户输入，output()和echo()并不是Python内置的输出函数。能够准确选择print()，说明对Python基础输入输出有良好的掌握。补充一点，print()函数还可以输出多个变量、格式化字符串，并通过参数控制输出结尾和分隔符，建议进一步了解其用法以提升编程能力。","proportion":100,"targetId":""}],"proportion":100}]',
    teacherScore: null,
    teacherComment: null,
    isGraded: false,
    isPassed: true,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:33:32.485Z",
    updatedAt: "2025-12-15T04:33:32.485Z",
    id: null,
  },
  {
    isActive: true,
    testPaperProblemId: 30444,
    problemId: 16139,
    teachingModuleId: null,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0.2,
    submitId: 1041671,
    studentAnswer: "[[0,3]]",
    submitTime: "2025-12-15T04:30:56.000Z",
    submitCount: 1,
    submitStatus: 1,
    submitStatusName: "通过",
    submitScore: 0.2,
    submitComment:
      '[{"sourceFrom":"stdAnswer","rating":100,"comment":[{"rating":100,"comment":"本题考查的是Python变量命名的规则。根据正确答案，Python中变量名必须以字母或下划线开头，且不能包含特殊字符如连字符，也不能以数字开头。你的答案完全正确，_myVar和my_var都是合法的变量名，分别以下划线和字母开头，并且只包含字母、数字和下划线。补充说明，像2ndVar以数字开头，my-var包含了连字符，这些都是不被允许的。变量名还不能是Python的关键字，比如if、for、class等。掌握这些规则有助于编写规范且易于维护的代码。","proportion":100,"targetId":""}],"proportion":100}]',
    teacherScore: null,
    teacherComment: null,
    isGraded: false,
    isPassed: true,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:33:39.581Z",
    updatedAt: "2025-12-15T04:33:39.581Z",
    id: null,
  },
  {
    isActive: true,
    testPaperProblemId: 30445,
    problemId: 16140,
    teachingModuleId: null,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0.3,
    submitId: 1041672,
    studentAnswer: '["0"]',
    submitTime: "2025-12-15T04:31:04.000Z",
    submitCount: 1,
    submitStatus: 1,
    submitStatusName: "通过",
    submitScore: 0.3,
    submitComment:
      '[{"sourceFrom":"stdAnswer","rating":100,"comment":[{"rating":100,"comment":"本题考查的是对Python语言特性的理解，尤其是其作为解释型编程语言的属性。你选择了“正确”，这是完全正确的。Python是一种解释型语言，这意味着它的代码在运行时由解释器逐行翻译并执行，而不是像编译型语言那样先整体编译成机器码。解释型语言通常具有更好的跨平台性和开发效率，但在执行速度上可能略逊于编译型语言。除了Python，常见的解释型语言还有JavaScript、Ruby等。了解编程语言的类型有助于选择合适的工具进行开发。继续保持对基础知识的掌握，并可以进一步了解编译型与解释型语言的区别及各自的应用场景。","proportion":100,"targetId":""}],"proportion":100}]',
    teacherScore: null,
    teacherComment: null,
    isGraded: false,
    isPassed: true,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:33:47.784Z",
    updatedAt: "2025-12-15T04:33:47.784Z",
    id: null,
  },
  {
    isActive: true,
    testPaperProblemId: 30446,
    problemId: 16141,
    teachingModuleId: null,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0.4,
    submitId: 1041673,
    studentAnswer: '[["1","2","3","4","5"]]',
    submitTime: "2025-12-15T04:31:14.000Z",
    submitCount: 1,
    submitStatus: 2,
    submitStatusName: "未通过",
    submitScore: 0,
    submitComment:
      '[{"sourceFrom":"stdAnswer","rating":0,"comment":[{"rating":0,"comment":"本题考查的是Python的基本数据类型，属于编程语言基础知识。正确答案是int、float、str、bool和list，分别代表整数、浮点数、字符串、布尔值和列表。你的答案填写了1、2、3、4、5，这是数字序号，并不是Python的数据类型名称。需要注意，Python的数据类型名称是英文单词，不能用数字代替。建议记忆并理解每种数据类型的用途，例如int用于表示整数，float用于表示小数，str用于表示文本，bool用于表示真或假，list用于存储多个数据。掌握这些基础类型对于后续学习Python编程非常重要。","proportion":100,"targetId":""}],"proportion":100}]',
    teacherScore: null,
    teacherComment: null,
    isGraded: false,
    isPassed: false,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:33:52.456Z",
    updatedAt: "2025-12-15T04:33:52.456Z",
    id: null,
  },
  {
    isActive: true,
    testPaperProblemId: 30447,
    problemId: 16142,
    teachingModuleId: null,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0.5,
    submitId: 1041674,
    studentAnswer:
      '["在Python 语言中，随着程序复杂度的提高，代码量会同步增长，为了能够提高代码的 可维护性和复用性，减少重复代码，程序员可以将一些常用的功能性代码封装成一个固定 的文件，这种用于存放功能性代码的文件就是模块，又称构件。简单来说，模块就是能够 单独命名并独立地完成一定功能的程序语句的集合。\\n\\n"]',
    submitTime: "2025-12-15T04:31:39.000Z",
    submitCount: 1,
    submitStatus: 1,
    submitStatusName: "未通过",
    submitScore: 0.15,
    submitComment:
      '[{"sourceFrom":"dialog","rating":0,"comment":[{"comment":"未与AI进行交互","rating":0,"rule":"AI对话考察","proportion":100,"targetId":""}],"proportion":5},{"sourceFrom":"dialog","rating":0,"comment":[{"comment":"未与AI进行交互","rating":0,"rule":"问题思考性","proportion":100,"targetId":""}],"proportion":15},{"sourceFrom":"stdAnswer","rating":30.4,"comment":[{"rule":"概念表述准确性","rating":20,"comment":"答案对模块的定义描述准确，明确指出将常用功能性代码封装在文件中以提高可维护性和复用性、减少重复，并说明模块可以单独命名且能独立完成一定功能，覆盖封装性、复用性和独立性要点。原文证据包括“提高代码的 可维护性和复用性”、“封装成一个固定 的文件”、“能够 单独命名并独立地完成一定功能”。","targetId":"","proportion":20},{"rule":"导入方法完整性","rating":0,"comment":"提交内容没有涉及任何关于模块导入或使用的方法说明。文中仅给出模块概念，未出现 import、from 或 from ... import * 等导入方式的示例或语法说明，故未满足导入方法说明要求。","targetId":"","proportion":50},{"rule":"语法规范性","rating":18,"comment":"文本总体可读且表达清晰，但存在多处不必要的空格和格式细节问题，影响语法格式的完全规范性。例如原文中出现“代码的 可维护性和复用性”和“固定 的文件”等位置有多余空格，说明未达到所有细节完全正确的标准，但语法错误并不严重，内容可理解。","targetId":"","proportion":30}],"proportion":80}]',
    teacherScore: null,
    teacherComment: null,
    isGraded: false,
    isPassed: false,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:33:58.761Z",
    updatedAt: "2025-12-15T04:33:58.761Z",
    id: null,
  },
  {
    isActive: true,
    testPaperProblemId: 30448,
    problemId: 16143,
    teachingModuleId: null,
    testPaperId: 715,
    courseId: 152,
    userId: 3550,
    user: {
      id: 3550,
      member: {
        id: 12012,
        name: "测试用户-c67b85",
      },
    },
    classes: null,
    invisible: false,
    testPaperSubmit: {
      id: 4046,
      isEnable: true,
      syncKey: "jfuNURsM3WodOk5wIO03BpN9D8YHVTXw",
      testPaperId: 715,
      userId: 3550,
      enterTime: "2025-12-15T04:21:08.000Z",
      submitTime: "2025-12-15T04:32:03.000Z",
      status: 1,
      lastEnterTime: "2025-12-15T04:32:47.000Z",
      comment: null,
      activeTime: 0,
      submitCount: 1,
      createdAt: "2025-12-15T04:21:08.000Z",
      updatedAt: "2025-12-15T04:32:47.000Z",
      user: {
        name: "测试用户-c67b85",
        id: 3550,
        isEnable: true,
        userName: "c67b853f16f2@jcjy.com",
        avatar: null,
        remark: null,
        lastLoginTime: "2025-04-02T20:48:16.000Z",
        tenantId: null,
        isAdmin: false,
        openId: null,
        concurrency: 1,
        type: 1,
        firstLoginTime: null,
        createdAt: "2025-04-02T20:47:47.000Z",
        member: {
          typeName: "学生",
          isExpired: false,
          id: 12012,
          isEnable: true,
          syncKey: "6TY7gM_lxfm7rBc-OmhGiAuQG5hi3s3u",
          userId: 3550,
          name: "测试用户-c67b85",
          code: "1743655667148",
          organizationId: 68,
          modelPermissions: null,
          type: 1,
          validityDays: 9999,
          creatorId: 1,
          remark: null,
          purpose: null,
          department: null,
          major: null,
          classes: null,
          userName: null,
          mobile: null,
          validityDaysMode: 1,
          autoBind: false,
          featureFlags: 0,
          createdAt: "2025-04-03T04:47:47.000Z",
          updatedAt: "2025-04-03T04:47:47.000Z",
        },
      },
    },
    testPaperProblemScore: 0.6,
    submitId: 1041675,
    studentAnswer: '["student/answer/68233b8226678e1fc53c414955746bb0.png"]',
    submitTime: "2025-12-15T04:31:53.000Z",
    submitCount: 1,
    submitStatus: 1,
    submitStatusName: "未通过",
    submitScore: 0,
    submitComment:
      '[{"sourceFrom":"stdAnswer","rating":0,"comment":[{"rule":"检测到Python解释器的图片","rating":0,"comment":"图片为机械连杆示意图，包含杆件、支点和字母标注以及虚线轨迹等结构性图形，未展示任何终端提示符或包含“python”字样的文本或命令提示界面，因此不符合含有 Python 交互界面的判定要求。","targetId":"","proportion":100}],"proportion":100}]',
    teacherScore: null,
    teacherComment: null,
    isGraded: false,
    isPassed: false,
    courseQuestionNum: 0,
    sdLogNum: 0,
    createdAt: "2025-12-15T04:34:02.022Z",
    updatedAt: "2025-12-15T04:34:02.022Z",
    id: null,
  },
];

function getUserStatistics(data: any[]): any[] {
  const grouped = _.groupBy(
    data.map((t) => ({ ...t })), // 转为普通对象
    (item) => `${item.userId}-${item.classes}`
  );

  return Object.values(grouped).map((items) => {
    const first = items[0];

    let totalScore = calc(0);
    let problemCount = 0;
    let passNum = 0;
    let completionNum = 0;
    let gradedNum = 0;
    let courseQuestionNum = 0;
    let sdLogNum = 0;

    let latestSubmitTime: number | undefined;
    let latestEnterTime: number | undefined;
    let maxStudyDuration = 0;
    let submitStatus: number | undefined;
    let comment: string | undefined;

    for (const t of items) {
      totalScore = totalScore.add(t.teacherScore ?? t.submitScore ?? 0);

      completionNum += t.submitId ? 1 : 0;
      gradedNum += t.isGraded ? 1 : 0;
      courseQuestionNum += t.courseQuestionNum ?? 0;
      sdLogNum += t.sdLogNum ?? 0;

      if (t.problemId) {
        problemCount += 1;
        passNum += t.isPassed ? 1 : 0;
      }

      const submit = t.testPaperSubmit;
      if (submit) {
        if (
          submit.submitTime &&
          (!latestSubmitTime || submit.submitTime > latestSubmitTime)
        ) {
          latestSubmitTime = submit.submitTime;
        }
        if (
          submit.enterTime &&
          (!latestEnterTime || submit.enterTime > latestEnterTime)
        ) {
          latestEnterTime = submit.enterTime;
        }
        if (submit.activeTime && submit.activeTime > maxStudyDuration) {
          maxStudyDuration = submit.activeTime;
        }
        if (
          submit.status !== undefined &&
          (!submitStatus || submit.status > submitStatus)
        ) {
          submitStatus = submit.status;
        }
        if (!comment && submit.comment) {
          comment = submit.comment;
        }
      }
    }

    const totalProblems = items.length;

    return {
      userId: first.userId,
      classes: first.classes,
      user: first.user,
      invisible: first.invisible,
      totalScore: totalScore.toNumber(),
      courseQuestionNum,
      sdLogNum,
      totalProblems,
      problemCount,
      passNum,
      completionNum,
      gradedNum,
      testPaperId: first.testPaperId,
      testPaperSubmit: first.testPaperSubmit,
      testPaperSubmitTime: latestSubmitTime,
      testPaperEnterTime: latestEnterTime,
      studyDuration: maxStudyDuration,
      submitStatus,
      comment,
      passRate: problemCount
        ? parseFloat(((passNum / problemCount) * 100).toFixed(2))
        : 0,
      completionRate: totalProblems
        ? parseFloat(((completionNum / totalProblems) * 100).toFixed(2))
        : 0,
      gradedRate: completionNum
        ? parseFloat(((gradedNum / completionNum) * 100).toFixed(2))
        : 0,
    };
  });
}

const result = getUserStatistics(res);
console.log(result);
fs.writeFileSync("./p1.json", JSON.stringify(result));
