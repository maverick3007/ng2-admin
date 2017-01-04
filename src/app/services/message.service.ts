import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MessageService {

// Observable string sources
    private errorAnnouncedSource = new Subject<string>();
    private custSelectAnnouncedSource = new Subject<string>();

    // Observable object sources
private customerAnnouncedSource = new Subject<Object>();

// Observable string streams
  errorAnnounced$ = this.errorAnnouncedSource.asObservable();
  custSelectAnnounced$ = this.custSelectAnnouncedSource.asObservable();
  customerAnnounced$ = this.customerAnnouncedSource.asObservable();

      // Service message commands
  announceError(error: string) {
    this.errorAnnouncedSource.next(error);
  }

  announceCustSelect(text: string) {
    this.custSelectAnnouncedSource.next(text);
  }

  announceCustomer(customer: Object){
    this.customerAnnouncedSource.next(customer);
  }

}