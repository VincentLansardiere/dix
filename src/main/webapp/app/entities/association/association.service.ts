import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { Association } from './association.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Association>;

@Injectable()
export class AssociationService {

    private resourceUrl =  SERVER_API_URL + 'api/associations';

    constructor(private http: HttpClient) { }

    create(association: Association): Observable<EntityResponseType> {
        const copy = this.convert(association);
        return this.http.post<Association>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(association: Association): Observable<EntityResponseType> {
        const copy = this.convert(association);
        return this.http.put<Association>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Association>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Association[]>> {
        const options = createRequestOption(req);
        return this.http.get<Association[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Association[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Association = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Association[]>): HttpResponse<Association[]> {
        const jsonResponse: Association[] = res.body;
        const body: Association[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Association.
     */
    private convertItemFromServer(association: Association): Association {
        const copy: Association = Object.assign({}, association);
        return copy;
    }

    /**
     * Convert a Association to a JSON which can be sent to the server.
     */
    private convert(association: Association): Association {
        const copy: Association = Object.assign({}, association);
        return copy;
    }
}
