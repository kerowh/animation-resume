
var css1 = `/* 
 * 面试官你好，我是王海
 * 只用文字作做我介绍太单调了
 * 我就用代码来介绍吧
 * 首先准备一些样式
 */
*{
    transition: all 1s;
}

html{
    background: #eee;
}

#code{
    border: 1px solid #aaa;
    padding: 16px
}

/*我需要一点代码高亮*/
    .token.selector{ color: #690; }
    .token.property{ color: #905; }

/*加一个呼吸效果*/
    #code{
        animation: breath 0.5s infinite alternate-reverse;
    }

/*现在正式开始*/

/*我需要一张白纸*/
   #code-wrapper{
        width: 50%; left: 0; position: fixed; 
        height: 100%;
    }

    #paper > .content {
        display: block;
    }

/* 于是我就可以在白纸上写字了，请看右边 */

 `
var css2 = `
    /* 接下来用一个优秀的库 marked.js
    * 把 Markdown 变成 HTML
    */


`

var md = `
# 自我介绍

我叫王海
1995 年 9 月出生
中国计量大学毕业
自学前端半年
希望应聘前端开发岗位

# 技能介绍

熟悉 JavaScript CSS

# 项目介绍

1. 轮播
2. 简历
3. canvas画板

# 联系方式

- QQ 380213949
- Email 380213949@qq.com
- 手机 17364524560

`

var css3 = `
/*
 * 这就是我的会动的简历
 * 谢谢观看
 */
`

writeCss('',css1,()=>{//结束了，接电话，做要做的事
    createPaper(()=>{
        writeMarkdown(md,()=>{
            writeCss(css1,css2,()=>{
                convertMarkdownToHtml(()=>{
                    writeCss(css1+css2,css3,()=>{
                        console.log('完成')
                    })
                })
            })
        })
    })
})


function writeCss(prefix, code, fn) {
    let domCode = document.querySelector('#code')
    domCode.innerHTML = prefix || ''
    let n = 0
    let id = setInterval(() => {
        n += 1
        domCode.innerHTML = Prism.highlight(prefix + code.substring(0, n), Prism.languages.css);
        styleTag.innerHTML = prefix + code.slice(0, n)
        /*没有滚动条之后，我们要自动帮他回滚，每加上一行代码，让代码往下走10000px */
        domCode.scrollTop = 10000
        if (n >= code.length) {
            window.clearInterval(id)
            console.log('我结束了')
            //打电话给对方
            fn.call()
        }
    }, 70)
}

function writeMarkdown(markdown, fn) {
    let domPaper = document.querySelector('#paper>.content')
    let n = 0
    let id = setInterval(() => {
        n += 1
        domPaper.innerHTML = markdown.substring(0, n)
        domPaper.scrollTop = 10000
        if (n >= markdown.length) {
            window.clearInterval(id)
            fn.call()
        }
    }, 70)
}

function convertMarkdownToHtml(fn) {
    var div = document.createElement('div')
    div.className = 'html markdown-body'
    div.innerHTML = marked(md)
    let markdownContainer = document.querySelector('#paper > .content')
    markdownContainer.replaceWith(div)
    fn.call()
}

  function createPaper(fn){
      var paper = document.createElement('div')
      paper.id = 'paper'
      var content = document.createElement('pre')
      content.className = 'content'
      paper.appendChild(content)
      document.body.appendChild(paper)
      fn.call()
  }
  