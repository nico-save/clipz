import { Injectable } from '@angular/core';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreCollection } from '@angular/fire/compat/firestore';
import { AngularFireStorage } from '@angular/fire/compat/storage';
import { Router } from '@angular/router';
import IComment from '../models/comment.model';

@Injectable({
  providedIn: 'root'
})
export class CommentService {
  public commentsCollection: AngularFirestoreCollection<IComment>
  comments: any[]= []


  constructor(
    private db: AngularFirestore,
    )
     {
      this.commentsCollection = db.collection('comments')
    }


    async createComment (data: IComment){
      return await this.commentsCollection.add(data);
    }


    getComments (id: string){
      return this.db.collection<IComment>('comments', ref => ref.where('docId', '==', id).orderBy('timestamp','desc'))
      .valueChanges({ idField: 'id' });
     }

}
