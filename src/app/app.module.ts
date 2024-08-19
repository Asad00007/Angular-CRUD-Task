import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';

import { AppComponent } from './app.component';
import { AuthComponent } from './auth/auth.component';
import { NavbarComponent } from './navbar/navbar.component';
import { HomeComponent } from './home/home.component';
import { AppRoute } from './app-route.module';
import { CreatePostComponent } from './home/create-post/create-post.component';
import { UpdatePostComponent } from './home/update-post/update-post.component';
import { DeleteModalComponent } from './home/delete-modal/delete-modal.component';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule } from '@angular/common/http';
import { LoadingSpinnerComponent } from '../shared/loading-spinner/loading-spinner.component';
import { AlertModalComponent } from './shared/alert-modal/alert-modal.component';
import { DetailsComponent } from './home/details/details.component';

@NgModule({
  declarations: [
    AppComponent,
    AuthComponent,
    NavbarComponent,
    HomeComponent,
    CreatePostComponent,
    UpdatePostComponent,
    DeleteModalComponent,
    LoadingSpinnerComponent,
    AlertModalComponent,
    DetailsComponent,
  ],
  imports: [
    BrowserModule,
    AppRoute,
    ReactiveFormsModule,
    HttpClientModule,
    FormsModule,
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
