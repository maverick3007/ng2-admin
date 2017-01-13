import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MessageService {

// Observable string sources
    private errorAnnouncedSource = new Subject<string>();
    private custSelectAnnouncedSource = new Subject<string>();
    private docSelectAnnouncedSource = new Subject<string>();
    private docViewAnnouncedSource = new Subject<string>();

    // Observable object sources
private customerAnnouncedSource = new Subject<Object>();

// Observable string streams
  errorAnnounced$ = this.errorAnnouncedSource.asObservable();
  custSelectAnnounced$ = this.custSelectAnnouncedSource.asObservable();
  docSelectAnnounced$ = this.docSelectAnnouncedSource.asObservable();
  customerAnnounced$ = this.customerAnnouncedSource.asObservable();
  docViewAnnounced$ = this.docViewAnnouncedSource.asObservable();

      // Service message commands
  announceError(error: string) {
    this.errorAnnouncedSource.next(error);
  }

  announceCustSelect(text: string) {
    this.custSelectAnnouncedSource.next(text);
  }

  announceDocSelect(text: string) {
    this.docSelectAnnouncedSource.next(text);
  }

  announceCustomer(customer: Object){
    this.customerAnnouncedSource.next(customer);
  }

  announceDocView(docid: string){
    this.docViewAnnouncedSource.next(docid);
  }

}