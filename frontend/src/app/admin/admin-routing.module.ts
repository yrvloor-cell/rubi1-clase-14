import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { ClienteComponent } from './components/cliente/cliente.component';

import { PerfilComponent } from './components/perfil/perfil.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { CategoriaComponent } from './inventario/components/categoria/categoria.component';
import { ProductoComponent } from './inventario/components/producto/producto.component';
import { ListaPedidoComponent } from './pedido/components/lista-pedido/lista-pedido.component';
import { AppLayoutComponent } from './layout/app.layout.component';
import { NuevoPedidoComponent } from './pedido/components/nuevo-pedido/nuevo-pedido.component';

const routes: Routes = [
  {
    path: '',
    component: AppLayoutComponent,
    children: [
      { path: '', pathMatch: 'full', redirectTo: 'perfil' },
      { path: 'perfil', component: PerfilComponent },
      { path: 'categoria', component: CategoriaComponent },
      { path: 'producto', component: ProductoComponent },
      { path: 'pedidos', component: ListaPedidoComponent },
      { path: 'nuevo-pedido', component: NuevoPedidoComponent },
      { path: 'clientes', component: ClienteComponent },
      { path: 'roles', component: RolesComponent },
      { path: 'usuarios', component: UsuariosComponent }
    ]
  }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule]
})
export class AdminRoutingModule {}
