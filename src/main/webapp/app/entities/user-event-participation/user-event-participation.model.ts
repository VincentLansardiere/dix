import { BaseEntity } from './../../shared';

export class UserEventParticipation implements BaseEntity {
    constructor(
        public id?: number,
        public userProfile?: BaseEntity,
        public event?: BaseEntity,
    ) {
    }
}
