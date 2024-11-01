// src/app/components/tests/test.component.ts
import { Component, OnInit } from '@angular/core';
import { FirebaseService } from '../../services/firebase.service';

@Component({  // Make sure this decorator is present!
  selector: 'app-test',
  standalone: false,
  template: `
    <div>
      <h2>Test Firestore Connection</h2>
      <button (click)="addTestData()">Add Test Data</button>
      
      <h3>Test Data from Firestore:</h3>
      <div *ngFor="let item of testData">
        <pre>{{ item | json }}</pre>
      </div>
    </div>
  `
})
export class TestComponent implements OnInit {
  testData: any[] = [];

  constructor(private firebaseService: FirebaseService) {}

  async ngOnInit() {
    await this.loadTestData();
  }

  async loadTestData() {
    try {
      this.testData = await this.firebaseService.getDocuments('test');
    } catch (error) {
      console.error('Error loading data:', error);
    }
  }

  async addTestData() {
    try {
      await this.firebaseService.addDocument('test', {
        message: 'Test data',
        timestamp: new Date().toISOString()
      });
      await this.loadTestData();
    } catch (error) {
      console.error('Error adding test data:', error);
    }
  }
}