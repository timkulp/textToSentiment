import { Component } from '@angular/core';

import { TicketService } from './ticket.service';
import { ResponseDocuments, SentimentResponse, Error } from './analysis-response';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  ticketContent : string = "";
  response: SentimentResponse;
  errorMessage: any;

  kathyMinScore: 0.0;
  annieMinScore: 0.0;
  samMinScore: 0.0;
  kathyMaxScore: 0.0;
  annieMaxScore: 0.0;
  samMaxScore: 0.0;
  active: string = "";
  score: 0.0;

  constructor(private ticketService: TicketService){

  }

  submit(): void {
    if(this.ticketContent == "") {
      return;
    }

    this.ticketService.create(this.ticketContent)
      .subscribe(
        sentiment => this.convertToSentiment(<any>sentiment),
        error => this.errorMessage = <any>error
      );
  }

  private convertToSentiment(sentiment: SentimentResponse){
    this.response = new SentimentResponse();
    this.response.documents = [];
    this.response.documents.push(new ResponseDocuments());
    this.response.documents[0].id = sentiment.documents[0].id;
    this.response.documents[0].score = sentiment.documents[0].score;   
    this.score = sentiment.documents[0].score;
    this.assessTech(this.score);
  }

  private assessTech(score: 0.0):void {
    switch(true){
      case this.score >= this.kathyMinScore && this.score <= this.kathyMaxScore:
        this.active = "kathy";
        break;
      case this.score >= this.samMinScore && this.score <= this.samMaxScore:
        this.active = "sam";
        break;
      case this.score >= this.annieMinScore && this.score <= this.annieMaxScore:
        this.active = "annie";
        break;
      default:
        this.active = "";
        break;
    }
  }
}
