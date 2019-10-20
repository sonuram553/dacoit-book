import { Component, OnInit, Input, OnDestroy } from "@angular/core";
import { Router, ActivatedRoute } from "@angular/router";
import { MatSnackBar } from "@angular/material/snack-bar";
import { Observable } from "rxjs";
import { User } from "src/app/shared/data.model";
import { DataService } from "src/app/shared/data.service";
import { AuthService } from "src/app/shared/auth.service";

@Component({
  selector: "app-thief-item",
  templateUrl: "./thief-item.component.html",
  styleUrls: ["./thief-item.component.scss"]
})
export class ThiefItemComponent implements OnInit, OnDestroy {
  @Input() user: User;
  @Input() index: number;

  admin: Observable<any>;
  formattedDate;

  constructor(
    private dataService: DataService,
    private router: Router,
    private activeRoute: ActivatedRoute,
    private _snackBar: MatSnackBar,
    private authService: AuthService
  ) {}

  ngOnInit() {
    this.admin = this.authService.admin;

    this.formattedDate = new Date(this.user.date).toLocaleDateString("en-US", {
      weekday: "short",
      year: "2-digit",
      day: "2-digit"
    });
  }

  onItemClicked() {
    this.router.navigate([this.user._id], { relativeTo: this.activeRoute });
  }

  onMenuClicked($event) {
    event.stopPropagation();
  }

  onEdit() {
    this.router.navigate([this.user._id, "edit"], {
      relativeTo: this.activeRoute
    });
  }

  onDelete() {
    this.dataService.users.splice(this.index, 1);
    console.log("Deleted", this.dataService.users);
    let msg = `${this.user.name} is deleted.`;
    this.dataService.deleteUser(this.user._id).subscribe();
    this.openSnackBar(msg);
  }

  openSnackBar(msg: string) {
    this._snackBar.open(msg, "", {
      duration: 2000,
      panelClass: ["red-snackbar"]
    });
  }

  ngOnDestroy() {}
}
