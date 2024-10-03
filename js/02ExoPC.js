function PC(ram, processor, graphicalCard) {
  this.ram = ram;
  this.processor = processor;
  this.graphicalCard = graphicalCard;
}
PC.prototype.start = function () {
  console.log(`Moi, pc de ${this.ram} ram, de processeur ${this.processor} et de carte graphiqe ${this.graphicalCard}, je m'allume`);
}
PC.prototype.stop = function () {
  console.log(`Moi, pc de ${this.ram} ram, de processeur ${this.processor} et de carte graphiqe ${this.graphicalCard}, je m'éteins`);
}

// Création des instances
const pc1 = new PC("16Go", "i9", "Nvidia GTX");

// Appel de la méthode (appel d'une fonction depuis une instance)
pc1.start();
pc1.stop();