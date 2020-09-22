// 判断函数是否有指定的类名
export function addClass(el, className) {
    if (hasClass(el, className)) {
        return
    }
    let newClass = el.className.split('')
    newClass.push(className)
    el.className = newClass.join('')
}

export function hasClass(el, className) {
    let reg = new RegExp('(^|\\s)' + className + '(^\\s|$)')

    return reg.test(el.className)
}

// 获取元素属性值
export function getData(el, name, val) {
    const prefix = 'data-'
    name = prefix + name
    if (val) {
        return el.setAttribute(name, val)
    } else {
        return el.getAttribute(name)
    }
}

// 浏览器的能力检测
let elementStyle = document.createElement('div').style

// vendor供应商 判断为那个浏览器 返回其样式前缀
let vendor = (() => {
    let transformNames = {
        webkit: 'webkitTransform',
        Moz: 'MozTransform',
        O: 'OTransform',
        ms: 'msTransform',
        standard: 'transform'
    }

    for (const key in transformNames) {
        if (elementStyle[transformNames[key]] !== undefined) {
            return key
        }
    }

    return false
})()

// 根据不同浏览器 返回样式名称
export function prefixStyle(style) {
    if (vendor === false) {
        return false
    }

    if (vendor === 'standard') {
        return style
    }

    // charAt(index) 只截取index数字
    return vendor + style.charAt(0).toUpperCase() + style.substr(1)
}