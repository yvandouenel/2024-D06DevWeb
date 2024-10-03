{
  // SCOPE local
  // déclaration et assignation d'une valeur à la variable i. Le tout forme une instruction
  let i = 12;
  // Assignation par valeur avec typage (changement d'adresse) dynamique 
  i = 12;
  i = "qsdfqsdfqsdf";
  i = false;
  // Les 3 types primitifs les plus utilisés en js sont boolean, number et string
  // instruction pour afficher
  console.log("i = ", i, "type de i : ", typeof (i));
}
{
  // SCOPE local
  let i = "toto";
  console.log(`i : `, i);
}
// SCOPE global !!! DANGER DANGER  DANGER
let i = "toto";
console.log(`i : `, i);


