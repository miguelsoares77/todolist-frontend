import { Component } from '@angular/core';
import { CommonModule } from '@angular/common';
import { RouterOutlet } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule } from '@angular/forms';
import { TaskListComponent } from './components/task-list/task-list';

@Component({
  selector: 'app-root',
  standalone: true,
  imports: [
    CommonModule, 
    RouterOutlet, 
    HttpClientModule, 
    FormsModule, 
    TaskListComponent
  ],
  template: `
    <app-task-list></app-task-list>
  `,
  styleUrl: './app.css'
})
export class App {
  title = 'todolist-frontend';
}