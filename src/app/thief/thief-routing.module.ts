import { NgModule } from "@angular/core";
import { ThiefListComponent } from "./thief-list/thief-list.component";
import { ThiefEditComponent } from "./thief-edit/thief-edit.component";
import { ThiefDetailsComponent } from "./thief-details/thief-details.component";
import { AuthGuardService } from "../shared/auth-guard.service";
import { RouterModule } from "@angular/router";
import { ThiefComponent } from "./thief.component";

const routes = [
  {
    path: "thieves",
    component: ThiefComponent,
    children: [
      { path: "", component: ThiefListComponent },
      {
        path: "new",
        component: ThiefEditComponent,
        canActivate: [AuthGuardService]
      },
      { path: ":id", component: ThiefDetailsComponent },
      {
        path: ":id/edit",
        component: ThiefEditComponent,
        canActivate: [AuthGuardService]
      }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})

export class ThiefRoutingModule {}
