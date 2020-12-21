import { Injectable } from '@angular/core';
import { HttpClient, HttpParams } from '@angular/common/http';

import { Observable } from 'rxjs';
import { Filme } from '../shared/models/filme';
import { ConfigPrams } from '../shared/models/config-prams';
import { ConfigParamsService } from './config-params.service';


const url = " http://localhost:3000/filmes/";

@Injectable({
  providedIn: 'root'
})
export class FilmesService {

  constructor(private http: HttpClient,
              private configService: ConfigParamsService) { }

  salvar(filme: Filme): Observable<Filme>{
     return this.http.post<Filme>(url, filme);
  }

  listar(config: ConfigPrams): Observable<Filme[]> {
    const ConfigPrams = this.configService.configurarParamentros(config);
    return this.http.get<Filme[]>(url, {params: ConfigPrams});
  }
}
