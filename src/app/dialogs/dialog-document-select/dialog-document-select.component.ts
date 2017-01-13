import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';

import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dialog-document-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-document-select.scss')],
    template: require('./dialog-document-select.html'),
})

export class DialogDocumentSelect {
    @ViewChild('docselectModal') Modal: ModalDirective;
    subscription: Subscription;
    errNotifier: Subscription;
    hasMoreEntries = false;
    loading = false;
    pageNr;
    searchString;
    documents: Array<Object> = [];
    selectedDocument;
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.subscription = this.messageService.docSelectAnnounced$.subscribe(
            value => {
                this.selectedDocument = null;
                this.documents = [];
                this.showDialog();
                this.searchString='document?' + value
                this.loading = true;
                this._auth.apiGet(this.searchString)
                    .subscribe(docs => this.extractDocuments(docs))
            });
        this.errNotifier = this.messageService.errorAnnounced$.subscribe(
            value => {

                this.Modal.hide();
            });
    }

    extractDocuments(docs) {
        this.loading = false;
        this.pageNr = docs.Page;
        (docs.Page == docs.Pages)?this.hasMoreEntries = false:this.hasMoreEntries = true;
        for (var i = 0; i < docs.Results.length; i++){
            this.documents.push(docs.Results[i]);
        }
    }

    loadMore(){
        this.pageNr++;
        this._auth.apiGet(this.searchString + '&pger=' + this.pageNr)
                    .subscribe(docs => this.extractDocuments(docs))        
    }

    pickDocument(doc) {
        this.selectedDocument = doc
    }

    selectDocument() {
        this.Modal.hide();
        // this.messageService.announceCustomer(this.selectedDocument);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

