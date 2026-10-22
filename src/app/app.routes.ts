import { Routes } from '@angular/router';
import { Home } from './home';
import { Collection } from './collection';

export const routes: Routes = [
  { path: '', component: Home, title: 'Sneakzone — Move your world' },
  { path: 'coleccion', component: Collection, title: 'Colección — Sneakzone' },
  { path: '**', redirectTo: '' }
];
