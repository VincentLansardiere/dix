import { BaseEntity, User } from './../../shared';

export class UserProfile implements BaseEntity {
    constructor(
        public id?: number,
        public lastname?: string,
        public firstname?: string,
        public birthdate?: any,
        public address?: string,
        public postcode?: string,
        public mail?: string,
        public city?: string,
        public mobilephone?: string,
        public homephone?: string,
        public roles?: BaseEntity[],
        public categories?: BaseEntity[],
        public participants?: BaseEntity[],
        public user?: User,
    ) {
    }
}
