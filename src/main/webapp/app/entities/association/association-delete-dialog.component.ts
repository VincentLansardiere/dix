import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Association } from './association.model';
import { AssociationPopupService } from './association-popup.service';
import { AssociationService } from './association.service';

@Component({
    selector: 'jhi-association-delete-dialog',
    templateUrl: './association-delete-dialog.component.html'
})
export class AssociationDeleteDialogComponent {

    association: Association;

    constructor(
        private associationService: AssociationService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.associationService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'associationListModification',
                content: 'Deleted an association'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-association-delete-popup',
    template: ''
})
export class AssociationDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private associationPopupService: AssociationPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.associationPopupService
                .open(AssociationDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
