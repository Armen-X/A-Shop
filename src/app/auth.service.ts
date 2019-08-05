import { UserService } from './user.service';
import { AppUser } from './models/app-user';
import { AngularFireAuth } from '@angular/fire/auth';
import { Injectable } from '@angular/core';
import * as firebase from 'firebase';
import { AngularFireAuthModule } from '@angular/fire/auth';
import { Observable } from 'rxjs';
import { ActivatedRoute } from '@angular/router';
import 'rxjs/add/operator/switchMap';





@Injectable({
  providedIn: 'root'
})
export class AuthService {
  user$: Observable<firebase.User>;

  constructor(
    private userService: UserService,
    private afAuth: AngularFireAuth,
    private route: ActivatedRoute) { 
    this.user$ = afAuth.authState;

  }

  login(){
    let returnUrl = this.route.snapshot.queryParamMap.get('returnUrl') || '/';
    localStorage.setItem('returnUrl', returnUrl);
    
    this.afAuth.auth.signInWithRedirect(new firebase.auth.GoogleAuthProvider());
   }

   logout() {
    this.afAuth.auth.signOut();
  }
  get appUser$() : Observable<AppUser>{
    return this.user$
    .switchMap(user => {
      if (user) return this.userService.get(user.uid).valueChanges()
        return Observable.of(null);
      })
                         

  }



}
