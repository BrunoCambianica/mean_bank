import { Injectable }     from '@angular/core';
import { Http, Headers }  from "@angular/http";

import { Mouvement }      from "../../models/mouvement";

import 'rxjs/add/operator/map';

@Injectable()
export class VirementService {

  constructor(private http: Http) { }

  getTransfers()
  {
    return this.http.get('http://localhost:3000/mouvements')
      .map(res => res.json());
  }

  createTransfert(newMouvement)
  {
    var head = new Headers();
    head.append('Content-Type', 'Application/json');
    return this.http.post('http://localhost:3000/mouvements', JSON.stringify(newMouvement), {headers: head})
      .map(res => res.json());
  }

  deleteTransfert(id)
  {
    return this.http.delete('http://localhost:3000/mouvements/'+id)
      .map(res => res.json());
  }

  updateSoldeClient(client)
  {
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/clients/'+client._id, JSON.stringify(client), {headers: headers})
    .map(res => res.json());
  }


}
