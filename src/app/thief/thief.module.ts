import { NgModule } from "@angular/core";
import { RouterModule } from "@angular/router";
import { CommonModule } from "@angular/common";
import { ReactiveFormsModule } from "@angular/forms";

import { MaterialModule } from "../material/material.module";
import { ThiefRoutingModule } from './thief-routing.module';

import { ThiefComponent } from './thief.component';
import { ThiefDetailsComponent } from "./thief-details/thief-details.component";
import { ThiefEditComponent } from "./thief-edit/thief-edit.component";
import { ThiefListComponent } from "./thief-list/thief-list.component";
import { ThiefItemComponent } from "./thief-list/thief-item/thief-item.component";

const components = [
  ThiefComponent,
  ThiefDetailsComponent,
  ThiefEditComponent,
  ThiefListComponent,
  ThiefItemComponent
];

@NgModule({
  declarations: components,
  imports: [RouterModule, CommonModule, ReactiveFormsModule, ThiefRoutingModule, MaterialModule],
})
export class ThiefModule {}
