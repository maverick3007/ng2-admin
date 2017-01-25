import {Component, ViewEncapsulation, OnInit} from '@angular/core';
import {Router } from '@angular/router';
import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'documents',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./documents.scss')],
  template: require('./documents.html')
})
export class DocumentsComponent implements OnInit {
  test= 'yoho';
  document;
  subscription: Subscription;
  constructor(private messageService: MessageService, private _router:Router) {
    this.subscription = this.messageService.documentAnnounced$.subscribe(
      value => {
        this.document = value;
        let id = value['Id']
        this._router.navigate(['/views/documents/documentdetails', id ]);
      });
  }

  ngOnInit(){
    
  }

  search(){
    this.messageService.announceDocOptSelectPopup("");
  }


}