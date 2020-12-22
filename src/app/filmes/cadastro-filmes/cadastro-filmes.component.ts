
import { Component, OnInit } from '@angular/core';
import {FormBuilder, FormGroup, Validators} from '@angular/forms';
import { MatDialog } from '@angular/material/dialog';
import { ActivatedRoute, Router } from '@angular/router';

import { FilmesService } from 'src/app/core/filmes.service';
import { AlertaComponent } from 'src/app/shared/components/alerta/alerta.components';
import { ValidarCamposService } from 'src/app/shared/components/campos/validar-campos.service';
import { Alerta } from 'src/app/shared/models/alerta';
import { Filme } from 'src/app/shared/models/filme';

@Component({
  selector: 'dio-cadastro-filmes',
  templateUrl: './cadastro-filmes.component.html',
  styleUrls: ['./cadastro-filmes.component.scss']
})
export class CadastroFilmesComponent implements OnInit {
  
  id: number;
  cadastro: FormGroup;
  generos: Array<string>;
  

  constructor(public validacao: ValidarCamposService,
              public dialog: MatDialog,
              private fb: FormBuilder,
              private filmeService: FilmesService,
              private router: Router,
              private activatedRoute: ActivatedRoute 
              ) { }

  get f() {
    return this.cadastro.controls;
  }

  ngOnInit(): void {

    this.id = this.activatedRoute.snapshot.params['id'];
    if(this.id) {
      this.filmeService.visualizar(this.id)
      .subscribe((filme: Filme) => this.criarFormulario(filme));
    } else {
      this.criarFormulario(this.criarFilmeEmBranco());
    }

    this.generos = [
      'Ação',
      'Romance',
      'Aventura',
      'Terror',
      'Ficção cientifica',
      'Comédia',
      'Drama'
    ];
    
  }

  submit(): void {
    this.cadastro.markAllAsTouched();
    if (this.cadastro.invalid) {
      return;
    }
    
    const filme = this.cadastro.getRawValue() as Filme;
    if (this.id) {
      filme.id = this.id;
      this.editar(filme);
    }else {
      this.salvar(filme);
    }
  }

  reiniciarForm(): void{
    this.cadastro.reset();
  }

  private criarFormulario(filme: Filme): void {
    this.cadastro = this.fb.group({
      titulo:[filme.titulo, [Validators.required, Validators.minLength(2), Validators.maxLength(256)]],
      urlFoto: [filme.urlFoto, [Validators.minLength(10)]],
      dtLancamento: [filme.dtLancamento, [Validators.required]],
      descricao: [filme.descricao],
      nota: [filme.nota, [Validators.required, Validators.min(0), Validators.max(10)]],
      urlIMDb: [filme.urlIMDb, [Validators.minLength(10)]],
      genero: [filme.genero, [Validators.required]]
    });
  }

  private criarFilmeEmBranco(): Filme {
    return {
      id: null,
      titulo: null,
      urlFoto: null,
      dtLancamento: null,
      descricao: null,
      nota: null,
      urlIMDb: null,
      genero: null
    }as Filme
  }

  private salvar(filme: Filme): void {
     this.filmeService.salvar(filme).subscribe(() => {
       const config = {
         data: {
          btnSucesso: 'Ir para a listagem',
          btnCancelar: 'Cadastrar um novo filme',
          corBtnCancelar: 'primary',
          possuirBtnFechar: true
         } as Alerta
       };
       const dialogRef = this.dialog.open(AlertaComponent, config);
       dialogRef.afterClosed().subscribe((opcao: boolean) => {
         if(opcao) {
           this.router.navigateByUrl('filmes');
         } else {
           this.reiniciarForm();
         }
       });
     },
     () => {
      const config = {
        data: {
         titulo: 'Erro ao Salvar o Registro!',
         descricao:'Não conseguimos salvar seu registro, favor tentar novamente mais tarde.',
         corBtnSucesso: 'warn',
         btnSucesso: 'Fechar',
        } as Alerta
     };
      this.dialog.open(AlertaComponent, config);
    });
  }
  private editar(filme: Filme): void {
    this.filmeService.editar(filme).subscribe(() => {
      const config = {
        data: {
         descricao: 'Seu registro foi atualizado com sucesso',
         btnSucesso: 'Ir para a listagem',
        } as Alerta
      };
      const dialogRef = this.dialog.open(AlertaComponent, config);
      dialogRef.afterClosed().subscribe(() => this.router.navigateByUrl('filmes'));  
    },
    () => {
     const config = {
       data: {
        titulo: 'Erro ao editar o Registro!',
        descricao:'Não conseguimos editar seu registro, favor tentar novamente mais tarde.',
        corBtnSucesso: 'warn',
        btnSucesso: 'Fechar',
       } as Alerta
    };
     this.dialog.open(AlertaComponent, config);
   });
 }
}
