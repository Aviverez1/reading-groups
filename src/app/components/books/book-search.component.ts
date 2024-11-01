// book-search.component.ts
import { Component, OnInit } from '@angular/core';
import { FormControl } from '@angular/forms';
import { BooksService } from '../../services/books.service';
import { Book } from '../../models/book.interface';
import { debounceTime, distinctUntilChanged, switchMap } from 'rxjs/operators';

@Component({
  selector: 'app-book-search',
  templateUrl: './book-search.component.html',
  styleUrls: ['./book-search.component.css']
})
export class BookSearchComponent implements OnInit {
  searchControl = new FormControl('');
  books: Book[] = [];
  error: string = '';
  isLoading: boolean = false;

  constructor(private booksService: BooksService) {}

  ngOnInit() {
    this.setupSearchSubscription();
  }

  private setupSearchSubscription() {
    this.searchControl.valueChanges.pipe(
      debounceTime(300),
      distinctUntilChanged(),
      switchMap(query => {
        if (!query) return [];
        this.isLoading = true;
        return this.booksService.searchBooks(query);
      })
    ).subscribe({
      next: (books) => {
        this.books = books;
        this.error = '';
        this.isLoading = false;
      },
      error: (err) => {
        this.error = 'Error searching books. Please try again.';
        this.isLoading = false;
        console.error(err);
      }
    });
  }
}