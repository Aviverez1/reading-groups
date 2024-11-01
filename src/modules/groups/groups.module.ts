// src/app/modules/groups/groups.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsRoutingModule } from './groups-routing.module';

import { GroupCreateComponent } from '../../app/components/group-create/group-create.component';
import { GroupListComponent } from '../../app/components/group-list/group-list.component';

@NgModule({
  declarations: [
    GroupCreateComponent,
    GroupListComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsRoutingModule
  ]
})
export class GroupsModule { }