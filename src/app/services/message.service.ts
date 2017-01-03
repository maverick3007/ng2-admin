import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MessageService {

// Observable string sources
    private errorAnnouncedSource = new Subject<string>();

    // Observable object sources
private customerAnnouncedSource = new Subject<Object>();

// Observable string streams
  errorAnnounced$ = this.errorAnnouncedSource.asObservable();

  customerAnnounced$ = this.customerAnnouncedSource.asObservable();

      // Service message commands
  announceError(error: string) {
    this.errorAnnouncedSource.next(error);
  }

  announceCustomer(customer: Object){
    this.customerAnnouncedSource.next(customer);
  }

}