import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-admin-layout',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './admin-layout.html',
  styleUrl: './admin-layout.css'
})
export class AdminLayout {
  protected readonly links = [
    { path: '/administracion', label: 'Resumen', icon: '◫', exact: true },
    { path: '/administracion/productos', label: 'Productos', icon: '◇', exact: false },
    { path: '/administracion/marcas', label: 'Marcas', icon: '◎', exact: false },
    { path: '/administracion/inventario', label: 'Inventario', icon: '▦', exact: false },
    { path: '/administracion/clientes', label: 'Clientes', icon: '♧', exact: false },
    { path: '/administracion/pedidos', label: 'Pedidos', icon: '⇄', exact: false }
  ];
}
