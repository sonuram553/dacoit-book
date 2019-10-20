import { Component, OnInit } from "@angular/core";
import { DataService } from "../../shared/data.service";
import { ActivatedRoute } from "@angular/router";
import { User } from "../../shared/data.model";

@Component({
  selector: "app-thief-details",
  templateUrl: "./thief-details.component.html",
  styleUrls: ["./thief-details.component.scss"]
})
export class ThiefDetailsComponent implements OnInit {
  user: User;
  isLoading = true;

  formattedDate;

  constructor(
    private dataService: DataService,
    private activeRoute: ActivatedRoute
  ) {}

  ngOnInit() {
    const userId = this.activeRoute.snapshot.params.id;
    this.dataService.getUser(userId).subscribe(user => {
      this.isLoading = false;
      this.user = user;
      this.formattedDate = new Date(user.date).toLocaleDateString("en-US", {
        weekday: "short",
        year: "2-digit",
        day: "2-digit"
      });
    });
  }
}
