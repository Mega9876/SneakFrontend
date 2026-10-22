import { Component, signal } from '@angular/core';
import { FormsModule } from '@angular/forms';

@Component({
  selector: 'app-collection',
  imports: [FormsModule],
  templateUrl: './collection.html',
  styleUrl: './collection.css'
})
export class Collection {
  protected query = '';
  protected brand = '';
  protected maxPrice = 0;
  protected inStock = false;
  protected sort = 'featured';
  protected readonly searched = signal(false);

  protected search(): void {
    this.searched.set(true);
  }

  protected clearFilters(): void {
    this.query = '';
    this.brand = '';
    this.maxPrice = 0;
    this.inStock = false;
    this.searched.set(false);
  }
}
