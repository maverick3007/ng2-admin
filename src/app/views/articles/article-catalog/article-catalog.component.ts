import { Component, ViewEncapsulation } from '@angular/core';
import { FormControl } from '@angular/forms';
import { AuthenticationService } from '../../../services';


@Component({
    selector: 'article-catalog',
    encapsulation: ViewEncapsulation.None,
    styles: [require('./article-catalog.scss')],
    template: require('./article-catalog.html')
})

export class ArticleCatalogComponent {
    searchString: string = "";
    lookup = new FormControl('');
    searchFor: string = "Name";
    constructor(private _auth: AuthenticationService) {
        //this.subscription = this.messageService.customerAnnounced$.subscribe(
         //   value => {
         //       this.getCustomer(value['Id']);
           // });
    }


}