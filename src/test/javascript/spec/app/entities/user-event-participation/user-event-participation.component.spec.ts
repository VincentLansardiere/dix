/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DixTestModule } from '../../../test.module';
import { UserEventParticipationComponent } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.component';
import { UserEventParticipationService } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.service';
import { UserEventParticipation } from '../../../../../../main/webapp/app/entities/user-event-participation/user-event-participation.model';

describe('Component Tests', () => {

    describe('UserEventParticipation Management Component', () => {
        let comp: UserEventParticipationComponent;
        let fixture: ComponentFixture<UserEventParticipationComponent>;
        let service: UserEventParticipationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [UserEventParticipationComponent],
                providers: [
                    UserEventParticipationService
                ]
            })
            .overrideTemplate(UserEventParticipationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(UserEventParticipationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(UserEventParticipationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new UserEventParticipation(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.userEventParticipations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
