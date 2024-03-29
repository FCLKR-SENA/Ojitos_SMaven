import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import {DashboardComponent} from "./pages/dashboard/dashboard.component";
import {LoginComponent} from "./auth/login/login.component";

const routes: Routes = [
  {path:'',redirectTo: '/inicio',pathMatch:'full'}, //Redirecciona al cargar la pagina
  {path: 'inicio' , component:DashboardComponent}, //Asignar Rutas para la navegacion
  {path: 'iniciar-sesion' , component:LoginComponent}
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
