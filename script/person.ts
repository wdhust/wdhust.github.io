class Person {
    private _name: string;

    constructor(name: string) {
        this._name = name;
    }

    sayHello(times:number) {
        return `Hello, I am ${this._name}, greeting ${times} times`;
    }
}

export { Person };