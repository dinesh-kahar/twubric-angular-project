import { Injectable } from '@angular/core';
import { HttpClient } from '@angular/common/http';
import { Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TwitterServiceService {

  private _api_url: string = "assets/data/follower-details.json";

  constructor(
    private http : HttpClient,
  ) { }

  getTwubricData():Observable<any> {
    return this.http.get(this._api_url);
  }
}
