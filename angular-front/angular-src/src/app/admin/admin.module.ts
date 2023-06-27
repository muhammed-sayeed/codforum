import { NgModule } from '@angular/core';
import { CommonModule } from '@angular/common';
import { AdminhomeComponent } from '../featureModule/admin/components/adminhome/adminhome.component';
import { RouterModule, Routes } from '@angular/router';
import { FormsModule } from '@angular/forms';

import { AdminnavComponent } from '../featureModule/admin/components/adminnav/adminnav.component';
import { AdminlayoutComponent } from '../featureModule/admin/components/adminlayout/adminlayout.component';
import { SidebarComponent } from '../featureModule/admin/components/sidebar/sidebar.component';
import { UserlistComponent } from '../featureModule/admin/components/userlist/userlist.component';
import { EdituserComponent } from '../featureModule/admin/components/edituser/edituser.component';
import { DataRsolver } from '../featureModule/user/resolver/resolver';
import { TaglistComponent } from '../featureModule/admin/components/taglist/taglist.component';
import { AddtagComponent } from '../featureModule/admin/components/addtag/addtag.component';
import { EdittagComponent } from '../featureModule/admin/components/edittag/edittag.component';
import { CommunityComponent } from '../featureModule/admin/components/community/community.component';
import { AddcommunityComponent } from '../featureModule/admin/components/addcommunity/addcommunity.component';
import { CommunitymembersComponent } from '../featureModule/admin/components/communitymembers/communitymembers.component';
import { AdminguardGuard } from '../shared module/guards/admin/adminguard.guard';
import { BadgesComponent } from '../featureModule/admin/components/badges/badges.component';
import { EditbadgeComponent } from '../featureModule/admin/components/editbadge/editbadge.component';
import { AddbadgeComponent } from '../featureModule/admin/components/addbadge/addbadge.component';
import { BadgedetailsComponent } from '../featureModule/admin/components/badgedetails/badgedetails.component';
import { ReportComponent } from '../featureModule/admin/components/report/report.component';

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
      { path: 'edittag/:id/:name/:description', component: EdittagComponent,canActivate:[AdminguardGuard] },
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
