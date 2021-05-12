import { RestApiService } from './../service/rest-api.service';
import { Utilisateur } from './../model/utilisateur.model';
import { Component, OnInit } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ModalDismissReasons, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import Swal from 'sweetalert2';
@Component({
  selector: 'app-utilisateur',
  templateUrl: './utilisateur.component.html',
  styleUrls: ['./utilisateur.component.css']
})
export class UtilisateurComponent implements OnInit {
  utilisateurs : Utilisateur[];
  loginForm:FormGroup;
  isUpdate:boolean=false;
  currentIndex:any;
  closeResult: string;
  submitted = false;

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
      "value":"Masculin"
    },
    {
      "name":"Féminin",
      "value":"Féminin"
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
  }

  initForm(content?){
    this.isUpdate=false;
    this.loginForm = this.fb.group({
      nom: ['', Validators.required],
      prenom: ['', Validators.required],
      telephone: ['', Validators.required],
      email: ['', Validators.required],
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
      telephone: [val.telephone, Validators.required],
      email: [val.email, Validators.required],
      piece: [val.piece, Validators.required],
      numeropiece: [val.numeropiece, Validators.required],
      sexe: [val.sexe, Validators.required],
      paysNais: [val.paysNais, Validators.required],
      adresse: [val.adresse, Validators.required],
      datenais: [val.datenais, Validators.required],
    });

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
    this.restapi.addUtilisateurs(this.loginForm.value)
  } else{
    this.restapi.updateUtilisateurs(this.loginForm.value,this.currentIndex);
    this.initForm();
  }


  Swal.fire({
    title: 'Hurray!!',
    text:   this.loginForm.value.nom+" has been added successfully",
    icon: 'success'
  });


    // this.ngOnInit();
    this.modalService.dismissAll();
    this.utilisateurs = this.restapi.getUtilisateurs();
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
    if(confirm('Are you sure you want to delete this task?')) {
      this.restapi.deleteUtilisateurs(utilisateurs);
    }
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
 }


}
