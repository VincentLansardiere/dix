import { Injectable } from '@angular/core';
import { HttpClient, HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';
import { SERVER_API_URL } from '../../app.constants';

import { AssociationUserRole } from './association-user-role.model';
import { createRequestOption } from '../../shared';

export type EntityResponseType = HttpResponse<AssociationUserRole>;

@Injectable()
export class AssociationUserRoleService {

    private resourceUrl =  SERVER_API_URL + 'api/association-user-roles';

    constructor(private http: HttpClient) { }

    create(associationUserRole: AssociationUserRole): Observable<EntityResponseType> {
        const copy = this.convert(associationUserRole);
        return this.http.post<AssociationUserRole>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    update(associationUserRole: AssociationUserRole): Observable<EntityResponseType> {
        const copy = this.convert(associationUserRole);
        return this.http.put<AssociationUserRole>(this.resourceUrl, copy, { observe: 'response' })
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    find(id: number): Observable<EntityResponseType> {
        return this.http.get<AssociationUserRole>(`${this.resourceUrl}/${id}`, { observe: 'response'})
            .map((res: EntityResponseType) => this.convertResponse(res));
    }

    query(req?: any): Observable<HttpResponse<AssociationUserRole[]>> {
        const options = createRequestOption(req);
        return this.http.get<AssociationUserRole[]>(this.resourceUrl, { params: options, observe: 'response' })
            .map((res: HttpResponse<AssociationUserRole[]>) => this.convertArrayResponse(res));
    }

    delete(id: number): Observable<HttpResponse<any>> {
        return this.http.delete<any>(`${this.resourceUrl}/${id}`, { observe: 'response'});
    }

    private convertResponse(res: EntityResponseType): EntityResponseType {
        const body: AssociationUserRole = this.convertItemFromServer(res.body);
        return res.clone({body});
    }

    private convertArrayResponse(res: HttpResponse<AssociationUserRole[]>): HttpResponse<AssociationUserRole[]> {
        const jsonResponse: AssociationUserRole[] = res.body;
        const body: AssociationUserRole[] = [];
        for (let i = 0; i < jsonResponse.length; i++) {
            body.push(this.convertItemFromServer(jsonResponse[i]));
        }
        return res.clone({body});
    }

    /**
     * Convert a returned JSON object to AssociationUserRole.
     */
    private convertItemFromServer(associationUserRole: AssociationUserRole): AssociationUserRole {
        const copy: AssociationUserRole = Object.assign({}, associationUserRole);
        return copy;
    }

    /**
     * Convert a AssociationUserRole to a JSON which can be sent to the server.
     */
    private convert(associationUserRole: AssociationUserRole): AssociationUserRole {
        const copy: AssociationUserRole = Object.assign({}, associationUserRole);
        return copy;
    }
}
