import {Component, ViewEncapsulation} from '@angular/core';
import {Router, ActivatedRoute } from '@angular/router';
import { MessageService } from '../../../services';
import { AuthenticationService } from '../../../services';
import { Subscription } from 'rxjs/Subscription';

@Component({
  selector: 'document-details',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./document-details.scss')],
  template: require('./document-details.html')
})

export class DocumentDetailsComponent  {
    document;
    constructor(private route: ActivatedRoute, private messageService: MessageService, private auth: AuthenticationService){
                this.route.params
        .map(params => params['id'])
        .switchMap(id => this.auth.apiGet('document/' + id ))
        .subscribe(document => this.document = document);
    }

    



}