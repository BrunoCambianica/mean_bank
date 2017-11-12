import { Component, OnInit }  from '@angular/core';
import { DatePipe }           from '@angular/common';

import { VirementService }    from "./../../services/virements/virement.service";
import { ClientService }      from "./../../services/clients/client.service";

import { Mouvement }          from "../../models/mouvement";
import { Client }             from "../../models/client"

@Component({
  selector: 'app-virements',
  templateUrl: './virements.component.html',
  styleUrls: ['./virements.component.css'],
  providers:[VirementService, ClientService ]
})
export class VirementsComponent implements OnInit {

  mouvements: Mouvement[];

  constructor(
    private virementService: VirementService, 
    private clientService: ClientService) { }

  ngOnInit() {
    this.virementService.getTransfers()
      .subscribe(mouvements => this.mouvements = mouvements);
  }

  deleteTransfert(id){
    let mouvements = this.mouvements;
    
    this.virementService.deleteTransfert(id).subscribe(data => {
        if(data.n == 1){
            for(var i = 0;i < mouvements.length;i++){
                if(mouvements[i]._id == id){
                    mouvements.splice(i, 1);
                }
            }
        }
    });
  }
}
