import { BaseEntity } from './../../shared';

export class Association implements BaseEntity {
    constructor(
        public id?: number,
        public name?: string,
        public description?: string,
        public picture?: string,
        public address?: string,
        public postcode?: string,
        public city?: string,
        public president?: BaseEntity,
        public roles?: BaseEntity[],
        public events?: BaseEntity[],
        public members?: BaseEntity[],
    ) {
    }
}
