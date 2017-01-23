import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { Router } from '@angular/router';
import { AuthenticationService } from '../../../services';
import { MessageService } from '../../../services';
import { Subscription } from 'rxjs/Subscription' ;

@Component({
    selector: 'customer-document-counters',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./customer-document-counters.scss')],
    template: require('./customer-document-counters.html')
})

export class CustomerDocumentCountersComponent implements OnChanges{
    subscription: Subscription;
    specialDocs:Array<Object>;
    ubDocs:Array<Object>;
    ulDocs:Array<Object>;
    loading = false;
    @Input() customer: Object;
    constructor(private messageService: MessageService, private _auth: AuthenticationService, private _router:Router) {
        this.subscription = this.messageService.documentAnnounced$.subscribe(
            value => {
                let docId = value['Id'];
                this.navToDoc(docId);
            } 
        )
    }

    ngOnChanges() {
        if (!!this.customer) {
         this.loading = false;
        let Id = this.customer['Id'];
        this.getCustomerDocumentCounters(Id);
        }

    }

    navToDoc(id){
        this._router.navigate(['/views/documents/documentdetails', id ]);
    }

    getCustomerDocumentCounters(id){
        this.loading=true;
        this.specialDocs= [];
        this.ubDocs=[];
        this.ulDocs=[];
        this._auth.apiGet('customer/' + id + '/documentcounters').subscribe(result => this.populateCounters(result));
    }

    gotoDocSelection(counter){
        this.messageService.announceDocSelectPopup('custid=' + this.customer['Id'] + '&doctypes=' + counter.Object.Id);
    }

    populateCounters(res){
        var self = this;
        this.loading = false;
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