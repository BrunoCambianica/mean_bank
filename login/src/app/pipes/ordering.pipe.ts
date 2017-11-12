import { Pipe, PipeTransform } from '@angular/core';

@Pipe({
  name: 'ordering'
})
export class OrderingPipe implements PipeTransform {

  transform(noms: any, term: any): any {
    // verifier si la recherche est undefined
    if (term === undefined) return noms;
    //nouveau tableau
    return noms.filter(function(nomSelected){
      return nomSelected.nom.toLowerCase().includes(term.toLowerCase());
    })
  }

}
