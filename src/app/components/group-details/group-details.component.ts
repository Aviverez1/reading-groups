// src/app/modules/groups/components/group-details/group-details.component.ts
import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
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

  constructor(
    private route: ActivatedRoute,
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

  // async joinGroup(user: User) {
  //   if (!this.group || this.isGroupMember(user)) return;

  //   this.isJoining = true;
  //   this.error = '';

  //   try {
  //     const updatedGroup = {
  //       ...this.group,
  //       memberIds: [...this.group.memberIds, user.uid],
  //       memberCount: this.group.memberCount + 1
  //     };

  //     await this.firebaseService.updateDocument('groups', this.group.id!, {
  //       memberIds: updatedGroup.memberIds,
  //       memberCount: updatedGroup.memberCount
  //     });

  //     this.group = updatedGroup;
  //   } catch (error) {
  //     this.error = 'Failed to join the group';
  //     console.error('Error joining group:', error);
  //   } finally {
  //     this.isJoining = false;
  //   }
  // }
  // src/app/modules/groups/components/group-details/group-details.component.ts
  async joinGroup(user: User) {
    if (!this.group || this.isGroupMember(user)) return;

    this.isJoining = true;
    this.error = '';

    try {
      const updatedMemberIds = [...this.group.memberIds, user.uid];
      const updatedData = {
        memberIds: updatedMemberIds,
        memberCount: updatedMemberIds.length  // Set memberCount to the length of memberIds
      };

      await this.firebaseService.updateDocument('groups', this.group.id!, updatedData);
      await this.loadGroup(this.group.id!); // Reload the group to get updated data
    } catch (error) {
      this.error = 'Failed to join the group';
      console.error('Error joining group:', error);
    } finally {
      this.isJoining = false;
    }
  }
}