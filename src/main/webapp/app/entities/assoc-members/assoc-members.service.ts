
import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { JhiDateUtils } from 'ng-jhipster';

import { Assoc_members } from './assoc-members.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<Assoc_members>;

@Injectable()
export class Assoc_membersService {

    private resourceUrl =  SERVER_API_URL + 'api/assoc-members';

    constructor(private http: HttpClient, private dateUtils: JhiDateUtils) { }

    create(assoc_members: Assoc_members): Observable<EntityResponseType> {
        const copy = this.convert(assoc_members);
        return this.http.post<Assoc_members>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(assoc_members: Assoc_members): Observable<EntityResponseType> {
        const copy = this.convert(assoc_members);
        return this.http.put<Assoc_members>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<Assoc_members>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<Assoc_members[]>> {
        const options = createRequestOption(req);
        return this.http.get<Assoc_members[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<Assoc_members[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: Assoc_members = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<Assoc_members[]>): HttpResponse<Assoc_members[]> {
        const jsonResponse: Assoc_members[] = res.body;
        const body: Assoc_members[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to Assoc_members.
     */
    private convertItemFromServer(assoc_members: Assoc_members): Assoc_members {
        const copy: Assoc_members = Object.assign({}, assoc_members);
        copy.joined_date = this.dateUtils
            .convertLocalDateFromServer(assoc_members.joined_date);
        return copy;
    }

    /**
     * Convert a Assoc_members to a JSON which can be sent to the server.
     */
    private convert(assoc_members: Assoc_members): Assoc_members {
        const copy: Assoc_members = Object.assign({}, assoc_members);
        copy.joined_date = this.dateUtils
            .convertLocalDateToServer(assoc_members.joined_date);
        return copy;
    }
}
