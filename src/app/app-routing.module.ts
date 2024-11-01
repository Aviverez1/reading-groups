// src/app/app-routing.module.ts
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home/home.component';
import { BookSearchComponent } from './components/books/book-search.component';
import { LoginComponent } from './components/auth/login/login.component';
import { SignupComponent } from './components/auth/signup/signup.component';
import { AuthGuard } from './guards/auth.guard';

const routes: Routes = [
  { path: '', component: HomeComponent },
  { path: 'books', component: BookSearchComponent },
  { 
    path: 'auth', 
    children: [
      { path: 'login', component: LoginComponent },
      { path: 'signup', component: SignupComponent }
    ]
  },
  { 
    path: 'groups',
    loadChildren: () => import('../modules/groups/groups.module')
      .then(m => m.GroupsModule),
    //canActivate: [AuthGuard]
  }
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }