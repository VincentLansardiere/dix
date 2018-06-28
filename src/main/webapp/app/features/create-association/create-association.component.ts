import { Component, OnInit} from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {AssociationService} from '../../entities/association/association.service';
import {Principal} from '../../shared';
import { Association } from '../../entities/association/association.model';
import {HttpErrorResponse, HttpResponse} from '@angular/common/http';

@Component({
  selector: 'jhi-create-association',
  templateUrl: './create-association.component.html',
  styles: []
})
export class CreateAssociationComponent implements OnInit {
  associations: Association[] = Array<Association>();
  association: Association = new Association();
  currentAccount: Account;
  eventSubscriber: Subscription;
  constructor(        private associationService: AssociationService,
                      private jhiAlertService: JhiAlertService,
                      private eventManager: JhiEventManager,
                      private principal: Principal) { }
  createAssociation(association: Association) {
      association.president = this.currentAccount;
      this.associationService.create(association).subscribe((response) => {
         console.log(response);
      }, (error) => {
        console.log(error);
      });
  }

  ngOnInit() {
    this.principal.identity().then((account) => {
            this.currentAccount = account;
        });

  }

    registerChangeInAssociations() {
        this.eventSubscriber = this.eventManager.subscribe('associationListModification', (response) => this.loadAll());
    }
    trackId(index: number, item: Association) {
        return item.id;
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
