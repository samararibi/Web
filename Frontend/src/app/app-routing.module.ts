import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { LoginComponent } from './login/login.component';
;
import { RegisterComponent } from './register/register.component';
import { JobDetailComponent } from './job-detail/job-detail.component';
import { JobListComponent } from './job-list/job-list.component';

import { ProfileComponent } from './profile/profile.component';
import { NotfoundComponent } from './notfound/notfound.component';
import { CandidateListComponent } from './candidate-list/candidate-list.component';
import { CandidateDetailComponent } from './candidate-detail/candidate-detail.component';
import { JobPostComponent } from './job-post/job-post.component';

const routes: Routes = [
  { path: '', redirectTo:'/home', pathMatch: 'full' },
  { path: 'home', component:HomeComponent },
  { path: 'login', component:LoginComponent },
  { path: 'candidates', component:CandidateListComponent },
  { path: 'register', component:RegisterComponent},
  { path: 'jobs', component: JobListComponent},
  { path: 'jobs/:id', component: JobDetailComponent},
 
  { path: 'candidates/:id', component: CandidateDetailComponent },
  { path: 'post-job', component: JobPostComponent },
  { path: 'profile', component:ProfileComponent },
  { path: '**', component:NotfoundComponent }

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
