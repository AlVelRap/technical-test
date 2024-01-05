import { NgModule, inject } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { AppComponent } from './app.component';
import { LoginComponent } from './login/login.component';
import { RegisterComponent } from './register/register.component';
import { HomeComponent } from './pages/home/home.component';
import { WellnessComponent } from './wellness/wellness.component';
import { AuthGuard } from './services/auth-guard.service';
import { PlayerListComponent } from './player-list/player-list.component';

const routes: Routes = [
  { path: '', component: HomeComponent, pathMatch: 'full' },
  { path: 'login', component: LoginComponent, pathMatch: 'full' },
  { path: 'register', component: RegisterComponent, pathMatch: 'full' },
  {
    path: 'player',
    component: PlayerListComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  {
    path: 'player/:id_player/wellness',
    component: WellnessComponent,
    pathMatch: 'full',
    canActivate: [AuthGuard],
  },
  { path: '**', redirectTo: '' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
