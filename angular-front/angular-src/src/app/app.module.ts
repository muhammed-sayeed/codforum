import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { RouterModule,Routes} from '@angular/router'
import { FormsModule, ReactiveFormsModule } from '@angular/forms';
import { HttpClientModule, HTTP_INTERCEPTORS } from '@angular/common/http';
import { StoreModule } from '@ngrx/store';
import { StoreDevtoolsModule } from '@ngrx/store-devtools';


import { environment } from 'src/environments/environment';
import { AppComponent } from './app.component';
import { NavbarComponent } from './featureModule/user/components/navbar/navbar.component';
import { LoginComponent } from './featureModule/user/components/login/login.component';
import { HomeComponent } from './featureModule/user/components/home/home.component';
import { RegisterComponent } from './featureModule/user/components/register/register.component';
import { EffectsModule } from '@ngrx/effects';
import { registerEffect } from './featureModule/store/appeffect';
import { AdminguardGuard } from './shared module/guards/admin/adminguard.guard';
import { UserGuard } from './shared module/guards/user/user.guard';
import { UserlayoutComponent } from './featureModule/user/components/userlayout/userlayout.component';
import { SidebarComponent } from './featureModule/user/components/sidebar/sidebar.component';
import { ProfileComponent } from './featureModule/user/components/profile/profile.component';
import { ForumInterceptor } from './coremodule/interceptor/forum.interceptor';
import { EditprofileComponent } from './featureModule/user/components/editprofile/editprofile.component';
import { UsersComponent } from './featureModule/user/components/users/users.component';
import { SingleuserComponent } from './featureModule/user/components/singleuser/singleuser.component';
import { TagsComponent } from './featureModule/user/components/tags/tags.component';
import { CommunityComponent } from './featureModule/user/components/community/community.component';
import { TagqnComponent } from './featureModule/user/components/tagqn/tagqn.component';
import { AskqnComponent } from './featureModule/user/components/askqn/askqn.component';
import { SingleqnComponent } from './featureModule/user/components/singleqn/singleqn.component';
import { SinglechatComponent } from './featureModule/user/components/singlechat/singlechat.component';
import { UiModule } from './shared module/metetiel/meterial.ui';
import { QnlistingComponent } from './featureModule/user/components/qnlisting/qnlisting.component';
import { CommunitydetailComponent } from './featureModule/user/components/communitydetail/communitydetail.component';
import { AddarticleComponent } from './featureModule/user/components/addarticle/addarticle.component';
import { SingleartComponent } from './featureModule/user/components/singleart/singleart.component';
// import { CoreModule } from './core.module';
import { ErrorpageComponent } from './featureModule/error/errorpage/errorpage.component';
import { Reducer } from './featureModule/store/reducer';





const appRoutes : Routes = [
  {path:'admin',loadChildren:()=>import('./admin/admin.module').then(m => m.AdminModule)},
  {path:'login',component:LoginComponent},
  {path:'register',component:RegisterComponent},
  {path:'error',component:ErrorpageComponent},
  {path:'',component:UserlayoutComponent,children:[
    {path:'',component:HomeComponent},
    {path:'profile',component:ProfileComponent,canActivate:[UserGuard]},
    {path:'editprofile/:id/:username/:email',component:EditprofileComponent,canActivate:[UserGuard]},
    {path:'users',component:UsersComponent},
    {path:'singleuser/:id',component:SingleuserComponent},
    { path:'tags',component:TagsComponent},
    {path:'tagqn/:id',component:TagqnComponent},
    {path: 'askqn',component:AskqnComponent,canActivate:[UserGuard]},
    {path:'singleqn/:id',component:SingleqnComponent,canActivate:[UserGuard]},
    {path:'singlechat/:id/:mail/:usermail',component:SinglechatComponent,canActivate:[UserGuard]},
    {path:'qnlist/:id',component:QnlistingComponent},
    {path: 'community',component:CommunityComponent},
    {path: 'communitydetail/:id',component:CommunitydetailComponent,canActivate:[UserGuard]},
    {path:'addarticle/:id',component:AddarticleComponent,canActivate:[UserGuard]},
    {path:'singleart/:id',component:SingleartComponent,canActivate:[UserGuard]},

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
    // CoreModule
  ],
  providers: [],
  bootstrap: [AppComponent],
  
})
export class AppModule { }
