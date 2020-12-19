import { Component, OnInit } from '@angular/core';

import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-listagem-filmes',
  templateUrl: './listagem-filmes.component.html',
  styleUrls: ['./listagem-filmes.component.scss']
})
export class ListagemFilmesComponent implements OnInit {

  filmes: Filme[];

  constructor(private filmeService: FilmesService) { }

  ngOnInit() {
       this.filmeService.listar().subscribe((filmes: Filme[]) => this.filmes = filmes);
  }

  

}
