/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DixTestModule } from '../../../test.module';
import { AssociationUserRoleComponent } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.component';
import { AssociationUserRoleService } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.service';
import { AssociationUserRole } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.model';

describe('Component Tests', () => {

    describe('AssociationUserRole Management Component', () => {
        let comp: AssociationUserRoleComponent;
        let fixture: ComponentFixture<AssociationUserRoleComponent>;
        let service: AssociationUserRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [AssociationUserRoleComponent],
                providers: [
                    AssociationUserRoleService
                ]
            })
            .overrideTemplate(AssociationUserRoleComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssociationUserRoleComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationUserRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new AssociationUserRole(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.associationUserRoles[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
