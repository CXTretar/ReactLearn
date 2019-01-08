
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

    say(){
        console.log('Animal class 实例方法')
    }

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