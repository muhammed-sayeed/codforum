import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './components/navbar/navbar.component';
import { LoginComponent } from './components/login/login.component';
import { HomeComponent } from './components/home/home.component';
import { RegisterComponent } from './components/register/register.component';

import { Reducer } from './store/reducer';
import { AuthService } from './services/auth.service';
import { EffectsModule } from '@ngrx/effects';
import { registerEffect } from './store/effects/register.effect';
import { AdminguardGuard } from './guards/adminguard.guard';
import { UserGuard } from './guards/user.guard';
import { UserlayoutComponent } from './components/userlayout/userlayout.component';
import { SidebarComponent } from './components/sidebar/sidebar.component';
import { ProfileComponent } from './components/profile/profile.component';
import { ForumInterceptor } from './forum.interceptor';
import { EditprofileComponent } from './components/editprofile/editprofile.component';
import { UsersComponent } from './components/users/users.component';
import { SingleuserComponent } from './components/singleuser/singleuser.component';
import { TagsComponent } from './components/tags/tags.component';
import { CommunityComponent } from './components/community/community.component';
import { TagqnComponent } from './components/tagqn/tagqn.component';
import { AskqnComponent } from './components/askqn/askqn.component';
import { SingleqnComponent } from './components/singleqn/singleqn.component';
import { SinglechatComponent } from './components/singlechat/singlechat.component';
import { UiModule } from './shared module/shared.module';
import { QnlistingComponent } from './components/qnlisting/qnlisting.component';
import { CommunitydetailComponent } from './components/communitydetail/communitydetail.component';
import { AddarticleComponent } from './components/addarticle/addarticle.component';
import { SingleartComponent } from './components/singleart/singleart.component';
import { CoreModule } from './core.module';
import { ErrorpageComponent } from './components/errorpage/errorpage.component';





const appRoutes : Routes = [
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'login',component:LoginComponent,canDeactivate:[ UserGuard,AdminguardGuard]},
  {path:'register',component:RegisterComponent},
  {path:'error',component:ErrorpageComponent},
  {path:'',component:UserlayoutComponent,children:[
    {path:'',component:HomeComponent},
    {path:'profile',component:ProfileComponent},
    {path:'editprofile/:id/:username/:email',component:EditprofileComponent},
    {path:'users',component:UsersComponent},
    {path:'singleuser/:id',component:SingleuserComponent},
    { path:'tags',component:TagsComponent},
    {path:'tagqn/:id',component:TagqnComponent},
    {path: 'askqn',component:AskqnComponent},
    {path:'singleqn/:id',component:SingleqnComponent},
    {path:'singlechat/:id',component:SinglechatComponent},
    {path:'qnlist/:id',component:QnlistingComponent},
    {path: 'community',component:CommunityComponent},
    {path: 'communitydetail/:id',component:CommunitydetailComponent},
    {path:'addarticle/:id',component:AddarticleComponent},
    {path:'singleart/:id',component:SingleartComponent},

  ]
},
 {path:'**',redirectTo:'/error'}
]

@NgModule({
  declarations: [
    AppComponent,
    NavbarComponent,
    LoginComponent,
    HomeComponent,
    RegisterComponent,
    UserlayoutComponent,
    SidebarComponent,
    ProfileComponent,
    EditprofileComponent,
    UsersComponent,
    SingleuserComponent,
    TagsComponent,
    CommunityComponent,
    TagqnComponent,
    AskqnComponent,
    SingleqnComponent,
    SinglechatComponent,
    QnlistingComponent,
    CommunitydetailComponent,
    AddarticleComponent,
    SingleartComponent,
   
  ],
  imports: [
    UiModule,
    BrowserModule,
    RouterModule.forRoot(appRoutes,{useHash:true}),
    FormsModule  ,
    ReactiveFormsModule,
    HttpClientModule,
    StoreModule.forRoot({}),
    StoreDevtoolsModule.instrument({
      maxAge:25,
      logOnly:environment.production,
      autoPause:true
    }),
    StoreModule.forFeature('auth',Reducer),
    EffectsModule.forRoot([]),
    EffectsModule.forFeature([registerEffect]),
    CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
