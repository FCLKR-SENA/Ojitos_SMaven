import {Component, OnDestroy, OnInit} from '@angular/core';
import {LoginService} from "../../service/auth/login.service";
import {User} from "../../service/auth/user";

@Component({
  selector: 'app-dashboard',
  templateUrl: './dashboard.component.html',
  styleUrl: './dashboard.component.css'
})
export class DashboardComponent implements OnInit, OnDestroy{
  userLoginOn: boolean=false //Especificamos el estado al carga la pagina y este es un "sin login"
  userData?:User;
  constructor(private loginService: LoginService) {
  }

  ngOnDestroy(): void {
    this.loginService.currentUserData.unsubscribe();
    this.loginService.currentUserLoginOn.unsubscribe();
    }

  //*****************TRAE LOS DATOS DESDE EL .TS CON "next()" *****************************************
  ngOnInit() {
    this.loginService.currentUserLoginOn.subscribe(
      {
        next:(userLoginOn) =>{
          this.userLoginOn=userLoginOn;
    }
      }

    )

    this.loginService.currentUserData.subscribe(
      {
        next: (userData)=>{
          this.userData=userData;
        }

      }

    )

  }
}
