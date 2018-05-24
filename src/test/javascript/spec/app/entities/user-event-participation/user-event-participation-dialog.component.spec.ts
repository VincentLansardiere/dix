/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DixTestModule } from '../../../test.module';
import { UserEventParticipationDialogComponent } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation-dialog.component';
import { UserEventParticipationService } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.service';
import { UserEventParticipation } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.model';
import { UserProfileService } from '../../../../../../main/webapp/app/entities/user-profile';
import { EventService } from '../../../../../../main/webapp/app/entities/event';

describe('Component Tests', () => {

    describe('UserEventParticipation Management Dialog Component', () => {
        let comp: UserEventParticipationDialogComponent;
        let fixture: ComponentFixture<UserEventParticipationDialogComponent>;
        let service: UserEventParticipationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [UserEventParticipationDialogComponent],
                providers: [
                    UserProfileService,
                    EventService,
                    UserEventParticipationService
                ]
            })
            .overrideTemplate(UserEventParticipationDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserEventParticipationDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserEventParticipationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('save', () => {
            it('Should call update service on save for existing entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserEventParticipation(123);
                        spyOn(service, 'update').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userEventParticipation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.update).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userEventParticipationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );

            it('Should call create service on save for new entity',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        const entity = new UserEventParticipation();
                        spyOn(service, 'create').and.returnValue(Observable.of(new HttpResponse({body: entity})));
                        comp.userEventParticipation = entity;
                        // WHEN
                        comp.save();
                        tick(); // simulate async

                        // THEN
                        expect(service.create).toHaveBeenCalledWith(entity);
                        expect(comp.isSaving).toEqual(false);
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalledWith({ name: 'userEventParticipationListModification', content: 'OK'});
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
