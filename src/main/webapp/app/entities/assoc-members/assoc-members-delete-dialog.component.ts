import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { Assoc_members } from './assoc-members.model';
import { Assoc_membersPopupService } from './assoc-members-popup.service';
import { Assoc_membersService } from './assoc-members.service';

@Component({
    selector: 'jhi-assoc-members-delete-dialog',
    templateUrl: './assoc-members-delete-dialog.component.html'
})
export class Assoc_membersDeleteDialogComponent {

    assoc_members: Assoc_members;

    constructor(
        private assoc_membersService: Assoc_membersService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.assoc_membersService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'assoc_membersListModification',
                content: 'Deleted an assoc_members'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-assoc-members-delete-popup',
    template: ''
})
export class Assoc_membersDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private assoc_membersPopupService: Assoc_membersPopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.assoc_membersPopupService
                .open(Assoc_membersDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
