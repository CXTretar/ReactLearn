console.log('ok')

class Car {
    constructor (color, length){
        this.color = color
        this.length = length
    }
    driveCar() {
        console.log('开了' + this.length + '米')
    }
}

class Benz extends Car {
    // constructor (color, length){
    //     this.color = color
    //     this.length = length
    // }
}

const b1 = new Benz('red', 5)
b1.driveCar()
console.log(b1)

class BWM extends Car {
    constructor(name, age, owner){
        super(name, age)
        this.owner = owner
    }
}

const b2 = new BWM('blue', 4.5, '张三')
b2.driveCar()
console.log(b2)