export class SentimentRequest {
    documents: RequestDocument[];
}
export class RequestDocument {
    language: string;
    id: string;
    text: string;
}

export class SentimentResponse {
    documents: ResponseDocuments[];
    errors: Error[];
}
export class ResponseDocuments {
    score: 0.0;
    id: string;
}

export class Error {
    id: string;
    message: string;
}