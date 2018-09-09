define(["require", "exports"], function (require, exports) {
    "use strict";
    Object.defineProperty(exports, "__esModule", { value: true });
    var Person = /** @class */ (function () {
        function Person(name) {
            this._name = name;
        }
        Person.prototype.sayHello = function (times) {
            return "Hello, I am " + this._name + ", greeting " + times + " times";
        };
        return Person;
    }());
    exports.Person = Person;
});
//# sourceMappingURL=person.js.map