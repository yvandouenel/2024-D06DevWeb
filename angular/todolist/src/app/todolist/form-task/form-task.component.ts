import { Component, OnInit } from '@angular/core';
import {
  FormBuilder,
  FormGroup,
  Validators,
  ReactiveFormsModule,
} from '@angular/forms';

@Component({
  selector: 'digi-form-task',
  standalone: true,
  imports: [ReactiveFormsModule],
  templateUrl: './form-task.component.html',
  styleUrl: './form-task.component.css',
})
export class FormTaskComponent {
  addForm!: FormGroup;
  // Injection de dépendance. Ici l'instance fb de FormBuilder va pouvoir être utilisée dans toute la classe
  constructor(private fb: FormBuilder) {}

  ngOnInit() {
    this.addForm = this.fb.group({
      name: ['', [Validators.required]],
    });
  }
  onSubmit() {
    if (this.addForm.valid) {
      console.log('Tâche soumise :', this.addForm.value.name); // Ici, vous appelleriez normalement un service pour sauvegarder la nouvelle tâche en bd côté serveur
    }
  }
}
