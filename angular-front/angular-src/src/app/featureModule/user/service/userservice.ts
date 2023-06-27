import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders, HttpResponse } from '@angular/common/http';
import { registerRequestInterface } from '../../../coremodule/interfaces/registerrequest.interface';
import { Observable, map } from 'rxjs';
import { root } from 'postcss';

import { answer } from 'src/app/coremodule/interfaces/answer.interface';
import { proUpdate } from 'src/app/coremodule/interfaces/updatepro.interface';

@Injectable({
  providedIn: 'root',
})
export class userServices {
  userToken!: string;

  constructor(private http: HttpClient) {}

  register(data: any): Observable<any> {
    return this.http.post('https://codforum.onrender.com/signup', data);
  }

  loginUser(user: any): Observable<any> {
    return this.http.post('https://codforum.onrender.com/login', user);
  }

  storeUserData(token: string, refresh: string) {
    localStorage.setItem('userToken', token);
    localStorage.setItem('userRefresh', refresh);
  }

  isUserLoggedIn(): boolean {
    return !!localStorage.getItem('userToken');
  }
  getQuestions() {
    return this.http.get('https://codforum.onrender.com/getqn');
  }

  singleQn(Id: string) {
    return this.http.get('https://codforum.onrender.com/singleqn?Id=' + Id);
  }

  userProfile() {
    return this.http.get('https://codforum.onrender.com/userprofile');
  }

  imgUpdate(data: any) {
    return this.http.patch('https://codforum.onrender.com/imgupdate', data);
  }

  updateProfile(data: proUpdate) {
    console.log('seviiiiiice', data);

    return this.http.post('https://codforum.onrender.com/updateprofile', data);
  }

  users() {
    return this.http.get('https://codforum.onrender.com/users');
  }

  singleUser(Id: any) {
    return this.http.get('https://codforum.onrender.com/singleuser/?Id=' + Id);
  }

  searchUser(name: string) {
    return this.http.get(
      'https://codforum.onrender.com/searchuser?val=' + name
    );
  }

  searchTags(name: string) {
    return this.http.get(
      'https://codforum.onrender.com/searchtags?val=' + name
    );
  }

  checkQn(data: string) {
    return this.http.get('https://codforum.onrender.com/checkqn?data=' + data);
  }

  addQn(data: any) {
    return this.http.post('https://codforum.onrender.com/addqn', data);
  }

  tagForQn() {
    return this.http.get('https://codforum.onrender.com/tagqn');
  }

  savaAnswer(element: answer) {
    return this.http.post('https://codforum.onrender.com/saveans', element);
  }
  getAns(Id: string) {
    return this.http.get('https://codforum.onrender.com/getanswer?Id=' + Id);
  }

  qnUpVoted(Id: string) {
    return this.http.patch('https://codforum.onrender.com/qnupvoted', { Id });
  }
  qnDownVoted(Id: string) {
    return this.http.patch('https://codforum.onrender.com/qndownvoted', { Id });
  }

  ansUpVoted(Id: string) {
    return this.http.patch('https://codforum.onrender.com/ansup', { Id });
  }

  ansDownVoted(Id: string) {
    return this.http.patch('https://codforum.onrender.com/ansdown', { Id });
  }

  addComment(data: any, Id: string) {
    return this.http.post('https://codforum.onrender.com/addcomment', {
      data,
      Id,
    });
  }

  getComment(Id: string) {
    return this.http.get('https://codforum.onrender.com/getcomment?Id=' + Id);
  }

  addReport(reason: string, Id: string) {
    return this.http.post('https://codforum.onrender.com/addreport', {
      reason,
      Id,
    });
  }

  tagQn(Id: any) {
    return this.http.get('https://codforum.onrender.com/gettagqn?Id=' + Id);
  }

  communityDetails(Id: any) {
    return this.http.get(
      'https://codforum.onrender.com/communitydetails?id=' + Id
    );
  }
  tagForArticle(Id: string) {
    return this.http.get('https://codforum.onrender.com/tagArticle?Id=' + Id);
  }
  addArticle(data: any) {
    return this.http.post('https://codforum.onrender.com/addarticle', data);
  }
  submitArticle(Id: string) {
    return this.http.post('https://codforum.onrender.com/submitarticle', {
      Id,
    });
  }
  rejectArticle(Id: string) {
    return this.http.post('https://codforum.onrender.com/rejectarticle', {
      Id,
    });
  }
  addArtComment(Id: string, comment: string) {
    return this.http.post('https://codforum.onrender.com/addartcomment', {
      Id,
      comment,
    });
  }
  singleArt(Id: string) {
    return this.http.get('https://codforum.onrender.com/singleart?Id=' + Id);
  }
  joinCommunity(Id: string) {
    return this.http.patch('https://codforum.onrender.com/joincommunity', {
      Id,
    });
  }

  tagBasedQn(Id: string) {
    return this.http.get('https://codforum.onrender.com/tagbasedqn?Id=' + Id);
  }

  userLogout() {
    localStorage.removeItem('userToken');
    localStorage.removeItem('userRefresh');
  }
}
