/**
 * 
 * @param {String} css 样式内容
 * @param {String} vw 把px替换成vw
 * @returns 转化后的样式内容
 */
function handlerCss (css, vw) {
    let res = css;

    // .*?\{[^\}]+\}
    const matchs = css.match(/.*?(?<=\{)[^}]*(?=\})/g);

    if (matchs) {
            for (let i = 0; i < matchs.length; i++) {
                const item = matchs[i];

                const tmp = item.replace(/( | -)(\d+)px/g, `$1($2 / ${vw})`);
                res = res.replace(item, tmp);
            }
    }

    return res;
}

/**
 * 查找括号的范围
 * @param {String} content 匹配的内容
 * @param {Number} start 大括号开始位置
 * @returns Number 大括号结束位置
 */
function getBraceRange(content, start) {
    let left = 1;

    for (let i = start; i < content.length; i++) {
        const char = content[i];
        
        if (char == '{') {
            left++;
        } else if (char == '}') {
            left--;
        }

        if (left == 0) {
            return i;
        }
    }
}

module.exports = function (content) {
    // top left right bottom font-size width height border-radius

    // 处理@media里面的内容
    const mediaRegExp = new RegExp(`@media(.+)\\(max-width:[ ](${this.query.mobileWidth})\\)[ ]\\{[^\\}]+\\}`, 'g');
    const matchs = content.match(mediaRegExp);

    if (matchs) {
        for (let i = 0; i < matchs.length; i++) {
            let ele = matchs[i];
            // 查找大括号的范围
            const startIndex = content.indexOf(ele) + ele.indexOf('{') + 1;
            const endIndex = getBraceRange(content, startIndex);

            const tmpStr = content.substring(startIndex - 1, endIndex + 1);
            
            content = content.replace(tmpStr, handlerCss(tmpStr, this.query.mobile))
        }
    }

    const res = handlerCss(content, this.query.pc);

    return res;
}