import { environment } from './../../../environments/environment';
import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Observable } from 'rxjs';
import { Issue } from 'src/assets/interfaces/Project';
@Injectable({
  providedIn: 'root'
})
export class IssuesService {
  private baseUrl: string = environment.baseUrl

  public headerDict = {
    'Content-Type': 'application/json',
    Accept: 'application/json',
    'Access-Control-Allow-Headers': 'Content-Type',
    'Access-Control-Allow-Origin': '*'
  };

  public requestOptions = {
    headers: new HttpHeaders(this.headerDict),
  };
  constructor(private http: HttpClient) {
    
  }

  /**
   * Return Issues.
   * @returns 
   */
  public getIssues(): Observable<Issue[]>{
    return this.http.get<Issue[]>(this.baseUrl+'Issue/', this.requestOptions);
  }
  
}
