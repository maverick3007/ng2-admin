import { Component, ViewEncapsulation, Input } from '@angular/core';
import { FormControl } from '@angular/forms';

import { AuthenticationService } from '../../../services';
import { MessageService } from '../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'customer-document-counters',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-document-counters.scss')],
    template: require('./customer-document-counters.html')
})

export class CustomerDocumentCountersComponent {
    subscription: Subscription;
    specialDocs:Array<Object>;
    ubDocs:Array<Object>;
    ulDocs:Array<Object>;
    @Input() customer: Object;
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.specialDocs= [];
        this.ubDocs=[];
        this.ulDocs=[];
        this.subscription = this.messageService.customerAnnounced$.subscribe(
            value => {
                this.getCustomerDocumentCounters(value['Id']);
            });
    }

    getCustomerDocumentCounters(id){
        this._auth.apiGet('customer/' + id + '/documentcounters').subscribe(result => this.populateCounters(result));
    }

    populateCounters(res){
        var self = this;
        for(var i=0; i < res.length ; i++){
            let counterline = res[i];
            if(counterline.Counter > 0){
                if(counterline.Object.Level == 'UL'){
                    self.ulDocs.push(counterline);
                }else if(counterline.Object.Level == 'UB'){
                    self.ubDocs.push(counterline);
                }else{
                    self.specialDocs.push(counterline);
                }
            }
        }
    }

}