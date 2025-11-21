import { Component, OnInit } from '@angular/core';
import { CommonModule, DatePipe } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { Task } from '../../models/task';
import { TaskService } from '../../services/task';

@Component({
  selector: 'app-task-list',
  standalone: true,
  imports: [CommonModule, FormsModule, DatePipe],
  templateUrl: './task-list.html',  // ← Nome correto do arquivo
  styleUrls: ['./task-list.css']    // ← Nome correto do arquivo
})
export class TaskListComponent implements OnInit {
  tasks: Task[] = [];
  newTask: Task = { title: '', description: '', completed: false, priority: 1 };

  constructor(private taskService: TaskService) { }

  ngOnInit(): void {
    this.loadTasks();
  }

  loadTasks(): void {
    this.taskService.getTasks().subscribe({
      next: (tasks) => {
        this.tasks = tasks;
        console.log('Tasks carregadas:', tasks);
      },
      error: (error) => console.error('Erro ao carregar tasks:', error)
    });
  }

  createTask(): void {
    if (this.newTask.title.trim()) {
      this.taskService.createTask(this.newTask).subscribe({
        next: (task) => {
          this.tasks.push(task);
          this.newTask = { title: '', description: '', completed: false, priority: 1 };
          console.log('Task criada:', task);
        },
        error: (error) => console.error('Erro ao criar task:', error)
      });
    }
  }

  toggleComplete(task: Task): void {
    if (task.id) {
      this.taskService.markAsCompleted(task.id).subscribe({
        next: (updatedTask) => {
          const index = this.tasks.findIndex(t => t.id === updatedTask.id);
          if (index !== -1) {
            this.tasks[index] = updatedTask;
          }
          console.log('Task atualizada:', updatedTask);
        },
        error: (error) => console.error('Erro ao atualizar task:', error)
      });
    }
  }

  deleteTask(id: number): void {
    this.taskService.deleteTask(id).subscribe({
      next: () => {
        this.tasks = this.tasks.filter(task => task.id !== id);
        console.log('Task deletada:', id);
      },
      error: (error) => console.error('Erro ao deletar task:', error)
    });
  }

  getPriorityClass(priority: number): string {
    switch (priority) {
      case 1: return 'priority-low';
      case 2: return 'priority-medium';
      case 3: return 'priority-high';
      default: return 'priority-low';
    }
  }

  getPriorityText(priority: number): string {
    switch (priority) {
      case 1: return 'Baixa';
      case 2: return 'Média';
      case 3: return 'Alta';
      default: return 'Baixa';
    }
  }
}