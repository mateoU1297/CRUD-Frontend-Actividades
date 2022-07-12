import { NgModule } from '@angular/core';
import { SharedModule } from './shared/shared.module';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { ActividadesModule } from './features/actividades/actividades.module';

import { AppComponent } from './app.component';

@NgModule({
  declarations: [
    AppComponent
  ],
  imports: [
    SharedModule,
    BrowserModule,
    AppRoutingModule,
    ActividadesModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
