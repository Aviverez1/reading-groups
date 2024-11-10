// group-form.component.ts
import { Component, Input, Output, EventEmitter, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { Router } from '@angular/router';
import { getAuth } from 'firebase/auth';
import { Book } from '../../../models/book.interface';
import { ReadingGroup } from '../../../models/reading-group.interface';
import { FirebaseService } from '../../../services/firebase.service';

@Component({
  selector: 'app-group-form',
  templateUrl: './group-form.component.html',
  styleUrls: ['./group-form.component.css']
})
export class GroupFormComponent implements OnInit {
  @Input() mode: 'create' | 'edit' = 'create';
  @Input() initialData?: ReadingGroup;
  @Output() formSubmit = new EventEmitter<any>();
  @Output() formCancel = new EventEmitter<void>();

  groupForm: FormGroup;
  error: string = '';
  loading: boolean = false;
  showBookSearch = false;
  selectedBook: Book | null = null;

  public readonly weekDays: string[] = [
    'Monday',
    'Tuesday',
    'Wednesday',
    'Thursday',
    'Friday',
    'Saturday',
    'Sunday'
  ];

  constructor(
    private fb: FormBuilder,
    private firebaseService: FirebaseService,
    private router: Router
  ) {
    this.groupForm = this.createForm();
  }

  ngOnInit() {
    if (this.mode === 'edit' && this.initialData) {
      this.populateForm();
    }
  }

  private createForm(): FormGroup {
    return this.fb.group({
      name: ['', [Validators.required, Validators.minLength(4)]],
      description: ['', [Validators.required, Validators.minLength(20)]],
      meetingDay: [''],
      meetingTime: [''],
      maxMembers: [null, [Validators.min(2)]],
      tags: ['']
    });
  }

  private populateForm() {
    if (!this.initialData) return;

    this.groupForm.patchValue({
      name: this.initialData.name,
      description: this.initialData.description,
      meetingDay: this.initialData.meetingDay,
      meetingTime: this.initialData.meetingTime,
      maxMembers: this.initialData.maxMembers,
      tags: this.initialData.tags?.join(', ')
    });

    if (this.initialData.currentBook) {
      this.selectedBook = {
        id: this.initialData.currentBook.id,
        title: this.initialData.currentBook.title,
        authors: this.initialData.currentBook.authors || [],
        description: this.initialData.currentBook.description || '',
        publishedDate: this.initialData.currentBook.publishedDate || '',
        pageCount: this.initialData.currentBook.pageCount || 0,
        imageLinks: {
          thumbnail: this.initialData.currentBook.imageUrl || '',
          smallThumbnail: this.initialData.currentBook.imageUrl || ''
        }
      } as Book;
    }
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
    if (this.groupForm.invalid) {
      // Mark all fields as touched to trigger validation messages
      Object.keys(this.groupForm.controls).forEach(key => {
        const control = this.groupForm.get(key);
        control?.markAsTouched();
      });
      return;
    }

    this.loading = true;
    this.error = '';

    const formData = {
      ...this.groupForm.value,
      currentBook: this.selectedBook ? {
        id: this.selectedBook.id,
        title: this.selectedBook.title,
        imageUrl: this.selectedBook.imageLinks?.thumbnail || null,
        authors: this.selectedBook.authors || [],
        description: this.selectedBook.description || '',
        publishedDate: this.selectedBook.publishedDate || '',
        pageCount: this.selectedBook.pageCount || 0
      } : null,
      coverImage: this.selectedBook?.imageLinks?.thumbnail || null,
      tags: this.groupForm.value.tags
        ? this.groupForm.value.tags.split(',').map((tag: string) => tag.trim()).filter(Boolean)
        : []
    };

    try {
      if (this.mode === 'edit') {
        // For edit mode, emit the data to parent component
        this.formSubmit.emit(formData);
      } else {
        // For create mode, handle the creation here
        const auth = getAuth();
        const user = auth.currentUser;

        if (!user) {
          throw new Error('Must be logged in to create a group');
        }

        const groupData = {
          ...formData,
          adminId: user.uid,
          memberIds: [user.uid],
          memberEmails: [user.email],
          memberCount: 1,
          createdAt: new Date()
        };

        await this.firebaseService.addDocument('groups', groupData);
        this.router.navigate(['/groups']);
      }
    } catch (error: any) {
      console.error('Error submitting form:', error);
      this.error = error.message || 'Error submitting form';
    } finally {
      this.loading = false;
    }
  }

  onCancel() {
    if (this.mode === 'edit') {
      this.formCancel.emit();
    } else {
      this.router.navigate(['/groups']);
    }
  }

  // Helper methods for the template
  getErrorMessage(controlName: string): string {
    const control = this.groupForm.get(controlName);
    if (!control || !control.errors || !control.touched) return '';

    const errors = control.errors;
    if (errors['required']) return `${controlName} is required`;
    if (errors['minlength']) {
      return `${controlName} must be at least ${errors['minlength'].requiredLength} characters`;
    }
    if (errors['min']) return `${controlName} must be at least ${errors['min'].min}`;

    return 'Invalid field';
  }
}