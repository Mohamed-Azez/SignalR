import { PreloadAllModules, RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';
import { AuthGuard } from './auth/auth.guard';
import { hostname } from 'os';

export //2Tutorial
const routes: Routes = [
  { 
    path: '', redirectTo: 'home', pathMatch: 'full' 
  },
  { 
    path: 'auth', component: AuthComponent 
  },
  //3Tutorial
  { 
    path: 'home', component: HomeComponent 
  },
  { 
    path: '**', redirectTo: 'home', pathMatch: 'full'
   }
];


//3Tutorial
@NgModule({
    imports: [
      RouterModule.forRoot(routes, { preloadingStrategy: PreloadAllModules })
    ],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }