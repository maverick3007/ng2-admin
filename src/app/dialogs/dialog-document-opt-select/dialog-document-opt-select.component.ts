import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';
import { GlobalState } from '../../global.state';
import { AuthenticationService } from '../../services';
import { InitService } from '../../services';

@Component({
    selector: 'dialog-document-opt-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-document-opt-select.scss')],
    template: require('./dialog-document-opt-select.html'),
})

export class DialogDocumentOptSelect {
    @ViewChild('docselectOptModal') Modal: ModalDirective;

    hasMoreEntries = false;
    loading = false;
    pageNr;
    searchString;

    docTypes:Array<Object> = [];
    selectedDocType:Object;
    activeYears:Array<Number> = [];
    selectedYear:Number;

    documents: Array<Object> = [];
    selectedDocument;
    constructor(private _auth: AuthenticationService, private _state: GlobalState, private _init: InitService) {
        this._state.subscribe('popup.documentoptselect', (opts) => {
            this.selectedDocument = null;
            if(opts=='in'){
                this.docTypes = _init.documentTypesIn
            }
            if(opts=='out'){
                this.docTypes = _init.documentTypesOut
            }
            this.activeYears = _init.activeYears
            this.selectedYear = this.activeYears[0];
            this.Modal.show();
        });
        this._state.subscribe('popup.error', (error) => {
            this.Modal.hide();
        });
    }

    searchDocs() {
        this._auth.apiGet(this.searchString).subscribe(docs => this.extractDocuments(docs))
    }

    extractDocuments(docs) {
        this.loading = false;
        this.pageNr = docs.Page;
        (docs.Page == docs.Pages) ? this.hasMoreEntries = false : this.hasMoreEntries = true;
        for (var i = 0; i < docs.Results.length; i++) {
            this.documents.push(docs.Results[i]);
        }
    }

    updateSelectedValue(event, O){
        this.pageNr = 0;
        var doct ;
        var yr;
        if(O == 'T')
        {
            doct = event;
        }else{doct = this.selectedDocType['Id'] ;}
        if(O == 'Y')
        {
            yr = event;
        }else{yr = this.selectedYear;}
        this.searchString = 'document?doctypes=' + doct + '&year=' + yr;
        if(!!doct){
            this.loadMore();
        }
        
    }

    loadMore() {
        this.pageNr++;
        this._auth.apiGet(this.searchString + '&pger=' + this.pageNr)
            .subscribe(docs => this.extractDocuments(docs))
    }

    pickDocument(doc) {
        this.selectedDocument = doc
    }

    selectDocument() {
        this.Modal.hide();
        this._state.notifyDataChanged('document.details', this.selectedDocument);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

