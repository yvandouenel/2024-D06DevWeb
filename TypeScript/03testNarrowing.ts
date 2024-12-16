// la méthode getElementById renvoie un HTMLElement ou null
const btn: HTMLElement | null = document.getElementById("btn");

// Je fais du rétrécissement pour indiquer plus précisément le type de l'élément du DOM (ici HTMLInputElement )
const input = document.getElementById("input") as HTMLInputElement | null;

btn?.addEventListener("click", () => {
  console.log(`Boutton cliqué`);
  // Narrowing
  if (input) input.value = "100";
});

// Création d'une interface TaskInterface
interface TaskInterface {
  id: string;
  title: string;
  done: boolean;
}

class Test {
  tasks!: TaskInterface[];
  constructor(tasks: TaskInterface[]) {
    this.tasks = tasks;
  }
}
const test = new Test([
  { id: "qsdf", title: "Titre de la tâche", done: true },
  { id: "fgururuy", title: "Titre de la tâche 2", done: true },
]);
