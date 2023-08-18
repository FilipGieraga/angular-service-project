import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { initializeApp, provideFirebaseApp } from '@angular/fire/app';
import { environment } from '../environments/environment';
import { provideAuth, getAuth } from '@angular/fire/auth';
import { provideDatabase, getDatabase } from '@angular/fire/database';
import { provideFirestore, getFirestore } from '@angular/fire/firestore';
import { FooterComponent } from './components/footer/footer.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductComponent } from './components/product/product.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { AngularFireModule } from '@angular/fire/compat';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { HttpClientModule } from '@angular/common/http';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { FeedbacksListComponent } from './components/feedbacks-list/feedbacks-list.component';
import { FeedbackReviewItemComponent } from './components/feedback-review-item/feedback-review-item.component';
import { FeedbackItemComponent } from './components/feedback-item/feedback-item.component';
import { YourFeedbackComponent } from './components/your-feedback/your-feedback.component';

@NgModule({
  declarations: [
    AppComponent,
    FooterComponent,
    NavbarComponent,
    LoginComponent,
    UserProfileComponent,
    ProductComponent,
    ProductListComponent,
    PageNotFoundComponent,
    PreferencesComponent,
    ReviewsListComponent,
    FeedbacksListComponent,
    FeedbackReviewItemComponent,
    FeedbackItemComponent,
    YourFeedbackComponent,
  ],
  imports: [
    BrowserModule,
    HttpClientModule,
    AppRoutingModule,
    ReactiveFormsModule,
    FormsModule,
    AngularFireModule.initializeApp(environment.firebase),
    provideFirebaseApp(() => initializeApp(environment.firebase)),
    provideAuth(() => getAuth()),
    provideDatabase(() => getDatabase()),
    provideFirestore(() => getFirestore()),
  ],
  providers: [],
  bootstrap: [AppComponent],
})
export class AppModule {}
