import { Component, OnInit, OnDestroy } from '@angular/core';
import { ActivatedRoute } from '@angular/router';

import { NgbActiveModal } from '@ng-bootstrap/ng-bootstrap';
import { JhiEventManager } from 'ng-jhipster';

import { AssociationUserRole } from './association-user-role.model';
import { AssociationUserRolePopupService } from './association-user-role-popup.service';
import { AssociationUserRoleService } from './association-user-role.service';

@Component({
    selector: 'jhi-association-user-role-delete-dialog',
    templateUrl: './association-user-role-delete-dialog.component.html'
})
export class AssociationUserRoleDeleteDialogComponent {

    associationUserRole: AssociationUserRole;

    constructor(
        private associationUserRoleService: AssociationUserRoleService,
        public activeModal: NgbActiveModal,
        private eventManager: JhiEventManager
    ) {
    }

    clear() {
        this.activeModal.dismiss('cancel');
    }

    confirmDelete(id: number) {
        this.associationUserRoleService.delete(id).subscribe((response) => {
            this.eventManager.broadcast({
                name: 'associationUserRoleListModification',
                content: 'Deleted an associationUserRole'
            });
            this.activeModal.dismiss(true);
        });
    }
}

@Component({
    selector: 'jhi-association-user-role-delete-popup',
    template: ''
})
export class AssociationUserRoleDeletePopupComponent implements OnInit, OnDestroy {

    routeSub: any;

    constructor(
        private route: ActivatedRoute,
        private associationUserRolePopupService: AssociationUserRolePopupService
    ) {}

    ngOnInit() {
        this.routeSub = this.route.params.subscribe((params) => {
            this.associationUserRolePopupService
                .open(AssociationUserRoleDeleteDialogComponent as Component, params['id']);
        });
    }

    ngOnDestroy() {
        this.routeSub.unsubscribe();
    }
}
