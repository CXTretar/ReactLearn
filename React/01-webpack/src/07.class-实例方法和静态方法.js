
function Person(name, age) {
    this.name = name
    this.age = age
}

Person.info = 'aaaa'

Person.prototype.say = function(){
    console.log('Person function 实例方法')
}

Person.talk = function(){
    console.log('Person function 静态方法')
}

const p1 = new Person('呵呵呵', 20)
console.log(p1)
// 通过 new 出来的实例，访问到的属性，叫做 【实例属性】
// console.log(p1.name)
// console.log(p1.age)
// 【静态属性】：通过 构造函数，直接访问到的属性，叫做静态属性；
console.log(Person.info)
p1.say()
Person.talk()

// 创建了一个动物类
// 注意1：在 class 的 { } 区间内，只能写 构造器、静态方法和静态属性、实例方法
// 注意2：class 关键字内部，还是用 原来的配方实现的；所以说，我们把 class 关键字，称作 语法糖；
class Animal {
    // 这是类中的 构造器
    // 每一个类中，都有一个构造器，如果我们程序员没有手动指定构造器，那么，可以认为类内部有个隐形的、看不见的 空构造器，类似于 constructor(){}
    // 构造器的作用，就是，每当 new 这个类的时候，必然会优先执行 构造器中的代码
    constructor(name, age){
        this.name = name
        this.age = age
    }
    // 在 class 内部，通过 static 修饰的属性，就是静态属性
    static info = 'cccc'
    // 在 class 内部，通过 static 修饰的属性，就是静态属性
    say(){
        console.log('Animal class 实例方法')
    }
    // 这是 动物 类的静态方法（今后用的不多）
    static talk(){
        console.log('Animal class 静态方法')
    }
}
const a1 = new Animal('OC', 3)
console.log(a1)
console.log(a1.name)
console.log(a1.age)
console.log(Animal.info)

a1.say()
Animal.talk()