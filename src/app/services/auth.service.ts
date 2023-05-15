import { Injectable } from '@angular/core';
import {AngularFireAuth} from '@angular/fire/compat/auth'
import { AngularFirestore, AngularFirestoreCollection, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import firebase from 'firebase/compat/app';
import IUser from '../models/user.model';
import { Observable, delay, map, filter, switchMap, of, take } from 'rxjs';
import { Router } from '@angular/router';
import { ActivatedRoute , NavigationEnd} from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {
private usersCollection: AngularFirestoreCollection<IUser>
public isAuthenticated$: Observable<boolean>
public isAuthenticatedWithDelay$: Observable<boolean>
private redirect = false

constructor(
  private auth: AngularFireAuth,
   private db: AngularFirestore,
   private router: Router,
   private route: ActivatedRoute
   ) {
    this.usersCollection = db.collection('users')
    this.isAuthenticated$ = auth.user.pipe(
      map(user => !!user)
    )
    this.isAuthenticatedWithDelay$ = this.isAuthenticated$.pipe(
      delay(1000)
    )



    this.router.events.pipe(
      filter(e => e instanceof NavigationEnd),
      map(e => this.route.firstChild),
        /* subscribe to an observable in an observable */
      switchMap(route => {

        const child = route.firstChild;
        return child ? child.data.pipe(take(1)) : of({});
      })
    ).subscribe((data => {
      console.log(data)
      this.redirect = data['authOnly'] ?? false
    }))
  }

  public async createUser(userData: IUser) {

    if(!userData.password){
      throw new Error('Password not provided')
    }
    const userCred = await this.auth.createUserWithEmailAndPassword(
      userData.email as string, userData.password as string
     )
     if(!userCred.user){
      throw new Error("User can't be found")
     }
     await this.usersCollection.doc(userCred.user.uid).set({
       name: userData.name,
       email: userData.email,
       age: userData.age,
       phoneNumber: userData.phoneNumber
     })

     await userCred.user.updateProfile({
      displayName: userData.name
     })

  }


  public async logout($event?: Event) {
    if($event){

      $event.preventDefault();
    }
    await this.auth.signOut()

    if(this.redirect)
    await this.router.navigateByUrl('/')

  }

  private updateUserData(user) {
    // Sets user data to firestore on login
    const userRef: AngularFirestoreDocument<IUser> = this.usersCollection.doc(`${user.uid}`);

    const data = {
      uid: user.uid,
      email: user.email,
      name: user.displayName,
      age: user.age,
      phoneNumber: user.phoneNumber

    }

    return userRef.set(data, { merge: true })

  }

  async googleSignin() {
    const provider = new firebase.auth.GoogleAuthProvider();
    try {
      const credential = await this.auth.signInWithRedirect(provider);
      console.log(credential)
      return this.updateUserData(credential);

    } catch (error) {

      console.log(error)
      return
    }
  }
}
