import { Injectable } from '@angular/core';
import { Http, Response, Headers, RequestOptions } from '@angular/http';
import { Observable } from "rxjs/Observable";
import 'rxjs/add/operator/catch';
import 'rxjs/add/operator/map';

import { RequestDocument, ResponseDocuments, SentimentRequest, SentimentResponse, Error } from './analysis-response';


@Injectable()
export class TicketService {
  textToFeelingUrl: string = "https://westus.api.cognitive.microsoft.com/text/analytics/v2.0/sentiment";

  constructor (private http: Http) {}

  create(content: string): Observable<Response> {
    let headers = new Headers(
      { 
        'Content-Type': 'application/json',
        'Ocp-Apim-Subscription-Key': '{{YOUR KEY HERE}}',
        'Accept': 'application/json'
      }
    );
    let options = new RequestOptions({ headers: headers });

    let request = new SentimentRequest();
    request.documents = [];
    request.documents.push(new RequestDocument());
    request.documents[0].id = "1";
    request.documents[0].language = "en";
    request.documents[0].text = content;

    return this.http.post(this.textToFeelingUrl, request, options)
            .map(this.extractData)
            .catch(this.handleError);
  }

  private extractData(res: Response) {
    let body = res.json();
    return body || { };
  }

  private handleError (error: Response | any) {
    // In a real world app, you might use a remote logging infrastructure
    let errMsg: string;
    if (error instanceof Response) {
      const body = error.json() || '';
      const err = body.error || JSON.stringify(body);
      errMsg = `${error.status} - ${error.statusText || ''} ${err}`;
    } else {
      errMsg = error.message ? error.message : error.toString();
    }
    console.error(errMsg);
    return Observable.throw(errMsg);
  }
}
