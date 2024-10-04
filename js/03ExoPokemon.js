class Pokemon {
  constructor(name, weight) {
    this.name = name;
    this.weight = weight;
  }
  attack() {
    return this.weight * 10;
  }
  attackAgainst(otherPokemon) {
    if (this.attack() * Math.random() > otherPokemon.attack() * Math.random()) {
      console.log(`${this.name} a gagné face à ${otherPokemon.name}`);
    } else {
      console.log(`${this.name} a perdu face à ${otherPokemon.name}`);
    }
  }
}
class PokemonFire extends Pokemon {
  constructor(name, weight, attackBurn) {
    super(name, weight);
    this.attackBurn = attackBurn;
  }
  attack() {
    return super.attack() + this.attackBurn;
  }

}

const tadmorv = new Pokemon("Tadmorv", 100);
const dracaufeu = new PokemonFire("Dracaufeu", 150, 30);

console.log(`tadmorv`, tadmorv);
console.log(`dracaufeu`, dracaufeu);
console.log(`attaque de tadmorv`, tadmorv.attack());
console.log(`attaque de dracaufeu`, dracaufeu.attack());
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
tadmorv.attackAgainst(dracaufeu);
