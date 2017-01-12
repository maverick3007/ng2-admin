import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';

import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dialog-customer-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-document-select.scss')],
    template: require('./dialog-document-select.html'),
})

export class DialogDocumentSelect {
    @ViewChild('docselectModal') Modal: ModalDirective;
    subscription: Subscription;
    documents = [];
    selectedDocument;
    searchString = new FormControl('');
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.subscription = this.messageService.custSelectAnnounced$.subscribe(
            value => {
                this.searchString.reset();
                this.selectedDocument = null;
                this.documents = [];
                this.showDialog();
            });
        this.searchString.valueChanges
            .debounceTime(700)
            .subscribe(searchString => this._auth.apiGet('documents'  + searchString)
                .subscribe(docs => this.extractDocuments(docs)));

    }

    extractDocuments(docs) {
        this.documents = docs;

    }

    pickCustomer(doc){
        this.selectedDocument = doc
    }
    
    selectCustomer(){
        this.Modal.hide();
        this.messageService.announceCustomer(this.selectedDocument);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

