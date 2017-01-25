import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';

import { MessageService } from '../../services/message.service';
import { AuthenticationService } from '../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
    selector: 'dialog-document-opt-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-document-opt-select.scss')],
    template: require('./dialog-document-opt-select.html'),
})

export class DialogDocumentOptSelect {
    @ViewChild('docselectOptModal') Modal: ModalDirective;
    subscription: Subscription;
    errNotifier: Subscription;
    hasMoreEntries = false;
    loading = false;
    pageNr;
    searchString;
    documents: Array<Object> = [];
    selectedDocument;
    constructor(private messageService: MessageService, private _auth: AuthenticationService) {
        this.subscription = this.messageService.docOptSelectPopupAnnounced$.subscribe(
            value => {
                this.Modal.show();

            });
        this.errNotifier = this.messageService.errorAnnounced$.subscribe(
            value => {

                this.Modal.hide();
            });
    }

    searchDocs(){
        this._auth.apiGet(this.searchString).subscribe(docs => this.extractDocuments(docs))
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
        this.messageService.announceDocument(this.selectedDocument);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

