import { Component, ViewEncapsulation, ViewChild } from '@angular/core';
import { ModalDirective } from 'ng2-bootstrap';

import { MessageService } from '../../services/message.service';
import { Subscription } from 'rxjs/Subscription';


@Component({
  selector: 'dialog-error',
  encapsulation: ViewEncapsulation.None,
  styles: [require('./dialog-error.scss')],
  template: require('./dialog-error.html'),
})

export class DialogError  {
  @ViewChild('errModal') errModal: ModalDirective;
  subscription: Subscription;
  title: String = 'titel';
  message: String = 'bericht';
  constructor(private messageService: MessageService) {
    this.subscription = this.messageService.errorAnnounced$.subscribe(
      value => {
        this.message = value;
        this.showDialog();
      });
  }


  public showDialog(): void {
    this.errModal.show();
  }
}