import { Component, OnInit } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { timestamp } from 'rxjs/operators';
import { FilmesService } from 'src/app/core/filmes.service';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-visualizar-filmes',
  templateUrl: './visualizar-filmes.component.html',
  styleUrls: ['./visualizar-filmes.component.scss']
})
export class VisualizarFilmesComponent implements OnInit {
  readonly semFoto = 'https://www.termoparts.com.br/wp-content/uploads/2017/10/no-image.jpg';
  filme: Filme;
  constructor(private activatedRoute: ActivatedRoute,
              private filmesService: FilmesService) { }

  ngOnInit() {
    this.visualizar(this.activatedRoute.snapshot.params['id']);
  }

  private visualizar (id: number): void {
       this.filmesService.visualizar(id).subscribe((filme: Filme) => this.filme = filme);
  }

}
