import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';

import { AppComponent } from './app.component';
import { MemberDetailsComponent } from './member-details/member-details.component';
import { AppRoutingModule } from './app-routing.module';
import { PetsComponent } from './pets/pets.component';
import { HousesComponent } from './houses/houses.component';
import { PetStoreComponent } from './pet-store/pet-store.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatInputModule } from '@angular/material/input';
import { MatButtonModule } from '@angular/material/button';
import { MatSelectModule } from '@angular/material/select';
import { MatRadioModule } from '@angular/material/radio';
import { MatCardModule } from '@angular/material/card';
import { NavigationComponent } from './navigation/navigation.component';
import { LayoutModule } from '@angular/cdk/layout';
import { MatToolbarModule } from '@angular/material/toolbar';
import { MatSidenavModule } from '@angular/material/sidenav';
import { MatIconModule } from '@angular/material/icon';
import { MatListModule } from '@angular/material/list';
import { HeaderComponent } from './header/header.component';
import {MatTableModule} from '@angular/material/table';
import {MatDialogModule} from '@angular/material/dialog';
import { MemberDialogComponent } from './member-dialog/member-dialog.component';
import { MatSortModule } from '@angular/material/sort';
import { AddFamilyComponent } from './add-family/add-family.component';
import { DeleteMemberComponent } from './delete-member/delete-member.component';
import { DialogChooseComponent } from './dialog-choose/dialog-choose.component';
import { DialogNotParentComponent } from './dialog-not-parent/dialog-not-parent.component';
import { OwnedPetDialogComponent } from './owned-pet-dialog/owned-pet-dialog.component';
import { DeletePetDialogComponent } from './delete-pet-dialog/delete-pet-dialog.component';
import {MatGridListModule} from '@angular/material/grid-list';
import { DialogAllowedPetComponent } from './dialog-allowed-pet/dialog-allowed-pet.component';
import { DialogMessageComponent } from './dialog-message/dialog-message.component';


@NgModule({
  declarations: [
    AppComponent,
    MemberDetailsComponent,
    PetsComponent,
    HousesComponent,
    PetStoreComponent,
    NavigationComponent,
    HeaderComponent,
    MemberDialogComponent,
    AddFamilyComponent,
    DeleteMemberComponent,
    DialogChooseComponent,
    DialogNotParentComponent,
    OwnedPetDialogComponent,
    DeletePetDialogComponent,
    DialogAllowedPetComponent,
    DialogMessageComponent,
  ],
  imports: [
    BrowserModule,
    FormsModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MatInputModule,
    MatButtonModule,
    MatSelectModule,
    MatRadioModule,
    MatCardModule,
    ReactiveFormsModule,
    LayoutModule,
    MatToolbarModule,
    MatSidenavModule,
    MatIconModule,
    MatListModule,
    HttpClientModule,
    MatTableModule,
    MatDialogModule,
    MatSortModule,
    MatGridListModule
  ],
  exports: [
    MatSortModule
  ],
  entryComponents: [
    MemberDialogComponent
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule { }
