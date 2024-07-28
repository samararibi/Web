import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

  constructor(private http:HttpClient ) {

   }
   private url='http://127.0.0.1:3000/candidate/';

register(candidate: any){
  return this.http.post(this.url + 'register',candidate);
}




}
