import { Injectable, } from '@angular/core';
import { HttpClient,HttpHeaders,HttpResponse} from '@angular/common/http'
import { registerRequestInterface } from '../types/registerrequest.interface';
import { Observable,map} from 'rxjs'

import { edituser } from '../types/edituser.interface';
import { addTag } from '../types/tagData.interface';
import { editTag } from '../types/edittag.interface';
import { removeTg } from '../types/rmTag.interface';
import { badge } from '../types/addbadge.interceptor';
import { proUpdate } from '../types/updatepro.interface';
import { answer } from '../types/answer.interface';

@Injectable({
  providedIn: 'root'
})
export class AuthService {

   adminToken!:string |null
   userToken!:string

  constructor( private http:HttpClient) { }

  register(data:any):Observable<any>{
  return this.http.post('http://localhost:3000/signup',data)
  }

  loginUser(user:any):Observable<any>{
  return this.http.post('http://localhost:3000/login',user)
  }

  storeUserData(token:string,refresh:string){
   localStorage.setItem('userToken',token)
  localStorage.setItem('userRefresh',refresh)
  }

  storeUserAdminData(token:string,refresh:string){
    localStorage.setItem('adminToken',token)
   localStorage.setItem('adminRefresh',refresh)

   }

   isAdminLoggedIn():boolean{
    return !!localStorage.getItem('adminToken')
   }

   isUserLoggedIn():boolean{
    return !!localStorage.getItem('userToken')
   }

   getUserList(){
    return this.http.get('http://localhost:3000/admin/userlist')
   }

   manageUser(access:boolean,Id:string):Observable<Object>{
    return this.http.post('http://localhost:3000/admin/manageuser',{access,Id})
   }

   editUser(user:edituser){
    return this.http.post('http://localhost:3000/admin/edituser',user)
   }

   addTag(tagData:addTag){
    return this.http.post('http://localhost:3000/admin/addtag',tagData)
   }

   tagList(){
    return this.http.get('http://localhost:3000/admin/taglist')
   }

   editTag(tagData:editTag){
    return this.http.put('http://localhost:3000/admin/edittag',tagData)
   }

   updateImg(data:any){
    return this.http.put('http://localhost:3000/admin/updateimg',data)
   }

   removeTag(Id:string){
    console.log(Id,'iiiiiiidddd');
    
   return this.http.delete('http://localhost:3000/admin/removetag?Id='+Id)
   }

   moderatorList(){
    return this.http.get('http://localhost:3000/admin/moderatorlist')
   }

   addCommunity(communityData:any){
    return this.http.post('http://localhost:3000/admin/addcommunity',communityData)
   }

   communityList(){
    return this.http.get('http://localhost:3000/admin/communitylist')
   }

   removeCommunity(Id:any){
    return this.http.post('http://localhost:3000/admin/removecommunity',Id)
   }

   removeMember(data:any){
    return this.http.post('http://localhost:3000/admin/removemember',data)
   }

   addBadge(data:badge){
    return this.http.post('http://localhost:3000/admin/addbadge',data)
   }

   badgeList(){
    return this.http.get('http://localhost:3000/admin/badgelist')
   }

   badgeDetail(Id:any){
    return this.http.get('http://localhost:3000/admin/badgedetail',Id)
   }

   editBadge(data:any){
    return this.http.patch('http://localhost:3000/admin/editbadge',data)
   }
   reportQns(){
    return this.http.get('http://localhost:3000/admin/reportqns')
  }
  singleReport(Id:string){
    return this.http.get('http://localhost:3000/admin/getsingleqn?Id='+Id)
  }
  
   blockQn(Id:string){
    return this.http.put(`http://localhost:3000/admin/blockqn?id=${Id}`,{})
  }

   adminLogout(){
    localStorage.removeItem('adminToken')
    localStorage.removeItem('adminRefresh')
   }

//--------------------------USER--------------------------
getQuestions(){
  return this.http.get('http://localhost:3000/getqn')
}

singleQn(Id:string){
  return this.http.get('http://localhost:3000/singleqn?Id='+Id)
}

userProfile(){
  return this.http.get('http://localhost:3000/userprofile')
}

imgUpdate(data:any){
  return this.http.patch('http://localhost:3000/imgupdate',data)
}

updateProfile(data:proUpdate){
  console.log('seviiiiiice',data);
  
  return this.http.post('http://localhost:3000/updateprofile',data)
}

users(){
  return this.http.get('http://localhost:3000/users')
}

singleUser(Id:any){
  return this.http.get('http://localhost:3000/singleuser/?Id='+Id)
}

searchUser(name:string){
   return this.http.get('http://localhost:3000/searchuser?val='+name)
}

searchTags(name:string){
  return this.http.get('http://localhost:3000/searchtags?val='+name)
}

checkQn(data:string){
  return this.http.get('http://localhost:3000/checkqn?data='+data)
}

addQn(data:any){
  return this.http.post('http://localhost:3000/addqn',data)
}

tagForQn(){
  return this.http.get('http://localhost:3000/tagqn')
}

savaAnswer(element:answer){
  return this.http.post('http://localhost:3000/saveans',element)
}
getAns(Id:string){
  return this.http.get('http://localhost:3000/getanswer?Id='+Id)
}

qnUpVoted(Id:string){
  return this.http.patch('http://localhost:3000/qnupvoted',{Id})
}
qnDownVoted(Id:string){
  return this.http.patch('http://localhost:3000/qndownvoted',{Id})
}

ansUpVoted(Id:string){
  return this.http.patch('http://localhost:3000/ansup',{Id})
}

ansDownVoted(Id:string){
  return this.http.patch('http://localhost:3000/ansdown',{Id})
}

addComment(data:any,Id:string){
  return this.http.post('http://localhost:3000/addcomment',{data,Id})
}

getComment(Id:string){
  return this.http.get('http://localhost:3000/getcomment?Id='+Id)
}

addReport(reason:string,Id:string){
  return this.http.post('http://localhost:3000/addreport',{reason,Id})
}

tagQn(Id:any){
  return this.http.get('http://localhost:3000/gettagqn?Id='+Id)
}

communityDetails(Id:any){
  return this.http.get('http://localhost:3000/communitydetails?id='+Id)
}
tagForArticle(Id:string){
  return this.http.get('http://localhost:3000/tagArticle?Id='+Id)
}
addArticle(data:any){
 return this.http.post('http://localhost:3000/addarticle',data)
}
submitArticle(Id:string){
  return this.http.post('http://localhost:3000/submitarticle',{Id})
}
rejectArticle(Id:string){
  return this.http.post('http://localhost:3000/rejectarticle',{Id})
}
addArtComment(Id:string,comment:string){
  return this.http.post('http://localhost:3000/addartcomment',{Id,comment})
}
singleArt(Id:string){
  return this.http.get('http://localhost:3000/singleart?Id='+Id)
}
joinCommunity(Id:string){
  return this.http.patch('http://localhost:3000/joincommunity',{Id})
}

tagBasedQn(Id:string){
   return this.http.get('http://localhost:3000/tagbasedqn?Id='+Id)
}

userLogout(){
  localStorage.removeItem('userToken')
  localStorage.removeItem('userRefresh')
}
}
