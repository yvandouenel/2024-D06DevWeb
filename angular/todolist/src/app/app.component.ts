import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';
import { TodolistComponent } from './todolist/todolist.component';

// décorateur aves des annotation
@Component({
  // selector permet de sélectionner le custom-element qui est à la source de l'instanciation de notre composant - ici Appcomponent
  selector: 'digi-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule, TodolistComponent],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {}
