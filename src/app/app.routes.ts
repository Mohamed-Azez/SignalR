import { RouterModule, Routes } from '@angular/router';
import { AuthComponent } from './auth/auth.component';
import { HomeComponent } from './home/home.component';
import { NgModule } from '@angular/core';

export const routes: Routes = [
    {
        path:'',redirectTo:'auth',pathMatch:'full'
    },
    {
        path:'auth',component:AuthComponent
    },
    {
        path:'home',component:HomeComponent
    },
    {
        path:'**',redirectTo:'auth',pathMatch:'full'
    }
];

@NgModule({
    imports: [RouterModule.forRoot(routes)],
    exports: [RouterModule]
  })
  export class AppRoutingModule { }