import { Injectable } from '@angular/core';
import { Router } from '@angular/router';
import { Observable } from 'rxjs/Observable';
import { Http, Response, Headers } from '@angular/http';


import { ConstantsService } from './constants.service';

@Injectable()
export class AuthenticationService {
    private loggedIn = false;
    public userName = "jos";

    // store the URL so we can redirect after logging in
    redirectUrl: string;

    constructor(private _http: Http, private _const: ConstantsService, private _router:Router) {
        this.loggedIn = !!localStorage.getItem('auth_token');
    }

    login(username: String, password: String) {
        let creds = "grant_type=password&username=" + username + "&password=" + password;
        this.getAuth(creds).subscribe(res => {
            this.loggedIn = res;
            this._router.navigate([ this.redirectUrl ]);
    });
    }

    getAuth(creds: String)
    {
        let headers = new Headers();
        headers.append('Content-Type', 'application/x-www-form-urlencoded');
        return this._http.post(this._const.root_url + 'Token', creds, {
            headers: headers
        }).map(this.extractJwt).catch(this.handleError)
    }

    apiGet(apistring:string){
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Authorization', `Bearer ${authToken}`);

        return this._http.get(this._const.root_url + 'api/' + apistring, { headers: headers })
            .map(this.extractData)
            .catch(err => {
                if (err.status  == 401){
                    this.logout();
                    return Observable.arguments;
                }else{
                    this.handleError(err);
                }
            });
    }

    getUser() {
        let authToken = localStorage.getItem('auth_token');

        let headers = new Headers();
        headers.append('Authorization', `Bearer ${authToken}`);

        return this._http.get(this._const.root_url + 'api/Account/UserInfo', { headers: headers })
            .map(this.extractData)
            .catch(err => {
                if (err.status  == 401){
                    this.logout();
                    return Observable.arguments;
                }else{
                    this.handleError(err);
                }
            });
    }

    private handleError(error: any) {
        // In a real world app, we might use a remote logging infrastructure
        // We'd also dig deeper into the error to get a better message

        let errMsg = (error.message) ? error.message :
            error.status ? `${error.status} - ${error.statusText}` : 'Server error';
        console.error(errMsg); // log to console instead
        
        return Observable.throw(errMsg);
    }

    private extractJwt(res: Response, loggedin):boolean {
        let body = res.json();
        localStorage.setItem('auth_token', body.access_token);
        return true;
    }

    private extractData(res: Response) {
        let body = res.json();
        return body;
    }


    logout() {
        localStorage.removeItem('auth_token');
        this.loggedIn = false;
        this._router.navigate([''])
    }

    isLoggedIn() {
        return this.loggedIn;//!!localStorage.getItem('auth_token');
    }

}
