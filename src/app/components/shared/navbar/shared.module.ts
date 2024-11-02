// src/app/shared/shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { BookSearchComponent } from '../../books/book-search.component';

@NgModule({
  declarations: [
    BookSearchComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule
  ],
  exports: [
    BookSearchComponent,
    ReactiveFormsModule
  ]
})
export class SharedModule { }