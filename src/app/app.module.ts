import { HttpClientModule } from '@angular/common/http';

import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';

import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { LeftNavComponent } from './layout/left-nav/left-nav.component';
import { HeaderComponent } from './layout/header/header.component';
import { BoardComponent } from './pages/board/board.component';

import {CardModule} from 'primeng/card';
import {DragDropModule} from '@angular/cdk/drag-drop';
import {BreadcrumbModule} from 'primeng/breadcrumb';
import {MenuItem} from 'primeng/api';

@NgModule({
  declarations: [
    AppComponent,
    LeftNavComponent,
    HeaderComponent,
    BoardComponent,

  ],
  imports: [
    CardModule,
    DragDropModule,
    BreadcrumbModule,
    BrowserModule,
    HttpClientModule,
    BrowserAnimationsModule,
    AppRoutingModule
  ],
  providers: [],
  bootstrap: [AppComponent]
})
export class AppModule { }
