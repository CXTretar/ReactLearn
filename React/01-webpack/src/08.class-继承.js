console.log('ok')

class Car {
    constructor (color, length){
        this.color = color
        this.length = length
    }
}

class Benz extends Car {
    // constructor (color, length){
    //     this.color = color
    //     this.length = length
    // }
}

const b1 = new Benz('red', 5)
console.log(b1)

class BWM extends Car {
    // constructor(color, length){
    //     this.color = color
    //     this.length = length
    // }
}

const b2 = new BWM('blue', 4.5)
console.log(b2)