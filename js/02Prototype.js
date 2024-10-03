/**
 * 
 * @param {String} name 
 */
function Person(name) {
  this.name = name;
}
const toto = new Person("Toto");

/**
 * Fonction constructeur qui construit et renvoie des instances de Bike
 * @param {String} name 
 * @return {Bike} 
 */
function Bike(color, brand, type) {// paramètres
  // Propriétés directes
  this.color = color;
  this.brand = brand;
  this.type = type;

}
// Ajout de propriétés indirectes stockées dans le prototype de Bike
Bike.prototype.roll = function () {
  console.log(`Je suis un vélo de la marque ${this.brand} qui roule`);
}
//Bike.prototype.test = "test";

Object.prototype.test = "test dans le prototype d'Object";


// Instanciations d'objets Bike et assignation de ces objets à des variables
const bike1 = new Bike("#FFFF00", "Super 73", "Tandem");
const bike2 = new Bike("#FFFFFF", "Btwin", "VTT");
const bike3 = new Bike("#000000", "Peugeot", "Course");

// Les instances appellent des méthodes (des fonctions)
bike1.roll();
bike2.roll();

console.log(`bike1`, bike1);
// teste si la propriété roll est stocké au même endroit pour bike1 et bike2
if (bike1.roll == bike2.roll) {
  console.log(`roll pour bike 1 est égal à roll pour bike2`);
} else {
  console.log(`roll pour bike 1 n'est pas égal à roll pour bike2`);
}
console.log(bike1.test);