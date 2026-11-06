
import { Component, OnInit } from '@angular/core';
import { LayoutService } from './service/app.layout.service';

@Component({
  selector: 'app-menu',
  templateUrl: './app.menu.component.html'
})
export class AppMenuComponent implements OnInit {
  model: any[] = [];

  constructor(public layoutService: LayoutService) {}

  ngOnInit(): void {
    this.model = [
      {
        label: 'Administración',
        items: [
          { label: 'Admin', icon: 'pi pi-fw pi-home', routerLink: ['/admin'] },
          { label: 'Perfil', icon: 'pi pi-fw pi-user', routerLink: ['/admin/perfil'] }
        ]
      },
      {
        label: 'Inventario',
        items: [
          { label: 'Categoría', icon: 'pi pi-fw pi-tags', routerLink: ['/admin/categoria'] },
          { label: 'Producto', icon: 'pi pi-fw pi-box', routerLink: ['/admin/producto'] }
        ]
      },
      {
  label: 'Pedidos',
  items: [
    { label: 'Lista Pedidos', icon: 'pi pi-fw pi-shopping-cart', routerLink: ['/admin/pedidos'] },
    { label: 'Nuevo Pedidos', icon: 'pi pi-fw pi-plus', routerLink: ['/admin/nuevo-pedido'] },
    { label: 'Clientes', icon: 'pi pi-fw pi-users', routerLink: ['/admin/clientes'] }
  ]
},
      {
        label: 'Roles y Usuario',
        items: [
          { label: 'Usuarios', icon: 'pi pi-fw pi-users', routerLink: ['/admin/usuarios'] },
          { label: 'Roles', icon: 'pi pi-fw pi-shield', routerLink: ['/admin/roles'] }
        ]
      }
    ];
  }
}
