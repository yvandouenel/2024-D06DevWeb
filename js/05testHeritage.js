class PC {
  constructor(ram, processor, graphicalCard) {
    this.ram = ram;
    this.processor = processor;
    this.graphicalCard = graphicalCard;
  }
  start() {
    console.log(`Moi, pc de ${this.ram} ram, de processeur ${this.processor} et de carte graphiqe ${this.graphicalCard}, je m'allume`);
  }
  stop() {
    console.log(`Moi, pc de ${this.ram} ram, de processeur ${this.processor} et de carte graphiqe ${this.graphicalCard}, je m'éteins`);
  }
}


// Création des instances
const pc1 = new PC("16Go", "i9", "Nvidia GTX");

// Appel de la méthode (appel d'une fonction depuis une instance)
pc1.start();
pc1.stop();

// Création d'un classe laptop
class Laptop extends PC {
  constructor(ram, processor, graphicalCard, weight) {
    super(ram, processor, graphicalCard);
    this.weight = weight;
  }
  open() {
    console.log(`Comme je suis un portable, on peut m'ouvrir`);
  }
  // polymorphisme et / ou surcharge de méthode
  start() {
    // Appel de la méthode du parent
    super.start();
    // Ajout d'un comportement spécifique à Laptop sur la méthode start
    console.log(`... et je suis un portable`);
  }

}
// Création des instances
const laptop1 = new Laptop("32Go", "i7", "Nvidia GTX", 2);
console.log(`laptop1`, laptop1);
// Appel de la méthode (appel d'une fonction depuis une instance)
laptop1.start();
laptop1.stop();
laptop1.open();
