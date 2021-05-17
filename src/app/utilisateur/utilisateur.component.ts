import { RestApiService } from './../service/rest-api.service';
import { Utilisateur } from './../model/utilisateur.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs : Utilisateur[];
  loginForm:FormGroup;
  isUpdate:boolean=false;
  currentIndex:any;
  closeResult: string;
  submitted = false;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  phoneRegExp = /^(221|00221|\+221)?(77|78|75|70|76|33)[0-9]{7}$/mg;

  // phoneRegExp = /^[\+]?[(]?[0-9]{3}[)]?[-\s\.]?[0-9]{3}[-\s\.]?[0-9]{4,6}$/im;

  // prenomRegExp = /^(([A-Za-z]+[\-\']?)*([A-Za-z]+)?\s)+([A-Za-z]+[\-\']?)*([A-Za-z]+)?$/;

numeroPieceError="";

  tabPiece = [
    {
      "name":"CNI",
      "value":"CNI"
    },
    {
      "name":"CEDEAO",
      "value":"CEDEAO"
    },
    {
      "name":"PASSPORT",
      "value":"PASSPORT"
    }
  ]

  tabSexe = [
    {
      "name":"Masculin",
      "value":"M"
    },
    {
      "name":"Féminin",
      "value":"F"
    }
  ]

  tabNais = [
    {
      "name":"SENEGAL",
      "value":"SENEGAL"
    },
    {
      "name":"GUINEE",
      "value":"GUINEE"
    },
    {
      "name":"MALI",
      "value":"MALI"
    },
    {
      "name":"TOGO",
      "value":"TOGO"
    }
  ]

  constructor(private restapi:RestApiService, private modalService:NgbModal,private fb: FormBuilder) { }


  ngOnInit(): void {
    this.utilisateurs = this.restapi.getUtilisateurs();
    this.initForm();
    // console.log("d",this.loginForm.get("sexe").value);
  }


  checkNumeroPiece(){
     if(this.loginForm.get("sexe").value != '' && this.loginForm.get("piece").value != '' && this.loginForm.get("numeropiece").value != ''){
     let valNumeroPice= (this.loginForm.get("numeropiece").value).toString();
     let valPice= this.loginForm.get("piece").value;
     this.numeroPieceError="";

     //  Pour CNI
     if(valPice == "CNI" ){
       if((valNumeroPice.length == 14 || valNumeroPice.length == 13)){
          if(this.loginForm.get("sexe").value == "M"){
           let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
            if(a != "1"){
              this.numeroPieceError="Le numéro de pièce doit commencer par 1 pour un homme";
            }else{
              this.numeroPieceError="";
            }
          } else if(this.loginForm.get("sexe").value == "F"){
            let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
            if(a != "2"){
              this.numeroPieceError="Le numéro de pièce doit commencer par 2 pour une femme";
            }else{
              this.numeroPieceError="";
            }
          }

       }else{
        this.numeroPieceError="Le numéro de pièce doit contenir 13 ou 14 caractères pour le CNI";
       }
    }

      //  Pour CEDEAO

    else if(valPice == "CEDEAO")  {
    if(valNumeroPice.length == 17){
        if(this.loginForm.get("sexe").value == "M"){
         let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
          if(a != "1"){
            this.numeroPieceError="Le numéro de pièce doit commencer par 1 pour un homme";
          }else{
            this.numeroPieceError="";
          }
        }else if(this.loginForm.get("sexe").value == "F"){
          let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
          if(a != "2"){
            this.numeroPieceError="Le numéro de pièce doit commencer par 2 pour une femme";
          }else{
            this.numeroPieceError="";
          }
        }

     }else{
      this.numeroPieceError="Le numéro de pièce doit contenir 17 caractères pour la CEDEAO";
     }
    }
     //  Pour Passport

     else {
      if(valNumeroPice.length == 8){
        if(this.loginForm.get("sexe").value == "M"){
        let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
          if(a != "1"){
            this.numeroPieceError="Le numéro de pièce doit commencer par 1 pour un homme";
          }else{
            this.numeroPieceError="";
          }
        }else if(this.loginForm.get("sexe").value == "F"){
          let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
          if(a != "2"){
            this.numeroPieceError="Le numéro de pièce doit commencer par 2 pour une femme";
          }else{
            this.numeroPieceError="";
          }
        }

      }else{
        this.numeroPieceError="Le numéro de pièce doit contenir 8 caractères pour le passport";
      }
     }
    }


     console.log("error",this.numeroPieceError);

  }

  initForm(content?){
    this.isUpdate=false;
    this.submitted = false;
    this.loginForm = this.fb.group({
      nom: ['', [Validators.required]],
      prenom: ['', Validators.required],
      telephone: ['', [Validators.required, Validators.pattern(this.phoneRegExp)]],
      email: ['',[Validators.required, Validators.pattern(this.emailPattern)]],
      piece: ['', Validators.required],
      numeropiece: ['', Validators.required],
      sexe: ['', Validators.required],
      paysNais: ['', Validators.required],
      adresse: ['', Validators.required],
      datenais: ['', Validators.required],
    });
    if(content){
      this.open(content);
    }




  }

  updateForm(val, index, content){
    this.loginForm = this.fb.group({
      nom: [val.nom, Validators.required],
      prenom: [val.prenom, Validators.required],
      telephone: [val.telephone, [Validators.required, Validators.pattern(this.phoneRegExp)]],
      email: [val.email,[Validators.required, Validators.pattern(this.emailPattern)]],
      piece: [val.piece, Validators.required],
      numeropiece: [val.numeropiece, Validators.required],
      sexe: [val.sexe, Validators.required],
      paysNais: [val.paysNais, Validators.required],
      adresse: [val.adresse, Validators.required],
      datenais: [val.datenais, Validators.required],
    });
    this.submitted = false;
    this.isUpdate=true;
    this.currentIndex=index;
    this.open(content);
  }

  onSubmit(){
    this.submitted = true;
    if (this.loginForm.invalid) {
      return;
  }
    if(!this.isUpdate){




    Swal.fire({
      title: 'Êtes-vous sûr(e)?',
      text: "De bien vouloir Ajouter cette utilisateur!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Ajouter!',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.restapi.addUtilisateurs(this.loginForm.value);
        Swal.fire(
          'Ajouter!',
          'l\'utilisateur a été Ajouter avec succés.',
          'success'
        );
        this.modalService.dismissAll();
        this.utilisateurs = this.restapi.getUtilisateurs();
      }
    })
  } else{

    Swal.fire({
      title: 'Êtes-vous sûr(e) de bien vouloir modifier cet utilisateur?',
      showDenyButton: true,
      showCancelButton: true,
      confirmButtonText: `Modifier`,
      denyButtonText: `Annuler`,
    }).then((result) => {
      /* Read more about isConfirmed, isDenied below */
      if (result.isConfirmed) {
        this.restapi.updateUtilisateurs(this.loginForm.value,this.currentIndex);
        this.utilisateurs = this.restapi.getUtilisateurs();
        Swal.fire('Utilisateur modifié avec succés!', '', 'success');
        this.modalService.dismissAll();
    this.utilisateurs = this.restapi.getUtilisateurs();
      } else if (result.isDenied) {
        Swal.fire("l'utilisateur n'a pas été ajouté" ,'', 'info')
      }
    });
  }

  }

  get formControls(){
    return this.loginForm.controls;
  }


  open(content) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true,
    backdrop: 'static',
    size: 'lg'}).result.then((result) => {
      this.closeResult = `Closed with: ${result}`;
    }, (reason) => {
      this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
    });
  }

  private getDismissReason(reason: any): string {
    if (reason === ModalDismissReasons.ESC) {
      return 'by pressing ESC';
    } else if (reason === ModalDismissReasons.BACKDROP_CLICK) {
      return 'by clicking on a backdrop';
    } else {
      return `with: ${reason}`;
    }
  }

  deleteUtilisateur(utilisateurs: Utilisateur) {
    // if(confirm('Are you sure you want to delete this task?')) {
    //   this.restapi.deleteUtilisateurs(utilisateurs);
    // }

    Swal.fire({
      title: 'Êtes-vous sûr(e)?',
      text: "De bien vouloir supprimer cet utilisateur!",
      icon: 'warning',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Oui, Supprimer!'
    }).then((result) => {
      if (result.isConfirmed) {
        Swal.fire(
          'Supprimer!',
          'l\'utilisateur a été supprimé avec succés.',
          'success'
        );
        this.restapi.deleteUtilisateurs(utilisateurs);
      }
    })


  }



  openDetails(targetModal, utilisateurs: Utilisateur) {
    this.modalService.open(targetModal, {
     centered: true,
     backdrop: 'static',
     size: 'lg'
   });
    document.getElementById('lnom').setAttribute('value', utilisateurs.nom);
    document.getElementById('lprenom').setAttribute('value', utilisateurs.prenom);
    document.getElementById('ltelephone').setAttribute('value', utilisateurs.telephone);
    document.getElementById('lemail').setAttribute('value', utilisateurs.email);
    document.getElementById('lpiece').setAttribute('value', utilisateurs.piece);
    document.getElementById('lnumeropiece').setAttribute('value', utilisateurs.numeropiece);
    document.getElementById('lsexe').setAttribute('value', utilisateurs.sexe);
    document.getElementById('lpaysNais').setAttribute('value', utilisateurs.paysNais);
    document.getElementById('ladresse').setAttribute('value', utilisateurs.adresse);
    // document.getElementById('ladresse').setAttribute('value', utilisateurs.datenais);
 }


}
