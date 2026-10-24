import { Component } from '@angular/core';
import { RouterLink, RouterLinkActive, RouterOutlet } from '@angular/router';

@Component({
  selector: 'app-storefront',
  imports: [RouterLink, RouterLinkActive, RouterOutlet],
  templateUrl: './storefront.html',
  styleUrl: './storefront.css'
})
export class Storefront {}
