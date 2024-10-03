/**
 * 
 * @param {String} name 
 */
function Person(name) {
  this.name = name;
}
const toto = new Person("Toto");

/**
 * 
 * @param {String} name 
 */
function Bike(color, brand, type) {
  this.color = color;
  this.brand = brand;
  this.type = type;

  this.roll = function () {
    console.log(`Je suis un vélo qui roule`);
  }
}
const bike1 = new Bike("#FFFF00", "Super 73", "Tandem");
const bike2 = new Bike("#FFFFFF", "Btwin", "VTT");
const bike3 = new Bike("#000000", "Peugeot", "Course");

bike1.roll();