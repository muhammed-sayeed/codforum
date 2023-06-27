import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { registerRequestInterface } from '../../../coremodule/interfaces/registerrequest.interface';
import { Observable, map } from 'rxjs';
import { badge } from 'src/app/coremodule/interfaces/addbadge.interceptor';
import { editTag } from 'src/app/coremodule/interfaces/edittag.interface';
import { edituser } from 'src/app/coremodule/interfaces/edituser.interface';

@Injectable({
  providedIn: 'root',
})
export class adminService {
  adminToken!: string | null;
  constructor(private http: HttpClient) {}
  tokenGenerator(refreshToken: any) {
    return this.http.post('https://codforum.onrender.com/token', refreshToken);
  }

  storeUserAdminData(token: string, refresh: string) {
    localStorage.setItem('adminToken', token);
    localStorage.setItem('adminRefresh', refresh);
  }

  isAdminLoggedIn(): boolean {
    return !!localStorage.getItem('adminToken');
  }
  getUserList() {
    return this.http.get('https://codforum.onrender.com/admin/userlist');
  }

  manageUser(access: boolean, Id: string): Observable<Object> {
    return this.http.post('https://codforum.onrender.com/admin/manageuser', {
      access,
      Id,
    });
  }

  editUser(user: edituser) {
    return this.http.post('https://codforum.onrender.com/admin/edituser', user);
  }

  addTag(Data: any) {
    return this.http.post('https://codforum.onrender.com/admin/addtag', Data);
  }

  checkName(value: string) {
    return this.http.get('https://codforum.onrender.com/admin/checkname');
  }

  tagList() {
    return this.http.get('https://codforum.onrender.com/admin/taglist');
  }

  editTag(tagData: editTag) {
    return this.http.put(
      'https://codforum.onrender.com/admin/edittag',
      tagData
    );
  }

  updateImg(data: any) {
    return this.http.put('https://codforum.onrender.com/admin/updateimg', data);
  }

  removeTag(Id: string) {
    return this.http.delete(
      'https://codforum.onrender.com/admin/removetag?Id=' + Id
    );
  }

  moderatorList() {
    return this.http.get('https://codforum.onrender.com/admin/moderatorlist');
  }

  addCommunity(communityData: any) {
    return this.http.post(
      'https://codforum.onrender.com/admin/addcommunity',
      communityData
    );
  }

  communityList() {
    return this.http.get('https://codforum.onrender.com/admin/communitylist');
  }

  removeCommunity(Id: any) {
    return this.http.post(
      'https://codforum.onrender.com/admin/removecommunity',
      Id
    );
  }

  removeMember(data: any) {
    return this.http.post(
      'https://codforum.onrender.com/admin/removemember',
      data
    );
  }

  addBadge(data: badge) {
    return this.http.post('https://codforum.onrender.com/admin/addbadge', data);
  }

  badgeList() {
    return this.http.get('https://codforum.onrender.com/admin/badgelist');
  }

  badgeDetail(Id: any) {
    return this.http.get('https://codforum.onrender.com/admin/badgedetail', Id);
  }

  editBadge(data: any) {
    return this.http.patch(
      'https://codforum.onrender.com/admin/editbadge',
      data
    );
  }
  reportQns() {
    return this.http.get('https://codforum.onrender.com/admin/reportqns');
  }
  singleReport(Id: string) {
    return this.http.get(
      'https://codforum.onrender.com/admin/getsingleqn?Id=' + Id
    );
  }

  blockQn(Id: string) {
    return this.http.put(
      `https://codforum.onrender.com/admin/blockqn?id=${Id}`,
      {}
    );
  }

  adminLogout() {
    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminRefresh');
  }
}
