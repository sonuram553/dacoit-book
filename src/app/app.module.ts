import { NgModule } from "@angular/core";
import { HttpClientModule } from "@angular/common/http";
import { BrowserModule } from "@angular/platform-browser";
import { BrowserAnimationsModule } from "@angular/platform-browser/animations";
import { AngularFireModule } from "@angular/fire";
import { AngularFireAuthModule } from "@angular/fire/auth";

//Custom Module imports
import { AppRoutingModule } from "./app-routing.module";
import { MaterialModule } from "./material/material.module";
import { ThiefModule } from "./thief/thief.module";

//Components imports
import { AppComponent } from "./app.component";
import { HeaderComponent } from "./header/header.component";
import { environment } from "src/environments/environment";

@NgModule({
  declarations: [
    AppComponent,
    HeaderComponent,
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    HttpClientModule,
    AngularFireModule.initializeApp(environment.firebaseConfig),
    AngularFireAuthModule,
    AppRoutingModule,
    MaterialModule,
    ThiefModule
  ],
  bootstrap: [AppComponent]
})
export class AppModule {}
