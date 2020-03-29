import { Component, OnInit } from "@angular/core";
import { AngularFireAuth } from "@angular/fire/auth";
import { AuthService } from "../shared/auth.service";

@Component({
  selector: "app-header",
  templateUrl: "./header.component.html",
  styleUrls: ["./header.component.scss"]
})
export class HeaderComponent implements OnInit {
  admin = null;

  constructor(
    private authService: AuthService,
    //private afAuth: AngularFireAuth
  ) {}

  ngOnInit() {
    this.authService.admin.subscribe(admin => {
      this.admin = admin;
    });
  }

  login() {
    this.authService.loginWithGoogle();
  }

  signout() {
    this.authService.signout();
    this.admin = null;
  }
}
