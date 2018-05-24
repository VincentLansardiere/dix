import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { UserEventParticipation } from './user-event-participation.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<UserEventParticipation>;

@Injectable()
export class UserEventParticipationService {

    private resourceUrl =  SERVER_API_URL + 'api/user-event-participations';

    constructor(private http: HttpClient) { }

    create(userEventParticipation: UserEventParticipation): Observable<EntityResponseType> {
        const copy = this.convert(userEventParticipation);
        return this.http.post<UserEventParticipation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(userEventParticipation: UserEventParticipation): Observable<EntityResponseType> {
        const copy = this.convert(userEventParticipation);
        return this.http.put<UserEventParticipation>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<UserEventParticipation>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<UserEventParticipation[]>> {
        const options = createRequestOption(req);
        return this.http.get<UserEventParticipation[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<UserEventParticipation[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: UserEventParticipation = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<UserEventParticipation[]>): HttpResponse<UserEventParticipation[]> {
        const jsonResponse: UserEventParticipation[] = res.body;
        const body: UserEventParticipation[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to UserEventParticipation.
     */
    private convertItemFromServer(userEventParticipation: UserEventParticipation): UserEventParticipation {
        const copy: UserEventParticipation = Object.assign({}, userEventParticipation);
        return copy;
    }

    /**
     * Convert a UserEventParticipation to a JSON which can be sent to the server.
     */
    private convert(userEventParticipation: UserEventParticipation): UserEventParticipation {
        const copy: UserEventParticipation = Object.assign({}, userEventParticipation);
        return copy;
    }
}
