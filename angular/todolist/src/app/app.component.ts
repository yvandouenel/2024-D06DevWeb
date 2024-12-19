import { Component } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { CommonModule } from '@angular/common';

// décorateur aves des annotation
@Component({
  // selector permet de sélectionner le custom-element qui est à la source de l'instanciation de notre composant - ici Appcomponent
  selector: 'digi-root',
  standalone: true,
  imports: [RouterOutlet, CommonModule],
  templateUrl: './app.component.html',
  styleUrl: './app.component.css',
})
export class AppComponent {
  title = 'Ma magnifique todolist';
  color = 'blue';
  tasks = [
    {
      id: 1,
      name: 'Faire la vaisselle',
      done: false,
      comment:
        'Dépêche toi mon lapin, je ne supporte pas de voir traîner la vaisselle',
    },
    {
      id: 2,
      name: 'Faire le ménage',
      done: true,
    },
  ];
  test() {
    return false;
  }
}
