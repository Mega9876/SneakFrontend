import { Routes } from '@angular/router';
import { Home } from './home';
import { Collection } from './collection';
import { Storefront } from './storefront';
import { AdminLayout } from './admin-layout';
import { AdminPage } from './admin-page';

export const routes: Routes = [
  {
    path: 'administracion', component: AdminLayout,
    children: [
      { path: '', component: AdminPage, data: { section: 'resumen' }, title: 'Vista general — Sneakzone' },
      { path: 'productos', component: AdminPage, data: { section: 'productos' }, title: 'Productos — Administración' },
      { path: 'marcas', component: AdminPage, data: { section: 'marcas' }, title: 'Marcas — Administración' },
      { path: 'inventario', component: AdminPage, data: { section: 'inventario' }, title: 'Inventario — Administración' },
      { path: 'clientes', component: AdminPage, data: { section: 'clientes' }, title: 'Clientes — Administración' },
      { path: 'pedidos', component: AdminPage, data: { section: 'pedidos' }, title: 'Pedidos — Administración' }
    ]
  },
  {
    path: '', component: Storefront,
    children: [
      { path: '', component: Home, title: 'Sneakzone — Move your world' },
      { path: 'coleccion', component: Collection, title: 'Colección — Sneakzone' }
    ]
  },
  { path: '**', redirectTo: '' }
];
