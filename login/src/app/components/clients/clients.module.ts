import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { OrderingPipe }               from "../../pipes/ordering.pipe";

import { ClientService }              from '../../services/clients/client.service';
import { VirementService }            from "../../services/virements/virement.service";
import { LoginService }               from "../../services/authentification/auth.service";

import { ClientComponent }            from "../client/client.component";
import { VirementsclientComponent }   from "../virementsclient/virementsclient.component";

import { ClientRoutingModule }        from './clients-routing.module';

@NgModule({
    imports:[
      CommonModule,
      FormsModule,
      ClientRoutingModule
    ],
    declarations:[
      ClientComponent,
      VirementsclientComponent,
      OrderingPipe
    ],
    providers:[
      ClientService,
      VirementService,
      LoginService
    ]
  })

  export class ClientsModule {}