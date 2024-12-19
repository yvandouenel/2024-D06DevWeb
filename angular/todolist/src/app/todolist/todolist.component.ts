import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInterface } from '../../interfaces/TaskInterface';
import { TaskComponent } from './task/task.component';
import { FormTaskComponent } from './form-task/form-task.component';

@Component({
  selector: 'digi-todolist',
  standalone: true,
  imports: [CommonModule, TaskComponent, FormTaskComponent],
  templateUrl: './todolist.component.html',
  styleUrl: './todolist.component.css',
})
export class TodolistComponent {
  title = 'Ma magnifique todolist';
  color = 'blue';
  tasks: TaskInterface[] = [
    {
      id: '1',
      name: 'Faire la vaisselle',
      done: false,
      comment:
        'Dépêche toi mon lapin, je ne supporte pas de voir traîner la vaisselle',
    },
    {
      id: '2',
      name: 'Faire le ménage',
      done: true,
    },
  ];
  handleSubmited(taskName: string) {
    console.log(`Récupération de la valeur soumise : `, taskName);
    const newTask = {
      id: new Date().toString(),
      name: taskName,
      done: false,
    };
    // Ajout de cette nouvelle tâche à tasks (tableau de tâches)
    this.tasks.push(newTask);
  }
}
