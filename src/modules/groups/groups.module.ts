// src/app/modules/groups/groups.module.ts
import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { ReactiveFormsModule } from '@angular/forms';
import { GroupsRoutingModule } from './groups-routing.module';

import { GroupCreateComponent } from '../../app/components/group-create/group-create.component';
import { GroupListComponent } from '../../app/components/group-list/group-list.component';
import { GroupDetailsComponent } from '../../app/components/group-details/group-details.component';
import { SharedModule } from '../../app/components/shared/navbar/shared.module';
import { FormsModule } from '@angular/forms';
import { CommentsComponent } from '../../app/components/group-details/comments/comments.component';
import { SearchModalComponent } from '../../app/components/group-list/search-modal/search-modal.component';

@NgModule({
  declarations: [
    GroupCreateComponent,
    GroupListComponent,
    GroupDetailsComponent,
    CommentsComponent,
    SearchModalComponent
  ],
  imports: [
    CommonModule,
    ReactiveFormsModule,
    GroupsRoutingModule,
    SharedModule,
    FormsModule
  ]
})
export class GroupsModule { }