import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { LoginComponent } from './components/login/login.component';
import { UserProfileComponent } from './components/user-profile/user-profile.component';
import { ProductListComponent } from './components/product-list/product-list.component';
import { PageNotFoundComponent } from './components/page-not-found/page-not-found.component';
import { PreferencesComponent } from './components/preferences/preferences.component';
import { ReviewsListComponent } from './components/reviews-list/reviews-list.component';
import { FeedbacksListComponent } from './components/feedbacks-list/feedbacks-list.component';
import { YourFeedbackComponent } from './components/your-feedback/your-feedback.component';

const routes: Routes = [
  { path: '', component: ProductListComponent, title: 'Home Page' },
  { path: 'login', component: LoginComponent, title: 'Login' },
  {
    path: 'preferences',
    component: PreferencesComponent,
    children: [
      {
        path: '',
        redirectTo: 'user-details',
        pathMatch: 'full',
      },
      {
        path: 'user-details',
        component: UserProfileComponent,
        title: 'User Details',
      },
      { path: 'reviews', component: ReviewsListComponent, title: 'Reviews' },
      {
        path: 'feedbacks',
        component: FeedbacksListComponent,
        title: 'Feedbacks',
      },
      {
        path: 'your-feedback',
        component: YourFeedbackComponent,
        title: 'Your Feedback',
      },
    ],
  },
  { path: '**', component: PageNotFoundComponent, title: 'Page not found' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
