import { Subject } from "rxjs";
export default class ErrorService {
  private static instance: ErrorService;

  errorSubjet = new Subject<string>();

  /**
   * LE constructeur privé m'assure qu'aucune instance ne sera créée en dehors de la classe
   */
  private constructor() {}

  /**
   * Cette méthode renvoie une instance. Si il n'y avait
   * pas encore d'instance, elle la crée, sinon, elle revoie
   * celle qui est stockée dans ErrorService.instance
   * @returns ErrorService
   */
  static getInstance(): ErrorService {
    if (!ErrorService.instance) {
      ErrorService.instance = new ErrorService();
    }
    return ErrorService.instance;
  }

  /**
   * Permet d'émettre des notification next de message d'erreur
   * @param errorMessage
   */
  emitError(errorMessage: string) {
    this.errorSubjet.next(errorMessage);
  }

  /**
   * Récupère le sujet en tant qu'observable pour s'y abonner
   * @returns
   */
  getErrorSubject() {
    return this.errorSubjet.asObservable();
  }
}
