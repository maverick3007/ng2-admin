import { Component, ViewEncapsulation, Input, OnChanges } from '@angular/core';
import { AuthenticationService } from '../../../../services';


@Component({
    selector: 'article-list',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./article-list.scss')],
    template: require('./article-list.html')
})

export class DocumentLinesComponent implements OnChanges {
    @Input() artList: Object;
    articles:Array<Object> = [];
    constructor(private _auth: AuthenticationService) {
        //this.subscription = this.messageService.customerAnnounced$.subscribe(
         //   value => {
         //       this.getCustomer(value['Id']);
           // });
    }

    ngOnChanges() {
        if (!!this.artList){
            this.articles = this.artList['Articles'];
        }

    }



}