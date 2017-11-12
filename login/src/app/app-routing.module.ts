import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { PageNotFoundComponent }    from "./components/not-found.component";
import { ClientComponent }          from './components/client/client.component';
import { VirementComponent }        from './components/virement/virement.component';
import { VirementsComponent }       from './components/virements/virements.component';
import { VirementsclientComponent } from "./components/virementsclient/virementsclient.component";
import { LoginComponent }           from "./components/auth/auth.component";

const appRoutes: Routes = [
    { path: 'virements', component: VirementsComponent },
    { path: 'client', component: ClientComponent },
    { path: 'auth', component: LoginComponent },
    { path: 'virement', component: VirementComponent },
    { path: 'virementsclient/:id', component: VirementsclientComponent },
    { path: '',   redirectTo: '/auth', pathMatch: 'full' },
    { path: '**', component: PageNotFoundComponent }
  
  ];

  @NgModule({
    imports: [
      RouterModule.forRoot(
        appRoutes,
        { enableTracing: false } // <-- debugg
      )
    ],
    exports: [
        RouterModule
    ]
  })
  export class AppRoutingModule { }