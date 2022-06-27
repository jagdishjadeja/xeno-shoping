import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { HomeRoutingModule } from './home-routing.module';
import { HomeComponent } from './home.component';
import { ListComponent } from './list/list.component';
import { AddEditComponent } from './add-edit/add-edit.component';
import { NgbModalModule } from '@ng-bootstrap/ng-bootstrap';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

@NgModule({
  declarations: [HomeComponent, ListComponent, AddEditComponent],
  imports: [
    CommonModule,
    HomeRoutingModule,
    NgbModalModule,
    FormsModule,
    ReactiveFormsModule,
  ],
})
export class HomeModule {}
