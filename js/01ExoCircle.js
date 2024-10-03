// Fonction constructeur
function Circle(radius, name) {// paramètres
  // Propriétés
  this.radius = radius;
  this.name = name;
}


// Dans la méthode area, this représente l'instance qui appelle area() (ici soit smallCircle soit bigCircle)
Circle.prototype.area = function () {
  console.log(`this dans area`, this);
  return this.pi * this.radius * this.radius;
}

Circle.prototype.pi = 3.14

const smallCircle = new Circle(2, "small circle");
const bigCircle = new Circle(4, "big circle");
const areaSmallCircle = smallCircle.area();
const areaBigCircle = bigCircle.area();
console.log(`Aire de smallCircle : `, areaSmallCircle);
console.log(`Aire de bigCircle : `, areaBigCircle);

