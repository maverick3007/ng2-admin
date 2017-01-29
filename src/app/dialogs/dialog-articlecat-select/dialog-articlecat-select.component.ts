import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../services';
import {GlobalState} from '../../global.state';

@Component({
    selector: 'dialog-articlecat-select',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./dialog-articlecat-select.scss')],
    template: require('./dialog-articlecat-select.html'),
})

export class DialogArticlecatSelect {
    @ViewChild('custselectModal') Modal: ModalDirective;
    title: String = 'titel';

    categories = [];
    selectedCategory;
    constructor(private _auth: AuthenticationService, private _state:GlobalState) {
        this._state.subscribe('popup.articlecatselect', (value) =>{            
                this.selectedCategory = null;
                this.categories = [];
                this.showDialog();
        });   

        this._state.subscribe('popup.error', (error) =>{
            this.Modal.hide();
        });
        

    }



    pickCategory(cat) {
        this.selectedCategory = cat
    }

    selectCategory() {
        this.Modal.hide();
        this._state.notify('category.selected', this.selectedCategory);
    }

    public showDialog(): void {
        this.Modal.show();
    }
}

