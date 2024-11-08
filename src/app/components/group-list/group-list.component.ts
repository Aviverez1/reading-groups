// src/app/modules/groups/components/group-list/group-list.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';
import { SearchCriteria } from './search-modal/search-modal.component';

@Component({
  selector: 'app-group-list',
  templateUrl: './group-list.component.html',
  styleUrls: ['./group-list.component.css']
})
export class GroupListComponent implements OnInit {
  groups: any[] = [];
  isLoading = true;
  error = '';
  showSearchModal = false;
  searchResults: any[] | null = null;

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

  toggleSearchModal() {
    this.showSearchModal = !this.showSearchModal;
  }

  async handleSearch(criteria: SearchCriteria) {
    try {
      this.isLoading = true;
      this.searchResults = await this.firebaseService.searchGroups(criteria);
      this.showSearchModal = false;
    } catch (error) {
      this.error = 'Error searching groups';
      console.error(error);
    } finally {
      this.isLoading = false;
    }
  }

  clearSearch() {
    this.searchResults = null;
  }
}