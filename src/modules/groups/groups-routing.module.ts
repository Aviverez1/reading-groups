// src/app/modules/groups/groups-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupListComponent } from '../../app/components/group-list/group-list.component';
import { GroupDetailsComponent } from '../../app/components/group-details/group-details.component';
import { GroupFormComponent } from '../../app/components/shared/group-form/group-form.component';
import { AuthGuard } from '../../app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: 'create', component: GroupFormComponent, canActivate: [AuthGuard] },
  { path: ':id', component: GroupDetailsComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class GroupsRoutingModule { }