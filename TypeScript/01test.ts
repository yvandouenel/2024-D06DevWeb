{
  // Typage par inférence : la première valeur assignée donne le type définitif de la variable
  let test = "Hello World!";
  test = "true";
  console.log(`Hello World`);

  let fruits: string[] = ["Banane", "Cerise"];
  // Tuples
  const point: [number, number] = [12.3, 54.23];
  let contact: [string, string | number, boolean] = ["Bob", 12, false];

  // Enumération
  enum Color {
    white,
    blue,
    red,
  }
  let c: Color = Color.blue;
  console.log(`Color.blue`, Color[c]);

  // any : comme le js - mauvaise pratique
  let test2: any = 4;
  test2 = "Message";

  // Fonction
  function testFunction(msg: string): void {
    console.log(`Test ${msg}`);
  }
  testFunction("message");

  // Alias de type
  type Person = {
    firstname: string;
    lastname: string;
  };
  const toto: Person = {
    firstname: "toto",
    lastname: "Lajoie",
  };

  // Interface
  interface PeopleInterface {
    firstname: string;
    lastname: string;
    presentMySelf: () => void;
  }
  interface PeopleWithNationalityInterface extends People {
    nationality: string;
  }
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

  class People implements PeopleInterface {
    firstname: string;
    lastname: string;
    constructor(firstname: string, lastname: string) {
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
}
