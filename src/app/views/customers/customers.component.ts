import {Component, ViewEncapsulation} from '@angular/core';

@Component({
  selector: 'customers',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./customers.scss')],
  template: require('./customers.html')
})
export class CustomersComponent {

  constructor() {
  }

}