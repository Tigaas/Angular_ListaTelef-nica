import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { Observable } from 'rxjs';
import { Contatos } from './contatos';

@Injectable({
  providedIn: 'root'
})
export class ContatosService {
  apiUrl = 'http://localhost:3000/contatos';

  constructor(private http: HttpClient) { }
  getAll(): Observable<Contatos[]>{
    return this.http.get<Contatos[]>(this.apiUrl)
  }
  save(contatos:Contatos): Observable<Contatos>{
    return this.http.post<Contatos>(this.apiUrl, contatos);
  }
  delete(contatos:Contatos): Observable<void>{
    return this.http.delete<void>(`${this.apiUrl}/${contatos.id}`);
  }
  update(contatos:Contatos): Observable<Contatos>{
    return this.http.put<Contatos>(`${this.apiUrl}/${contatos.id}`,contatos);
  }
}
