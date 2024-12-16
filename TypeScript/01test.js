"use strict";
{
    // Typage par inférence : la première valeur assignée donne le type définitif de la variable
    let test = "Hello World!";
    test = "true";
    console.log(`Hello World`);
    let fruits = ["Banane", "Cerise"];
    // Tuples
    const point = [12.3, 54.23];
    let contact = ["Bob", 12, false];
    // Enumération
    let Color;
    (function (Color) {
        Color[Color["white"] = 0] = "white";
        Color[Color["blue"] = 1] = "blue";
        Color[Color["red"] = 2] = "red";
    })(Color || (Color = {}));
    let c = Color.blue;
    console.log(`Color.blue`, Color[c]);
    // any : comme le js - mauvaise pratique
    let test2 = 4;
    test2 = "Message";
    // Fonction
    function testFunction(msg) {
        console.log(`Test ${msg}`);
    }
    testFunction("message");
    const toto = {
        firstname: "toto",
        lastname: "Lajoie",
    };
    // titi implémente l'interface People
    /* const titi: PeopleWithNationality = {
      firstname: "titi",
      lastname: "Durand",
      nationality: "Fr",
      presentMySelf: function () {
        console.log(`Hello, je m'appelle ${this.firstname}`);
      },
    };
    titi.presentMySelf(); */
    class People {
        constructor(firstname, lastname) {
            this.firstname = firstname;
            this.lastname = lastname;
        }
        presentMySelf() {
            console.log(`Hello, je m'appelle ${this.firstname}`);
        }
    }
    // Instanciation
    const p1 = new People("Christophe", "Arnaud");
    // Appelle de la méthode
    p1.presentMySelf();
    class NameChecker {
        check(s) {
            return s.toLowerCase() === "ok";
        }
        doubleCheck(msg) {
            return msg.toUpperCase() === "ok";
        }
    }
    const nm = new NameChecker();
    console.log(nm.check("ok"));
    const dependencies = { name: "Bob", age: "24" };
    function updateTodo(todo, fieldsToUpdate) {
        // spread operator
        return Object.assign(Object.assign({}, todo), fieldsToUpdate);
    }
    const todo1 = {
        title: "organize desk",
        description: "clear clutter",
    };
    const todo2 = updateTodo(todo1, { description: "Test" });
    console.log(todo2);
    const objectByDefault = {
        name: "Toto",
        lastname: "Durand",
    };
    const objPartial = {
        lastname: "Dupond",
        age: 12,
    };
    const finalObj = Object.assign(Object.assign({}, objectByDefault), objPartial);
    console.log(`finalObj`, finalObj);
    const todo = {
        title: "Clean room",
        completed: false,
        createdAt: 1615544252770,
    };
}
