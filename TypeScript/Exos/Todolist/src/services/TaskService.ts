import TaskInterface from "../interfaces/TaskInterface";
export default class TaskService {
  private static endpoint: string = "http://localhost:3000/tasks";

  static loadTasks(): Promise<TaskInterface[]> {
    // Utilisation de la fonction fetch qui utilise les promesses
    return fetch(TaskService.endpoint)
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((data) => {
        console.log(`Data : `, data);
        return data;
      })
      .catch((error) => {
        console.error(`Erreur attrapée : ${error}`);
      });
  }
  static deleteTask(id: string): Promise<TaskInterface> {
    // Utilisation de la fonction fetch qui utilise les promesses
    return fetch(TaskService.endpoint + "/qsdf" + id, {
      method: "DELETE",
    })
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((data) => {
        console.log(`Task supprimée : `, data);
        return data;
      });
  }
}
