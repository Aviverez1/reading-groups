// src/app/services/books.service.ts
import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable, map } from 'rxjs';
import { Book } from '../models/book.interface';
import { environment } from '../../environments/environment';

@Injectable({
  providedIn: 'root'
})
export class BooksService {
  private apiUrl = environment.booksApi.baseUrl;
  private apiKey = environment.booksApi.apiKey;

  constructor(private http: HttpClient) {}

  searchBooks(query: string): Observable<Book[]> {
    const params = {
      q: query,
      maxResults: '12',
      key: this.apiKey
    };

    return this.http.get<any>(`${this.apiUrl}/volumes`, { params }).pipe(
      map(response => {
        if (!response.items) return [];
        
        return response.items.map((item: any) => ({
          id: item.id,
          title: item.volumeInfo.title,
          authors: item.volumeInfo.authors || [],
          description: item.volumeInfo.description,
          publishedDate: item.volumeInfo.publishedDate,
          pageCount: item.volumeInfo.pageCount,
          imageLinks: item.volumeInfo.imageLinks,
          categories: item.volumeInfo.categories
        }));
      })
    );
  }

  getBookById(bookId: string): Observable<Book> {
    const params = {
      key: this.apiKey
    };

    return this.http.get<any>(`${this.apiUrl}/volumes/${bookId}`, { params }).pipe(
      map(item => ({
        id: item.id,
        title: item.volumeInfo.title,
        authors: item.volumeInfo.authors || [],
        description: item.volumeInfo.description,
        publishedDate: item.volumeInfo.publishedDate,
        pageCount: item.volumeInfo.pageCount,
        imageLinks: item.volumeInfo.imageLinks,
        categories: item.volumeInfo.categories
      }))
    );
  }
}