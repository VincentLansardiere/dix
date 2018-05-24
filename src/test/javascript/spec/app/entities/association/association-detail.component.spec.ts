/* tslint:disable max-line-length */
import { ComponentFixture, TestBed, async } from '@angular/core/testing';
import { HttpResponse } from '@angular/common/http';
import { Observable } from 'rxjs/Observable';

import { DixTestModule } from '../../../test.module';
import { AssociationDetailComponent } from '../../../../../../main/webapp/app/entities/association/association-detail.component';
import { AssociationService } from '../../../../../../main/webapp/app/entities/association/association.service';
import { Association } from '../../../../../../main/webapp/app/entities/association/association.model';

describe('Component Tests', () => {

    describe('Association Management Detail Component', () => {
        let comp: AssociationDetailComponent;
        let fixture: ComponentFixture<AssociationDetailComponent>;
        let service: AssociationService;

        beforeEach(async(() => {
            TestBed.configureTestingModule({
                imports: [DixTestModule],
                declarations: [AssociationDetailComponent],
                providers: [
                    AssociationService
                ]
            })
            .overrideTemplate(AssociationDetailComponent, '')
            .compileComponents();
        }));

        beforeEach(() => {
            fixture = TestBed.createComponent(AssociationDetailComponent);
            comp = fixture.componentInstance;
            service = fixture.debugElement.injector.get(AssociationService);
        });

        describe('OnInit', () => {
            it('Should call load all on init', () => {
                // GIVEN

                spyOn(service, 'find').and.returnValue(Observable.of(new HttpResponse({
                    body: new Association(123)
                })));

                // WHEN
                comp.ngOnInit();

                // THEN
                expect(service.find).toHaveBeenCalledWith(123);
                expect(comp.association).toEqual(jasmine.objectContaining({id: 123}));
            });
        });
    });

});
