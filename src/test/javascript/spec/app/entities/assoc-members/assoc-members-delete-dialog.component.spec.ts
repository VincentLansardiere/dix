/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async, inject, fakeAsync, tick } from '@angular/core/testing';
import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable } from 'rxjs/Observable';
import { JhiEventManager } from 'ng-jhipster';

import { DixTestModule } from '../../../test.module';
import { Assoc_membersDeleteDialogComponent } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members-delete-dialog.component';
import { Assoc_membersService } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.service';

describe('Component Tests', () => {

    describe('Assoc_members Management Delete Component', () => {
        let comp: Assoc_membersDeleteDialogComponent;
        let fixture: ComponentFixture<Assoc_membersDeleteDialogComponent>;
        let service: Assoc_membersService;
        let mockEventManager: any;
        let mockActiveModal: any;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [Assoc_membersDeleteDialogComponent],
                providers: [
                    Assoc_membersService
                ]
            })
            .overrideTemplate(Assoc_membersDeleteDialogComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Assoc_membersDeleteDialogComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Assoc_membersService);
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
