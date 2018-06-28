import { BaseEntity } from './../../shared';

export class Assoc_members implements BaseEntity {
    constructor(
        public id?: number,
        // public members_id?: number,
        // public associations_id?: number,
        public joined_date?: any,
        public userProfile?: BaseEntity,
        public association?: BaseEntity,
    ) {
    }
}
