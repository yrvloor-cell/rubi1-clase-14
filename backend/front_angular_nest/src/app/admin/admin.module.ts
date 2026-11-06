import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { AdminRoutingModule } from './admin-routing.module';
import { PerfilComponent } from './components/perfil/perfil.component';
import { ClienteComponent } from './components/cliente/cliente.component';
import { RolesComponent } from './components/roles/roles.component';
import { UsuariosComponent } from './components/usuarios/usuarios.component';
import { AppLayoutModule } from './layout/app.layout.module';
import { InventarioModule } from './inventario/inventario.module';
import { PedidoModule } from './pedido/pedido.module';

@NgModule({
  declarations: [
    PerfilComponent,
    ClienteComponent,
    RolesComponent,
    UsuariosComponent
  ],
  imports: [
    CommonModule,
    AdminRoutingModule,
    AppLayoutModule,
    InventarioModule,
    PedidoModule
  ]
})
export class AdminModule {}
