import { Member } from './member';

export interface DialogDto {
    member: Member;
    type: String;
    members: Member[];
    families: string[];
}