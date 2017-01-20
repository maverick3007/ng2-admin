import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

//import {CustomerIdentityComponent} from '../customers/customer-identity/customer-identity'

@Component({
  selector: 'customers',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customers.scss')],
  template: require('./customers.html')
})
export class CustomersComponent implements OnInit {
  test= 'yoho';
  customer;
  subscription: Subscription;
  constructor(private messageService: MessageService, private _router:Router) {
    this.subscription = this.messageService.customerAnnounced$.subscribe(
      value => {
        this.customer = value;
        let id = value['Id']
        this._router.navigate(['/views/customers/customerdetails', id ]);
      });
  }

  ngOnInit(){
    
  }

  search(){
    this.messageService.announceCustSelect("go")
  }


}