import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../../service/auth/login.service";

@Component({
  selector: 'app-nav',
  templateUrl: './nav.component.html',
  styleUrl: './nav.component.css'
})
export class NavComponent implements OnInit, OnDestroy{ //Se implementa "OnDestroy" para cerrar la sesion.
userLoginOn: boolean=false //Especificamos el estado al carga la pagina y este es un "sin login"

  constructor(private loginService : LoginService) {
  }

  //***********************CIERRA LA SESION*************************************
  ngOnDestroy(): void {
    this.loginService.currentUserLoginOn.unsubscribe();
    }

    //*********************************************************************************
  ngOnInit(): void{
    this.loginService.currentUserLoginOn.subscribe(

      {
        next:(userLoginOn)=>{
          this.userLoginOn=userLoginOn;
        }

      }
    )
  }

}
