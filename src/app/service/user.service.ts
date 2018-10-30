import { Injectable } from "@angular/core";
import { HttpClient, HttpHeaders, HttpErrorResponse, HttpResponse } from "@angular/common/http";
import { Observable, throwError } from "rxjs";
import { catchError, retry } from "rxjs/operators";
import { NotFoundError } from "../common/error/not-found";
import { BadInput } from "../common/error/bad-input";
import { AppError } from "../common/error/app-error";
import { ActivatedRoute } from "@angular/router";

@Injectable({
  providedIn: "root"
})
export class UserService {
  private url = `https://jsonplaceholder.typicode.com`;
  constructor(
    private http: HttpClient,
    private route: ActivatedRoute ) {}

  /**
   * GET: get the list of users
   */
  listUser() {
    return this.http.get(`${this.url}/users`).pipe(
      retry(2), // retry a failed request up to 2 times
      catchError(this._handleError) // then handle the error
    );
  }

   /**
   * GET: get a single user
   */
  getUser(id) {
    return this.http.get(`${this.url}/users/${id}`).pipe(
      retry(2), // retry a failed request up to 2 times
      catchError(this._handleError) // then handle the error
    );
  }
  /**
   * POST: add a new user
   * @param data
   */
  createUser(data) {
    const httpOptions = {
      headers: new HttpHeaders({
        "Content-Type": "application/json"
      })
    };
    return this.http.post(`${this.url}/users`, JSON.stringify(data), httpOptions).pipe(
      retry(2),
      catchError(this._handleError)
    );
  }

  /**
   * PATCH: update a new user
   * @param data, id
   */
  updateUser(id, data) {
    return this.http.patch(`${this.url}/users/${id}`, data).pipe(
      retry(2),
      catchError(this._handleError)
    );
  }

   /**
   * DELETE: Delete a user
   * @param id
   */
  deleteUser(id) {
    return this.http.delete(`${this.url}/users/${id}`)
    .pipe(
      retry(1),
      catchError(this._handleError)
    );
  }

  /**
   * It catchs an error and throws
   */
  private _handleError(error: HttpErrorResponse) {
    console.log("error", error);
    if (error.status === 404) return throwError(new NotFoundError(error));
    if (error.status === 400) return throwError(new BadInput(error));
    return throwError(new AppError(error));
  }
}
