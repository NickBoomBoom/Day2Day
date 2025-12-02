interface Problem {
  id: number; // id
  title: string; // 标题
  description: string; // 题目描述
  type: number; // enum 问题类型：1 - FPS题  2 - 单选题  3 - 判断题  4 - 文字问答  5 - 多选题  6 - 完形填空  7 - 图片题  8 - 语音题  9 - terminal  10 - jupyter

  /**
     * 1. 完形填空: {isAnswerOrder: false, answerList:[{value: '空1答案'}, {value: '空2答案'}, {value: '空3答案'}]}
     * 2. 选择题(含多选题): 1,2,3
     * 3. 判断题: 0 or 1
     * 4. 问答题(纯文本or富文本): [{value: '模块1答案'}, {value: '模块2答案'}, {value: '模块3答案'}]
     * 5. 图片题: [{value: '模块1 accessKey'}, {value: '模块2 accessKey'}, {value: '模块3 accessKey'}]
     * 6. 语音题: "xxxxxx"
     * 7. FPS: "xxxxxx"
     * 8. jupyter: "" (cell)
        cell: {
            metadata: {
            kernelspec: {
                name: string
                display_name: string
                language: string
            }
            language_info: any
            }
            nbformat: number
            nbformat_minor: number

            cells: {
            cell_type: 'code' | 'markdown'
            execution_count?: number | null
            metadata?: any
            source: string
            outputs: {
                output_type: 'stream' | 'display_data' | 'execute_result' | 'error'
                name?: string
                text?: string[]
                execution_count?: number
                data?: Record<string, any>
                metadata?: Record<string, any>
                ename?: string
                evalue?: string
                traceback?: string[]
            }[]
            }[]
        }
     */
  correctAnswer: string; // JSON化 结构  填空题还很特殊
  teachingModuleId: number;
  analysis: string; // 解析
  tags: string[]; // 标签
  isValid: boolean; //  python题正在使用
  isExactMatch: boolean; // ❌原区分填空题和问答题 - 现已按题型分类，可删除

  answerBox: number; //  文本框类型
  characterLimit: number; //字数限制
  judgeEngineConfig: any; // 音频题的特殊配置 待商榷 - 可以再包一层 json
  syncKey: string;
  isAIGradable: boolean; //  是否可使用AI判题/出解析(虚拟字段)

  vmTemplateConfig: {
    kernel: "python3" | "terminal"; // jupyter 可以配 python3 或 python 2.7
    name: string; // 镜像名称
    template: string; // 镜像名称
    expireTime: number; // 镜像过期时间
  }[];

  gradingStandardsV3: [
    {
      source: {
        from: "stdAnswer" | "dialog" | "jupyter";
        index: 0;
      };
      standards: [
        {
          engine: "rubric" | "assert" | "auto";
          rating: 30;

          // auto 自动判断
          autoText: "请根据题目描述、正确答案对学生答案进行评判";
          // code 断言脚本
          snifferScript: "运行一个终端命令";
          evaluation: "(input) =>{return {execRes: false, rule: `第一个判题点`}}}";
          // rubric 通过一级二级判题点来进行判断
          rule: "第一个得分点的说明";
          children: [
            {
              rule: "完全正确实现所有功能";
              rating: 50; // 二级必需有个等于父级rating
            }
          ];
        }
      ];
      proportion: 30;
    }
  ];
}
