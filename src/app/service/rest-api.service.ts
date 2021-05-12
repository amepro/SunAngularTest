import { Utilisateur } from './../model/utilisateur.model';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class RestApiService {
  utilisateurs:Utilisateur[];

  constructor() { }

  getUtilisateurs() {
    if(localStorage.getItem('utilisateurs') === null) {
      this.utilisateurs = [];
    } else {
      this.utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'));
    }
    return this.utilisateurs;
  }

  addUtilisateurs(utilisateur: Utilisateur) {
    this.utilisateurs.push(utilisateur);
    let utilisateurs = [];
    if(localStorage.getItem('utilisateurs') === null) {
      utilisateurs = [];
      utilisateurs.push(utilisateur);
      localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    } else {
      utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'));
      utilisateurs.push(utilisateur);
      localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
    }
  }


  updateUtilisateurs(oldUtil, index){
      let utilisateurs = JSON.parse(localStorage.getItem('utilisateurs'));
      utilisateurs[index]=oldUtil
      localStorage.setItem('utilisateurs', JSON.stringify(utilisateurs));
   }



  deleteUtilisateurs(utilisateur: Utilisateur) {
    for (let i = 0; i < this.utilisateurs.length; i++) {
      if (utilisateur == this.utilisateurs[i]) {
        this.utilisateurs.splice(i, 1);
        localStorage.setItem('utilisateurs', JSON.stringify(this.utilisateurs));
      }
    }
  }

}
