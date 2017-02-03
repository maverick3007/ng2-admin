import { Component, ViewEncapsulation, OnInit, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import {CustomerSearchComponent} from '../../customers/customer-search/customer-search'
import { AuthenticationService, MessageService } from '../../../services';
import { Subscription } from 'rxjs/Subscription';
import {GlobalState} from '../../../global.state';

@Component({
  selector: 'adveoorders',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./adveoorders.scss')],
  template: require('./adveoorders.html'),
})

export class AdveoOrders implements OnInit {
  @ViewChild('smModal') confirmModal: ModalDirective;
   @ViewChild('confDel') confDel: ModalDirective;
  @ViewChild('finalModal') finalModal: ModalDirective;
  hasSelectedOrder: boolean = false;
  nrOfOrders: number;
  nrOfPages: number;
  currentpage: number = 0;
  orders: Array<Object> = [];
  selectedOrder: Object;
  orderToRemove: Object;
  isLoading: boolean = false;
  resultOrderId:string ="";
  subscription: Subscription;


  constructor(private _auth: AuthenticationService, private _message : MessageService,  private _state:GlobalState) {
     this._state.subscribe('customer.details', (value) => {
      this.linkCustomer(value['Id']);
    })
}

  ngOnInit() {

    this.loadData();
  }

linkCustomer(id){
  this._auth.apiGet('adveoorder/createcustomerlink?Adveoid=' + this.selectedOrder['CustomerId'] + '&WinnerId=' + id  ).subscribe(() => {
        this.currentpage = this.currentpage -1;
        this.orders = [];
    this.hasSelectedOrder = false;
    this.loadData();
  });
}





  loadData() {
    this.isLoading = true;
    this.currentpage = this.currentpage + 1;
    this._auth.apiGet('adveoorder?pger=20£' + this.currentpage + '&status=0').subscribe(data => this.convertToDData(data));
  }

  createOrder() {
    this.confirmModal.hide();
    this.orderfactory();
  }

  confirmCreateOrder() {
    this.confirmModal.show();
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

  confirmRemoveOrder(order){
    this.orderToRemove = order;
    this.confDel.show();
  }

  removeOrder(){
    this.confDel.hide();
     this._auth.apiGet('adveoorder/removeadveoorder?id=' + this.orderToRemove['Id']).subscribe(value =>{
       this.currentpage = this.currentpage -1;
        this.orders = [];
    this.hasSelectedOrder = false;
    this.loadData();
     });
  }

  public showyChildModal(): void {
    this.confirmModal.show();
  }

  public hideyChildModal(): void {
    this.confirmModal.hide();
  }

  public orderfactory() {
    let doc = new Document();
    doc.date01 = this.selectedOrder['DateNr'];
    doc.reference = this.selectedOrder['Id'];
    doc.customerId = this.selectedOrder['Customer'].Id;
    doc.doclines = new Array<DocLine>();
    for (var i = 0; i < this.selectedOrder['WebOrderLines'].length; i++) {
      let docl = new DocLine();
      docl.seq = i+1;
      docl.artId = this.selectedOrder['WebOrderLines'][i].WinnerArticle.Id;
      docl.artDescription = this.selectedOrder['WebOrderLines'][i].WebId;
      docl.qty = this.selectedOrder['WebOrderLines'][i].Qty;
      docl.unitPrice = this.selectedOrder['WebOrderLines'][i].UnitPrice;
      doc.doclines.push(docl);
    }
    this._auth.apiPost('adveoorder/createdocument', doc).subscribe(data => {
      this.endPost(data);});

  }

  unSelectOrder() {
    this.hasSelectedOrder = false;
  }

  hasUnknownArts(): boolean {
    for (var i = 0; i < this.selectedOrder['WebOrderLines'].length; i++) {
      if (this.selectedOrder['WebOrderLines'][i].WinnerArticle.Id == null) {
        return true;
      };
    }
    return false;
  }

  removeLine(line){

        var i = this.selectedOrder['WebOrderLines'].indexOf(line);
        this.selectedOrder['WebOrderLines'].splice(i,1);

  }

  endPost(data) {
    this.resultOrderId = data.Id;
    this.currentpage = 0
    this.unSelectOrder();
    this.orders =[];
    this.loadData();
    this.finalModal.show();
  
  }

  linkCust(){
    this._state.notifyDataChanged('popup.customerselect', '');
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
