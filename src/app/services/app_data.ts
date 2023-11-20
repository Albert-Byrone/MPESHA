import {
  collection,
  doc,
  setDoc,
  getDoc,
  getDocs,
  addDoc,
  query,
  where,
  orderBy,
  limit,
  or,
  and,
} from 'firebase/firestore';

const userAccountRef = (uid: string) => doc(firebase.db, 'accounts', uid);
const userDataRef = (uid: string) => doc(firebase.db, 'users', uid);
