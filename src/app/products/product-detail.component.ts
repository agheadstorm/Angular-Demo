import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router'

import { IProduct } from './product'
import { ProductService } from './product.service'

@Component({
  selector: 'pm-product-detail',
  templateUrl: './product-detail.component.html',
  styleUrls: ['./product-detail.component.css']
})
export class ProductDetailComponent implements OnInit {
  pageTitle: string = 'Product Detail';
  product: IProduct;
  errorMessage: string;

  constructor(private route: ActivatedRoute, 
              private productService: ProductService,
              private router: Router) { }

  ngOnInit(): void {
    let id = +this.route.snapshot.paramMap.get('id');
    //this.pageTitle += `: ${id}`;
    this.productService.getProducts().subscribe({
      next: products => {
        products.forEach(element => {
          if (id == element.productId){
            this.product = element;
            //http products from json file and compare to id, set equal upon match
          }
        });
      },
      error: err => this.errorMessage = err
    });
  }

  onBack(): void{
    this.router.navigate(['/products']);
  }

}
