/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { Observable } from 'rxjs/Observable';
import { HttpHeaders, HttpResponse } from '@angular/common/http';

import { DixTestModule } from '../../../test.module';
import { AssociationComponent } from '../../../../../../main/webapp/app/entities/association/association.component';
import { AssociationService } from '../../../../../../main/webapp/app/entities/association/association.service';
import { Association } from '../../../../../../main/webapp/app/entities/association/association.model';

describe('Component Tests', () => {

    describe('Association Management Component', () => {
        let comp: AssociationComponent;
        let fixture: ComponentFixture<AssociationComponent>;
        let service: AssociationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [AssociationComponent],
                providers: [
                    AssociationService
                ]
            })
            .overrideTemplate(AssociationComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssociationComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN
                const headers = new HttpHeaders().append('link', 'link;link');
                spyOn(service, 'query').and.returnValue(Observable.of(new HttpResponse({
                    body: [new Association(123)],
                    headers
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.query).toHaveBeenCalled();
                expect(comp.associations[0]).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
