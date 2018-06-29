import {Component, OnInit, OnDestroy} from '@angular/core';
import { Association } from '../../entities/association/association.model';
import { AssociationService } from '../../entities/association/association.service';
import {Assoc_membersService} from '../../entities/assoc-members/assoc-members.service';
import {Assoc_members} from '../../entities/assoc-members/assoc-members.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {Principal} from '../../shared';
import {Subscription} from 'rxjs/Subscription';
import {UserProfile, UserProfileService} from "../../entities/user-profile";

@Component({
  selector: 'jhi-search-associations',
  templateUrl: './search-associations.component.html',
  styles: []
})
export class SearchAssociationsComponent implements OnInit, OnDestroy {
    associations: Association[] = Array<Association>();
    assoc_member: Assoc_members = new Assoc_members();
    currentAccount: Account;
    currentProfile: UserProfile;
    eventSubscriber: Subscription;

    constructor(private associationService: AssociationService,
                private assoc_membersService: Assoc_membersService,
                private user_profileService: UserProfileService,
                private jhiAlertService: JhiAlertService,
                private eventManager: JhiEventManager,
                private principal: Principal) {}

    ngOnInit(): void {
        this.principal.identity().then((account) => {
            this.currentAccount = account;

            this.user_profileService.findFromPrincipal().subscribe(
                (res: HttpResponse<UserProfile[]>) => {
                    let profiles: UserProfile[] = res.body;
                    console.log(profiles);
                    // this.currentProfile = res.body;
                },
                (res: HttpErrorResponse) => this.onError(res.message)
            );

            // this.user_profileService.findFromUserId(parseInt(this.currentAccount.id)).subscribe(
            //     (res: HttpResponse<UserProfile>) => {
            //         this.currentProfile = res.body;
            //     },
            //     (res: HttpErrorResponse) => this.onError(res.message)
            // );
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

    addAssocMember(association: Association) {
        this.assoc_member.association = association;
        this.assoc_member.userProfile = this.currentProfile;
        const date = new Date('2018-06-28');
        // console.log(this.currentProfile);
        console.log("MARCHE TA RACE LA PUTE LA CHAUVE!!!");
        // this.assoc_member.joined_date = date;
        // const req = { assocId: this.assoc_member.association.id, userId: parseInt(this.currentAccount.id) };
        // this.assoc_membersService.addAssocMember(req).subscribe((response) => {
        //     console.log(response);
        // }, (error) => {
        //     console.log(error);
        // });
    }

    toto(values: Association) {
        alert(values);
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
