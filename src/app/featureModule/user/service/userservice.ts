import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { registerRequestInterface } from '../../../coremodule/interfaces/registerrequest.interface';
import { Observable, map } from 'rxjs';
import { root } from 'postcss';
import { environment } from 'src/environments/environment';

import { answer } from 'src/app/coremodule/interfaces/answer.interface';
import { proUpdate } from 'src/app/coremodule/interfaces/updatepro.interface';
import { loginUser } from 'src/app/coremodule/interfaces/loginUser.interface';
import { addQn } from 'src/app/coremodule/interfaces/addQn.interface';
import { addArticle } from 'src/app/coremodule/interfaces/addArticle.interface';
import { communityDetails } from 'src/app/coremodule/interfaces/communitydetail.interface';
import { singleArticle } from 'src/app/coremodule/interfaces/singleArticle.interface';
import { singleQuestion } from 'src/app/coremodule/interfaces/singleQues.interface';
import { singleQnComment } from 'src/app/coremodule/interfaces/singleQnComment';
import { ansForSing } from 'src/app/coremodule/interfaces/answerForsing';
import { individualUser } from 'src/app/coremodule/interfaces/individualUser.interface';
import { tagBasedQn } from 'src/app/coremodule/interfaces/tagBasedQn.interface';
import { tags } from 'src/app/coremodule/interfaces/tags.interface';
import { communities } from 'src/app/coremodule/interfaces/communities.interface';

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
    return this.http.get<{questions:[]}>(environment.apiUrl+'getqn');
  }

  singleQn(Id: string) {
    return this.http.get<singleQuestion>(environment.apiUrl+'singleqn?Id=' + Id);
  }

  tagList(){
    return this.http.get<tags>(environment.apiUrl+'taglist')
  }

  communityList(){
    return this.http.get<communities>(environment.apiUrl+'communitylist')
  }

  userProfile() {
    return this.http.get(environment.apiUrl+'userprofile');
  }

  imgUpdate(data: any) {
    return this.http.patch(environment.apiUrl+'imgupdate', data);
  }

  updateProfile(data: proUpdate) {
    return this.http.post(environment.apiUrl+'updateprofile', data);
  }

  users() {
    return this.http.get<{users:[]}>(environment.apiUrl+'users');
  }

  singleUser(Id: string) {
    return this.http.get<individualUser>(environment.apiUrl+'singleuser/?Id=' + Id);
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

  addQn(data: addQn) {
    return this.http.post(environment.apiUrl+'addqn', data);
  }

  tagForQn() {
    return this.http.get<{tags:[]}>(environment.apiUrl+'tagqn');
  }

  savaAnswer(element: answer) {
    return this.http.post(environment.apiUrl+'saveans', element);
  }
  getAns(Id: string) {
    return this.http.get<ansForSing[]>(environment.apiUrl+'getanswer?Id=' + Id);
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

  addComment(data: {comment?:string}, Id: string) {
    return this.http.post(environment.apiUrl+'addcomment', {
      data,
      Id,
    });
  }

  getComment(Id: string) {
    return this.http.get<singleQnComment>(environment.apiUrl+'getcomment?Id=' + Id);
  }

  addReport(reason: string, Id: string) {
    return this.http.post(environment.apiUrl+'addreport', {
      reason,
      Id,
    });
  }

  tagQn(Id: string) {
    return this.http.get<{qnlist:[]}>(environment.apiUrl+'gettagqn?Id=' + Id);
  }

  communityDetails(Id: string) {
    return this.http.get<communityDetails>(environment.apiUrl+
      'communitydetails?id=' + Id
    );
  }
  tagForArticle(Id: string) {
    return this.http.get<{tags:[]}>(environment.apiUrl+'tagArticle?Id=' + Id);
  }
  addArticle(data: addArticle) {
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
    return this.http.get<singleArticle>(environment.apiUrl+'singleart?Id=' + Id);
  }
  joinCommunity(Id: string) {
    return this.http.patch(environment.apiUrl+'joincommunity', {
      Id,
    });
  }

  tagBasedQn(Id: string) {
    return this.http.get<tagBasedQn>(environment.apiUrl+'tagbasedqn?Id=' + Id);
  }

  userLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefresh');
  }
}
