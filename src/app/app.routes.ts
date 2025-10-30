import { Routes } from '@angular/router';
import { MainPageComponent } from './components/main-page/main-page.component';
import { AboutComponent } from './components/about/about.component';
import { ProjectsComponent } from './components/projects/projects.component';
import { ResumeComponent } from './components/resume/resume.component';

export const routes: Routes = [
  { path: '', component: MainPageComponent },
  { path: 'about', component: AboutComponent },
  { path: 'projects', component: ProjectsComponent },
  { path: 'resume', component: ResumeComponent },
];
