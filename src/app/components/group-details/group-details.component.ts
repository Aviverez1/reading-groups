// group-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { Observable } from 'rxjs';
import { FirebaseService } from '../../services/firebase.service';
import { AuthService } from '../../services/auth.service';
import { ReadingGroup } from '../../models/reading-group.interface';
import { User } from 'firebase/auth';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private firebaseService: FirebaseService,
    private authService: AuthService
  ) {
    this.currentUser$ = this.authService.user$;
  }

  ngOnInit() {
    const groupId = this.route.snapshot.paramMap.get('id');
    if (groupId) {
      this.loadGroup(groupId);
    }
  }

  private async loadGroup(groupId: string) {
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

// group-details.component.ts
  async joinGroup(user: User) {
    if (!this.group || this.isGroupMember(user)) return;

    this.isJoining = true;
    this.error = '';

    try {
      // Ensure memberEmails exists
      const currentMemberEmails = this.group.memberEmails || [];
      const updatedMemberIds = [...this.group.memberIds, user.uid];
      const updatedMemberEmails = [...currentMemberEmails, user.email || ''];
      
      console.log('Current memberEmails:', currentMemberEmails);
      console.log('Updated memberEmails:', updatedMemberEmails);
      
      const updatedData = {
        memberIds: updatedMemberIds,
        memberEmails: updatedMemberEmails,
        memberCount: updatedMemberIds.length
      };

      await this.firebaseService.updateDocument('groups', this.group.id!, updatedData);
      
      const updatedGroup = await this.firebaseService.getDocumentById('groups', this.group.id!);
      this.group = updatedGroup;
      
      console.log('Updated group memberEmails:', this.group.memberEmails);
    } catch (error) {
      this.error = 'Failed to join the group';
      console.error('Error joining group:', error);
    } finally {
      this.isJoining = false;
    }
  }

  toggleMembersList() {
    this.showMembersList = !this.showMembersList;
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
    // TODO: Implement edit functionality
  }
}