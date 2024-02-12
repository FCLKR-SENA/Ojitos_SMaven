import { Injectable } from '@angular/core';
import {LoginRequest} from "./loginRequest";
import {HttpClient, HttpErrorResponse} from "@angular/common/http";
import {catchError, Observable, throwError, BehaviorSubject, tap} from "rxjs";
import {User} from "./user";

@Injectable({
  providedIn: 'root'
})
export class LoginService {
  //***************************ESTADO INICIAL *************************************************
  currentUserLoginOn: BehaviorSubject<boolean>=new BehaviorSubject<boolean>(false); //se asigna el valor inicial
  currentUserData: BehaviorSubject<User> = new BehaviorSubject<User>({id: 0, doc:''}) //Mantiene los datos de los usuarios
  constructor(private http: HttpClient) { }

  //************************MANEJADOR DE ERRORES*************************************-->
  login(credential:LoginRequest):Observable<User>{
    return this.http.get<User>('././assets/data.json').pipe(
      tap((userData: User)=>{               //Mantiene un proceso mientras se hace el "observable"
        this.currentUserData.next(userData);
        this.currentUserLoginOn.next(true) //Cambia y Conservara el estado por algun tiempo luego de inciar sesion
    }),
      catchError(this.handleError)
    );
    //console.log(credential);
  }
  private handleError (error: HttpErrorResponse) {
    if(error.status==0){
      console.error('Se ha producido un error',error.error)
    }
    else {
      console.error('Backend retorno el codigo de estado' , error.status,error.error)
    }

    return throwError(()=> new Error('algo fallo. Por favor intente nuevamente'))
  }//Manejador de errores

  //********************************************************************************

  get userData():Observable<User>{
    return this.currentUserData.asObservable();
  }

  get userLoginOn():Observable<boolean>{
    return this.currentUserLoginOn .asObservable();
  }
}
