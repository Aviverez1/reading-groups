// import { Injectable } from '@angular/core';
// import { 
//   Firestore, 
//   collection, 
//   addDoc, 
//   getDocs, 
//   doc, 
//   updateDoc, 
//   deleteDoc, 
//   query, 
//   where 
// } from '@angular/fire/firestore';

// @Injectable({
//   providedIn: 'root'
// })
// export class FirestoreService {
//   constructor(private firestore: Firestore) {}

//   // Create a new document in a collection
//   async createDocument(collectionName: string, data: any) {
//     const collectionRef = collection(this.firestore, collectionName);
//     return addDoc(collectionRef, data);
//   }

//   // Get all documents from a collection
//   async getCollection(collectionName: string) {
//     const collectionRef = collection(this.firestore, collectionName);
//     const snapshot = await getDocs(collectionRef);
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   }

//   // Update a document
//   async updateDocument(collectionName: string, documentId: string, data: any) {
//     const documentRef = doc(this.firestore, collectionName, documentId);
//     return updateDoc(documentRef, data);
//   }

//   // Delete a document
//   async deleteDocument(collectionName: string, documentId: string) {
//     const documentRef = doc(this.firestore, collectionName, documentId);
//     return deleteDoc(documentRef);
//   }

//   // Query documents
//   async queryDocuments(collectionName: string, fieldPath: string, operator: any, value: any) {
//     const collectionRef = collection(this.firestore, collectionName);
//     const q = query(collectionRef, where(fieldPath, operator, value));
//     const snapshot = await getDocs(q);
//     return snapshot.docs.map(doc => ({
//       id: doc.id,
//       ...doc.data()
//     }));
//   }
// }
