import { NgModule }                                         from '@angular/core';
import { HttpModule }                                       from '@angular/http';
import { FormsModule, FormGroup, FormBuilder, Validators }  from '@angular/forms';
import { BrowserModule }                                    from '@angular/platform-browser';

import { AppComponent }                                     from './app.component';
import { PageNotFoundComponent }                            from "./components/not-found.component";
import { ClientsComponent }                                 from './components/clients/clients.component';
import { VirementComponent }                                from './components/virement/virement.component';
import { VirementsComponent }                               from './components/virements/virements.component';
import { LoginComponent }                                   from './components/auth/auth.component';

import { AppRoutingModule }                                 from './app-routing.module';
import { ClientsModule }                                    from "./components/clients/clients.module";
import { ClientRoutingModule }                              from './components/clients/clients-routing.module';


@NgModule({
  declarations: [
    AppComponent,
    ClientsComponent,
    VirementsComponent,
    PageNotFoundComponent,
    VirementComponent,
    LoginComponent,
  ],
  imports: [
    BrowserModule,
    HttpModule,
    FormsModule,
    ClientsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
