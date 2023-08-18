import { Component } from '@angular/core';
import { ProductI } from 'src/app/models/ProductModel';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Component({
  selector: 'app-product-list',
  templateUrl: './product-list.component.html',
  styleUrls: ['./product-list.component.css'],
})
export class ProductListComponent {
  products$: Observable<ProductI[]> = this.http.get<ProductI[]>(
    'http://localhost:3000/products'
  );

  constructor(
    private http: HttpClient,

  ) {}

 
}
