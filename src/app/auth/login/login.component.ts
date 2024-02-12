import {Component, OnInit} from '@angular/core';
import { FormBuilder,Validators } from '@angular/forms';
import {Router} from "@angular/router";
import {LoginService} from "../../service/auth/login.service";
import {LoginRequest} from "../../service/auth/loginRequest";

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrl: './login.component.css'

})
export class LoginComponent implements OnInit{
  loginError: string =""
  loginForm=this.formBuilder.group({
    userDoc:['1013671072', Validators.required], //Valida los campos
    //userDoc:['1013671072',[Validators.email,Validators.minLength(8)]], //Valida los campos
    password:['',Validators.required],
  })
  constructor(private formBuilder: FormBuilder, private router: Router, private logingService: LoginService) {
  }

  get userDoc(){
    return this.loginForm.controls.userDoc;
  }

  get password(){
    return this.loginForm.controls.password;
  }
  login(){ //Validador de sesion - Ira en conjunto con el manejador de errores.
    if(this.loginForm.valid){
      this.logingService.login(this.loginForm.value as LoginRequest).subscribe({
          next:(userData) => {
            console.log(userData)
          },
          error: (errorData)=> {
            console.error(errorData);
            this.loginError = errorData;
          },

          complete:()=>{
            console.info("Login completo");
            this.router.navigateByUrl('/inicio')
            this.loginForm.reset();
          }
      }); //pasamos el valor que se escribe al servicio
      //console.log("Llamar al servicio del login")

    }
    else{
      this.loginForm.markAllAsTouched();
      alert("Error al ingresar los datos")
    }
  }
  ngOnInit() {
  }
}
