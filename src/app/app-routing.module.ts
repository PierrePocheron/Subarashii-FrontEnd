import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './home/home.component';
import { AuthGuard } from './services/auth.guard';
import { LoginComponent } from './user/login/login.component';
import { RegisterComponent } from './user/register/register.component';
import { AnimeComponent } from './anime/anime.component';
import { AnimesListComponent } from './user/animes-list/animes-list.component';
import { CompteComponent } from './user/compte/compte.component';
import { AdminDashboardComponent } from './admin-dashboard/admin-dashboard.component';
import { CommentairesComponent } from './admin-dashboard/commentaires/commentaires.component';
import { UtilisateursComponent } from './admin-dashboard/utilisateurs/utilisateurs.component';
import { QuestionsComponent } from './admin-dashboard/questions/questions.component';

const routes: Routes = [
  { path: '', component: HomeComponent, canActivate: [AuthGuard] },
  { path: 'login', component: LoginComponent },
  { path: 'register', component: RegisterComponent },
  { path: 'anime/:id', component: AnimeComponent, canActivate: [AuthGuard] },
  { path: 'animes-list', component: AnimesListComponent, canActivate: [AuthGuard] },
  { path : 'compte', component: CompteComponent, canActivate: [AuthGuard]},
  { path : 'admin', component: AdminDashboardComponent, canActivate: [AuthGuard]},
  { path : 'commentaires', component: CommentairesComponent, canActivate: [AuthGuard]},
  { path : 'utilisateurs', component: UtilisateursComponent, canActivate: [AuthGuard]},
  { path : 'questions', component: QuestionsComponent, canActivate: [AuthGuard]},
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
