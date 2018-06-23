import {Component, OnInit, OnDestroy} from '@angular/core';
import { Association } from '../../entities/association/association.model';
import { AssociationService } from '../../entities/association/association.service';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Principal} from '../../shared';
import {Subscription} from 'rxjs/Subscription';

@Component({
  selector: 'jhi-search-associations',
  templateUrl: './search-associations.component.html',
  styles: []
})
export class SearchAssociationsComponent implements OnInit, OnDestroy {
    associations: Association[] = Array<Association>();
    currentAccount: any;
    eventSubscriber: Subscription;

    constructor(private associationService: AssociationService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal) {}

    ngOnInit(): void {
        this.principal.identity().then((account) => {
            this.currentAccount = account;
        });
        this.loadAll();
        this.registerChangeInAssociations();

    }

    ngOnDestroy(): void {
        this.eventManager.destroy(this.eventSubscriber);
    }

    registerChangeInAssociations() {
        this.eventSubscriber = this.eventManager.subscribe('associationListModification', (response) => this.loadAll());
    }

    trackId(index: number, item: Association) {
        return item.id;
    }

    toto() {
        alert('it works');
    }

    loadAll() {
        this.associationService.query().subscribe(
            (res: HttpResponse<Association[]>) => {
                this.associations = res.body;
            },
            (res: HttpErrorResponse) => this.onError(res.message)
        );
        }
    private onError(error) {
        this.jhiAlertService.error(error.message, null, null);
    }
}
