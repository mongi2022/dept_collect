import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { NavbarComponent } from './shared/template/navbar/navbar.component';
import { SidebarComponent } from './shared/template/sidebar/sidebar.component';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AuthService } from './core/service/auth.service';
import { AuthInterceptor } from './core/interceptor/auth.interceptor';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { FullscreenComponent } from './shared/template/fullscreen/fullscreen.component';
import { SearchBarComponent } from './shared/template/search-bar/search-bar.component';
import { SidemenuComponent } from './shared/template/sidemenu/sidemenu.component';
import { SidemenuItemComponent } from './shared/template/sidemenu-item/sidemenu-item.component';
import { ToolbarComponent } from './shared/template/toolbar/toolbar.component';
import { ToolbarNotificationComponent } from './shared/template/toolbar-notification/toolbar-notification.component';
import { UserMenuComponent } from './shared/template/user-menu/user-menu.component';
import { MaterialModule } from './shared/material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';

@NgModule({
  declarations: [
    AppComponent,
    UserMenuComponent,
    ToolbarNotificationComponent,
    ToolbarComponent,
    SidemenuItemComponent,
    SidemenuComponent,
    SidebarComponent,
    FullscreenComponent,
    SearchBarComponent,
    NavbarComponent,
  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    FormsModule,
    BrowserAnimationsModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    NgScrollbarModule
  ],
  providers: [AuthService,{provide:HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true}],
  bootstrap: [AppComponent]
})
export class AppModule { }
