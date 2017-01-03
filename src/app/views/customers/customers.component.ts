import {Component, ViewEncapsulation} from '@angular/core';
import {Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'customers',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customers.scss')],
  template: require('./customers.html')
})
export class CustomersComponent {
  test= 'yoho';
  customer;
  subscription: Subscription;
  constructor(private messageService: MessageService, private _router:Router) {
    this.subscription = this.messageService.customerAnnounced$.subscribe(
      value => {
        this.customer = value;
      });
  }

}