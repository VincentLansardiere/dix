import { BaseEntity } from './../../shared';

export class Event implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public picture?: string,
        public location?: string,
        public startDate?: any,
        public endDate?: any,
        public recurrence?: number,
        public association?: BaseEntity,
        public participants?: BaseEntity[],
    ) {
    }
}
