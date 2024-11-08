// book-details.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { Book } from '../../../models/book.interface';

@Component({
  selector: 'app-book-details',
  template: 'book-details.component.html',
  styleUrls: ['./book-details.component.css']
})
export class BookDetailsComponent {
  @Input() book!: Book;
  @Output() onClose = new EventEmitter<void>();

  close() {
    this.onClose.emit();
  }
}