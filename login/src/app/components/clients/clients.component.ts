import { Component, OnInit }          from '@angular/core';
import { NgModule }                   from '@angular/core';
import { CommonModule }               from '@angular/common';
import { FormsModule }                from '@angular/forms';

import { ClientService }              from '../../services/clients/client.service';
import { VirementService }            from "../../services/virements/virement.service";

import { Client }                     from '../../models/client';
import { Mouvement }                  from "../../models/mouvement";

import { ClientRoutingModule }        from "./clients-routing.module";

@Component({
  selector: 'app-clients',
  templateUrl: './clients.component.html',
  styleUrls: ['./clients.component.css'],
  providers: [ClientService, VirementService]
})

export class ClientsComponent implements OnInit {
  clients: Client[];
  client: Client;

  constructor(
    private clientService: ClientService, 
    private virementService: VirementService
  ) { }

  ngOnInit() {
    this.clientService.getClients().subscribe(clients => this.clients = clients);
  }

  deleteClient(id){
    let clients = this.clients;
    console.log(id)
    this.clientService.deleteClient(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0;i < clients.length;i++){
                if(clients[i]._id == id){
                    clients.splice(i, 1);
                }
            }
        }
    });
  }
}
 