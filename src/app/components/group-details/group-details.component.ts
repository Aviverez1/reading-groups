// group-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { ReadingGroup } from '../../models/reading-group.interface';
import { User } from 'firebase/auth';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-group-details',
  templateUrl: './group-details.component.html',
  styleUrls: ['./group-details.component.css']
})
export class GroupDetailsComponent implements OnInit {
  group: ReadingGroup | null = null;
  currentUser$: Observable<User | null>;
  isLoading = true;
  error = '';
  isJoining = false;
  showMembersList = false;
  isEditing = false;
  newComment: string = '';
  groupId: string | null = null;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.user$;
  }

  ngOnInit() {
    this.groupId = this.route.snapshot.paramMap.get('id');
    if (this.groupId) {
      this.loadGroup(this.groupId);
    }
  }

  async loadGroup(groupId: string) {
    try {
      const data = await this.firebaseService.getDocumentById('groups', groupId);
      this.group = data as ReadingGroup;
      this.isLoading = false;
    } catch (error) {
      this.error = 'Failed to load group details';
      this.isLoading = false;
      console.error('Error loading group:', error);
    }
  }

  isGroupMember(user: User | null): boolean {
    if (!user || !this.group) return false;
    return this.group.memberIds.includes(user.uid);
  }

  isGroupAdmin(user: User | null): boolean {
    if (!user || !this.group) return false;
    return this.group.adminId === user.uid;
  }

  async joinGroup(user: User) {
    if (!this.group || this.isGroupMember(user)) return;

    this.isJoining = true;
    this.error = '';

    try {
      const currentMemberEmails = this.group.memberEmails || [];
      const updatedMemberIds = [...this.group.memberIds, user.uid];
      const updatedMemberEmails = [...currentMemberEmails, user.email || ''];
      
      const updatedData = {
        memberIds: updatedMemberIds,
        memberEmails: updatedMemberEmails,
        memberCount: updatedMemberIds.length
      };

      await this.firebaseService.updateDocument('groups', this.group.id!, updatedData);
      await this.loadGroup(this.group.id!);
    } catch (error) {
      this.error = 'Failed to join the group';
      console.error('Error joining group:', error);
    } finally {
      this.isJoining = false;
    }
  }

  async addComment(user: User) {
    if (!this.group || !this.newComment.trim() || !user.email) return;

    try {
      const username = user.email.split('@')[0];
      const comment = {
        username,
        content: this.newComment.trim()
      };

      const updatedComments = [...(this.group.comments || []), comment];
      const updatedData = {
        comments: updatedComments
      };
      await this.firebaseService.updateDocument('groups', this.group.id!, updatedData);
      await this.loadGroup(this.group.id!);
      this.newComment = '';
    } catch (error) {
      console.error('Error adding comment:', error);
      this.error = 'Failed to add comment';
    }
  }

  toggleMembersList() {
    this.showMembersList = !this.showMembersList;
  }

  async handleFormSubmit(formData: any) {
    if (!this.group) return;

    try {
      const updatedData = {
        ...formData,
        memberIds: this.group.memberIds,
        memberEmails: this.group.memberEmails,
        memberCount: this.group.memberCount,
        adminId: this.group.adminId
      };

      await this.firebaseService.updateDocument('groups', this.group.id!, updatedData);
      this.isEditing = false;
      await this.loadGroup(this.group.id!);
    } catch (error) {
      console.error('Error updating group:', error);
      this.error = 'Failed to update group';
    }
  }

  handleFormCancel() {
    this.isEditing = false;
  }

  async deleteGroup() {
    if (!this.group || !window.confirm('Are you sure you want to delete this group?')) {
      return;
    }

    try {
      await this.firebaseService.deleteDocument('groups', this.group.id!);
      this.router.navigate(['/groups']);
    } catch (error) {
      console.error('Error deleting group:', error);
      this.error = 'Failed to delete group';
    }
  }

  toggleEdit() {
    this.isEditing = !this.isEditing;
  }
}