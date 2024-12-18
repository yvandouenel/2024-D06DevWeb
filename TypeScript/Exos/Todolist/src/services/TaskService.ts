import TaskInterface from "../interfaces/TaskInterface";
import { PartialTaskWithId } from "../interfaces/TaskInterface";
import { Subject } from "rxjs";
export default class TaskService {
  private static endpoint: string = "http://localhost:3000/tasks";
  private static instance: TaskService;
  tasksSubjet = new Subject<TaskInterface[]>();
  private currentTasks: TaskInterface[] = [];
  /**
   * Le constructeur privé m'assure qu'aucune instance ne sera créée en dehors de la classe
   */
  private constructor() {
    // S'abonner au Subject pour maintenir currentTasks à jour
    this.tasksSubjet.subscribe((tasks) => {
      this.currentTasks = tasks;
    });
  }

  async createTask(partialTask: Omit<TaskInterface, "id">): Promise<void> {
    // Créer un ID temporaire
    const tempId = Date.now().toString();

    // Créer la nouvelle tâche avec l'ID temporaire
    const newTask: TaskInterface = {
      ...partialTask,
      id: tempId,
    };

    // Émettre immédiatement la nouvelle liste avec la tâche ajoutée
    this.emitTasks([...this.currentTasks, newTask]);

    try {
      // Faire la requête au serveur
      const response = await fetch(TaskService.endpoint, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(partialTask),
      });

      if (!response.ok) {
        throw new Error(
          "Erreur lors de la création. Statut : " + response.status
        );
      }

      // Recharger les tâches depuis le serveur pour avoir l'ID réel
      this.loadTasks();
    } catch (error) {
      console.error("Erreur lors de la création de la tâche:", error);
      // En cas d'erreur, revenir à la liste précédente
      this.emitTasks(this.currentTasks.filter((t) => t.id !== tempId));
      throw error;
    }
  }

  /**
   * Cette méthode renvoie une instance. Si il n'y avait
   * pas encore d'instance, elle la crée, sinon, elle revoie
   * celle qui est stockée dans ErrorService.instance
   * @returns ErrorService
   */
  static getInstance(): TaskService {
    if (!TaskService.instance) {
      TaskService.instance = new TaskService();
    }
    return TaskService.instance;
  }

  /**
   * Permet d'émettre des notification next de tasks
   * @param
   */
  emitTasks(tasks: TaskInterface[]) {
    this.tasksSubjet.next(tasks);
  }

  /**
   * Récupère le sujet en tant qu'observable pour s'y abonner
   * @returns
   */
  getTasksSubject() {
    return this.tasksSubjet.asObservable();
  }

  loadTasks(): void {
    // Utilisation de la fonction fetch qui utilise les promesses
    fetch(TaskService.endpoint)
      .then((response) => {
        if (response.status == 200) {
          // Cas favorable
          return response.json();
        } else
          throw new Error("Erreur du serveur. Statut : " + response.status);
      })
      .then((tasks) => {
        console.log(`tasks : `, tasks);
        this.emitTasks(tasks);
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
