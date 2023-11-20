import { Injectable } from '@angular/core';

import {
  collection,
  doc,
  getDoc,
  getDocs,
  updateDoc,
  query,
  setDoc,
  where,
  addDoc,
  orderBy,
  limit,
} from 'firebase/firestore';

import { User } from '../interface/user';
import { Wallet } from '../interface/wallet';
import { AngularFirestore } from '@angular/fire/compat/firestore';
import { Transaction, TransactionType } from '../interface/transaction';
import { ToastrService } from 'ngx-toastr';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root',
})
export class AccountService {
  constructor(
    private firestore: AngularFirestore,
    private toastr: ToastrService
  ) {}

  db = this.firestore.firestore;

  // getRealTimeWalletBalance(uid: string): Observable<any> {
  //   return this.firestore.collection('wallets').doc(uid).valueChanges();
  // }
  async updateWalletAmount(amount: number) {
    const uid = localStorage.getItem('user_id');
    const maxTopupAmount = 200000;
    if (amount > maxTopupAmount) {
      this.toastr.error('You can only top up to a maximun of KSH 200,000');
      return;
    }
    const ref = doc(this.db, 'wallets', uid as string);
    const docSnap = (await getDoc(ref)).data();
    if (docSnap) {
      let newBalance = (docSnap['balance'] += amount);
      console.log(newBalance);
      await updateDoc(doc(this.db, 'wallets', uid as string), {
        balance: newBalance,
      });

      const transaction: Transaction = {
        uid: uid as string,
        type: TransactionType.DEPOSIT,
        amount: amount,
        date: new Date(),
        userId: uid as string,
      };

      await this.firestore.collection('transactions').add(transaction);
    }
  }

  // Update wallet amount with real-time updates
  async createAccount(user: User) {
    await this.firestore.collection('users').doc(user.uid).set({
      uid: user.uid,
      email: user.email,
      firstName: user.firstName,
      lastName: user.lastName,
      phoneNumber: user.phoneNumber,
      password: user.password,
    });
  }

  async createWallet(user: User) {
    await this.firestore.collection('wallets').doc(user.uid).set({
      userId: user.uid,
      balance: 0,
      uid: user.uid,
      createdAt: new Date(),
    });
  }

  userRef = collection(this.db, 'users');
  findEmail = async (email: string) => {
    let fetchQuery = query(
      this.userRef,
      where('email', '==', email),
      where('uid', '!=', localStorage.getItem('uid'))
    );
    return await getDocs(fetchQuery);
  };

