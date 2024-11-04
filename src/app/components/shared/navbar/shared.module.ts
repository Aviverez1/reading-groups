// shared.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { RouterModule } from '@angular/router';
import { GroupFormComponent } from '../group-form/group-form.component';
import { BookSearchComponent } from '../../books/book-search.component';
import { GroupCardComponent } from '../group-card/group-card.component';

@NgModule({
  declarations: [
    GroupFormComponent,
    BookSearchComponent,
    GroupCardComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    RouterModule
  ],
  exports: [
    GroupFormComponent,
    BookSearchComponent,
    ReactiveFormsModule,
    GroupCardComponent
  ]
})
export class SharedModule { }