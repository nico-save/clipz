import { LOCALE_ID, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';

import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { UserModule } from './user/user.module';
import { NavComponent } from './nav/nav.component';
import { AngularFireModule } from '@angular/fire/compat'
import { environment } from 'src/environments/environment';
import { AngularFireAuthModule } from '@angular/fire/compat/auth';
import {AngularFirestoreModule } from '@angular/fire/compat/firestore';
import { HomeComponent } from './home/home.component';
import { AboutComponent } from './about/about.component';
import { ClipComponent } from './clip/clip.component';
import { NotFoundComponent } from './not-found/not-found.component';
import { AngularFireStorageModule } from '@angular/fire/compat/storage';
import { HttpClient, HttpClientModule } from '@angular/common/http';
import { ClipsListComponent } from './clips-list/clips-list.component';
import { FbTimestampPipe } from './pipes/fb-timestamp.pipe';
import { SharedModule } from "./shared/shared.module";
import { CommentsListComponent } from './comment/comments-list/comments-list.component';
import { DatePipe } from '@angular/common';
import { CommentComponent } from './comment/comment/comment.component';
import { CreateComponent } from './comment/comment-modal/create/create.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';

import { registerLocaleData } from '@angular/common';
import * as fr from '@angular/common/locales/fr';

@NgModule({
    declarations: [
        AppComponent,
        NavComponent,
        HomeComponent,
        AboutComponent,
        ClipComponent,
        CommentComponent,
        CreateComponent,
        CommentsListComponent,
        NotFoundComponent,
        ClipsListComponent ,
        FbTimestampPipe
    ],
    providers: [
      { provide: LOCALE_ID, useValue: 'fr-FR'},
      DatePipe
    ],
    bootstrap: [AppComponent],
    imports: [
        BrowserModule,
        HttpClientModule,
        UserModule,
        AngularFireModule.initializeApp(environment.firebase),
        AngularFireAuthModule,
        AngularFirestoreModule,
        AppRoutingModule,
        AngularFireStorageModule,
        SharedModule,
        ReactiveFormsModule,
        FormsModule

    ]
})

export class AppModule {
    constructor() {
    registerLocaleData(fr.default);
  }
 }

