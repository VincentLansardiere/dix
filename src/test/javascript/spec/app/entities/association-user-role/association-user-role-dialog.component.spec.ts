/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DixTestModule } from '../../../test.module';
import { AssociationUserRoleDialogComponent } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role-dialog.component';
import { AssociationUserRoleService } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.service';
import { AssociationUserRole } from '../../../../../../main/webapp/app/entities/association-user-role/association-user-role.model';
import { UserProfileService } from '../../../../../../main/webapp/app/entities/user-profile';
import { AssociationService } from '../../../../../../main/webapp/app/entities/association';

describe('Component Tests', () => {

    describe('AssociationUserRole Management Dialog Component', () => {
        let comp: AssociationUserRoleDialogComponent;
        let fixture: ComponentFixture<AssociationUserRoleDialogComponent>;
        let service: AssociationUserRoleService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [AssociationUserRoleDialogComponent],
                providers: [
                    UserProfileService,
                    AssociationService,
                    AssociationUserRoleService
                ]
            })
            .overrideTemplate(AssociationUserRoleDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssociationUserRoleDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationUserRoleService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssociationUserRole(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.associationUserRole = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'associationUserRoleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new AssociationUserRole();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.associationUserRole = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'associationUserRoleListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
