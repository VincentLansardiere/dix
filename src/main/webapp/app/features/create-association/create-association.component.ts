import { Component, OnInit } from '@angular/core';
import { Subscription } from 'rxjs/Subscription';
import {JhiAlertService, JhiEventManager} from 'ng-jhipster';
import {AssociationService} from '../../entities/association/association.service';
import {Principal} from '../../shared';
import { Association } from '../../entities/association/association.model';

@Component({
  selector: 'jhi-create-association',
  templateUrl: './create-association.component.html',
  styles: []
})
export class CreateAssociationComponent implements OnInit {
  association: Association = new Association();
  currentAccount: any;
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
}
