// import Timestamp = firebase.firestore.Timestamp;
import { Timestamp } from 'firebase/firestore';

export interface Transaction {
  uid: string;
  from?: string;
  to?: string;
  amount: number;
  date: Date | Timestamp;
  type?: TransactionType;
  userId: string;
}

export enum TransactionType {
  DEPOSIT = 'Deposit',
  WITHDRAW = 'Withdraw',
  TRANSFER = 'Transfer',
  RECEIVE = 'Receive',
}
