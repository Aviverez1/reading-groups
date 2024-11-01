// src/app/modules/groups/components/group-list/group-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { HomeComponent } from '../home/home/home.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: any[] = [];
  isLoading = true;
  error = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadGroups();
  }

  async loadGroups() {
    try {
      this.groups = await this.firebaseService.getDocuments('groups');
      this.isLoading = false;
    } catch (error) {
      this.error = 'Error loading groups';
      this.isLoading = false;
      console.error(error);
    }
  }
}