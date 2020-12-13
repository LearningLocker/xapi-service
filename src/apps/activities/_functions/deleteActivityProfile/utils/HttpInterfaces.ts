export interface HttpHeaders {
  readonly [headerName: string]: string;
}

export interface HttpQueryParams {
  readonly [queryParam: string]: string;
}

export interface HttpRequest {
  readonly requestId?: string;
  readonly query: HttpQueryParams;
  readonly body: NodeJS.ReadableStream;
  readonly headers: HttpHeaders;
}

export interface HttpResponse {
  readonly statusCode: number;
  readonly headers: HttpHeaders;
  readonly body?: NodeJS.ReadableStream;
}

export type HttpHandler<Config> = (config: Config, req: HttpRequest) => Promise<HttpResponse>;
