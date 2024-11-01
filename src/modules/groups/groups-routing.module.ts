// src/app/modules/groups/groups-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupCreateComponent } from '../../app/components/group-create/group-create.component';
import { GroupListComponent } from '../../app/components/group-list/group-list.component';
import { AuthGuard } from '../../app/guards/auth.guard';
import { GroupDetailsComponent } from '../../app/components/group-details/group-details.component';

const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: 'create', component: GroupCreateComponent, canActivate: [AuthGuard] },
  { path: ':id', component: GroupDetailsComponent }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class GroupsRoutingModule { }