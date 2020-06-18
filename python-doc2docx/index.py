import docx 
doc = docx.Document("./测试用doc.doc") #打开word文件
for para in doc.paragraphs: #读取word中的每个段落
    print(para.text)
