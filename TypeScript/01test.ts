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

  interface Checkable {
    check(name: string): boolean;
    doubleCheck(name: string): boolean;
  }

  class NameChecker implements Checkable {
    check(s: string) {
      return s.toLowerCase() === "ok";
    }
    doubleCheck(msg: string) {
      return msg.toUpperCase() === "ok";
    }
  }
  const nm = new NameChecker();
  console.log(nm.check("ok"));

  const dependencies: Record<string, string> = { name: "Bob", age: "24" };

  // Partial
  interface Todo {
    title: string;
    description: string;
  }
  function updateTodo(todo: Todo, fieldsToUpdate: Partial<Todo>) {
    // spread operator
    return { ...todo, ...fieldsToUpdate };
  }
  const todo1: Todo = {
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
  const finalObj = { ...objectByDefault, ...objPartial };
  console.log(`finalObj`, finalObj);

  // Omit
  interface TodoList {
    title: string;
    description: string;
    completed: boolean;
    createdAt: number;
  }

  type TodoPreview = Omit<TodoList, "description">;

  const todo: TodoPreview = {
    title: "Clean room",
    completed: false,
    createdAt: 1615544252770,
  };
}
