import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../../services/firebase.service';
import { ReadingGroup } from '../../../models/reading-group.interface';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  featuredGroups: ReadingGroup[] = [];
  isLoading: boolean = true;
  error: string = '';

  constructor(private firebaseService: FirebaseService) {}

  ngOnInit() {
    this.loadFeaturedGroups();
  }

  private async loadFeaturedGroups() {
    try {
      const groups = await this.firebaseService.getDocuments('groups');
      this.featuredGroups = groups
        .sort((a, b) => b.memberCount - a.memberCount) // Sort by member count
        .slice(0, 4); // Get top 4 groups
      this.isLoading = false;
    } catch (error) {
      this.error = 'Error loading reading groups';
      this.isLoading = false;
      console.error('Error:', error);
    }
  }
}