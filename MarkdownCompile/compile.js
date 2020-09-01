function Markdown(mdstr, div) {
  this.textarea = mdstr;
  this.div = div;
}

Markdown.prototype = {
  init: function () {
    this.div.innerHTML = this.compile(this.textarea);
  },
  compile: function (initStr) {
    const rows = initStr.split("\n");
    let matchArry;
    let html = "";
    // let levelFlag = 0;
    let prevLevel = 0;
    let curLevel = 0;
    let re = "";
    // let response = {};
    let levelstr = "";
    for (let i = 0, len = rows.length; i < len; i++) {
      matchArry = rows[i].match(/^#\s/)
        || rows[i].match(/^##\s/)
        || rows[i].match(/^###\s/)
        || rows[i].match(/^####\s/)
        || rows[i].match(/^#####\s/)
        || rows[i].match(/^######\s/)
        || rows[i].match(/^\*{3,}/)
        || rows[i].match(/^>\s/)
        || rows[i].match(/^\*\s/)
        || rows[i].match(/^\d\.\s/)
        || rows[i].match(/^```$/)
        || rows[i].match(/^---/)
        || rows[i].match(/^\|.*\|/);
      let temp = "";
      if (matchArry) {
        switch (matchArry[0]) {
          case "# ": {
            levelstr = rows[i].substring(2).match(/^>*\s/) && rows[i].substring(2).match(/^>*\s/)[0];
            if (levelstr) {
              curLevel = levelstr.length - 1;
              html += this.handleLevel(rows[i].substring(2), "h1", `${i}`, prevLevel, curLevel);
              prevLevel = curLevel;
            } else {
              html += "<h1>" + this.format(rows[i].substring(2)) + "</h1>";
            }
            break;
          }
          case "## ": {
            levelstr = rows[i].substring(3).match(/^>*\s/) && rows[i].substring(3).match(/^>*\s/)[0];
            if (levelstr) {
              curLevel = levelstr.length - 1;
              html += this.handleLevel(rows[i].substring(3), "h2", `${i}`, prevLevel, curLevel);
              prevLevel = curLevel;
            } else {
              html += "<h2>" + this.format(rows[i].substring(3)) + "</h2>";
            }
            break;
          }
          case "### ": {
            levelstr = rows[i].substring(4).match(/^>*\s/) && rows[i].substring(4).match(/^>*\s/)[0];
            if (levelstr) {
              curLevel = levelstr.length - 1;
              html += this.handleLevel(rows[i].substring(4), "h3", `${i}`, prevLevel, curLevel);
              prevLevel = curLevel;
            } else {
              html += "<h3>" + this.format(rows[i].substring(4)) + "</h3>";
            }
            break;
          }
          case "#### ": {
            levelstr = rows[i].substring(5).match(/^>*\s/) && rows[i].substring(5).match(/^>*\s/)[0];
            if (levelstr) {
              curLevel = levelstr.length - 1;
              html += this.handleLevel(rows[i].substring(5), "h4", `${i}`, prevLevel, curLevel);
              prevLevel = curLevel;
            } else {
              html += "<h4>" + this.format(rows[i].substring(5)) + "</h4>";
            }
            break;
          }
          case "##### ": {
            levelstr = rows[i].substring(6).match(/^>*\s/) && rows[i].substring(6).match(/^>*\s/)[0];
            if (levelstr) {
              curLevel = levelstr.length - 1;
              html += this.handleLevel(rows[i].substring(6), "h5", `${i}`, prevLevel, curLevel);
              prevLevel = curLevel;
            } else {
              html += "<h4>" + this.format(rows[i].substring(6)) + "</h4>";
            }
            break;
          }
          case "###### ": {
            levelstr = rows[i].substring(6).match(/^>*\s/) && rows[i].substring(6).match(/^>*\s/)[0];
            if (levelstr) {
              curLevel = levelstr.length - 1;
              html += this.handleLevel(rows[i].substring(6), "h5", `${i}`, prevLevel, curLevel);
              prevLevel = curLevel;
            } else {
              html += "<h4>" + this.format(rows[i].substring(6)) + "</h4>";
            }
            break;
          }
          case rows[i].match(/^\*{3,}/) && rows[i].match(/^\*{3,}/)[0]: {
            html += rows[i].replace(/^\*{3,}/g, "<hr>");
            break;
          }
          case "> ": {
            temp = "";
            re = /^>\s/;
            while (i < len && rows[i].match(re)) {
              temp += "<p>" + rows[i].substring(2, rows[i].length) + "</p>";
              i++;
            }
            html += "<blockquote>" + temp + "</blockquote>";
            break;
          }
          case "* ": {
            temp = "";
            re = /^\*\s/;
            while (i < len && rows[i].match(re)) {
              temp += "<li>" + rows[i].substring(2, rows[i].length) + "</li>";
              i++;
            }
            html += "<ul>" + temp + "</ul>";
            break;
          }
          case rows[i].match(/^\d\.\s/) && rows[i].match(/^\d\.\s/)[0]: {
            temp = "";
            re = /^\d\.\s/;
            while (i < len && rows[i].match(re)) {
              temp += "<li>" + rows[i].substring(3, rows[i].length) + "</li>";
              i++;
            }
            html += "<ol>" + temp + "</ol>";
            break;
          }
          case "```": {
            temp = "";
            re = /^```$/;
            i++;
            while (i < len && !re.test(rows[i])) {
              temp += rows[i] + "\n";
              i++;
            }
            html += "<pre>" + temp + "</pre>";
            break;
          }
          case "---": {
            temp = "";
            re = /^---$/;
            html += "<hr />";
            break;
          }
          case rows[i].match(/^\|.*\|/) && rows[i].match(/^\|.*\|/)[0]: {
            temp = "";
            re = /^\|.*\|/;
            const thRe = /^\[th\]/;
            let arry, j, jlen;
            while (i < len && re.test(rows[i])) {
              arry = rows[i].split("|");
              temp += "<tr>";
              for (j = 1, jlen = arry.length - 1; j < jlen; j++) {
                if (thRe.test(arry[1])) {
                  temp += "<th>" + arry[j] + "</th>";
                } else {
                  temp += "<td>" + arry[j] + "</td>";
                }
              }
              temp += "</tr>";
              temp = temp.replace("[th]", "");
              i++;
            }
            html += "<table>" + temp + "</table>";
            break;
          }
          default: {
            break;
          }
        }
      } else {
        if (this.format(rows[i]) !== "&nbsp;") {
          html += "<p>" + this.format(rows[i]) + "</p>";
        }
      }
    }
    return html;
  },
  format: function (str) {
    str = str.replace(/\s/g, "&nbsp;");
    const bold = str.match(/\*{2}[^*].*?\*{2}/g); // 惰性匹配
    if (bold) {
      for (let i = 0, len = bold.length; i < len; i++) {
        str = str.replace(bold[i], "<b>" + bold[i].substring(2, bold[i].length - 2) + "</b>");
      }
    }

    const italic = str.match(/\*[^*].*?\*/g);
    if (italic) {
      for (let i = 0, len = italic.length; i < len; i++) {
        str = str.replace(italic[i], "<i>" + italic[i].substring(1, italic[i].length - 1) + "</i>");
      }
    }

    const code = str.match(/`.+`/g);
    if (code) {
      for (let i = 0, len = code.length; i < len; i++) {
        str = str.replace(code[i], "<code>" + code[i].substring(1, code[i].length - 1) + "</code>");
      }
    }

    const img = str.match(/!\[.*\]\(.*\)/g);
    const re1 = /\(.*\)/;
    const re2 = /\[.*\]/;
    if (img) {
      for (let i = 0, len = img.length; i < len; i++) {
        const url = img[i].match(re1)[0];
        const title = img[i].match(re2)[0];
        str = str.replace(img[i], "<img src=" + url.substring(1, url.length - 1) + " alt=" + title.substring(1, title.length - 1) + ">");
      }
    }

    const a = str.match(/\[.*\]\(.*\)/g);
    if (a) {
      for (let i = 0, len = a.length; i < len; i++) {
        const url = a[i].match(re1)[0];
        const title = a[i].match(re2)[0];
        str = str.replace(a[i], "<a href=" + url.substring(1, url.length - 1) + ">" + title.substring(1, title.length - 1) + "</a>");
      }
    }

    return str;
  },
  handleLevel: function(str, titleLevel, id, prevLevel, curLevel) {
    let html = "";
    str = str.substring(curLevel);
    if (curLevel > prevLevel) {
      html += `
      <div class="mr-${curLevel}">
        <label class="drop" for="${id}"><i class="image-${curLevel}"></i><${titleLevel}>${this.format(str)}</${titleLevel}></label>
        <input id="${id}" type="checkbox" checked="checked">
        <div>
      `;
    } else if (curLevel === prevLevel) {
      html += this.closeTags(1);
      html += `
      <div class="mr-${curLevel}">
        <label class="drop" for="${id}"><i class="image-${curLevel}"></i><${titleLevel}>${this.format(str)}</${titleLevel}></label>
        <input id="${id}" type="checkbox" checked="checked">
        <div>
      `;
    } else {
      if (curLevel !== 0) {
        html += this.closeTags(prevLevel - curLevel + 1);
        html += `
        <div class="mr-${curLevel}">
          <label class="drop" for="${id}"><i class="image-${curLevel}"></i><${titleLevel}>${this.format(str)}</${titleLevel}></label>
          <input id="${id}" type="checkbox" checked="checked">
          <div>
        `;
      } else {
        html += this.closeTags(prevLevel - curLevel + 2);
      }
    }
    return html;
  },
  levelMatch: function(str, level) {
    // level：缩进层级
    // levelFlag：添加标签类型：1是缩进类型，0是先补充关闭标签，不缩进类型；-1是根据层级添加关闭标签类型
    let levelFlag = 2;
    const levelstr = str.match(/^>*\s/) && str.match(/^>*\s/)[0];
    const prevLevel = level;
    if (levelstr) {
      const curLevel = levelstr.length - 1;
      if (curLevel > prevLevel) {
        levelFlag = 1;
      } else if (curLevel === prevLevel) {
        levelFlag = 0;
      } else if (curLevel < prevLevel) {
        levelFlag = -1;
      }
      level = curLevel;
    } else {
      levelFlag = 2;
      level = prevLevel;
    }
    return { levelFlag, level: level };
  },
  closeTags(level) {
    if (level === 10) {
      level = 0;
    }
    let str = "</div>";
    for (let index = 0; index < level; index++) {
      str += str;
    };
    return str;
  }
};
