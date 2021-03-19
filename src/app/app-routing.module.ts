import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { HousesComponent } from './houses/houses.component';
import { PetsComponent } from './pets/pets.component';
import { PetStoreComponent } from './pet-store/pet-store.component';


const routes: Routes = [
  { path: 'family', component: MemberDetailsComponent },
  { path: 'houses', component: HousesComponent },
  { path: 'pets', component: PetsComponent },
  { path: 'pet-store', component: PetStoreComponent }
]

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})

export class AppRoutingModule { }
