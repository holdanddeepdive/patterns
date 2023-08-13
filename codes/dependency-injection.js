// Related: Singleton pattens

class Hamburgers {
    constructor (size, number) {
        this.size = size;
        this.number = number;
    }

    ask() {
        return `${this.number} ${this.size} Hamburgers Please?`;
    }
}

// Before
class Order {
   ask (size, number) {
       return new Hamburgers(size, number).ask();
   }
}

// After
class Hamburgers2 {
    constructor(size) {
        this.size = size;
    }

    ask (number) {
        return `${number} ${this.size} Hamburgers Please?`;
    }
}
class Order2 {
    constructor(hamburger) {
        this.hamburger = hamburger;
    }

    ask (number) {
        return this.hamburger.ask(number);
    }
}

function main() {
    // Before
    const order = new Order();
    console.log(order.ask('Big', 2));

    // Dependency Injection
    const order2 = new Order2(new Hamburgers2('Big'));
    console.log(order2.ask(2));

    // Open Close Principle
    // const order3 = new Order2(new Clothes('Big'));
}

main();