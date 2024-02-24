import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from '../environments/environment.development';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class GifService {

  constructor(private http:HttpClient) {  }

  getGifs():Observable<any>{
    return this.http.get(environment.apiUrl)
  }

  

  search(searchWord?:string):Observable<any>{
    return this.http.get(`${environment.apiUrl}${'?keyword='}${searchWord}`)
  }

}
