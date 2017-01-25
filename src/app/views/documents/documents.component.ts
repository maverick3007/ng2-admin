import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import {GlobalState} from '../../global.state';

@Component({
  selector: 'documents',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./documents.scss')],
  template: require('./documents.html')
})
export class DocumentsComponent implements OnInit {
  document;
  constructor( private _router:Router, private _state:GlobalState) {
      this._state.subscribe('document.details', (value) => {
        this.document = value;
        let id = value['Id']
        this._router.navigate(['/views/documents/documentdetails', id ]);
    });
  }

  ngOnInit(){
    
  }

  search(){
    this._state.notifyDataChanged('popup.documentoptselect', '');
  }


}