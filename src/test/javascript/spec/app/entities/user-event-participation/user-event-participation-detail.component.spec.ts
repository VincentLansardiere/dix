/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DixTestModule } from '../../../test.module';
import { UserEventParticipationDetailComponent } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation-detail.component';
import { UserEventParticipationService } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.service';
import { UserEventParticipation } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.model';

describe('Component Tests', () => {

    describe('UserEventParticipation Management Detail Component', () => {
        let comp: UserEventParticipationDetailComponent;
        let fixture: ComponentFixture<UserEventParticipationDetailComponent>;
        let service: UserEventParticipationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [UserEventParticipationDetailComponent],
                providers: [
                    UserEventParticipationService
                ]
            })
            .overrideTemplate(UserEventParticipationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserEventParticipationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserEventParticipationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new UserEventParticipation(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.userEventParticipation).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
