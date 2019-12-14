import { NgModule } from '@angular/core';
import { CommonModule, } from '@angular/common';
import { BrowserModule  } from '@angular/platform-browser';
import { Routes, RouterModule } from '@angular/router';

import { ComponentsComponent } from './components/components.component';
import { ProfileComponent } from './examples/profile/profile.component';
import { SignupComponent } from './examples/signup/signup.component';
import { DetalleComponent } from './examples/detalle/detalle.component';
import { LandingComponent } from './examples/landing/landing.component';
import { NucleoiconsComponent } from './components/nucleoicons/nucleoicons.component';
import { LoginComponent } from './shared/login/login.component';
import { AuthGuard } from './helpers';
import { BusquedaComponent } from './shared/busqueda/busqueda.component';
import { MicroServicioComponent } from './shared/micro-servicio/micro-servicio.component';

const routes: Routes =[
    { path: '', redirectTo: 'home', pathMatch: 'full' },
    { path: 'home',             component: ComponentsComponent, data: { title: 'Home', icon: '' } },
    { path: 'user-profile',     component: ProfileComponent },
    { path: 'signup',           component: SignupComponent, data: { title: 'Registro', icon: '' } },
    { path: 'landing',          component: LandingComponent },
    { path: 'nucleoicons',      component: NucleoiconsComponent },
    { path: 'login',      component: LoginComponent, data: { title: 'Inicio de sesión', icon: '' } },
    { path: 'detalle/:code',      component: DetalleComponent, data: { title: 'Detalle de Habitacion', icon: '' } },
    { path: 'busqueda/:criterio',      component: BusquedaComponent, data: { title: 'Resultados', icon: '' } },
    { path: 'microServicio',      component: MicroServicioComponent, data: { title: 'Microservicio', icon: '' } }
];

@NgModule({
  imports: [
    CommonModule,
    BrowserModule,
    RouterModule.forRoot(routes,{
      useHash: true
    })
  ],
  exports: [
  ],
})
export class AppRoutingModule { }
//export const appRoutingModule = RouterModule.forRoot(routes);
