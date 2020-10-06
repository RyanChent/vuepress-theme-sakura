// 处理复制函数
const addCopy = (e, author='JarryChen') => {
    e.preventDefault()
    let copyTxt = ''
    copyTxt = window.getSelection(0).toString()
    copyTxt = `${copyTxt}\n作者：${author}\n原文：${window.location.href}\n著作权归作者所有。商业转载请联系作者获得授权，非商业转载请注明出处。`
    const clipboardData = e.clipboardData || window.clipboardData
    clipboardData.setData('text', copyTxt)
}

const check = () => {
    console.clear && console.clear()
    function doCheck(a) {
        if (("" + a / a)["length"] !== 1 || a % 20 === 0) {
            (function () { }
            ["constructor"]("debugger")())
        } else {
            (function () { }
            ["constructor"]("debugger")())
        }
        doCheck(++a)
    }
    try {
        doCheck(0)
    } catch (err) {
        console.clear && console.clear()
    }
}

// 转换时间工具类
export function parseTime(time, cFormat) {
    if (arguments.length === 0) {
        return null
    }
    const format = cFormat || '{y}-{m}-{d} {h}:{i}'
    let date
    if (typeof time === 'object') {
        date = time
    } else {
        if ((typeof time === 'string') && (/^[0-9]+$/.test(time))) {
            time = parseInt(time)
        }
        if ((typeof time === 'number') && (time.toString().length === 10)) {
            time = time * 1000
        }
        date = new Date(time)
    }
    const formatObj = {
        y: date.getFullYear(),
        m: date.getMonth() + 1,
        d: date.getDate(),
        h: date.getHours(),
        i: date.getMinutes(),
        s: date.getSeconds(),
        a: date.getDay()
    }
    const time_str = format.replace(/{(y|m|d|h|i|s|a)+}/g, (result, key) => {
        let value = formatObj[key]
        // Note: getDay() returns 0 on Sunday
        if (key === 'a') {
            return ['日', '一', '二', '三', '四', '五', '六'][value]
        }
        if (result.length > 0 && value < 10) {
            value = '0' + value
        }
        return value || 0
    })
    return time_str
}

// 复制内容工具函数
export function copy(author) {
    document.addEventListener('cut', e => {
        addCopy(e, author)
    })
    document.addEventListener('copy', e => {
        addCopy(e, author)
    })
}

// 调整滚动条
export function handleScrollBar(height) {
    const progressbar = document.getElementById('progressbar');
    const totalHeight = document.body.scrollHeight - window.innerHeight;
    let debounce = null
    window.onscroll = () => {
        clearTimeout(debounce)
        const progressHeight = (window.pageYOffset / totalHeight) * 100;
        progressbar.style.height = `${progressHeight}%`;
        debounce = setTimeout(() => {
            if (typeof height === 'number') {
                const left = document.getElementsByClassName('table-of-contents')[0]
                const right = document.getElementsByClassName('right-options')[0]
                // const leftad = document.getElementsByClassName('_odsrpenqjm')[0]
                if (left) {
                    if (window.innerWidth >= 1920 * 0.85)
                        left.className = 'table-of-contents' + (window.pageYOffset * 1.1 >= height ? ' fixed-layout' : ' absolute-layout')
                    else
                        left.className = 'table-of-contents'
                }

                if (right) {
                    if (window.innerWidth >= 1920 * 0.75)
                        right.className = 'right-options' + (window.pageYOffset * 1.1 >= height ? ' right-options-fixed' : ' right-options-abs')
                    else
                        right.className = 'right-options'
                }

                // if (leftad) {
                //     leftad.className = '_odsrpenqjm' + (window.pageYOffset * 1.1 >= height ? ' left-ads-fixed' : ' left-ads-abs')
                // }
            }
        }, 400)
    };
}

// 加载js脚本函数
export function loadScript(uri, asyncScript = true) {
    const script = document.createElement('script');
    script.type = 'text/javascript';
    script.src = uri;
    script.async = asyncScript
    document.body.append(script);
    return script;
}

export function keyDown() {
    check()
    setInterval(check, 5000)
}

