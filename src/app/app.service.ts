import {Injectable} from '@angular/core';
import {Router} from '@angular/router';
import {Http,Response,RequestOptions,Headers} from '@angular/http';
import { Observable } from "rxjs";
import 'rxjs/add/operator/map';



@Injectable()

export class AdhocScedularDataService {
  private _url:string="/v1/schedules";
  
constructor(private _http: Http){}



    getAdhocSchedulerData(){
      return this._http.get(this._url)
      .map((response:Response)=>response.json());
    }

  
 
 updateAdhocSchedulerData(extract_id:string,data:any): Observable<any> {
    return this._http.put(`${this._url}/${extract_id}`,data);
  }
 
}