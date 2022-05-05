import { Injectable, NgZone } from '@angular/core';
import { User } from '../types/User';
import { User as FirebaseUser } from '@angular/fire/auth';
import * as auth from 'firebase/auth'
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AngularFirestore, AngularFirestoreDocument } from '@angular/fire/compat/firestore';
import { Router } from '@angular/router';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  userData: FirebaseUser

  constructor(
    private fireAuth: AngularFireAuth,
    private firestore: AngularFirestore,
    private router: Router,
    private ngZone: NgZone
  ) {
    this.fireAuth.authState.subscribe(user => {
      if (user) {
        this.userData = user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
      } else {
        localStorage.setItem('user', null)
        JSON.parse(localStorage.getItem('user')!)
      }
    })
  }

  // Returns true when user is looged in and email is verified
  get isLoggedIn(): boolean {
    const user = JSON.parse(localStorage.getItem('user')!);
    return user !== null && user.emailVerified !== false ? true : false;
  }

  // Sign in with Google
  GoogleAuth() {
    return this.AuthLogin(new auth.GoogleAuthProvider()).then((res: any) => {
      if (res) {
        console.log('navigating to journals')
        this.router.navigate(['journals']);
      }
    });
  }

  // Auth logic to run auth providers
  AuthLogin(provider: any) {
    return this.fireAuth
      .signInWithPopup(provider)
      .then((result) => {
        this.userData = result.user
        localStorage.setItem('user', JSON.stringify(this.userData))
        JSON.parse(localStorage.getItem('user')!)
        this.ngZone.run(() => {
          this.router.navigate(['journals']);
        });
        this.SetUserData(result.user);
      })
      .catch((error) => {
        window.alert(error);
      });
  }

  SetUserData(user: any) {
    const userRef: AngularFirestoreDocument<any> = this.firestore.doc(
      `users/${user.uid}`
    );
    const userData: User = {
      uid: user.uid,
      email: user.email
    };
    return userRef.set(userData, {
      merge: true,
    });
  }
  // Sign out
  SignOut() {
    return this.fireAuth.signOut().then(() => {
      localStorage.removeItem('user');
      this.router.navigate(['sign-in']);
    });
  }
}
