/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DixTestModule } from '../../../test.module';
import { UserEventParticipationDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation-delete-dialog.component';
import { UserEventParticipationService } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.service';

describe('Component Tests', () => {

    describe('UserEventParticipation Management Delete Component', () => {
        let comp: UserEventParticipationDeleteDialogComponent;
        let fixture: ComponentFixture<UserEventParticipationDeleteDialogComponent>;
        let service: UserEventParticipationService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [UserEventParticipationDeleteDialogComponent],
                providers: [
                    UserEventParticipationService
                ]
            })
            .overrideTemplate(UserEventParticipationDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserEventParticipationDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserEventParticipationService);
            mockEventManager = fixture.debugElement.injector.get(JhiEventManager);
            mockActiveModal = fixture.debugElement.injector.get(NgbActiveModal);
        });

        describe('confirmDelete', () => {
            it('Should call delete service on confirmDelete',
                inject([],
                    fakeAsync(() => {
                        // GIVEN
                        spyOn(service, 'delete').and.returnValue(Observable.of({}));

                        // WHEN
                        comp.confirmDelete(123);
                        tick();

                        // THEN
                        expect(service.delete).toHaveBeenCalledWith(123);
                        expect(mockActiveModal.dismissSpy).toHaveBeenCalled();
                        expect(mockEventManager.broadcastSpy).toHaveBeenCalled();
                    })
                )
            );
        });
    });

});
