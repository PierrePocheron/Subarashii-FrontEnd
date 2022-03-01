import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HeaderComponent } from './templates/header/header.component';
import { FooterComponent } from './templates/footer/footer.component';
import { HomeComponent } from './home/home.component';
import { AuthInterceptor } from './auth.interceptor';
import { AuthComponent } from './user/auth/auth.component';
import { JwtHelperService, JwtModule } from '@auth0/angular-jwt';
import { AuthGuard } from './services/auth.guard';
import { ReactiveFormsModule } from '@angular/forms';

export function tokenGetter() {
  return localStorage.getItem('token') ? localStorage.getItem('token') : ''
}

@NgModule({
  declarations: [AppComponent, HeaderComponent, FooterComponent, HomeComponent, AuthComponent],
  imports: [
    BrowserModule,
    AppRoutingModule,
    HttpClientModule,
    InfiniteScrollModule,
    JwtModule.forRoot({
      config: {
        tokenGetter: tokenGetter,
      },
    }),
    ReactiveFormsModule
  ],
  providers: [{provide: HTTP_INTERCEPTORS,useClass:AuthInterceptor,multi:true},
    AuthGuard, JwtHelperService],
  bootstrap: [AppComponent],
})
export class AppModule {}
