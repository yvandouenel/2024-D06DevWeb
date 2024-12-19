import { Component, Input } from '@angular/core';
import { CommonModule } from '@angular/common';
import { TaskInterface } from '../../../interfaces/TaskInterface';

@Component({
  selector: 'digi-task',
  standalone: true,
  imports: [CommonModule],
  templateUrl: './task.component.html',
  styleUrl: './task.component.css',
})
export class TaskComponent {
  @Input() task!: TaskInterface;
  handleCheck(clickedTask: TaskInterface) {
    this.task.done = !this.task.done;
  }
}
