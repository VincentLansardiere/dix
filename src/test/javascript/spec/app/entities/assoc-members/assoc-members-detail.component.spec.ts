/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DixTestModule } from '../../../test.module';
import { Assoc_membersDetailComponent } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members-detail.component';
import { Assoc_membersService } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.service';
import { Assoc_members } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.model';

describe('Component Tests', () => {

    describe('Assoc_members Management Detail Component', () => {
        let comp: Assoc_membersDetailComponent;
        let fixture: ComponentFixture<Assoc_membersDetailComponent>;
        let service: Assoc_membersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [Assoc_membersDetailComponent],
                providers: [
                    Assoc_membersService
                ]
            })
            .overrideTemplate(Assoc_membersDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Assoc_membersDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Assoc_membersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Assoc_members(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.assoc_members).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
