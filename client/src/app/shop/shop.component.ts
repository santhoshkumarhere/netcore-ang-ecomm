import { Component, ElementRef, OnInit, ViewChild } from '@angular/core'; 
import { IBrand } from '../shared/models/brand';
import { IProduct } from '../shared/models/product';
import { IProductType } from '../shared/models/productType';
import { ShopParams } from '../shared/models/shopParams';
import { ShopService } from './shop.service';

@Component({
  selector: 'app-shop',
  templateUrl: './shop.component.html',
  styleUrls: ['./shop.component.scss']
})
export class ShopComponent implements OnInit {
  
  @ViewChild('search', { static: false }) searchTerm!: ElementRef; // element will be get after it is loaded

  products: IProduct[] = [];
  brands: IBrand[] = [];
  productTypes: IProductType[] = [];

  shopParams = new ShopParams();
  totalCount = 0;

  sortOptions = [
    {name: 'Alphabetical', value:'name'},
    {name: 'Price: Low to High', value: 'priceAsc'},
    {name: 'Price: High to Low', value: 'priceDesc'}
  ];

  constructor(private shopService: ShopService ) { }

  ngOnInit(): void {
    this.getProducts();
    this.getBrands();
    this.getTypes();
  }
  
  getProducts(){
    //http call is finite so we dont have to unsubscribe
    this.shopService.getProducts(this.shopParams).subscribe((response) => {
      this.products = response == null ? [] : response.data;
      this.shopParams.pageNumber = response?.pageIndex == null ? 0 : response.pageIndex;
      this.shopParams.pageSize = response?.pageSize == null ? 0 : response.pageSize;
      this.totalCount = response?.count == null ? 0 : response.count;
    }, error => {
      console.log(error);
    });
  }

  getBrands(){
    this.shopService.getBrands().subscribe((response) => {
      this.brands = [{id : 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  getTypes(){
    this.shopService.getProductTypes().subscribe((response) => {
      this.productTypes = [{id : 0, name: 'All'}, ...response];
    }, error => {
      console.log(error);
    })
  }

  onBrandSelected(brandId: number){
    this.shopParams.brandId = brandId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onTypeSelected(typeId: number){
    this.shopParams.typeId = typeId;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onSortSelected(sort: string) {
    this.shopParams.sort = sort;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onPageChanged(event : any) {
    if(this.shopParams.pageNumber !== event)
    {
      this.shopParams.pageNumber = event;
      this.getProducts();
    }
  }

  onSearch() {
    this.shopParams.search = this.searchTerm.nativeElement.value;
    this.shopParams.pageNumber = 1;
    this.getProducts();
  }

  onReset() {
    this.searchTerm.nativeElement.value = '';
    this.shopParams = new ShopParams();
    this.getProducts();
  }
}
