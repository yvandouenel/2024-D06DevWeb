import TaskInterface from "../interfaces/TaskInterface";
import { PartialTaskWithId } from "../interfaces/TaskInterface";
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
    return fetch(TaskService.endpoint + "/" + id, {
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

  static patchTask(partialTask: PartialTaskWithId): Promise<TaskInterface> {
    // Utilisation de la fonction fetch qui utilise les promesses
    return fetch(TaskService.endpoint + "/" + partialTask.id, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(partialTask),
    })
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((data) => {
        console.log(`Task modifiée : `, data);
        return data;
      });
  }
}
