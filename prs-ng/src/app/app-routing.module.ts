import { NgModule, Component } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';
// import { listenerCount } from 'cluster';

import { UserListComponent } from './feature/user/user-list/user-list.component';
import { UserEditComponent } from './feature/user/user-edit/user-edit.component';
import { UserDetailComponent } from './feature/user/user-detail/user-detail.component';
import { UserCreateComponent } from './feature/user/user-create/user-create.component';

import { VendorListComponent } from './feature/vendor/vendor-list/vendor-list.component';
import { VendorCreateComponent } from './feature/vendor/vendor-create/vendor-create.component';
import { VendorEditComponent } from './feature/vendor/vendor-edit/vendor-edit.component';
import { VendorDetailComponent } from './feature/vendor/vendor-detail/vendor-detail.component';

import { ProductDetailComponent } from './feature/product/product-detail/product-detail.component';
import { ProductEditComponent } from './feature/product/product-edit/product-edit.component';
import { ProductListComponent } from './feature/product/product-list/product-list.component';
import { ProductCreateComponent } from './feature/product/product-create/product-create.component';
import { UserLoginComponent } from './feature/user/user-login/user-login.component';
import { RequestListComponent } from './feature/request/request-list/request-list.component';
import { RequestCreateComponent } from './feature/request/request-create/request-create.component';
import { RequestEditComponent } from './feature/request/request-edit/request-edit.component';
import { RequestDetailComponent } from './feature/request/request-detail/request-detail.component';
import { RequestLineListComponent } from './feature/request-line/request-line-list/request-line-list.component';
import { RequestLineCreateComponent } from './feature/request-line/request-line-create/request-line-create.component';
import { RequestLineEditComponent } from './feature/request-line/request-line-edit/request-line-edit.component';
import { RequestReviewComponent } from './feature/request/request-review/request-review.component';
import { RequestReviewDetailComponent } from './feature/request/request-review-detail/request-review-detail.component';
import { HomeComponent } from './feature/general/home/home.component';
import { NewUserComponent } from './feature/user/new-user/new-user.component';



const routes: Routes = [
  { path: '', redirectTo: '/home', pathMatch: 'full' },

  { path: 'user/list', component: UserListComponent },
  { path: 'user/login', component: UserLoginComponent },
  { path: 'user/create', component: UserCreateComponent },
  { path: 'user/detail/:id', component: UserDetailComponent },
  { path: 'user/edit/:id', component: UserEditComponent },
  { path: 'user/new', component: NewUserComponent },

  { path: 'vendor/list', component: VendorListComponent },
  { path: 'vendor/create', component: VendorCreateComponent },
  { path: 'vendor/edit/:id', component: VendorEditComponent },
  { path: 'vendor/detail/:id', component: VendorDetailComponent },

  { path: 'request/list', component: RequestListComponent },
  { path: 'request/create', component: RequestCreateComponent },
  { path: 'request/edit/:id', component: RequestEditComponent },
  { path: 'request/detail/:id', component: RequestDetailComponent },
  { path: 'request/review', component: RequestReviewComponent },
  { path: 'request/review/detail/:id', component: RequestReviewDetailComponent },

  { path: 'product/list', component: ProductListComponent },
  { path: 'product/create', component: ProductCreateComponent },
  { path: 'product/edit/:id', component: ProductEditComponent },
  { path: 'product/detail/:id', component: ProductDetailComponent },

  { path: 'requestline/list/:id', component: RequestLineListComponent },
  { path: 'requestline/create/:id', component: RequestLineCreateComponent },
  { path: 'requestline/edit/:id', component: RequestLineEditComponent },

  { path: 'home', component: HomeComponent },

];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
