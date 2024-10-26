import { database } from './firebaseConfig';
import { collection, addDoc, doc, updateDoc, deleteDoc, onSnapshot } from 'firebase/firestore';

// Add a new document to a collection
export const addDocument = async (collectionName, data) => {
  try {
    const docRef = await addDoc(collection(database, collectionName), data);
    return docRef.id;  // Return the document ID
  } catch (error) {
    console.error("Error adding document: ", error);
    throw error;
  }
};

// Update an existing document
export const updateDocument = async (collectionName, docId, data) => {
  try {
    const docRef = doc(database, collectionName, docId);
    await updateDoc(docRef, data);
  } catch (error) {
    console.error("Error updating document: ", error);
    throw error;
  }
};

// Delete a document
export const deleteDocument = async (collectionName, docId) => {
  try {
    const docRef = doc(database, collectionName, docId);
    await deleteDoc(docRef);
  } catch (error) {
    console.error("Error deleting document: ", error);
    throw error;
  }
};

// Listen for real-time updates in a collection
export const listenToCollection = (collectionName, callback) => {
  return onSnapshot(collection(database, collectionName), (snapshot) => {
    const documents = snapshot.docs.map(doc => ({ id: doc.id, ...doc.data() }));
    callback(documents);
  });
};