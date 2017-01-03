import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services';
import { MessageService } from '../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'customer-detail',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-detail.scss')],
    template: require('./customer-detail.html')
})

export class CustomerDetailComponent {
    subscription: Subscription;
    customer ;
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.subscription = this.messageService.customerAnnounced$.subscribe(
            value => {
                this.getCustomer(value['Id']);
            });
    }

    getCustomer(id){
        this._auth.apiGet('customer/' + id).subscribe(result => this.customer = result);
    }

}