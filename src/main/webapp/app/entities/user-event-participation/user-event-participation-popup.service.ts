import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { UserEventParticipation } from './user-event-participation.model';
import { UserEventParticipationService } from './user-event-participation.service';

@Injectable()
export class UserEventParticipationPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private userEventParticipationService: UserEventParticipationService

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
                this.userEventParticipationService.find(id)
                    .subscribe((userEventParticipationResponse: HttpResponse<UserEventParticipation>) => {
                        const userEventParticipation: UserEventParticipation = userEventParticipationResponse.body;
                        this.ngbModalRef = this.userEventParticipationModalRef(component, userEventParticipation);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.userEventParticipationModalRef(component, new UserEventParticipation());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    userEventParticipationModalRef(component: Component, userEventParticipation: UserEventParticipation): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.userEventParticipation = userEventParticipation;
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
