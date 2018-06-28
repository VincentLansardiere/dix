/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DixTestModule } from '../../../test.module';
import { Assoc_membersComponent } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.component';
import { Assoc_membersService } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.service';
import { Assoc_members } from '../../../../../../main/webapp/app/entities/assoc-members/assoc-members.model';

describe('Component Tests', () => {

    describe('Assoc_members Management Component', () => {
        let comp: Assoc_membersComponent;
        let fixture: ComponentFixture<Assoc_membersComponent>;
        let service: Assoc_membersService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [Assoc_membersComponent],
                providers: [
                    Assoc_membersService
                ]
            })
            .overrideTemplate(Assoc_membersComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(Assoc_membersComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(Assoc_membersService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Assoc_members(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.assoc_members[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
