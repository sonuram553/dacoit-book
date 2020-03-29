import { Injectable } from "@angular/core";
import { BehaviorSubject } from "rxjs";
import { AngularFireAuth } from "@angular/fire/auth";
import * as firebase from "firebase/app";
import { DataService } from "./data.service";
import { Router } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class AuthService {
  admin = new BehaviorSubject<any>(null);

  constructor(
    private afAuth: AngularFireAuth,
    private dataService: DataService,
    private router: Router
  ) {}

  loginWithGoogle() {
    let provider = new firebase.auth.GoogleAuthProvider();
    this.afAuth.auth
      .signInWithPopup(provider)
      .then(admin => {
        console.log(admin);
        
        if (admin.additionalUserInfo.isNewUser) {
          const newAdmin = { _id: admin.user.uid, users: [] };
          this.dataService.postAdmin(newAdmin).subscribe(
            result => {
              console.log(result);
            },
            error => {
              console.log(error);
            }
          );
        } else {
          console.log("Old user");
        }
      })
      .catch(error => {
        console.log(error);
      });
  }

  signout() {
    this.afAuth.auth
      .signOut()
      .then(result => {
        console.log(result);
        this.router.navigateByUrl("/");
      })
      .catch(error => {
        console.log(error);
      });
  }
}
