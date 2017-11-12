import { NgModule }                 from '@angular/core';
import { RouterModule, Routes }     from '@angular/router';

import { ClientComponent }          from "../client/client.component";
import { ClientsComponent }         from "../clients/clients.component";
import { VirementsComponent }       from "../virements/virements.component";
import { VirementsclientComponent } from "../virementsclient/virementsclient.component";

const clientsRoutes: Routes = [
    { path: 'clients', component: ClientsComponent},
    { path: 'client/:id', component: ClientComponent}
    
];

@NgModule({
    imports: [
        RouterModule.forChild(clientsRoutes)
    ],
    exports: [
        RouterModule
    ]
})

export class ClientRoutingModule { }