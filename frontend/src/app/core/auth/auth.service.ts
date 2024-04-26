import {Injectable} from '@angular/core';
import {HttpClient} from "@angular/common/http";
import {catchError, Observable, of, switchMap, throwError} from "rxjs";
import {API_URL} from "../../shared/constants/route.constants";
import {UserModel} from "../../shared/models/user.model";
import {AuthUtils} from "./auth.utils";

@Injectable()
export class AuthService {

  private _authenticated: boolean = false;

  /**
   * Constructor
   */
  constructor(
    private _httpClient: HttpClient,
  ) {
  }

  // -----------------------------------------------------------------------------------------------------
  // @ Accessors
  // -----------------------------------------------------------------------------------------------------

  /**
   * Setter & getter for access token
   */
  set accessToken(token: string) {
    localStorage.setItem('accessToken', token);
  }

  get accessToken(): string {
    return localStorage.getItem('accessToken') ?? '';
  }

  set refreshToken(token: string) {
    localStorage.setItem('refreshToken', token);
  }

  get refreshToken(): string {
    return localStorage.getItem('refreshToken') ?? '';
  }

  get isAuthenticated(): boolean {
    return !!this.accessToken
  }


  login(credentials: { email: any; password: any }): Observable<any> {
    // Throw error, if the user is already logged in
    if (this._authenticated) {
      return throwError('User is already logged in.');
    }

    return this._httpClient.post(`${API_URL}/auth/login/`, credentials).pipe(
      switchMap((response: any) => {

        // Store the access token in the local storage
        this.accessToken = response.access_token;
        this.refreshToken = response.refresh;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Return a new observable with the response
        return of(response);
      })
    );
  }


  logout(): Observable<any> {
    // Remove the access token from the local storage
    localStorage.removeItem('accessToken');

    // Set the authenticated flag to false
    this._authenticated = false;

    // Return the observable
    return of(true);
  }


  register(user: UserModel): Observable<any> {
    return this._httpClient.post<any>(API_URL + '/auth/register/', user);
  }

  /**
   * Check the authentication status
   */
  check(): Observable<boolean> {
    // Check if the user is logged in
    if (this._authenticated) {
      return of(true);
    }

    // Check the access token availability
    if (!this.accessToken) {
      return of(false);
    }

    // Check the access token expire date
    if (AuthUtils.isTokenExpired(this.accessToken)) {
      return this.signInUsingToken();
    }


    // If the access token exists and it didn't expire, sign in using it
    return of(true);
  }

  signInUsingToken(): Observable<any> {
    // Renew token
    return this._httpClient.post(`${API_URL}/auth/refresh/`,{}).pipe(
      catchError(() => {

        // Return false
        return of(false)
      }),
      switchMap((response: any) => {

        // Store the access token in the local storage
        this.accessToken = response.access;

        // Set the authenticated flag to true
        this._authenticated = true;

        // Return true
        return of(true);
      })
    );
  }
}
