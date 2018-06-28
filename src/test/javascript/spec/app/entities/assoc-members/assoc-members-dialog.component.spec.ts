/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DixTestModule } from '../../../test.module';
import { Assoc_membersDialogComponent } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members-dialog.component';
import { Assoc_membersService } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.service';
import { Assoc_members } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.model';
import { UserProfileService } from '../../../../../../main/webapp/app/entities/user-profile';
import { AssociationService } from '../../../../../../main/webapp/app/entities/association';

describe('Component Tests', () => {

    describe('Assoc_members Management Dialog Component', () => {
        let comp: Assoc_membersDialogComponent;
        let fixture: ComponentFixture<Assoc_membersDialogComponent>;
        let service: Assoc_membersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [Assoc_membersDialogComponent],
                providers: [
                    UserProfileService,
                    AssociationService,
                    Assoc_membersService
                ]
            })
            .overrideTemplate(Assoc_membersDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Assoc_membersDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Assoc_membersService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Assoc_members(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assoc_members = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assoc_membersListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new Assoc_members();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.assoc_members = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'assoc_membersListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
