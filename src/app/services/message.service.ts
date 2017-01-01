import { Injectable } from '@angular/core';
import { Subject }    from 'rxjs/Subject';

@Injectable()
export class MessageService {

// Observable string sources
    private errorAnnouncedSource = new Subject<string>();

// Observable string streams
  errorAnnounced$ = this.errorAnnouncedSource.asObservable();

      // Service message commands
  announceError(error: string) {
    this.errorAnnouncedSource.next(error);
  }
}