import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services';
import { MessageService } from '../../../services';

@Component({
    selector: 'customer-search',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-search.scss')],
    template: require('./customer-search.html')
})

export class CustomerSearchComponent {
    searchString = new FormControl();
    filters: Array<filter> = [{id:'name', name:'naam'},{id:'street', name:'adres'}]
    selectedFilter='name';
    customers = [];
    showAndTell = "";
    
    constructor(private _auth: AuthenticationService, private _messageService:MessageService) {
        this.searchString.valueChanges
            .debounceTime(700)
            .subscribe(searchString => this._auth.apiGet('customer?'+ this.selectedFilter + '=' + searchString)
                .subscribe(customers => this.extractCustomers(customers)));
    }

    extractCustomers(custs){
        this.customers = custs;

    }

    selectCustomer(cust){
        this._messageService.announceCustomer(cust);
    }
}

class filter {
    id:string;
    name: string;
}