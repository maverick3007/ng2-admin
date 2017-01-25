import { Injectable } from '@angular/core';

import { AuthenticationService } from './authentication.service';

@Injectable()
export class InitService {


  DocumentTypes: Array<Object> = [];

  constructor(private _auth: AuthenticationService) { 
      this._auth.apiGet('init')
  }

}
