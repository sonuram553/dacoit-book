import { Injectable, OnInit, OnDestroy } from "@angular/core";
import { HttpClient } from "@angular/common/http";
import { tap } from "rxjs/operators";
import { User, Admin } from "./data.model";

@Injectable({
  providedIn: "root"
})
export class DataService implements OnInit, OnDestroy {
  users: User[];
  private userCollectionUrl = "https://vast-temple-84975.herokuapp.com/users/"; //"http://localhost:3000/users/";
  private adminCollectionUrl = "https://vast-temple-84975.herokuapp.com/admin/"; //"http://localhost:3000/admin/";

  constructor(private http: HttpClient) {}

  ngOnInit() {}

  getUsers() {
    return this.http.get<User[]>(this.userCollectionUrl).pipe(
      tap(res => {
        this.users = res;
      })
    );
  }

  getUser(id: string) {
    return this.http.get<User>(this.userCollectionUrl + id);
  }

  postUser(user: User) {
    return this.http.post(this.userCollectionUrl, user);
  }

  updateUser(id: string, data) {
    return this.http.patch(this.userCollectionUrl + id, data);
  }

  deleteUser(id: string) {
    return this.http.delete(this.userCollectionUrl + id);
  }

  //----------- For admins -----------
  postAdmin(admin: Admin) {
    return this.http.post(this.adminCollectionUrl, admin);
  }

  postUserToAdmin(adminId: string, userId: string) {
    return this.http.patch(this.adminCollectionUrl + adminId, {
      userId: userId
    });
  }

  ngOnDestroy() {}
}
