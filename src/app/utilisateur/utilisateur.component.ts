import { RestApiService } from './../service/rest-api.service';
import { Utilisateurs } from './../model/utilisateur.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
import { Subject } from 'rxjs';
import { NgxSpinnerService } from 'ngx-spinner';




@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.scss']
})
export class UtilisateurComponent implements OnInit {

  dtOptions: any = {};


  // dtTrigger: Subject<any> = new Subject();
  loadSpinner: boolean = false;
  desactiverButton = false;

  currentUser:any;

  btnAjoutSpinner=false


  utilisateurs : Utilisateurs[];

  loginForm:FormGroup;
  isUpdate:boolean=false;
  currentIndex:any;
  currentIndex2:any;
  closeResult: string;
  submitted = false;
  emailPattern = /^(([^<>()\[\]\\.,;:\s@"]+(\.[^<>()\[\]\\.,;:\s@"]+)*)|(".+"))@((\[[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\.[0-9]{1,3}\])|(([a-zA-Z\-0-9]+\.)+[a-zA-Z]{2,}))$/;

  phoneRegExp = /^(221|00221|\+221)?(77|78|75|70|76|33)[0-9]{7}$/mg;


  numeroPieceError="";



  tabPiece = [
    {
      "name":"cni",
      "value":"cni"
    },
    {
      "name":"cedeao",
      "value":"cedeao"
    },
    {
      "name":"passport",
      "value":"passport"
    }
  ]

  tabSexe = [
    {
      "name":"masculin",
      "value":"masculin"
    },
    {
      "name":"feminin",
      "value":"feminin"
    }
  ]

  tabNais = [
    {
      "name":"senegal",
      "value":"senegal"
    },
    {
      "name":"guinee",
      "value":"guinee"
    },
    {
      "name":"mali",
      "value":"mali"
    },
    {
      "name":"togo",
      "value":"togo"
    }
  ]



  constructor(private restapi:RestApiService, private modalService:NgbModal,private fb: FormBuilder,private SpinnerService: NgxSpinnerService) { }


  ngOnInit(): void {
    this.dtOptions = {
      pagingType: 'full_numbers',
      pageLength: 5,
      processing: true,
      language:{url:"//cdn.datatables.net/plug-ins/9dcbecd42ad/i18n/French.json"},
    };
    // this.utilisateurs = this.restapi.getUtilisateurs();
    this.initForm();
    this.getUtilisateurs();

  }


  getUtilisateurs(){
     this.loadSpinner = true;

    // this.restapi.getUtilisateurs().subscribe(response => {
    //   console.log("reponse",response);

    //   if (response['responseCode'] === 200){
    //      this.loadSpinner = false;

    //     this.utilisateurs = response["data"];
    //   }



    // },errors=>{
    //   this.loadSpinner = false;
    // });
  }



  checkNumeroPiece(){
     if(this.loginForm.get("sexe").value != '' && this.loginForm.get("piece").value != '' && this.loginForm.get("numeropiece").value != ''){
     let valNumeroPiece= (this.loginForm.get("numeropiece").value).toString();
     let valPiece= this.loginForm.get("piece").value;
     let valSexe = this.loginForm.get("sexe").value;

     this.numeroPieceError="";

     //  Pour CNI
     if(valPiece == "CNI" ){
       if((valNumeroPiece.length == 14 || valNumeroPiece.length == 13)){
          if(valSexe == "M"){
           let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
            if(a != "1"){
              this.numeroPieceError="Le numéro de pièce doit commencer par 1 pour un homme";
            }else{
              this.numeroPieceError="";
            }
          } else if(valSexe == "F"){
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

    else if(valPiece == "CEDEAO")  {
    if(valNumeroPiece.length == 17){
        if(valSexe == "M"){
         let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
          if(a != "1"){
            this.numeroPieceError="Le numéro de pièce doit commencer par 1 pour un homme";
          }else{
            this.numeroPieceError="";
          }
        }else if(valSexe == "F"){
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
      if(valNumeroPiece.length == 8){
        if(valSexe == "M"){
        let a= (this.loginForm.get("numeropiece").value).toString().charAt(0)
          if(a != "1"){
            this.numeroPieceError="Le numéro de pièce doit commencer par 1 pour un homme";
          }else{
            this.numeroPieceError="";
          }
        }else if(valSexe == "F"){
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
      id:[val.id],
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
      text: "De bien vouloir ajouter cet utilisateur!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler'
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnAjoutSpinner=true;
        this.desactiverButton = true;
        this.restapi.addUtilisateurs(this.loginForm.value).subscribe(response=>{
          // console.log("Reponse",response);

          if (response['responseCode'] === 200){
            this.desactiverButton = false;
            this.btnAjoutSpinner=false;
            Swal.fire(
              'Ajouter!',
              'l\'utilisateur a été ajouter avec succés.',
              'success'
            );
            this.utilisateurs.unshift(response["data"]);
            this.modalService.dismissAll();
          }else{
            this.desactiverButton = false;
            this.btnAjoutSpinner=false;
            Swal.fire(
              'Ajouter!',
              response["message"],
              'error'
            );
          }
        },errors=>{
          this.desactiverButton = false;
          this.btnAjoutSpinner=false;
          Swal.fire(
            'Ajouter!',
            errors.error.errors[0].message,
            'error'
          );
        });

      }
    })
  }
    else{

    Swal.fire({
      title: 'Êtes-vous sûr(e)?',
      text: "De bien vouloir modifier cet utilisateur!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer',
      cancelButtonText: 'Annuler',
    }).then((result) => {
      if (result.isConfirmed) {
        this.btnAjoutSpinner=true;
        this.desactiverButton = true;
        this.restapi.updateUtilisateurs(this.loginForm.value).subscribe(response=>{
          if (response['responseCode'] === 200){
            this.desactiverButton = false;
            this.btnAjoutSpinner=false;
            Swal.fire(
              'Modifier!',
              'l\'utilisateur a été modifier avec succés.',
              'success'
            );

             this.utilisateurs[this.currentIndex]=response["data"]

            this.modalService.dismissAll();
          }else{
            this.desactiverButton = false;
            this.btnAjoutSpinner=false;
            Swal.fire(
              'Modifier!',
              'l\'utilisateur n\'a pas été modifier.',
              'error'
            );
          }
        },errors=>{
          this.desactiverButton = false;
          this.btnAjoutSpinner=false;
          Swal.fire(
            'Modifier !',
            errors.error.errors[0].message,
            'error'
          );
        });
      }
    })
  }

  }

  get formControls(){
    return this.loginForm.controls;
  }





  deleteUtilisateur(id,index) {
    Swal.fire({
      title: 'Êtes-vous sûr(e)?',
      text: "De bien vouloir supprimer cet utilisateur!",
      icon: 'question',
      showCancelButton: true,
      confirmButtonColor: '#3085d6',
      cancelButtonColor: '#d33',
      confirmButtonText: 'Confirmer!'
    }).then((result) => {
      if (result.isConfirmed) {
        this.currentIndex2=index;
        this.desactiverButton=true;
        this.btnAjoutSpinner=true;
        this.restapi.deleteUtilisateurs(id).subscribe(
          response=>{
            this.desactiverButton = false;
            this.btnAjoutSpinner=false;
            Swal.fire(
              'Supprimer!',
              'l\'utilisateur a été supprimé avec succés.',
              'success'
            );
            this.utilisateurs.splice(index,1);
            this.currentIndex2=-1
          },errors=>{
            this.desactiverButton = false;
            this.btnAjoutSpinner=false;
            Swal.fire(
              'Suppression!',
              errors.error.errors[0].message,
              'error'
            );
             this.currentIndex2=-1
          }
        );
      }
    })
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

  openDetails(targetModal, utilisateurs: Utilisateurs) {
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
