import { Component, OnInit, OnDestroy }     from '@angular/core';
import { Router, ActivatedRoute, ParamMap } from '@angular/router';

import { ClientService }                    from "./../../services/clients/client.service";
import { VirementService }                  from "./../../services/virements/virement.service";

import { Mouvement }                        from "../../models/mouvement";
import { Client }                           from "../../models/client"

import { Observable }                       from 'rxjs/Rx'
import Rx from '@reactivex/rxjs';
import 'rxjs/add/operator/map'


@Component({
  selector: 'app-virement',
  templateUrl: './virement.component.html',
  styleUrls: ['./virement.component.css'],
  providers:[VirementService, ClientService]
})

export class VirementComponent implements OnInit, OnDestroy {
  clients: Client[];
  mouvements: Mouvement[];
  client_debiteur: Client;
  client_crediteur: Client;
  montant: number;
  libelle: String;
  type_mouvement: String;

  constructor (
    private virementService:VirementService,
    private clientService:ClientService,
    private router:Router

  ) { }

  ngOnInit() {
    this.clientService.getClients()
      .subscribe(clients => this.clients = clients);
    this.virementService.getTransfers()
    .subscribe(mouvements => this.mouvements = mouvements);
  }

  ngOnDestroy(){}

  transferMoney(){ 
    var _client_crediteur = this.client_crediteur;
    var _client_debiteur = this.client_debiteur;
    var _montant = this.montant;
    var _libelle = this.libelle;
    var _type_mouvement = this.type_mouvement || "ponctuel";

    _client_crediteur.solde = Number(_client_crediteur.solde);
    _client_debiteur.solde = Number(_client_debiteur.solde);
    _montant = Number(_montant);

    if (_type_mouvement == "ponctuel") {
      if (_montant > 0) {
        if (_client_debiteur.solde >= _montant) {
          this.creditClient(_client_crediteur, _montant);
          this.debitClient(_client_debiteur, _montant);
          this.createMouvement(_client_debiteur, _client_crediteur, _libelle, _montant, _type_mouvement);
          this.ngOnInit();
          this.router.navigate(['/virements']);
        }
        else {
          console.log('Le débiteur' + _client_debiteur.nom + 'ne possède pas les fonds suffisant pour le transfert de '+ +_montant +'. Solde : ' + _client_debiteur.solde);
        }   
      } else {
        console.log('Le montant du transfert doit être supérieur à 0')
      }
    } else {
      if (_type_mouvement == "permanent") {
        console.log("permanent")
        if (_montant > 0) {
          if (_client_debiteur.solde >= _montant) {
            let test = Observable.interval(3000).subscribe(x =>{
              this.creditClient(_client_crediteur, _montant);
              this.debitClient(_client_debiteur, _montant);
              this.createMouvement(_client_debiteur, _client_crediteur, _libelle, _montant, _type_mouvement);
            })
          };
        } else  {
            console.log('Le débiteur' + _client_debiteur.nom + 'ne possède pas les fonds suffisant pour le transfert de '+ +_montant +'. Solde : ' + _client_debiteur.solde);
        }} else {
          console.log('Le montant du transfert doit être supérieur à 0')
        }
      }
    }

  creditClient(client: Client, montant: number){
    let client_crediteur = this.client_crediteur;
    let _montant = this.montant;
    _montant = montant; 

    client_crediteur = {
      _id:client._id,
      nom:client.nom,
      prenom:client.prenom,
      username: client.username,
      password: client.password,
      solde:client.solde += montant
    }
    client_crediteur.solde = Number(client_crediteur.solde);
    _montant = Number(_montant);

    this.virementService.updateSoldeClient(client_crediteur)
    .subscribe(data =>{
      client.solde += montant;
    })
  }

  debitClient(client: Client, montant: number){
    let client_debiteur = this.client_debiteur;
    let _montant = this.montant;
    _montant = montant; 

    client_debiteur = {
      _id:client._id,
      nom:client.nom,
      prenom:client.prenom,
      username: client.username,
      password: client.password,
      solde: client.solde -= montant
    }

    client_debiteur.solde = Number(client_debiteur.solde);
    _montant = Number(_montant);

    this.virementService.updateSoldeClient(client_debiteur)
      .subscribe(data =>{
        client.solde;
        montant;
        client.solde -= montant;
      })
  }

  createMouvement(client_d: Client, client_c: Client, libelle: String, montant: number, type_mouvement: String){
    let monMouvement = {
      id_debiteur: client_d._id,
      id_crediteur: client_c._id,
      nom_debiteur: client_d.nom,
      nom_crediteur: client_c.nom,
      prenom_debiteur: client_d.prenom,
      prenom_crediteur: client_c.prenom,
      montant: montant,
      libelle: libelle,
      type_mouvement: type_mouvement,
      date: new Date()
    }

    this.virementService.createTransfert(monMouvement)
    .subscribe(mouvement => {
        this.mouvements.push(mouvement);
    });
  }
}
