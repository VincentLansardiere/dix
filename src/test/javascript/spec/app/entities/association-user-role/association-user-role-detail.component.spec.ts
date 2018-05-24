/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DixTestModule } from '../../../test.module';
import { AssociationUserRoleDetailComponent } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role-detail.component';
import { AssociationUserRoleService } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.service';
import { AssociationUserRole } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.model';

describe('Component Tests', () => {

    describe('AssociationUserRole Management Detail Component', () => {
        let comp: AssociationUserRoleDetailComponent;
        let fixture: ComponentFixture<AssociationUserRoleDetailComponent>;
        let service: AssociationUserRoleService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [AssociationUserRoleDetailComponent],
                providers: [
                    AssociationUserRoleService
                ]
            })
            .overrideTemplate(AssociationUserRoleDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssociationUserRoleDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationUserRoleService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new AssociationUserRole(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.associationUserRole).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
