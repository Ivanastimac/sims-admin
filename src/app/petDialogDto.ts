import { OwnedPet } from './ownedPet';

export interface PetDialogDto {
    pet: OwnedPet;
    delete: boolean;
}