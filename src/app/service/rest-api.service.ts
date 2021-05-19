import { Utilisateurs } from './../model/utilisateur.model';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  apiUrlUser = 'http://192.168.1.48:9400/api/users';


  utilisateurs:Utilisateurs[];
  httpOptions = {
    headers: new HttpHeaders({
      'Content-Type':  'application/json',
      'Authorization': 'my-auth-token'
    })
  }

  constructor(private http: HttpClient) { }


  getUtilisateurs() {
    return this.http.get(this.apiUrlUser);
  }

  addUtilisateurs(utilisateur)  {
    return this.http.post(this.apiUrlUser, utilisateur);
  }


  updateUtilisateurs( value: any) {
    return this.http.put(this.apiUrlUser+'/'+value.id, value);
  }



  deleteUtilisateurs(id){
    return this.http.delete(this.apiUrlUser+'/'+id);
   }

  // getUtilisateurs() {
  //   if(localStorage.getItem('utilisateurs') === null) {
  //     this.utilisateurs = [];
  //   } else {
  //     this.utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'));
  //   }
  //   return this.utilisateurs;
  // }

  // addUtilisateurs(utilisateur: Utilisateur) {
  //   this.utilisateurs.push(utilisateur);
  //   let utilisateurs = [];
  //   if(localStorage.getItem('utilisateurs') === null) {
  //     utilisateurs = [];
  //     utilisateurs.push(utilisateur);
  //     localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  //   } else {
  //     utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'));
  //     utilisateurs.push(utilisateur);
  //     localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  //   }
  // }


  // updateUtilisateurs(oldUtil, index){
  //     let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'));
  //     utilisateurs[index]=oldUtil
  //     localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
  //  }



  // deleteUtilisateurs(utilisateur: Utilisateur) {
  //   for (let i = 0; i < this.utilisateurs.length; i++) {
  //     if (utilisateur == this.utilisateurs[i]) {
  //       this.utilisateurs.splice(i, 1);
  //       localStorage.setItem('utilisateurs', JSON.stringify(this.utilisateurs));
  //     }
  //   }
  // }

}
