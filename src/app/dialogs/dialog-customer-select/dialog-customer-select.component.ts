import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';

import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dialog-customer-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-customer-select.scss')],
    template: require('./dialog-customer-select.html'),
})

export class DialogCustomerSelect {
    @ViewChild('custselectModal') Modal: ModalDirective;
    subscription: Subscription;
    errNotifier: Subscription;
    title: String = 'titel';
    filters: Array<filter> = [{ id: 'name', name: 'naam' }, { id: 'street', name: 'adres' }]
    selectedFilter = 'name';
    customers = [];
    selectedCustomer;
    searchString = new FormControl('');
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.subscription = this.messageService.custSelectPopupAnnounced$.subscribe(
            value => {
                this.searchString.reset();
                this.selectedFilter = 'name';
                this.selectedCustomer = null;
                this.customers = [];
                this.showDialog();
            });
        this.errNotifier = this.messageService.errorAnnounced$.subscribe(
            value => {

                this.Modal.hide();
            });
        this.searchString.valueChanges
            .debounceTime(700)
            .subscribe(searchString => this._auth.apiGet('customer?' + this.selectedFilter + '=' + searchString)
                .subscribe(customers => this.extractCustomers(customers)));

    }

    extractCustomers(custs) {
        this.customers = custs;

    }

    pickCustomer(cust) {
        this.selectedCustomer = cust
    }

    selectCustomer() {
        this.Modal.hide();
        this.messageService.announceCustomer(this.selectedCustomer);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

class filter {
    id: string;
    name: string;
}