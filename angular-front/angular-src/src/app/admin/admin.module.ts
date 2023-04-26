import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminhomeComponent } from './component/adminhome/adminhome.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminnavComponent } from './component/adminnav/adminnav.component';
import { AdminlayoutComponent } from './component/adminlayout/adminlayout.component';
import { SidebarComponent } from './component/sidebar/sidebar.component';
import { UserlistComponent } from './component/userlist/userlist.component';
import { EdituserComponent } from './component/edituser/edituser.component';
import { DataRsolver } from '../resolver';
import { TaglistComponent } from './component/taglist/taglist.component';
import { AddtagComponent } from './component/addtag/addtag.component';
import { EdittagComponent } from './component/edittag/edittag.component';
import { CommunityComponent } from './component/community/community.component';
import { AddcommunityComponent } from './component/addcommunity/addcommunity.component';
import { CommunitymembersComponent } from './component/communitymembers/communitymembers.component';
import { AdminguardGuard } from '../guards/adminguard.guard';
import { BadgesComponent } from './component/badges/badges.component';
import { EditbadgeComponent } from './component/editbadge/editbadge.component';
import { AddbadgeComponent } from './component/addbadge/addbadge.component';
import { BadgedetailsComponent } from './component/badgedetails/badgedetails.component';
import { ReportComponent } from './component/report/report.component';

const routes: Routes = [
  {
    path: '',
    component: AdminlayoutComponent,
    children: [
      { path: '', component: AdminhomeComponent,canActivate:[AdminguardGuard] },
      {
        path: 'userlist',
        component: UserlistComponent,
        resolve: {
          data: DataRsolver,
        },canActivate:[AdminguardGuard]
      },
      { path: 'edituser/:id/:username/:phone/:email', component: EdituserComponent,canActivate:[AdminguardGuard] },
      { path: 'taglist', component: TaglistComponent,canActivate:[AdminguardGuard] },
      { path: 'addtag', component: AddtagComponent,canActivate:[AdminguardGuard] },
      { path: 'edittag/:id/:name/:description/:image', component: EdittagComponent,canActivate:[AdminguardGuard] },
      { path: 'community', component: CommunityComponent,canActivate:[AdminguardGuard] },
      { path: 'addcommunity', component: AddcommunityComponent,canActivate:[AdminguardGuard] },
      { path: 'cummmembers/:id', component:CommunitymembersComponent,canActivate:[AdminguardGuard]},
      { path: 'badge',component:BadgesComponent},
      { path: 'addbadges',component:AddbadgeComponent},
      { path: 'editbadge/:name/:criteria/:id',component:EditbadgeComponent},
      { path: 'badgedetails/:id',component:BadgedetailsComponent},
      { path: 'report',component:ReportComponent}
    ],
  },
];

@NgModule({
  declarations: [
    AdminhomeComponent,
    AdminnavComponent,
    AdminlayoutComponent,
    SidebarComponent,
    UserlistComponent,
    EdituserComponent,
    TaglistComponent,
    AddtagComponent,
    EdittagComponent,
    CommunityComponent,
    AddcommunityComponent,
    CommunitymembersComponent,
    BadgesComponent,
    EditbadgeComponent,
    AddbadgeComponent,
    BadgedetailsComponent,
    ReportComponent,
  ],
  imports: [CommonModule,
            RouterModule.forChild(routes),
            FormsModule
          ],
  providers: [DataRsolver],
})
export class AdminModule {}
