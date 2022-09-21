import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';

import { TemplateRoutingModule } from './template-routing.module';
import { UserMenuComponent } from './user-menu/user-menu.component';
import { ToolbarNotificationComponent } from './toolbar-notification/toolbar-notification.component';
import { ToolbarComponent } from './toolbar/toolbar.component';
import { SidemenuItemComponent } from './sidemenu-item/sidemenu-item.component';
import { SidemenuComponent } from './sidemenu/sidemenu.component';
import { SidebarComponent } from './sidebar/sidebar.component';
import { FullscreenComponent } from './fullscreen/fullscreen.component';
import { SearchBarComponent } from './search-bar/search-bar.component';
import { ReactiveFormsModule } from '@angular/forms';
import { MaterialModule } from '../material/material.module';
import { NgScrollbarModule } from 'ngx-scrollbar';
import { NavbarComponent } from './navbar/navbar.component';


@NgModule({
  declarations: [
  
    
  ],
  imports: [
    CommonModule,
    TemplateRoutingModule,
    ReactiveFormsModule,
    MaterialModule.forRoot(),
    NgScrollbarModule
  ]
})
export class TemplateModule { }

