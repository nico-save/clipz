import firebase from 'firebase/compat/app'

export default interface IComment {
  comment: string;
  docId?: string;
  uid?: string;
  displayName?: string;
  timestamp: firebase.firestore.FieldValue;

 }
