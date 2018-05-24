import { BaseEntity } from './../../shared';

export class AssociationUserRole implements BaseEntity {
    constructor(
        public id?: number,
        public role?: string,
        public userProfile?: BaseEntity,
        public association?: BaseEntity,
    ) {
    }
}
