import { Injectable } from '@angular/core';
import {HttpClient } from "@angular/common/http";
import { Observable, throwError } from 'rxjs';
import { catchError, retry } from 'rxjs/operators';
import { RootObject, RootObject3 } from './inter';
import { RootObject2 } from './inter';

@Injectable({
  providedIn: 'root'
})
export class PostService {
  API='http://localhost:1337';//Cambiar URL a la ip

  constructor(private http:HttpClient) { }

  Login(Email:string, Password:string){
    return this.http.post(this.API+'/api/auth/local',{
      "identifier": Email,
      "password": Password 
    })
   }
   Registros(): Observable<RootObject>{
    return this.http.get<RootObject>(this.API+'/api/registros');
   }
   PostRegistros(Month:string, Year:string){
    return this.http.post(this.API+'/api/registros',{
      "data":{
        "Month": Month,
        "Year": Year,
        "link":{
        }
    }
    });

   }

   Horarios(Num:number): Observable<RootObject2>{
    return this.http.get<RootObject2>(this.API+'/api/horarios?filters[Registro][$containsi]='+Num+'');
   }

   PostHorarios(Doc:string,CRN:string,D:boolean,L:boolean,Ma:boolean,Mi:boolean,J:boolean,V:boolean,S:boolean,HoraI:string,HoraF:string,Reg:number){
    return this.http.post(this.API+'/api/horarios',{
      "data":{
        "Docente":Doc,
        "CRN": CRN,
        "D": D,
        "L": L,
        "Ma": Ma,
        "Mi": Mi,
        "J": J,
        "V": V,
        "S": S,
        "HORAINICIO": HoraI,
        "HORAFIN": HoraF,
        "Registro": Reg,
        "link":{
        }
    }
    });
   }

PostEntSal(Doc:string,Nombre:string,Fecha:string,Dia:string,Hora:string,Estado:string,Tipo:string,Reg:number){
  return this.http.post(this.API+'/api/ent-sals',{
    "data":{
      "Docente":Doc,
      "Nombre": Nombre,
      "Fecha": Fecha,
      "Dia": Dia,
      "Hora": Hora,
      "Estado": Estado,
      "Tipo": Tipo,
      "Registro": Reg,
      "link":{
      }
  }
  });
 }
 EntSal(Num:number): Observable<RootObject3>{
  return this.http.get<RootObject3>(this.API+'/api/ent-sals?filters[Registro][$containsi]='+Num+'');
 }
 EntSalInvalid(Num:number): Observable<RootObject3>{
  return this.http.get<RootObject3>(this.API+'/api/ent-sals?filters[Registro][$containsi]='+Num+'&&filters[Tipo][$containsi]=Invalido');
 }
}
