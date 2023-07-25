import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { registerRequestInterface } from '../../../coremodule/interfaces/registerrequest.interface';
import { Observable, map } from 'rxjs';
import { root } from 'postcss';
import { environment } from 'src/environments/environment';

import { answer } from 'src/app/coremodule/interfaces/answer.interface';
import { proUpdate } from 'src/app/coremodule/interfaces/updatepro.interface';
import { loginUser } from 'src/app/coremodule/interfaces/loginUser.interface';

@Injectable({
  providedIn: 'root',
})
export class userServices {
  userToken!: string;

  constructor(private http: HttpClient) {}

  register(data:registerRequestInterface) {
    return this.http.post(environment.apiUrl+'signup', data);
  }

  loginUser(user: loginUser) {
    return this.http.post(environment.apiUrl+'login', user);
  }

  storeUserData(token: string, refresh: string) {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userRefresh', refresh);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }
  getQuestions() {
    return this.http.get(environment.apiUrl+'getqn');
  }

  singleQn(Id: string) {
    return this.http.get(environment.apiUrl+'singleqn?Id=' + Id);
  }

  userProfile() {
    return this.http.get(environment.apiUrl+'userprofile');
  }

  imgUpdate(data: any) {
    return this.http.patch(environment.apiUrl+'imgupdate', data);
  }

  updateProfile(data: proUpdate) {
    console.log('seviiiiiice', data);

    return this.http.post(environment.apiUrl+'updateprofile', data);
  }

  users() {
    return this.http.get(environment.apiUrl+'users');
  }

  singleUser(Id: any) {
    return this.http.get(environment.apiUrl+'singleuser/?Id=' + Id);
  }

  searchUser(name: string) {
    return this.http.get(environment.apiUrl+
      'searchuser?val=' + name
    );
  }

  searchTags(name: string) {
    return this.http.get(environment.apiUrl+
      'searchtags?val=' + name
    );
  }

  checkQn(data: string) {
    return this.http.get(environment.apiUrl+'checkqn?data=' + data);
  }

  addQn(data: any) {
    return this.http.post(environment.apiUrl+'addqn', data);
  }

  tagForQn() {
    return this.http.get(environment.apiUrl+'tagqn');
  }

  savaAnswer(element: answer) {
    return this.http.post(environment.apiUrl+'saveans', element);
  }
  getAns(Id: string) {
    return this.http.get(environment.apiUrl+'getanswer?Id=' + Id);
  }

  qnUpVoted(Id: string) {
    return this.http.patch(environment.apiUrl+'qnupvoted', { Id });
  }
  qnDownVoted(Id: string) {
    return this.http.patch(environment.apiUrl+'qndownvoted', { Id });
  }

  ansUpVoted(Id: string) {
    return this.http.patch(environment.apiUrl+'ansup', { Id });
  }

  ansDownVoted(Id: string) {
    return this.http.patch(environment.apiUrl+'ansdown', { Id });
  }

  addComment(data: any, Id: string) {
    return this.http.post(environment.apiUrl+'addcomment', {
      data,
      Id,
    });
  }

  getComment(Id: string) {
    return this.http.get(environment.apiUrl+'getcomment?Id=' + Id);
  }

  addReport(reason: string, Id: string) {
    return this.http.post(environment.apiUrl+'addreport', {
      reason,
      Id,
    });
  }

  tagQn(Id: any) {
    return this.http.get(environment.apiUrl+'gettagqn?Id=' + Id);
  }

  communityDetails(Id: any) {
    return this.http.get(environment.apiUrl+
      'communitydetails?id=' + Id
    );
  }
  tagForArticle(Id: string) {
    return this.http.get(environment.apiUrl+'tagArticle?Id=' + Id);
  }
  addArticle(data: any) {
    return this.http.post(environment.apiUrl+'addarticle', data);
  }
  submitArticle(Id: string) {
    return this.http.post(environment.apiUrl+'submitarticle', {
      Id,
    });
  }
  rejectArticle(Id: string) {
    return this.http.post(environment.apiUrl+'rejectarticle', {
      Id,
    });
  }
  addArtComment(Id: string, comment: string) {
    return this.http.post(environment.apiUrl+'addartcomment', {
      Id,
      comment,
    });
  }
  singleArt(Id: string) {
    return this.http.get(environment.apiUrl+'singleart?Id=' + Id);
  }
  joinCommunity(Id: string) {
    return this.http.patch(environment.apiUrl+'joincommunity', {
      Id,
    });
  }

  tagBasedQn(Id: string) {
    return this.http.get(environment.apiUrl+'tagbasedqn?Id=' + Id);
  }

  userLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefresh');
  }
}
