// src/app/components/group-create/group-create.component.ts
import { Component } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { FirebaseService } from '../../services/firebase.service';
import { getAuth } from 'firebase/auth';
import { Book } from '../../models/book.interface';

@Component({
  selector: 'app-group-create',
  templateUrl: './group-create.component.html',
  styleUrls: ['./group-create.component.css']
})
export class GroupCreateComponent {
  groupForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  showBookSearch = false;
  selectedBook: Book | null = null;

  weekDays = [
    'Monday', 'Tuesday', 'Wednesday', 'Thursday',
    'Friday', 'Saturday', 'Sunday'
  ];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.groupForm = this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      meetingDay: [''],
      meetingTime: [''],
      maxMembers: [null, [Validators.min(2)]],
      tags: ['']
    });
  }

  openBookSearch() {
    this.showBookSearch = true;
  }

  onBookSelected(book: Book) {
    this.selectedBook = book;
    this.showBookSearch = false;
  }

  onBookSearchCancelled() {
    this.showBookSearch = false;
  }

  async onSubmit() {
    if (this.groupForm.invalid) return;

    this.loading = true;
    this.error = '';

    try {
      const auth = getAuth();
      const user = auth.currentUser;

      if (!user) {
        throw new Error('Must be logged in to create a group');
      }

      const groupData = {
        ...this.groupForm.value,
        adminId: user.uid,
        memberIds: [user.uid],
        memberEmails: [user.email], 
        memberCount: 1,
        createdAt: new Date(),
        currentBook: this.selectedBook ? {
          id: this.selectedBook.id,
          title: this.selectedBook.title,
          imageUrl: this.selectedBook.imageLinks?.thumbnail || null
        } : null,
        coverImage: this.selectedBook?.imageLinks?.thumbnail || null,
        tags: this.groupForm.value.tags
          ? this.groupForm.value.tags.split(',').map((tag: string) => tag.trim())
          : []
      };

      await this.firebaseService.addDocument('groups', groupData);
      this.router.navigate(['/groups']);

    } catch (error: any) {
      console.error('Error creating group:', error);
      this.error = error.message || 'Error creating group';
    } finally {
      this.loading = false;
    }
  }
}