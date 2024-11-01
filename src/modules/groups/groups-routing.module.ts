// src/app/modules/groups/groups-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { GroupCreateComponent } from '../../app/components/group-create/group-create.component';
import { GroupListComponent } from '../../app/components/group-list/group-list.component';
import { AuthGuard } from '../../app/guards/auth.guard';

const routes: Routes = [
  { path: '', component: GroupListComponent },
  { path: 'create', component: GroupCreateComponent, canActivate: [AuthGuard] }
];

@NgModule({
  imports: [RouterModule.forChild(routes)],
  exports: [RouterModule],
  providers: [AuthGuard]
})
export class GroupsRoutingModule { }