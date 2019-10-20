import { Component, OnInit } from "@angular/core";
import {
  FormGroup,
  FormBuilder,
  Validators,
  AbstractControl
} from "@angular/forms";
import { ActivatedRoute, Router } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";

import { User } from "../../shared/data.model";
import { DataService } from "../../shared/data.service";
import { AuthService } from "../../shared/auth.service";
import { take } from "rxjs/operators";

@Component({
  selector: "app-thief-edit",
  templateUrl: "./thief-edit.component.html",
  styleUrls: ["./thief-edit.component.scss"]
})
export class ThiefEditComponent implements OnInit {
  adminId = null;
  user: User;
  userId: string;
  userForm: FormGroup;
  isEditMode = false;
  isLoading = false;
  isUpdatingUser = false;
  locations: string[] = ["lucknow", "rampur", "allahabad", "kota", "jaipur"];

  constructor(
    private fb: FormBuilder,
    private dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    let id = this.activeRoute.snapshot.params.id;
    if (id) {
      this.isLoading = true;
      this.userId = id;
      this.isEditMode = true;
      this.dataService.getUser(id).subscribe(res => {
        this.user = res;
        this.isLoading = false;
        console.log(res);

        this.formInit();
      });
    } else {
      this.isLoading = false;
      this.formInit();
    }
  }

  formInit() {
    let name = "",
      age = null,
      location = "lucknow",
      description = "",
      birthMark = "",
      gender = "male",
      photo = "";

    if (this.isEditMode) {
      name = this.user.name;
      age = this.user.age;
      location = this.user.location;
      description = this.user.description;
      birthMark = this.user.birthMark;
      gender = this.user.gender;
      photo = this.user.photo;
    }

    this.userForm = this.fb.group({
      name: [name, Validators.required],
      age: [age, [Validators.required, Validators.min(1), Validators.max(100)]],
      location: location,
      description: description,
      birthMark: birthMark,
      gender: gender,
      photo: photo
    });
  }

  getErrorMsg(age: AbstractControl) {
    if (age.errors.required) return "Please enter age.";
    if (age.errors.min) return "Age should be above 0.";
    if (age.errors.max) return "Age should be below 101.";
  }

  onSubmit() {
    if (this.userForm.invalid) return null;
    if (this.userForm.dirty && this.isEditMode) {
      const controls = this.userForm.controls;
      let dataToUpdate = {};
      for (let control in controls) {
        if (controls[control].dirty) {
          dataToUpdate[control] = controls[control].value;
        }
      }

      //then send patch request
      this.isUpdatingUser = true;
      this.dataService
        .updateUser(this.user._id, dataToUpdate)
        .subscribe(res => {
          this.isUpdatingUser = false;
          this.openSnackBar("Successfully updated!");
          console.log("user updated", res);
          this.router.navigate([""]);
        });
    }
    if (!this.isEditMode) {
      this.isUpdatingUser = true;
      if (this.userForm.controls.photo.value === "")
        this.userForm.controls.photo.setValue(
          "https://cdn.pixabay.com/photo/2016/11/14/17/39/person-1824147_960_720.png"
        );
      this.dataService
        .postUser(this.userForm.value)
        .subscribe((res: { [_id: string]: string }) => {
          this.isUpdatingUser = false;
          this.openSnackBar("Successfully added!");
          console.log(res._id);
          let userId = res._id;

          //Add user to current admin's users array.
          /* this.authService.admin.pipe(take(1)).subscribe(admin => {
            this.adminId = admin.uid;
          });
          this.dataService.postUserToAdmin(this.adminId, userId).subscribe(
            result => {
              console.log(result);
            },
            error => {
              console.log(error);
            }
          ); */

          this.router.navigate([""]);
        });
    }
  }

  onCancel() {
    this.router.navigate([""]);
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 2000,
      panelClass: ["green-snackbar"]
    });
  }
}
