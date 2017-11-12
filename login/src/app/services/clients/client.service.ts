import { Injectable }     from '@angular/core';
import { Http, Headers }  from '@angular/http';

import { Client }         from '../../models/client';

import 'rxjs/add/operator/map';

@Injectable()
export class ClientService {

  constructor(private http: Http) { }

  getClients()
  {
    return this.http.get('http://localhost:3000/clients')
      .map(res => res.json());
  }

  addClient(newClient)
  {
    var head = new Headers();
    head.append('Content-Type', 'Application/json');
    console.log(newClient)
    return this.http.post('http://localhost:3000/clients', newClient, {headers: head})
      .map(res => res.json());
      
  }

  deleteClient(id)
  {
    return this.http.delete('http://localhost:3000/clients/'+id)
      .map(res => res.json());
  }

  getClient(id){
    return this.http.get('http://localhost:3000/clients/'+id)
      .map(res => res.json());
  }

  updateClient(client){
    var headers = new Headers();
    headers.append('Content-Type', 'application/json');
    return this.http.put('http://localhost:3000/clients/'+client._id, JSON.stringify(client), {headers: headers})
        .map(res => res.json());
}

  getClientTransferts(id){
    return this.http.get('http://localhost:3000/clients/mouvements/'+id)
      .map(res => res.json());
  }

}
