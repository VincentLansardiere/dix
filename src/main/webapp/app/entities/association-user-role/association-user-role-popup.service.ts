import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { AssociationUserRole } from './association-user-role.model';
import { AssociationUserRoleService } from './association-user-role.service';

@Injectable()
export class AssociationUserRolePopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private associationUserRoleService: AssociationUserRoleService

    ) {
        this.ngbModalRef = null;
    }

    open(component: Component, id?: number | any): Promise<NgbModalRef> {
        return new Promise<NgbModalRef>((resolve, reject) => {
            const isOpen = this.ngbModalRef !== null;
            if (isOpen) {
                resolve(this.ngbModalRef);
            }

            if (id) {
                this.associationUserRoleService.find(id)
                    .subscribe((associationUserRoleResponse: HttpResponse<AssociationUserRole>) => {
                        const associationUserRole: AssociationUserRole = associationUserRoleResponse.body;
                        this.ngbModalRef = this.associationUserRoleModalRef(component, associationUserRole);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.associationUserRoleModalRef(component, new AssociationUserRole());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    associationUserRoleModalRef(component: Component, associationUserRole: AssociationUserRole): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.associationUserRole = associationUserRole;
        modalRef.result.then((result) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        }, (reason) => {
            this.router.navigate([{ outlets: { popup: null }}], { replaceUrl: true, queryParamsHandling: 'merge' });
            this.ngbModalRef = null;
        });
        return modalRef;
    }
}
