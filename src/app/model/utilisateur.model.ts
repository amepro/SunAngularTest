export class Utilisateurs {
  constructor(
    public id: number,
    public nom: string,
    public prenom: string,
    public telephone: string,
    public email: string,
    public piece: string,
    public numeropiece: string,
    public sexe: string,
    public paysNais: string,
    public adresse : string,
    public datenais : Date,
  ) {
  }
}
