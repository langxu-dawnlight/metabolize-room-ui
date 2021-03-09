const { property } = require("lodash")
const { delete, delete, delete, delete } = require("vue/types/umd")

function new1(func) {
    let obj = {}
    if(func.prototype !== null) {
        obj.__proto__ = func.prototype
    }
    let res = func.apply(obj, Array.prototype.slice(arguments, 1))
    if((typeof res === 'object' || typeof res === 'function') && typeof res !== null ) {
        return res
    }
    return obj
}

function check(reg, text) {
    return reg.test(text)
}

function currying(reg) {
    return function(text) {
        return reg.test(text)
    }
}

var hasNumber = currying('/\d+/g')

hasNumber('323')

Function.prototype.call2 = function(context, ...arg) {
    context = context || window

    let fnSYmbol = Symbol('fn')
    context[fnSYmbol] = this
    context[fnSYmbol](...arg)

    delete context[fnSYmbol]
}

Function.prototype.apply2 = function(context , argsArr) {
    context = context || window

    let fnSymbol = Symbol('fn')

    context[fnSymbol] = this
    context[fnSymbol](...argsArr)

    delete context[fnSymbol]
}

Function.prototype.bind2 = function(context, ...arg) {
    context = context || window
    const fnSymbol = Symbol('fn')

    context[fnSymbol] = this
    return function(..._arg) {
        let args = arg.concat(__arg)
        context[fnSymbol](args)
        delete context[fnSymbol]
    }
}

Function.prototype.bind3 = function(context) {
    let args = Array.prototype.slice.call(arguments, 1)
    let _this = this
    return function(){
        let args = args.concat(...arguments) 
        _this.apply(context, args)
    }
}


//组合继承

function Parent(val) {
    this.val = val
}

Parent.prototype.getVal = function() {
    console.log(this.val)
}


function Child(val){
    Parent.call(this, val)
}

Child.prototype = new Parent()


var child = new Child(11)

child.getVal()

// 在子类中的构造函数中通过call来继承父类的属性, 然后改变子类的原型为父类的实例来继承父类的方法

// 寄生组合继承

Child.prototype = Object.create(Parent.prototype,{
    Constructor: {
        value: Child,
        enumerable: false,
        writable: true,
        configurable: true
    }
})

let onWatch = (obj, setBind, getLogger) => {
    return new Proxy(obj, {
        get(target, property, receiver) {
            getLogger(target, property)
            return Reflect.get(target, property, receiver)
        },
        set(target, property, value, receiver) {
            setBind(value,property )
            return Reflect.set(target, property, value)
        }
    })
}

var obj = {
    a: 1
}

var p = onWatch(obj, (v, property) => {
    console.log(`监听到属性${property}改变为${v}`)
}, (target, property) =>{
    console.log(`${property}=${target}`)
})

Object.prototype.myMap = function(fn){
    return this.reduce((acc, current) => {
         acc.push(fn(current))
         return acc
    },[])
}

Function.prototype.myBind3 = function(context){
    context = context || window
    const fn = Symbol('fn')
    context[fn] = this
    let args = Object.prototype.slice(arguments, 1)
    return function(){
        args = args.concat(...arguments)
        context[fn](...args)
        delete context[fn]
    }
}

//new
function create(fn){
    let obj = {}
    let args = Object.prototype.slice(arguments, 1)
    obj.__proto__ = fn.prototype
    let res = fn.apply(obj, args)
    if(typeof res === 'object') return res
    return obj
}

function myInstanceOf(instance, target) {
    let prototype = target.prototype
    let proto = instance.__proto__
    while(true) {
        if(proto === null) return false
        if(proto === prototype) return true
        proto = proto.__proto__
    }
}