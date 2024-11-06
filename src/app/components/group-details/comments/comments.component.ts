// comments.component.ts
import { Component, Input, Output, EventEmitter } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { User } from 'firebase/auth';
import { ReadingGroup } from '../../../models/reading-group.interface';

@Component({
  selector: 'app-comments',
  templateUrl: './comments.component.html',
  styleUrls: ['./comments.component.css']
})
export class CommentsComponent {
  @Input() group!: ReadingGroup;
  @Input() isGroupMember!: boolean;
  @Input() currentUser!: User | null; // Changed to allow null
  @Output() commentSubmit = new EventEmitter<void>();
  newComment: string = '';
  error: string = '';

  constructor(
    private firebaseService: FirebaseService,
  ) {}

  async addComment() {
    if (!this.group || !this.newComment.trim() || !this.currentUser || !this.currentUser.email) {
      this.error = 'Unable to add comment. Please ensure you are logged in.';
      return;
    }

    try {
      const username = this.currentUser.email.split('@')[0];
      const comment = {
        username,
        content: this.newComment.trim(),
        timestamp: new Date().toISOString(), 
        userId: this.currentUser.uid 
      };

      const updatedComments = [...(this.group.comments || []), comment];
      await this.firebaseService.updateDocument('groups', this.group.id!, {
        comments: updatedComments
      });
      
      this.newComment = '';
      this.error = '';
      this.commentSubmit.emit();
    } catch (error) {
      console.error('Error adding comment:', error);
      this.error = 'Failed to add comment. Please try again.';
    }
  }
}