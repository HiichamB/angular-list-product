import { Component } from '@angular/core';
import { ProductService } from '../../services/product.service';
import { Product } from '../../models/product.model';
import { CommonModule } from '@angular/common';
import { FormsModule } from '@angular/forms';
import { CardProductComponent } from '../card-product/card-product.component';

@Component({
  selector: 'app-list-products',
  standalone: true,
  imports: [CommonModule, FormsModule, CardProductComponent],
  templateUrl: './list-products.component.html',
  styleUrl: './list-products.component.scss',
})
export class ListProductsComponent {
  loading = true;
  productsList: any[] = [];
  filteredProducts: any[] = [];
  searchText: string = '';
  sortDirection: 'asc' | 'desc' = 'asc';
  constructor(private productService: ProductService) {}

  ngOnInit(): void {
    this.getListProducts();
  }

  getListProducts(): void {
    this.productService.getProducts().subscribe({
      next: (data: Product[]) => {
        this.productsList = data;
        this.sortAndFilter();
        this.loading = false;
      },
      error: () => {
        console.error('Erreur');
        this.loading = false;
      },
    });
  }

  sortAndFilter(): void {
    const filtered = this.productsList.filter((product) =>
      product.title.toLowerCase().includes(this.searchText.toLowerCase())
    );

    this.filteredProducts = filtered.sort((a, b) =>
      this.sortDirection === 'asc'
        ? a.title.localeCompare(b.title)
        : b.title.localeCompare(a.title)
    );
  }

  onSearchChange(): void {
    this.sortAndFilter();
  }

  toggleSortDirection(): void {
    this.sortDirection = this.sortDirection === 'asc' ? 'desc' : 'asc';
    this.sortAndFilter();
  }
}
