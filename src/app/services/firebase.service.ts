// src/app/services/firebase.service.ts
import { Injectable } from '@angular/core';
import { 
  getFirestore, 
  collection, 
  getDocs, 
  addDoc, 
  DocumentData, 
  serverTimestamp,
  updateDoc,
  doc,
  getDoc,
  deleteDoc
} from 'firebase/firestore';
import { initializeApp } from 'firebase/app';
import { environment } from '../../environments/environment';
import { ReadingGroup } from '../models/reading-group.interface';

@Injectable({
  providedIn: 'root'
})
export class FirebaseService {
  private app = initializeApp(environment.firebase);
  private firestore = getFirestore(this.app);

  async getDocuments(collectionName: string): Promise<ReadingGroup[]> {
    try {
      const querySnapshot = await getDocs(collection(this.firestore, collectionName));
      return querySnapshot.docs.map(doc => ({
        id: doc.id,
        ...doc.data()
      } as ReadingGroup));
    } catch (error) {
      console.error('Error getting documents:', error);
      throw error;
    }
  }

  async addDocument(collectionName: string, data: any) {
    try {
      const collectionRef = collection(this.firestore, collectionName);
      const docRef = await addDoc(collectionRef, {
        ...data,
        createdAt: serverTimestamp()  // Use Firebase server timestamp
      });
      return docRef.id;
    } catch (error) {
      console.error('Error adding document:', error);
      throw error;
    }
  }

  async getDocumentById(collectionName: string, documentId: string): Promise<ReadingGroup> {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      const docSnap = await getDoc(docRef);
      
      if (docSnap.exists()) {
        const data = docSnap.data();
        return {
          id: docSnap.id,
          name: data['name'],
          description: data['description'],
          adminId: data['adminId'],
          memberIds: data['memberIds'] || [],
          memberEmails: data['memberEmails'] || [], // Add this line
          memberCount: data['memberIds']?.length || 0,
          createdAt: data['createdAt']?.toDate() || new Date(),
          currentBook: data['currentBook'],
          meetingDay: data['meetingDay'],
          meetingTime: data['meetingTime'],
          maxMembers: data['maxMembers'],
          tags: data['tags'] || [],
          coverImage: data['coverImage'],
          lastUpdated: data['lastUpdated']?.toDate(),
          nextMeeting: data['nextMeeting']?.toDate()
        } as ReadingGroup;
      } else {
        throw new Error('Document not found');
      }
    } catch (error) {
      console.error('Error getting document:', error);
      throw error;
    }
  }
  
  async updateDocument(collectionName: string, documentId: string, data: any) {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      await updateDoc(docRef, data);
    } catch (error) {
      console.error('Error updating document:', error);
      throw error;
    }
  }

  async deleteDocument(collectionName: string, documentId: string) {
    try {
      const docRef = doc(this.firestore, collectionName, documentId);
      await deleteDoc(docRef);
    } catch (error) {
      console.error('Error deleting document:', error);
      throw error;
    }
  }
}