import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';

const routes: Routes = [
  { path: '', loadChildren: () => import('./listar/listar.module').then(m => m.ListarModule) },
  { path: 'cadastrar', loadChildren: () => import('./cadastrar/cadastrar.module').then(m => m.CadastrarModule) },
  { path: 'editar/:id', loadChildren: () => import('./cadastrar/cadastrar.module').then(m => m.CadastrarModule) },
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class ProdutoRoutingModule { }
