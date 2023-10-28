import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { registerRequestInterface } from '../../../coremodule/interfaces/registerrequest.interface';
import { Observable, map } from 'rxjs';
import { badge } from 'src/app/coremodule/interfaces/addbadge.interceptor';
import { editTag } from 'src/app/coremodule/interfaces/edittag.interface';
import { edituser } from 'src/app/coremodule/interfaces/edituser.interface';
import { environment } from 'src/environments/environment';
import { addTag } from 'src/app/coremodule/interfaces/addTag.interface';
import { addCommunity } from 'src/app/coremodule/interfaces/addCommunity.interface';
import { removeMember } from 'src/app/coremodule/interfaces/removeMember.interface';
import { editBadge } from 'src/app/coremodule/interfaces/editBadge.interface';
import { id } from 'src/app/coremodule/interfaces/id.interface';
import { reportQns } from 'src/app/coremodule/interfaces/reportQns.interface';
import { reportData } from 'src/app/coremodule/interfaces/reportData.interface';


@Injectable({
  providedIn: 'root',
})
export class adminService {
  adminToken!: string | null;
  constructor(private http: HttpClient) {}

  tokenGenerator(refreshToken: string) {
    return this.http.post(environment.apiUrl+'token', refreshToken);
  }

  storeUserAdminData(token: string, refresh: string) {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminRefresh', refresh);
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }
  getUserList() {
    return this.http.get(environment.adminApiUrl+'userlist');
  }

  manageUser(access: boolean, Id: string): Observable<Object> {
    return this.http.post(environment.adminApiUrl+'manageuser', {
      access,
      Id,
    });
  }

  editUser(user: edituser) {
    return this.http.post(environment.adminApiUrl+'edituser', user);
  }

  addTag(Data:addTag ) {
    return this.http.post(environment.adminApiUrl+'addtag', Data);
  }

  checkName(value: string) {
    return this.http.get(environment.adminApiUrl+'checkname');
  }

  tagList() {
    return this.http.get(environment.adminApiUrl+'taglist');
  }

  editTag(tagData: editTag) {
    return this.http.put(
      environment.adminApiUrl+'edittag',
      tagData
    );
  }

  // updateImg(data) {
  //   return this.http.put(environment.adminApiUrl+'updateimg', data);
  // }

  removeTag(Id: string) {
    return this.http.delete(
      environment.adminApiUrl+'removetag?Id=' + Id
    );
  }

  moderatorList() {
    return this.http.get(environment.adminApiUrl+'moderatorlist');
  }

  addCommunity(communityData: addCommunity) {
    return this.http.post(
      environment.adminApiUrl+'addcommunity',
      communityData
    );
  }

  communityList() {
    return this.http.get(environment.adminApiUrl+'communitylist');
  }

  removeCommunity(Id:id) {
    return this.http.post(
      environment.adminApiUrl+'removecommunity',
      Id
    );
  }

  removeMember(data: removeMember) {
    return this.http.post(
      environment.adminApiUrl+'removemember',
      data
    );
  }

  addBadge(data: badge) {
    return this.http.post(environment.adminApiUrl+'addbadge', data);
  }

  badgeList() {
    return this.http.get(environment.adminApiUrl+'badgelist');
  }

  badgeDetail(Id: string) {
    return this.http.get(environment.adminApiUrl+'badgedetail?Id='+ Id);
  }

  editBadge(data: editBadge) {
    return this.http.patch(
      environment.adminApiUrl+'editbadge',
      data
    );
  }
  reportQns() {
    return this.http.get<{questions:reportQns[]}>(environment.adminApiUrl+'reportqns');
  }
  singleReport(Id: string) {
    return this.http.get<reportData>(
      environment.adminApiUrl+'getsingleqn?Id=' + Id
    );
  }

  blockQn(Id: string) {
    return this.http.put(
      environment.adminApiUrl+`blockqn?id=${Id}`,
      {}
    );
  }

  adminLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRefresh');
  }
}
