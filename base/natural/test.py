# -*- coding: utf-8 -*-

import jieba

text = '''
我在 Vue 2 时代就在使用 element-ui，到了 Vue 3 时代我将它的官方 Vue 3 版本 element-plus 作为我的首选 UI 库。
# ...（文本太长，省略部分内容）...
感谢 element-plus 陪我走过几年前端时光 🙏
'''

tokens = jieba.cut(text)
# 注意：jieba.cut返回的是一个生成器，您可以将其转换为列表或使用for循环迭代
token_list = list(tokens)
for token in token_list:
    print(token.encode('utf-8'))