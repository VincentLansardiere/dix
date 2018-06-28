import { Injectable, Component } from '@angular/core';
import { Router } from '@angular/router';
import { NgbModal, NgbModalRef } from '@ng-bootstrap/ng-bootstrap';
import { HttpResponse } from '@angular/common/http';
import { Assoc_members } from './assoc-members.model';
import { Assoc_membersService } from './assoc-members.service';

@Injectable()
export class Assoc_membersPopupService {
    private ngbModalRef: NgbModalRef;

    constructor(
        private modalService: NgbModal,
        private router: Router,
        private assoc_membersService: Assoc_membersService

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
                this.assoc_membersService.find(id)
                    .subscribe((assoc_membersResponse: HttpResponse<Assoc_members>) => {
                        const assoc_members: Assoc_members = assoc_membersResponse.body;
                        if (assoc_members.joined_date) {
                            assoc_members.joined_date = {
                                year: assoc_members.joined_date.getFullYear(),
                                month: assoc_members.joined_date.getMonth() + 1,
                                day: assoc_members.joined_date.getDate()
                            };
                        }
                        this.ngbModalRef = this.assoc_membersModalRef(component, assoc_members);
                        resolve(this.ngbModalRef);
                    });
            } else {
                // setTimeout used as a workaround for getting ExpressionChangedAfterItHasBeenCheckedError
                setTimeout(() => {
                    this.ngbModalRef = this.assoc_membersModalRef(component, new Assoc_members());
                    resolve(this.ngbModalRef);
                }, 0);
            }
        });
    }

    assoc_membersModalRef(component: Component, assoc_members: Assoc_members): NgbModalRef {
        const modalRef = this.modalService.open(component, { size: 'lg', backdrop: 'static'});
        modalRef.componentInstance.assoc_members = assoc_members;
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
