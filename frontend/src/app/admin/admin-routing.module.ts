import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AdminComponent } from './admin.component';

const routes: Routes = [
  { path: '', component: AdminComponent, children: [
      { path: '', redirectTo: 'produto', pathMatch: 'full' },
      { path: 'produto', loadChildren: () => import('./produto/produto.module').then(m => m.ProdutoModule) },
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule { }
