import { Component, OnInit, ViewChild, ElementRef, AfterViewInit } from '@angular/core';
import { ToDoItem, ToDoService } from '../to-do.service';

@Component({
  selector: 'app-to-do-list',
  templateUrl: './to-do-list.component.html',
  styleUrls: ['./to-do-list.component.css']
})
export class ToDoListComponent implements OnInit, AfterViewInit {
  items: ToDoItem[] = [];
  newTask: string = '';
  newDescription: string = '';
  newPriority: number = 1;
  editingItem: ToDoItem | null = null;

  pageSize: number = 5;
  currentPage: number = 1;
  totalPages: number = 0;
  paginatedItems: ToDoItem[] = [];

  @ViewChild('taskInput') taskInputRef!: ElementRef;

  constructor(private todoService: ToDoService) { }

  ngOnInit(): void {
    this.loadItems();
  }

  ngAfterViewInit(): void {
    this.taskInputRef.nativeElement.focus();
  }

  loadItems(): void {
    this.items = this.todoService.getItems();
    this.updatePagination();
  }

  addTask(): void {
    if (this.newTask.trim() && this.newDescription.trim() && this.newPriority > 0) {
      this.todoService.addItem(this.newTask.trim(), this.newDescription.trim(), this.newPriority);
      this.newTask = '';
      this.newDescription = '';
      this.newPriority = 1;
      this.loadItems();
      this.taskInputRef.nativeElement.focus();
    }
  }

  startEdit(item: ToDoItem): void {
    this.editingItem = { ...item };
  }

  saveEdit(): void {
    if (this.editingItem && this.editingItem.task.trim() && this.editingItem.description.trim()) {
      this.todoService.updateItem(this.editingItem);
      this.editingItem = null;
      this.loadItems();
    }
  }

  cancelEdit(): void {
    this.editingItem = null;
  }

  deleteItem(id: number): void {
    this.todoService.deleteItem(id);
    this.loadItems();
  }

  updatePagination(): void {
    this.totalPages = Math.ceil(this.items.length / this.pageSize);
    const start = (this.currentPage - 1) * this.pageSize;
    const end = start + this.pageSize;
    this.paginatedItems = this.items.slice(start, end);
  }

  goToPage(page: number): void {
    if (page >= 1 && page <= this.totalPages) {
      this.currentPage = page;
      this.updatePagination();
    }
  }

  getPageNumbers(): number[] {
    return Array(this.totalPages).fill(0).map((x, i) => i + 1);
  }
}