import { Component, OnInit }  from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ClientService }      from './../../services/clients/client.service';
import { VirementService }    from "./../../services/virements/virement.service";

import { Client }             from '../../models/client';
import { Mouvement }          from "../../models/mouvement";


@Component({
  selector: 'app-client',
  templateUrl: './client.component.html',
  styleUrls: ['./client.component.css'],
  providers: [ClientService, VirementService]
})
export class ClientComponent implements OnInit {
  clients: Client[];

  nom:String;
  prenom:String;
  solde:Number;
  username:String;
  password: String;

  constructor(
    private clientService: ClientService,
    private router: Router
  ) {}

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => this.clients = clients);
    
  }

  addClient(){
    let newClient = {
      nom: this.nom,
      prenom: this.prenom,
      solde: this.solde || 0,
      username: this.username,
      password: this.password
    }

    this.clientService.addClient(newClient)
        .subscribe(client => {
            this.clients.push(client);
            this.ngOnInit();
            this.router.navigate(['/clients']);
        });
  }

  

}
