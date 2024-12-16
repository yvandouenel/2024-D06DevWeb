"use strict";
class Base {
    constructor() {
        this._x = 12;
    }
    get x() {
        console.log("dans le getter");
        // j'applique un coef de 1.2
        return this._x * 1.2;
    }
    set x(value) {
        console.log("dans le setter");
        this._x = value;
    }
}
const b = new Base();
// Quand il s'agit de récupérer la valeur, alors on passe automatiquement par le getter
console.log(`b.x :`, b.x);
// Assignation de x en passant par le setter
b.x = 598;
console.log(`b.x :`, b.x);