  async getUserInfoByEmail(email: string) {
    const userQuery = query(this.userRef, where('email', '==', email));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;
      const walletRef = doc(this.db, 'wallets', userId);
      const accountRef = doc(this.db, 'users', userId);
      const walletDoc = await getDoc(walletRef);
      const accountDoc = await getDoc(accountRef);
      return {
        wallet: walletDoc.data(),
        account: accountDoc.data(),
      };
    } else {
      return null; // User not found
    }
  }
  async sendMoney(receiverEmail: string, amount: number) {
    const senderUid = localStorage.getItem('user_id');
    const senderWalletRef = doc(this.db, 'wallets', senderUid as string);
    const senderWalletDoc = (await getDoc(senderWalletRef)).data();
    const senderBalance = senderWalletDoc!['balance'];

    console.log('senderBalance', senderBalance);
    if (senderBalance < amount || senderBalance === 0) {
      this.toastr.error('You have imsuffucient balance');
      return;
    }

    const receiverDoc = await this.findEmail(receiverEmail);
    if (receiverDoc) {
      const receiverUid = receiverDoc.docs[0].id;
      const receiverWalletRef = doc(this.db, 'wallets', receiverUid as string);
      const receiverWalletDoc = (await getDoc(receiverWalletRef)).data();
      const receiverBalance = receiverWalletDoc!['balance'];
      console.log('receiverBalance', receiverBalance);

      const senderNewBalance = senderBalance - amount;
      const receiverNewBalance = receiverBalance + amount;

      await updateDoc(senderWalletRef, {
        balance: senderNewBalance,
      });
      await updateDoc(receiverWalletRef, {
        balance: receiverNewBalance,
      });
      const senderTransaction: Transaction = {
        uid: senderUid as string,
        to: receiverUid,
        type: TransactionType.TRANSFER,
        amount: amount,
        date: new Date(),
        userId: receiverUid,
      };
      const receiverTransaction: Transaction = {
        uid: receiverUid,
        from: senderUid as string,
        type: TransactionType.RECEIVE,
        amount: amount,
        date: new Date(),
        userId: senderUid as string,
      };

      console.log('senderTransaction', senderTransaction);
      console.log('receiverTransaction', receiverTransaction);
      await this.firestore.collection('transactions').add(senderTransaction);
      await this.firestore.collection('transactions').add(receiverTransaction);
    } else {
      this.toastr.error('The account does not exist');
    }
  }

  async withdrawFromWallet(amount: number) {
    const uid = localStorage.getItem('user_id');
    const walletRef = doc(this.db, 'wallets', uid as string);
    const walletDoc = (await getDoc(walletRef)).data();
    const currentBalance = walletDoc!['balance'];
    console.log(currentBalance);

    if (amount > currentBalance || amount === 0) {
      this.toastr.error('Insufficient balance for withdrawal');
      return;
    } else {
      const newBalance = currentBalance - amount;
      console.log(newBalance);
      await updateDoc(walletRef, { balance: newBalance });

      const transaction: Transaction = {
        uid: uid as string,
        type: TransactionType.WITHDRAW,
        amount: amount,
        date: new Date(),
        userId: uid as string,
      };

      await this.firestore.collection('transactions').add(transaction);
    }
  }

  async getCurrentUser() {
    const uid = localStorage.getItem('user_id');
    const userQuery = query(this.userRef, where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);
    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;
      const walletRef = doc(this.db, 'wallets', userId);
      const accountRef = doc(this.db, 'users', userId);
      const walletDoc = await getDoc(walletRef);
      const accountDoc = await getDoc(accountRef);
      return {
        wallet: walletDoc.data(),
        account: accountDoc.data(),
      };
    } else {
      return null; // User not found
    }
  }

  async getUserTransactions() {
    const uid = localStorage.getItem('user_id');
    const userQuery = query(this.userRef, where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);
    console.log('user id======', userSnapshot);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;
      console.log('user id======', userId);
      const transactionRef = collection(this.db, 'transactions');
      const userTransactionsQuery = query(
        transactionRef,
        orderBy('date', 'desc'),
        where('userId', '==', userId),
        limit(5)
      );
      const userTransactionsSnapshot = await getDocs(userTransactionsQuery);
      const userTransactions = userTransactionsSnapshot.docs.map((doc) =>
        doc.data()
      );
      return userTransactions;
    } else {
      return null; // User not found
    }
  }

  async getUserDepositTransactions() {
    const uid = localStorage.getItem('user_id');
    const userQuery = query(this.userRef, where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;
      const transactionRef = collection(this.db, 'transactions');
      const userTransactionsQuery = query(
        transactionRef,
        where('userId', '==', userId),
        where('type', '==', TransactionType.RECEIVE) // Add this line to filter deposit transactions
      );
      const userTransactionsSnapshot = await getDocs(userTransactionsQuery);
      const userTransactions = userTransactionsSnapshot.docs.map((doc) =>
        doc.data()
      );
      return userTransactions;
    } else {
      return null; // User not found
    }
  }

  async getUserSentTransactions() {
    const uid = localStorage.getItem('user_id');
    const userQuery = query(this.userRef, where('uid', '==', uid));
    const userSnapshot = await getDocs(userQuery);

    if (!userSnapshot.empty) {
      const userDoc = userSnapshot.docs[0];
      const userId = userDoc.id;
      const transactionRef = collection(this.db, 'transactions');
      const userTransactionsQuery = query(
        transactionRef,
        where('userId', '==', userId),
        where('type', '==', TransactionType.TRANSFER) // Add this line to filter deposit transactions
      );
      const userTransactionsSnapshot = await getDocs(userTransactionsQuery);
      return userTransactionsSnapshot.docs.map((doc) => doc.data());
    } else {
      return null; // User not found
    }
  }
}
