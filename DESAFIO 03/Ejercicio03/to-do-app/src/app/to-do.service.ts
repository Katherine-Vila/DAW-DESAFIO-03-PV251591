import { Injectable } from '@angular/core';

export interface ToDoItem {
  id: number;
  task: string;
  description: string;
  priority: number;
  completed: boolean;
}

@Injectable({
  providedIn: 'root'
})
export class ToDoService {
  private key = 'to-do-list';
  private items: ToDoItem[] = [];

  constructor() {
    this.loadItems();
  }

  private loadItems(): void {
    const storedItems = localStorage.getItem(this.key);
    if (storedItems) {
      this.items = JSON.parse(storedItems);
    } else {
      this.createInitialItems();
    }
  }

  private createInitialItems(): void {
    const initialItems: ToDoItem[] = [];
    for (let i = 1; i <= 20; i++) {
      initialItems.push({
        id: Date.now() + i,
        task: `Tarea de ejemplo #${i}`,
        description: `Esta es la descripción de la tarea #${i}.`,
        priority: Math.floor(Math.random() * 5) + 1, // Genera una prioridad aleatoria (1-5)
        completed: false,
      });
    }
    this.items = initialItems;
    this.saveItems();
  }

  private saveItems(): void {
    localStorage.setItem(this.key, JSON.stringify(this.items));
  }

  getItems(): ToDoItem[] {
    return [...this.items].sort((a, b) => a.priority - b.priority);
  }

  addItem(task: string, description: string, priority: number): void {
    const newItem: ToDoItem = {
      id: Date.now(),
      task,
      description,
      priority,
      completed: false,
    };
    this.items.push(newItem);
    this.saveItems();
  }

  updateItem(updatedItem: ToDoItem): void {
    const index = this.items.findIndex(item => item.id === updatedItem.id);
    if (index !== -1) {
      this.items[index] = updatedItem;
      this.saveItems();
    }
  }

  deleteItem(id: number): void {
    this.items = this.items.filter(item => item.id !== id);
    this.saveItems();
  }
}