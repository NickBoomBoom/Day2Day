import * as cheerio from "cheerio";
import data from "./data.json";
console.log(data);
const $ = cheerio.load('<h2 class="title">Hello world</h2>');

import axios from "axios";
import { JSDOM } from "jsdom";
import { fileTypeFromBuffer } from "file-type";

import puppeteer from "puppeteer";

const requestIp = "https://admin.tiusolution.com/api";
// const requestIp = "https://admin.dev.tiusolution.com/api";
// const requestIp='http://localhost:35555'
const filePath = "./output.txt";

const data = `<p class="md-end-block md-p" style="-webkit-text-stroke-width:0px;box-sizing:border-box;color:rgb(51, 51, 51);font-family:&quot;Open Sans&quot;, &quot;Clear Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Segoe UI Emoji&quot;, sans-serif;font-size:16px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;line-height:inherit;margin:0.8em 0px;orphans:4;position:relative;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:pre-wrap;widows:2;word-spacing:0px;" cid="n549" mdtype="paragraph"><span class="md-pair-s md-expand md-plain" style="box-sizing:border-box;" md-inline="plain"><strong style="box-sizing:border-box;">1）centos7.5虚拟机配置要求如下（本文Linux系统全部以CentOS-7.5-x86-1804为例）</strong></span></p><p class="md-end-block md-p" style="-webkit-text-stroke-width:0px;box-sizing:border-box;color:rgb(51, 51, 51);font-family:&quot;Open Sans&quot;, &quot;Clear Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Segoe UI Emoji&quot;, sans-serif;font-size:16px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;line-height:inherit;margin:0.8em 0px;orphans:4;position:relative;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:pre-wrap;widows:2;word-spacing:0px;" cid="n550" mdtype="paragraph"><span class="md-plain" style="box-sizing:border-box;" md-inline="plain">（1）使用yum安装需要虚拟机可以正常上网，yum安装前可以先测试下虚拟机联网情况</span></p><pre class="md-fences mock-cm md-end-block" style="-webkit-text-stroke-width:0px;background-attachment:inherit;background-clip:inherit;background-color:rgb(248, 248, 248);background-image:inherit;background-origin:inherit;background-position:inherit;background-repeat:inherit;background-size:inherit;border-radius:3px;border:1px solid rgb(231, 234, 237);box-sizing:border-box;break-inside:avoid;color:rgb(51, 51, 51);display:block;font-family:var(--monospace);font-size:0.9em;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-bottom:15px;margin-top:15px;orphans:2;overflow:visible;padding:8px 4px 6px;position:relative !important;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:pre-wrap;widows:2;width:inherit;word-spacing:0px;" spellcheck="false" lang="" cid="n551" mdtype="fences">[root@centos7.5 ~]# ping www.baidu.com<br>PING www.baidu.com (14.215.177.39) 56(84) bytes of data.<br>64 bytes from 14.215.177.39 (14.215.177.39): icmp_seq=1 ttl=128 time=8.60 ms<br>64 bytes from 14.215.177.39 (14.215.177.39): icmp_seq=2 ttl=128 time=7.72 ms</pre><p class="md-end-block md-p" style="-webkit-text-stroke-width:0px;box-sizing:border-box;color:rgb(51, 51, 51);font-family:&quot;Open Sans&quot;, &quot;Clear Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Segoe UI Emoji&quot;, sans-serif;font-size:16px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;line-height:inherit;margin:0.8em 0px;orphans:4;position:relative;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:pre-wrap;widows:2;word-spacing:0px;" cid="n552" mdtype="paragraph"><span class="md-plain" style="box-sizing:border-box;" md-inline="plain">（2）安装epel-release</span></p><blockquote style="-webkit-text-stroke-width:0px;border-left:4px solid rgb(223, 226, 229);box-sizing:border-box;color:rgb(119, 119, 119);font-family:&quot;Open Sans&quot;, &quot;Clear Sans&quot;, &quot;Helvetica Neue&quot;, Helvetica, Arial, &quot;Segoe UI Emoji&quot;, sans-serif;font-size:16px;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin:0.8em 0px;orphans:2;padding:0px 15px;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;" cid="n553" mdtype="blockquote"><p class="md-end-block md-p" style="box-sizing:border-box;line-height:inherit;margin:0px;orphans:4;position:relative;white-space:pre-wrap;" cid="n554" mdtype="paragraph"><span class="md-plain" style="box-sizing:border-box;" md-inline="plain">注：Extra Packages for Enterprise Linux是为“红帽系”的操作系统提供额外的软件包，适用于RHEL、CentOS和Scientific Linux。相当于是一个软件仓库，大多数rpm包在官方 repository 中是找不到的）</span></p></blockquote><pre class="md-fences md-end-block ty-contain-cm modeLoaded" style="-webkit-text-stroke-width:0px;background-attachment:inherit;background-clip:inherit;background-color:rgb(248, 248, 248);background-image:inherit;background-origin:inherit;background-position:inherit;background-repeat:inherit;background-size:inherit;border-radius:3px;border:1px solid rgb(231, 234, 237);box-sizing:border-box;break-inside:avoid;color:rgb(51, 51, 51);display:block;font-family:var(--monospace);font-size:0.9em;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;margin-bottom:15px;margin-top:15px;orphans:2;overflow:visible;padding:8px 4px 6px;position:relative !important;text-align:left;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;width:inherit;word-spacing:0px;" spellcheck="false" lang="" cid="n555" mdtype="fences"><span style="box-sizing:border-box;padding-right:0.1px;" role="presentation">[root@centos7.5 ~]# yum install -y epel-release</span></pre>`;
main();
async function main() {
  const browser = await puppeteer.launch();
  const page = await browser.newPage();
  const result = await page.evaluate(function (html) {
    console.log(111, html);
    const parser = new DOMParser();
    html = html
      .replaceAll(
        `<span style="color:rgb(0,0,0);font-family:Wingdings;font-size:11.0000pt;font-weight:normal;mso-bidi-font-family:宋体;mso-fareast-font-family:宋体;mso-font-kerning:1.0000pt;mso-list:Ignore;">l&nbsp;</span>`,
        `<span> ● </span>`
      )
      .replace(/<o:p>(?:\s|&nbsp;|&#160;)*<\/o:p>/gi, "");

    const doc = parser.parseFromString(html, "text/html");
    const escapeHTML = (str: string) => {
      if (!str) return str;
      return str
        .replace(/&/g, "&amp;") // 注意顺序，必须先处理 &
        .replace(/</g, "&lt;")
        .replace(/>/g, "&gt;")
        .replace(/"/g, "&quot;")
        .replace(/'/g, "&#39;");
    };

    const findTag = (tag: string, el: HTMLElement): any => {
      for (let i = 0; i < el.children.length; i++) {
        const t = el.children[i];
        const target = t.querySelectorAll(tag);

        if (target.length) {
          return t;
        }
      }

      return null;
    };
    const findParent = (el: HTMLElement | Element): HTMLElement | null => {
      const p: any = el.parentNode;

      if (!p || [1, 9].includes(p.nodeType)) return null;
      return p.children.length === 1 ? p : findParent(p);
    };

    function unwrapAllDivs(node: HTMLElement) {
      // 递归处理每个子元素
      Array.from(node.children).forEach((child) => {
        unwrapAllDivs(child as HTMLElement);
      });

      // 如果当前节点是 div，且没有特殊属性/类名，则提取内容并删除自己
      if (node.tagName === "DIV") {
        const parent = node.parentElement;

        if (!parent) return;

        // 把子节点移出 div
        while (node.firstChild) {
          parent.insertBefore(node.firstChild, node);
        }

        // 删除空的 div 自身
        node.remove();
      }
    }

    doc.querySelectorAll("p>meta").forEach((t: any) => {
      t.parentNode.remove();
    });

    doc.querySelectorAll("h3>meta").forEach((t: any) => {
      t.parentNode.remove();
    });

    doc.querySelectorAll("[data-panel-group-id]").forEach((wrapper: any) => {
      const parent = wrapper.parentNode;

      const buttons = wrapper.querySelectorAll("button>span>svg");

      buttons.forEach((t: any) => {
        t.parentNode.parentNode.remove();
      });
      if (!parent) return;

      // 解开 wrapper 内部所有 div
      unwrapAllDivs(wrapper);

      // 提取 wrapper 本身的内容
      while (wrapper.firstChild) {
        parent.insertBefore(wrapper.firstChild, wrapper);
      }

      // 移除带 data-panel-group-id 的外壳
      wrapper.remove();
    });

    const LI_SELECTORS = [
      "ol > li > ul",
      "ol > li > ol",
      "ul > li > ol",
      "ul > li > ul",
    ];

    LI_SELECTORS.forEach((selector) => {
      doc.querySelectorAll(selector).forEach((nestedList: any) => {
        const parentLi = nestedList.parentNode;
        const parentList = parentLi?.parentNode;

        if (parentLi && parentList) {
          // 克隆并插入到 <li> 的后面
          parentList.insertBefore(
            nestedList.cloneNode(true),
            parentLi.nextSibling
          );

          // 移除原始嵌套列表
          nestedList.remove();
        }
      });
    });

    // 删除 class="MsoNormal" 且无内容的段落
    doc.querySelectorAll(".MsoNormal").forEach((p: any) => {
      if (!p.innerText) {
        p.remove();
      }
    });

    doc.querySelectorAll("ul>li").forEach((t: any) => {
      const el = findTag("video", t);

      if (el) {
        t.parentNode.insertBefore(el.cloneNode(true), t.nextSibling);

        el.remove();
      }
    });

    doc
      .querySelectorAll(
        '[style="background:#F2F2F2;border:solid windowtext 1.0pt;margin-left:21.0pt;margin-right:21.0pt;mso-background-themecolor:background1;mso-background-themeshade:242;mso-border-alt:solid windowtext .5pt;mso-element:para-border-div;padding:1.0pt 4.0pt 1.0pt 4.0pt;"]'
      )
      .forEach((t) => {
        const pre = document.createElement("pre");
        const code = document.createElement("code");

        const str: string[] = [];

        t.querySelectorAll("p").forEach((t) => {
          str.push(t.innerText);
        });

        code.innerHTML = str.join("\n");

        pre.appendChild(code);

        t.replaceWith(pre);
      });

    doc
      .querySelectorAll(
        '[style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);border:1px dashed rgb(0, 0, 0);clear:none;color:rgb(0, 0, 0);float:none;font-family:Geneva, Verdana, Arial, Helvetica, sans-serif;font-size:medium;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;list-style-position:inside;list-style-type:disc;margin:25px;orphans:2;padding:2px 6px 2px 10px;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"]'
      )
      .forEach((t) => {
        const pre = document.createElement("pre");
        const code = document.createElement("code");

        code.innerHTML = t.innerHTML.replaceAll("<br>", "\n");

        pre.appendChild(code);

        t.replaceWith(pre);
      });

    doc.querySelectorAll("pre").forEach((t: any) => {
      const c = t.querySelector("code");

      t.removeAttribute("style");

      t.removeAttribute("spellcheck");

      t.removeAttribute("lang");

      t.removeAttribute("cid");

      t.removeAttribute("mdtype");
      if (!c) {
        t.innerHTML = t.innerHTML.replaceAll("<br>", "\n");

        const rawText = t.innerText;
        const escaped = escapeHTML(rawText);

        t.innerHTML = `<code>${escaped}</code>`;
      }
    });

    doc.querySelectorAll("[style]").forEach((el) => {
      const style = el.getAttribute("style")!;
      const cleanedStyle = style
        .split(";") // 拆分每一项
        .map((s) => s.trim()) // 去掉两侧空格
        .filter((s) => {
          const bol =
            s?.startsWith("mso-") ||
            s?.startsWith("--tw-") ||
            s?.startsWith("--el-");

          return s && !bol;
        }) // 移除 mso- 开头的项
        .join("; "); // 重新拼接为 style 字符串

      if (cleanedStyle) {
        el.setAttribute("style", cleanedStyle);
      } else {
        el.removeAttribute("style"); // 没有剩下内容就删除整个 style
      }
    });

    // align="center" => style.textAlign
    doc.querySelectorAll('[align="center"]').forEach((el: any) => {
      el.style.textAlign = "center";

      el.removeAttribute("align");

      const tables = el.querySelectorAll("table");
      const videos = el.querySelectorAll("video");

      console.log(videos);

      if (tables.length || videos.length) {
        while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
        el.remove();
      }
    });

    doc.querySelectorAll(".editorVideoStyle").forEach((el: any) => {
      while (el.firstChild) {
        el.parentNode.insertBefore(el.firstChild, el);
      }
      el.remove();
    });

    const shouldRemoveClass = (cls: string) => {
      return (
        cls.startsWith("WordSection") ||
        /^Section\d*$/.test(cls) ||
        cls === "raw-html-embed"
      );
    };
    // 移除 class

    doc.querySelectorAll("[class]").forEach((el) => {
      const classList = Array.from(el.classList);

      if (classList.some((cls: any) => shouldRemoveClass(cls))) {
        const parent: any = el.parentNode;

        while (el.firstChild) {
          parent.insertBefore(el.firstChild, el);
        }
        parent.removeChild(el);
      } else {
        el.removeAttribute("class");
      }
    });

    // 清除 figure，保留子元素
    doc.querySelectorAll("figure").forEach((figure) => {
      const parent: any = figure.parentNode;

      Array.from(figure.childNodes).forEach((child) =>
        parent.insertBefore(child, figure)
      );

      parent.removeChild(figure);
    });

    // 处理 table
    doc.querySelectorAll("table").forEach((t) => {
      t.style.width = "100%";

      t.setAttribute("width", "100%");

      const p: any = findParent(t);

      if (p) p.replaceWith(t);
    });

    doc.querySelectorAll("div>table").forEach((t: any) => {
      const div = t.parentNode;
      const p = document.createElement("p");

      p.innerHTML = div.innerHTML;

      div.replaceWith(p);
    });
    // 工具函数：裁剪带参数的 src
    function cleanSrc(url: string | null): string | null {
      if (!url) return url;
      return url.split("?")[0];
    }

    // 处理 video/audio
    doc.querySelectorAll("video, audio").forEach((t) => {
      const isVideo = t.tagName === "VIDEO";

      const srcList: string[] = [];

      // 清理 <source> src 参数
      t.querySelectorAll("source").forEach((source) => {
        const src = source.getAttribute("src");

        if (src) {
          srcList.push(src);
        }
      });

      // 兼容旧写法，video/audio 自己也可能有 src
      const directSrc = t.getAttribute("src");

      if (directSrc) {
        t.setAttribute("src", cleanSrc(directSrc)!);
      } else {
        const newSrc = srcList.filter((t) => !t.includes("_transcode"))[0];

        t.setAttribute("src", cleanSrc(newSrc)!);
      }

      t.innerHTML = "";

      t.removeAttribute("data-setup");

      const wrapper = document.createElement("div");

      wrapper.setAttribute("data-w-e-type", isVideo ? "video" : "audio");

      if (isVideo) {
        wrapper.setAttribute("data-w-e-is-void", "");
      }
      wrapper.appendChild(t.cloneNode(true));

      const p: any = findParent(t) || t;

      p.replaceWith(wrapper);
    });

    // cp-image-swiper
    doc.querySelectorAll("cp-image-swiper").forEach((t) => {
      const div = document.createElement("div");

      div.setAttribute("data-w-e-type", "shadow-dom");

      div.appendChild(t.cloneNode(true));

      t.replaceWith(div);
    });

    // 处理 img
    doc.querySelectorAll("img").forEach((t) => {
      const src = t.getAttribute("src");

      t.setAttribute("src", cleanSrc(src)!);

      const p: any = findParent(t);
      const wrapper = document.createElement("p");

      wrapper.style.textAlign = p?.getAttribute("align") || "center";

      wrapper.appendChild(t.cloneNode(true));
      (p || t).replaceWith(wrapper);
    });

    // 移除 <font> 标签但保留其子元素
    doc.querySelectorAll("font").forEach((t) => {
      const p = t.parentNode;

      while (t.firstChild) p?.insertBefore(t.firstChild, t);
      t.remove();
    });

    // 嵌套 <p> 提出
    doc.querySelectorAll("p").forEach((outerP: any) => {
      Array.from(outerP.children)
        .filter((child: any) => child.tagName === "P")
        .forEach((nestedP) => {
          outerP.parentNode.insertBefore(nestedP, outerP);
        });
    });

    const cleanedHtml = doc.body.innerHTML
      .replace(/>\s+</g, "><") // 标签之间的空白
      // .replace(/\s{2,}/g, ' ') // 多个连续空格变一个空格
      .replace(/^\s+|\s+$/g, ""); // 去除首尾空格

    console.log("before", html, html.length);

    console.warn("after", cleanedHtml);

    return cleanedHtml;
  }, data);

  // fs.writeFile("./output.html", result, "utf-8");

  console.log(222, result); // <div><p>Hello</p></div>
  await browser.close();
}

function inspectRichText(value: string): Promise<string> {
  return new Promise(async (resolve, reject) => {
    try {
      // const dom = new JSDOM(value);
      // const document = dom.window.document;
      // // 处理多媒体
      // const metaPromises = Array.from(
      //   document.querySelectorAll("img,source,video,audio")
      // ).map(async (meta: any) => {
      //   if (meta.src) {
      //     // 判断是否是base64
      //     if (isBase64(meta.src)) {
      //       const base64 = meta.src.startsWith("/minio-img/test")
      //         ? meta.src.split("/minio-img/test")[1].split("?")[0].split(",")[1]
      //         : meta.src.split(",")[1];
      //       const buffer = Buffer.from(base64, "base64");
      //       const type = await fileTypeFromBuffer(buffer);
      //       const attachment = await uploadFile(
      //         base64,
      //         `${new Date().getTime()}.${type.ext}`
      //       );
      //       meta.src = attachment.relativeUrl.split("?")[0];
      //     }
      //     // 判断是否是file协议
      //     if (isFileProtocol(meta.src)) {
      //       meta.remove();
      //     }
      //     if (/^https?:\/\/[^/]+\/minio-img\/test/.test(meta.src)) {
      //       meta.src =
      //         "/minio-img/test" +
      //         meta.src.split("minio-img/test")[1].split("?")[0];
      //     }
      //     if (meta.src.includes("cos.ap-shanghai.myqcloud.com")) {
      //       meta.src =
      //         "/minio-img/test" +
      //         meta.src.split("cos.ap-shanghai.myqcloud.com")[1].split("?")[0];
      //     }
      //     if (meta.src.includes("tiusolution.com")) {
      //       meta.src =
      //         "/minio-img/test" +
      //         meta.src.split("tiusolution.com")[1].split("?")[0];
      //     }
      //     if (meta.src.startsWith("/minio-img/testhttp")) {
      //       meta.src = meta.src.split("/minio-img/test")[1].split("?")[0];
      //     }
      //     fs.appendFileSync(filePath, meta.src + "\n");
      //   }
      // });
      // // 处理swiper
      // const swiperPromises = Array.from(
      //   document.querySelectorAll("cp-image-swiper,q-image-swiper")
      // ).map(async (swiper: any) => {
      //   if (swiper.getAttribute("images")) {
      //     const images = swiper.getAttribute("images").split(";");
      //     const inspectImages = [];
      //     for (const image of images) {
      //       // 判断是否是base64
      //       if (isBase64(image)) {
      //         const base64 = image.startsWith("/minio-img/test")
      //           ? image.split("/minio-img/test")[1].split("?")[0].split(",")[1]
      //           : image.split(",")[1];
      //         const buffer = Buffer.from(base64, "base64");
      //         const type = await fileTypeFromBuffer(buffer);
      //         const attachment = await uploadFile(
      //           base64,
      //           `${new Date().getTime()}.${type.ext}`
      //         );
      //         inspectImages.push(attachment.relativeUrl.split("?")[0]);
      //       }
      //       // 判断是否是file协议
      //       if (isFileProtocol(image)) {
      //         continue;
      //       }
      //       if (/^https?:\/\/[^/]+\/minio-img\/test/.test(image)) {
      //         inspectImages.push(
      //           "/minio-img/test" +
      //             image.src.split("minio-img/test")[1].split("?")[0]
      //         );
      //       }
      //       if (image.includes("cos.ap-shanghai.myqcloud.com")) {
      //         inspectImages.push(
      //           "/minio-img/test" +
      //             image.split("cos.ap-shanghai.myqcloud.com")[1].split("?")[0]
      //         );
      //       }
      //       if (image.includes("tiusolution.com")) {
      //         inspectImages.push(
      //           "/minio-img/test" +
      //             image.split("tiusolution.com")[1].split("?")[0]
      //         );
      //       }
      //       fs.appendFileSync(filePath, image + "\n");
      //     }
      //     if (inspectImages.length === 0) {
      //       swiper.remove();
      //     }
      //     swiper.setAttribute("images", inspectImages.join(";"));
      //   }
      // });
      // //处理a标签
      // const aTagPromises = Array.from(document.querySelectorAll("a")).map(
      //   async (a: any) => {
      //     if (a.href) {
      //       // 判断是否是base64
      //       if (isBase64(a.href)) {
      //         const base64 = a.href.startsWith("/minio-img/test")
      //           ? a.href.split("/minio-img/test")[1].split("?")[0].split(",")[1]
      //           : a.href.split(",")[1];
      //         const buffer = Buffer.from(base64, "base64");
      //         const type = await fileTypeFromBuffer(buffer);
      //         const attachment = await uploadFile(
      //           base64,
      //           `${new Date().getTime()}.${type.ext}`
      //         );
      //         a.href = attachment.relativeUrl.split("?")[0];
      //       }
      //       // 判断是否是file协议
      //       if (isFileProtocol(a.href)) {
      //         a.remove();
      //       }
      //       if (/^https?:\/\/[^/]+\/minio-img\/test/.test(a.href)) {
      //         a.href =
      //           "/minio-img/test" +
      //           a.href.split("minio-img/test")[1].split("?")[0];
      //       }
      //       if (a.href.includes("cos.ap-shanghai.myqcloud.com")) {
      //         a.href =
      //           "/minio-img/test" +
      //           a.href.split("cos.ap-shanghai.myqcloud.com")[1].split("?")[0];
      //       }
      //       if (a.href.includes("tiusolution.com")) {
      //         a.href =
      //           "/minio-img/test" +
      //           a.href.split("tiusolution.com")[1].split("?")[0];
      //       }
      //       if (a.href.startsWith("/minio-img/testhttp")) {
      //         a.href = a.href.split("/minio-img/test")[1].split("?")[0];
      //       }
      //       fs.appendFileSync(filePath, a.href + "\n");
      //     }
      //   }
      // );
      // // 等待所有异步操作完成
      // await Promise.all([...metaPromises, ...swiperPromises, ...aTagPromises]);
      // resolve(parse(dom.serialize()));
    } catch (e) {
      reject(e);
    }
  });
}

function parse(html: string, parser: any) {
  // const dom = new JSDOM();
  // const document = dom.window.document;
  // const parser = new dom.window.DOMParser();
  // const parser = new DOMParser();

  html = html
    .replaceAll(
      `<span style="color:rgb(0,0,0);font-family:Wingdings;font-size:11.0000pt;font-weight:normal;mso-bidi-font-family:宋体;mso-fareast-font-family:宋体;mso-font-kerning:1.0000pt;mso-list:Ignore;">l&nbsp;</span>`,
      `<span> ● </span>`
    )
    .replace(/<o:p>(?:\s|&nbsp;|&#160;)*<\/o:p>/gi, "");

  const doc = parser.parseFromString(html, "text/html");
  const escapeHTML = (str: string) => {
    if (!str) return str;
    return str
      .replace(/&/g, "&amp;") // 注意顺序，必须先处理 &
      .replace(/</g, "&lt;")
      .replace(/>/g, "&gt;")
      .replace(/"/g, "&quot;")
      .replace(/'/g, "&#39;");
  };

  const findTag = (tag: string, el: HTMLElement): any => {
    for (let i = 0; i < el.children.length; i++) {
      const t = el.children[i];
      const target = t.querySelectorAll(tag);

      if (target.length) {
        return t;
      }
    }

    return null;
  };
  const findParent = (el: HTMLElement | Element): HTMLElement | null => {
    const p: any = el.parentNode;

    if (!p || [1, 9].includes(p.nodeType)) return null;
    return p.children.length === 1 ? p : findParent(p);
  };

  function unwrapAllDivs(node: HTMLElement) {
    // 递归处理每个子元素
    Array.from(node.children).forEach((child) => {
      unwrapAllDivs(child as HTMLElement);
    });

    // 如果当前节点是 div，且没有特殊属性/类名，则提取内容并删除自己
    if (node.tagName === "DIV") {
      const parent = node.parentElement;

      if (!parent) return;

      // 把子节点移出 div
      while (node.firstChild) {
        parent.insertBefore(node.firstChild, node);
      }

      // 删除空的 div 自身
      node.remove();
    }
  }

  doc.querySelectorAll("p>meta").forEach((t: any) => {
    t.parentNode.remove();
  });

  doc.querySelectorAll("h3>meta").forEach((t: any) => {
    t.parentNode.remove();
  });

  doc.querySelectorAll("[data-panel-group-id]").forEach((wrapper: any) => {
    const parent = wrapper.parentNode;

    const buttons = wrapper.querySelectorAll("button>span>svg");

    buttons.forEach((t: any) => {
      t.parentNode.parentNode.remove();
    });
    if (!parent) return;

    // 解开 wrapper 内部所有 div
    unwrapAllDivs(wrapper);

    // 提取 wrapper 本身的内容
    while (wrapper.firstChild) {
      parent.insertBefore(wrapper.firstChild, wrapper);
    }

    // 移除带 data-panel-group-id 的外壳
    wrapper.remove();
  });

  const LI_SELECTORS = [
    "ol > li > ul",
    "ol > li > ol",
    "ul > li > ol",
    "ul > li > ul",
  ];

  LI_SELECTORS.forEach((selector) => {
    doc.querySelectorAll(selector).forEach((nestedList: any) => {
      const parentLi = nestedList.parentNode;
      const parentList = parentLi?.parentNode;

      if (parentLi && parentList) {
        // 克隆并插入到 <li> 的后面
        parentList.insertBefore(
          nestedList.cloneNode(true),
          parentLi.nextSibling
        );

        // 移除原始嵌套列表
        nestedList.remove();
      }
    });
  });

  // 删除 class="MsoNormal" 且无内容的段落
  doc.querySelectorAll(".MsoNormal").forEach((p: any) => {
    if (!p.innerText) {
      p.remove();
    }
  });

  doc.querySelectorAll("ul>li").forEach((t: any) => {
    const el = findTag("video", t);

    if (el) {
      t.parentNode.insertBefore(el.cloneNode(true), t.nextSibling);

      el.remove();
    }
  });

  doc
    .querySelectorAll(
      '[style="background:#F2F2F2;border:solid windowtext 1.0pt;margin-left:21.0pt;margin-right:21.0pt;mso-background-themecolor:background1;mso-background-themeshade:242;mso-border-alt:solid windowtext .5pt;mso-element:para-border-div;padding:1.0pt 4.0pt 1.0pt 4.0pt;"]'
    )
    .forEach((t) => {
      const pre = document.createElement("pre");
      const code = document.createElement("code");

      const str: string[] = [];

      t.querySelectorAll("p").forEach((t) => {
        str.push(t.innerText);
      });

      code.innerHTML = str.join("\n");

      pre.appendChild(code);

      t.replaceWith(pre);
    });

  doc
    .querySelectorAll(
      '[style="-webkit-text-stroke-width:0px;background-color:rgb(255, 255, 255);border:1px dashed rgb(0, 0, 0);clear:none;color:rgb(0, 0, 0);float:none;font-family:Geneva, Verdana, Arial, Helvetica, sans-serif;font-size:medium;font-style:normal;font-variant-caps:normal;font-variant-ligatures:normal;font-weight:400;letter-spacing:normal;list-style-position:inside;list-style-type:disc;margin:25px;orphans:2;padding:2px 6px 2px 10px;text-align:start;text-decoration-color:initial;text-decoration-style:initial;text-decoration-thickness:initial;text-indent:0px;text-transform:none;white-space:normal;widows:2;word-spacing:0px;"]'
    )
    .forEach((t) => {
      const pre = document.createElement("pre");
      const code = document.createElement("code");

      code.innerHTML = t.innerHTML.replaceAll("<br>", "\n");

      pre.appendChild(code);

      t.replaceWith(pre);
    });

  doc.querySelectorAll("pre").forEach((t: any) => {
    const c = t.querySelector("code");

    t.removeAttribute("style");

    t.removeAttribute("spellcheck");

    t.removeAttribute("lang");

    t.removeAttribute("cid");

    t.removeAttribute("mdtype");
    if (!c) {
      t.innerHTML = t.innerHTML.replaceAll("<br>", "\n");

      const rawText = t.innerText;
      const escaped = escapeHTML(rawText);

      t.innerHTML = `<code>${escaped}</code>`;
    }
  });

  doc.querySelectorAll("[style]").forEach((el) => {
    const style = el.getAttribute("style")!;
    const cleanedStyle = style
      .split(";") // 拆分每一项
      .map((s) => s.trim()) // 去掉两侧空格
      .filter((s) => {
        const bol =
          s?.startsWith("mso-") ||
          s?.startsWith("--tw-") ||
          s?.startsWith("--el-");

        return s && !bol;
      }) // 移除 mso- 开头的项
      .join("; "); // 重新拼接为 style 字符串

    if (cleanedStyle) {
      el.setAttribute("style", cleanedStyle);
    } else {
      el.removeAttribute("style"); // 没有剩下内容就删除整个 style
    }
  });

  // align="center" => style.textAlign
  doc.querySelectorAll('[align="center"]').forEach((el: any) => {
    el.style.textAlign = "center";

    el.removeAttribute("align");

    const tables = el.querySelectorAll("table");
    const videos = el.querySelectorAll("video");

    console.log(videos);

    if (tables.length || videos.length) {
      while (el.firstChild) el.parentNode.insertBefore(el.firstChild, el);
      el.remove();
    }
  });

  doc.querySelectorAll(".editorVideoStyle").forEach((el: any) => {
    while (el.firstChild) {
      el.parentNode.insertBefore(el.firstChild, el);
    }
    el.remove();
  });

  const shouldRemoveClass = (cls: string) => {
    return (
      cls.startsWith("WordSection") ||
      /^Section\d*$/.test(cls) ||
      cls === "raw-html-embed"
    );
  };
  // 移除 class

  doc.querySelectorAll("[class]").forEach((el) => {
    const classList = Array.from(el.classList);

    if (classList.some((cls: any) => shouldRemoveClass(cls))) {
      const parent: any = el.parentNode;

      while (el.firstChild) {
        parent.insertBefore(el.firstChild, el);
      }
      parent.removeChild(el);
    } else {
      el.removeAttribute("class");
    }
  });

  // 清除 figure，保留子元素
  doc.querySelectorAll("figure").forEach((figure) => {
    const parent: any = figure.parentNode;

    Array.from(figure.childNodes).forEach((child) =>
      parent.insertBefore(child, figure)
    );

    parent.removeChild(figure);
  });

  // 处理 table
  doc.querySelectorAll("table").forEach((t) => {
    t.style.width = "100%";

    t.setAttribute("width", "100%");

    const p: any = findParent(t);

    if (p) p.replaceWith(t);
  });

  doc.querySelectorAll("div>table").forEach((t: any) => {
    const div = t.parentNode;
    const p = document.createElement("p");

    p.innerHTML = div.innerHTML;

    div.replaceWith(p);
  });
  // 工具函数：裁剪带参数的 src
  function cleanSrc(url: string | null): string | null {
    if (!url) return url;
    return url.split("?")[0];
  }

  // 处理 video/audio
  doc.querySelectorAll("video, audio").forEach((t) => {
    const isVideo = t.tagName === "VIDEO";

    const srcList: string[] = [];

    // 清理 <source> src 参数
    t.querySelectorAll("source").forEach((source) => {
      const src = source.getAttribute("src");

      if (src) {
        srcList.push(src);
      }
    });

    // 兼容旧写法，video/audio 自己也可能有 src
    const directSrc = t.getAttribute("src");

    if (directSrc) {
      t.setAttribute("src", cleanSrc(directSrc)!);
    } else {
      const newSrc = srcList.filter((t) => !t.includes("_transcode"))[0];

      t.setAttribute("src", cleanSrc(newSrc)!);
    }

    t.innerHTML = "";

    t.removeAttribute("data-setup");

    const wrapper = document.createElement("div");

    wrapper.setAttribute("data-w-e-type", isVideo ? "video" : "audio");

    if (isVideo) {
      wrapper.setAttribute("data-w-e-is-void", "");
    }
    wrapper.appendChild(t.cloneNode(true));

    const p: any = findParent(t) || t;

    p.replaceWith(wrapper);
  });

  // cp-image-swiper
  doc.querySelectorAll("cp-image-swiper").forEach((t) => {
    const div = document.createElement("div");

    div.setAttribute("data-w-e-type", "shadow-dom");

    div.appendChild(t.cloneNode(true));

    t.replaceWith(div);
  });

  // 处理 img
  doc.querySelectorAll("img").forEach((t) => {
    const src = t.getAttribute("src");

    t.setAttribute("src", cleanSrc(src)!);

    const p: any = findParent(t);
    const wrapper = document.createElement("p");

    wrapper.style.textAlign = p?.getAttribute("align") || "center";

    wrapper.appendChild(t.cloneNode(true));
    (p || t).replaceWith(wrapper);
  });

  // 移除 <font> 标签但保留其子元素
  doc.querySelectorAll("font").forEach((t) => {
    const p = t.parentNode;

    while (t.firstChild) p?.insertBefore(t.firstChild, t);
    t.remove();
  });

  // 嵌套 <p> 提出
  doc.querySelectorAll("p").forEach((outerP: any) => {
    Array.from(outerP.children)
      .filter((child: any) => child.tagName === "P")
      .forEach((nestedP) => {
        outerP.parentNode.insertBefore(nestedP, outerP);
      });
  });

  const cleanedHtml = doc.body.innerHTML
    .replace(/>\s+</g, "><") // 标签之间的空白
    // .replace(/\s{2,}/g, ' ') // 多个连续空格变一个空格
    .replace(/^\s+|\s+$/g, ""); // 去除首尾空格

  console.log("before", html, html.length);

  console.warn("after", cleanedHtml);

  return cleanedHtml;
}

function isBase64(src: string): boolean {
  return (
    (src.startsWith("data:image/") ||
      src.startsWith("/minio-img/testdata:image/")) &&
    src.includes(";base64,")
  );
}

function isFileProtocol(src: string): boolean {
  return src.startsWith("file://") || src.startsWith("/minio-img/testfile://");
}

async function uploadFile(base64: string, fileName: string) {
  try {
    const response = await axios.post(
      `${requestIp}/attachment/upload/base64`,
      { base64, objectName: fileName, sourceSystem: "editor" },
      { headers: { token: "0f226e908d094e77ab32d096e49cd896" } }
    );
    console.log("🚀 ~ uploadFile ~ response:", response);

    return response.data.data;
  } catch (error) {
    console.error("上传失败:", error);
    throw error;
  }
}
