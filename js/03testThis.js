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
  console.log(`this dans Bike`, this);
}
// Ajout de propriétés indirectes stockées dans le prototype de Bike
Bike.prototype.roll = function () {
  console.log(`this dans roll`, this);
  console.log(`Je suis un vélo de la marque ${this.brand} qui roule`);
}

// Instanciations d'objets Bike et assignation de ces objets à des variables
const bike1 = new Bike("#FFFF00", "Super 73", "Tandem");
bike1.roll()
console.log(this);