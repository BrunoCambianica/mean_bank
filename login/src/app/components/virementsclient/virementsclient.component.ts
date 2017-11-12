import { Component, OnInit }                from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { VirementService }                  from "./../../services/virements/virement.service";
import { ClientService }                    from "./../../services/clients/client.service";

import { Client }                           from '../../models/client';
import { Mouvement }                        from "../../models/mouvement";

import 'rxjs/add/operator/switchMap';

@Component({
  selector:     'app-virementsclient',
  templateUrl:  './virementsclient.component.html',
  styleUrls:    ['./virementsclient.component.css'],
  providers:    [VirementService ]
})

export class VirementsclientComponent implements OnInit {
  clients: Client[];
  client$: any;
  mouvements: Mouvement[];

  _id: String;
  nom: String;
  prenom: String;
  username: String;
  password: String;
  solde: Number;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private virementService: VirementService,
    private clientService: ClientService
  ) {}

  ngOnInit() {
    let id = this.route.snapshot.paramMap.get('id');
    this.client$ = this.clientService.getClient(id);
    this.clientService.getClientTransferts(id).subscribe(mouvements => this.mouvements = mouvements);
    console.log(this.mouvements)
    // this.client$ = this.route.paramMap
    // .switchMap((params: ParamMap) =>
    //   this.clientService.getClient(params.get('id')));
  }
  

  goToClients(){
    this.router.navigate(['/clients']);
  }

  modifyClient(theClient){
    let aboutToBeModifiedClient = {
      _id : theClient._id,
      nom: this.nom, 
      prenom: this.prenom, 
      username: this.username, 
      password: this.password,
      solde: theClient.solde
    };

    this.clientService.updateClient(aboutToBeModifiedClient).subscribe(data =>{
      console.log(aboutToBeModifiedClient)
    })
  }

  deleteTransfert(id){
    let mouvements = this.mouvements;

    this.virementService.deleteTransfert(id).subscribe(data =>{
      if(data.n == 1){
        for(var i = 0;i < mouvements.length;i++){
            if(mouvements[i]._id == id){
                mouvements.splice(i, 1);
            }
        }
    }
    })
  }
}
