import {Component, OnInit, OnDestroy} from '@angular/core';
import { Association } from '../../entities/association/association.model';
import { AssociationService } from '../../entities/association/association.service';
import {Assoc_membersService} from '../../entities/assoc-members/assoc-members.service';
import {Assoc_members} from '../../entities/assoc-members/assoc-members.model';
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
                private assoc_membersService: Assoc_membersService,
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
    createAssocMember(assoc_member: Assoc_members) {
        assoc_member.userProfile = this.currentAccount;
        this.assoc_membersService.create(assoc_member).subscribe((response) => {
            console.log(response);
        }, (error) => {
            console.log(error);
        });
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
