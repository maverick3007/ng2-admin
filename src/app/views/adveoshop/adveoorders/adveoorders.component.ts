import { Component, ViewEncapsulation, OnInit } from '@angular/core';
import { AuthenticationService } from '../../../services';

@Component({
  selector: 'adveoorders',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./adveoorders.scss')],
  template: require('./adveoorders.html'),
})

export class AdveoOrders implements OnInit {

  nrOfOrders: number;
  nrOfPages: number;
  currentpage: number;
  orders:  Array<Object>;
  selectedOrder: Object;
  constructor(private _auth: AuthenticationService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this._auth.apiGet('adveoorder').subscribe(data => this.convertToDData(data));
  }

  convertToDData(data) {
    this.currentpage = data.Page;
    this.nrOfOrders = data.TotalItems;
    this.nrOfPages = data.Pages;
    this.orders = data.Results;
  }

  selectOrder(order){
    this.selectedOrder = order;
  }

}
