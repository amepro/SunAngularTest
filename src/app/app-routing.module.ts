import { UtilisateurComponent } from './utilisateur/utilisateur.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  // {path: '', pathMatch: 'full', redirectTo: 'utilisatueur' },
  {path: 'utilisatueur', component: UtilisateurComponent},
  {path: '', component: UtilisateurComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
