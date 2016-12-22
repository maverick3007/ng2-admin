import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { AuthenticationService } from '../../../services';

@Component({
  selector: 'adveoorders',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./adveoorders.scss')],
  template: require('./adveoorders.html'),
})

export class AdveoOrders implements OnInit {
  @ViewChild('smModal') confirmModal: ModalDirective;
  hasSelectedOrder: boolean = false;
  nrOfOrders: number;
  nrOfPages: number;
  currentpage: number = 0;
  orders: Array<Object> = [];
  selectedOrder: Object;
  isLoading: boolean = false;

  constructor(private _auth: AuthenticationService) {
  }

  ngOnInit() {
    this.loadData();
  }

  loadData() {
    this.isLoading = true;
    this.currentpage = this.currentpage + 1;
    this._auth.apiGet('adveoorder?pger=25£' + this.currentpage).subscribe(data => this.convertToDData(data));
  }

  createOrder() {
    this.confirmModal.hide();
    this.orderfactory();
    alert('go');
  }

  confirmCreateOrder() {
    this.showChildModal();
  }

  convertToDData(data) {
    this.currentpage = data.Page;
    this.nrOfOrders = data.TotalItems;
    this.nrOfPages = data.Pages;
    for (var i = 0; i < data.Results.length; i++) {
      this.orders.push(data.Results[i]);
    }
    this.isLoading = false;

  }

  selectOrder(order) {
    this.selectedOrder = order;
    this.hasSelectedOrder = true;
  }

  public showChildModal(): void {
    this.confirmModal.show();
  }

  public hideChildModal(): void {
    this.confirmModal.hide();
  }

  public orderfactory(){
    let doc = new Document();
    doc.date01 = this.selectedOrder['DateNr'];
    doc.customerId = this.selectedOrder['Customer'].Id;
    doc.doclines = new Array<DocLine>();
    for (var i = 0; i < this.selectedOrder['WebOrderLines'].length; i++) {
      let docl = new DocLine();
      docl.seq=i;
      docl.artId= this.selectedOrder['WebOrderLines'][i].WinnerArticle.Id;
      docl.qty = this.selectedOrder['WebOrderLines'][i].Qty;
      docl.unitPrice = this.selectedOrder['WebOrderLines'][i].UnitPrice;
      doc.doclines.push(docl);
    }
    this._auth.apiPost('adveoorder/createdocument',doc).subscribe(data => this.endPost(data));

  }

  endPost(data)
  {
    var test = data;
  }
}

class Document {
  id: string;
  docTypeId: string;
  customerId: string;
  date01: string;
  date02: string;
  amount: number;
  vAT: number;
  reference: string;
  comment: string;
  salesLocationId: string;
  accYear: number;
  docNr: number;
  customer: number;
  doclines: Array<DocLine>;
}

class DocLine {
  id: string;
  artId: string;
  artDescription: string;
  qty: number;
  unitPrice: number;
  discount: number;
  vat: number;
  subTotal: number;
  seq: number;
}
