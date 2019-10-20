import { Component, OnInit } from "@angular/core";
import { DataService } from "../../shared/data.service";
import { Observable } from "rxjs";
import { User } from "../../shared/data.model";

export interface ThiefItem {
  name: string;
  age: number;
  location: string;
  createdOn: string;
  photo: string;
}

@Component({
  selector: "app-thief-list",
  templateUrl: "./thief-list.component.html",
  styleUrls: ["./thief-list.component.scss"]
})
export class ThiefListComponent implements OnInit {
  users: User[];
  isLoading = true;

  constructor(private dataService: DataService) {}

  ngOnInit() {
    this.dataService.getUsers().subscribe(users => {
      this.isLoading = false;
      this.users = this.dataService.users;
    });
  }
}
