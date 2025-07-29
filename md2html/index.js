import fs from "fs";
import path from "path";
import { fileURLToPath } from "url";
import MarkdownIt from "markdown-it";
import * as cheerio from "cheerio";
// 创建 markdown 渲染器
const md = new MarkdownIt({
  html: true,
  breaks: true,
});
// ESM 环境中的 __dirname 兼容处理
const __filename = fileURLToPath(import.meta.url);
const __dirname = path.dirname(__filename);

// 输入与输出目录
const rootDir = process.argv[2] || path.join(__dirname, "./data");
const outputDir = path.join(__dirname, "./output");

// 确保目录存在
function ensureDirSync(dirPath) {
  if (!fs.existsSync(dirPath)) {
    fs.mkdirSync(dirPath, { recursive: true });
  }
}

/**
 * 获取 MIME 类型
 * @param {string} ext - 扩展名（如 .png）
 * @returns {string} MIME 类型
 */
function getMimeType(ext) {
  switch (ext) {
    case ".png":
      return "image/png";
    case ".jpg":
    case ".jpeg":
      return "image/jpeg";
    case ".gif":
      return "image/gif";
    case ".svg":
      return "image/svg+xml";
    default:
      return "application/octet-stream";
  }
}
// 递归处理目录
function walkDir(dirPath, fileCallback) {
  fs.readdir(dirPath, { withFileTypes: true }, (err, entries) => {
    if (err) {
      console.error("❌ 读取目录失败:", dirPath, err);
      return;
    }

    entries.forEach((entry) => {
      const fullPath = path.join(dirPath, entry.name);
      if (entry.isDirectory()) {
        walkDir(fullPath, fileCallback);
      } else if (entry.isFile()) {
        fileCallback(fullPath);
      }
    });
  });
}

// 处理每个 Markdown 文件
function handleFile(filePath) {
  if (path.extname(filePath) !== ".md") return;

  fs.readFile(filePath, "utf-8", (err, content) => {
    if (err) {
      console.error("❌ 读取失败:", filePath, err);
      return;
    }

    // console.log(`处理文件: ${filePath}`);
    const htmlContent = md.render(content);

    const $ = cheerio.load(htmlContent, { decodeEntities: false });

    const imgs = $("img");

    imgs.each((index, img) => {
      const src = decodeURIComponent($(img).attr("src"));
      const dir = path.dirname(filePath);
      const absPath = path.join(dir, src);
      console.log(`处理图片: ${src} → ${filePath} - ${absPath}`);
      if (src.startsWith("http")) {
      } else {
        const ext = path.extname(absPath).toLowerCase();
        const mime = getMimeType(ext);
        const data = fs.readFileSync(absPath);
        const base64 = data.toString("base64");
        $(img).attr("src", `data:${mime};base64,${base64}`);
      }
    });

    const relativePath = path
      .relative(rootDir, filePath)
      .replace(/\.md$/, ".html");
    const outputPath = path.join(outputDir, relativePath);
    const outputFolder = path.dirname(outputPath);
    ensureDirSync(outputFolder);

    fs.writeFile(outputPath, $("body").html(), "utf-8", (err) => {
      if (err) {
        console.error("❌ 写入失败:", outputPath, err);
      } else {
        // console.log(`✅ 转换成功: ${filePath} → ${outputPath}`);
      }
    });
  });
}

// 执行
walkDir(rootDir, handleFile);
