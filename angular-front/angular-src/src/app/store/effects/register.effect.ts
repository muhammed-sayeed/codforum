import { createEffect, Actions, ofType } from '@ngrx/effects';
import { Location } from '@angular/common';
import Swal from 'sweetalert2';

import {
  registerAction,
  registerFailureAction,
  registerSuccessAction,
} from '../action/register.action';
import { switchMap, mergeMap, map, catchError, of, tap } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';
import { Injectable } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { loginAction, loginFailureAction, loginSuccessAction } from '../action/login.action';
import {
  userListAction,
  userListSuccessAction,
} from '../action/userlist.action';
import { myState } from 'src/app/types/userlist.interface';
import { editUserAction, editUserSuccessAction } from '../action/edituser';
import { addTagAction, addTagSuccessAction } from '../action/addtag';
import { tagListAction, tagListSuccessAction } from '../action/taglist';
import { editTagAction, editTagSuccessAction } from '../action/edittag';
import { removeTagAction, removeTagSuccessAction } from '../action/removetag';
import {
  moderatorListAction,
  moderatorListSuccessAction,
} from '../action/moderatorlist';
import { addCommunityAction, addCommunitySuccessAction } from '../action/addcommunity';
import { communityListAction, communityListSuccessAction } from '../action/community';
import { removeCommunityAction, removeCommunitySuccessAction } from '../action/removeComm';
import { addBadgeAction, addBadgeSuccessAction } from '../action/addbadge';
import { badgeListAction, badgeListSuccessAction } from '../action/badgelist';

import { removeMemberAction, removeMemberSuccessAction } from '../action/removemember';
import { editBadgeAction, editBadgeSuccessAction } from '../action/editbadge';
import { userProfileAction, userProfileSuccessAction } from '../action/userprofile';
import { updateProfileAction, updateProfileSuccessAction } from '../action/updateprofile';
import { getQuestionsAction, getQuestionsSuccessAction, singleUserAction, singleUserSuccessAction, usersAction, usersSuccessAction } from '../action/useractions';

@Injectable()
export class registerEffect {
  register$ = createEffect(() =>
    this.action$.pipe(
      ofType(registerAction),
      mergeMap((request) => {
        return this.authService.register(request).pipe(
          map((current) => current.userdata),
          map((currentUser: any) => {
            this.authService.storeUserData(
              currentUser.token,
              currentUser.refreshtoken
            );
            return registerSuccessAction(currentUser);
          }),
          catchError((error) => {
            return of(registerFailureAction({ error: error.msg }));
          })
        );
      })
    )
  );

  redirectAfterSubmit$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(registerSuccessAction),
        tap(() => {
          this.roter.navigate(['']);
        })
      ),
    { dispatch: false }
  );

  //-------LOGIN---------
  login$ = createEffect(() =>
    this.action$.pipe(
      ofType(loginAction),
      mergeMap((request) => {
        return this.authService.loginUser(request).pipe(
          map((current) => current.response),
          map((User: any) => {
          console.log('uuuuser',User);
          
            return loginSuccessAction({ data: User })
          }),catchError((error)=>{
            console.log('eroo',error);
            return of(loginFailureAction({error:error.error}))
            
          })
        );
      })
    )
    
  )

  redirectToHomePage$ = createEffect(
    () => {
      return this.action$.pipe(
        ofType(loginSuccessAction),
        tap((value) => {
          const mail = value.data.email;

          if (mail === 'admin@gmail.com') {
          
            
            this.authService.storeUserAdminData(
              value.data.token,
              value.data.refreshtoken
            )
            console.log('kkkkkkkkkkkkk');
           this.roter.navigate(['/admin'])
            // this.location.replaceState('/dashboard');
          } else {
            this.authService.storeUserData(
              value.data.token,
              value.data.refreshtoken
            )
           
            
            this.roter.navigate(['']);
            this.location.replaceState('');
          }
        })
      );
    },
    { dispatch: false }
  );

  //-----------USERLIST--------------
  userList$ = createEffect(() =>
    this.action$.pipe(
      ofType(userListAction),
      mergeMap(() => {
        return this.authService.getUserList().pipe(
          map((Result: any) => Result.users),
          map((Result: myState[]) => {
            return userListSuccessAction({ userlist: Result });
          })
        );
      })
    )
  );

  //---------------EDIT USER------------------

  editUser$ = createEffect(() =>
    this.action$.pipe(
      ofType(editUserAction),
      mergeMap((request) => {
        return this.authService.editUser(request).pipe(
          map((Responce) => {
            console.log(Responce, 'reeeeeeeeeeeeee');

            return editUserSuccessAction({ responce: Responce });
          })
        );
      })
    )
  );

  redirectAfterUpdate$ = createEffect(
    () =>
      this.action$.pipe(
        ofType(editUserSuccessAction),
        tap(() => {
          this.roter.navigate(['/admin/userlist']);
        })
      ),
    { dispatch: false }
  );

  //---------ADD TAG---------------
  addTag$ = createEffect(() =>
    this.action$.pipe(
      ofType(addTagAction),
      mergeMap((requst) => {
        return this.authService.addTag(requst.value).pipe(
          map((Result) => {
            return addTagSuccessAction({ success: true });
          })
        );
      })
    )
  )

  redirectAfterAdd$ = createEffect(
    ()=>
    this.action$.pipe(
      ofType(addTagSuccessAction),
      tap(()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'successfully added',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(()=>{
          this.roter.navigate(['/admin/taglist'])
        })
       
      })
    ),
    {dispatch:false}
  )

  //-----------TAG LIST------------------
  tagList$ = createEffect(() =>
    this.action$.pipe(
      ofType(tagListAction),
      mergeMap(() => {
        return this.authService.tagList().pipe(
          map((Result: any) => Result.tags),
          map((result) => {
            return tagListSuccessAction({ taglist: result });
          })
        );
      })
    )
  );

  //----------EDIT TAG--------------
  editTag$ = createEffect(() =>
    this.action$.pipe(
      ofType(editTagAction),
      mergeMap((result) => {
        return this.authService.editTag(result).pipe(
          map((Responce) => {
            console.log(Responce);

            return editTagSuccessAction({ responce: Responce });
          })
        );
      })
    )
  )

  redirectAfterEdit$ = createEffect(
    ()=>
    this.action$.pipe(
      ofType(editTagSuccessAction),
      tap(()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
       setTimeout(()=>{
        this.roter.navigate(['/admin/taglist'])
       },2000)
      })
    ),
    {dispatch:false}
  )

  

  //------------MODERATOR LIST-------------------
  moderatorList$ = createEffect(() =>
    this.action$.pipe(
      ofType(moderatorListAction),
      mergeMap(() => {
        return this.authService.moderatorList().pipe(
          map((Result: any) => Result.moderators),
          map((Response: myState[]) => {
            return moderatorListSuccessAction({ moderatorlist: Response });
          })
        );
      })
    )
  )

  //---------------ADD COMMUNITY-----------------------
  addCommunity$ = createEffect(()=>
  this.action$.pipe(
    ofType(addCommunityAction),
    mergeMap((Request)=>{
      return this.authService.addCommunity(Request.value).pipe(
        map((Result)=>{
          console.log(Result);
          
          return addCommunitySuccessAction({success:true})
        })
      )
    })
  )
  )

  redirectAfterAddCommunity$ = createEffect(
    ()=>
    this.action$.pipe(
      ofType(addCommunitySuccessAction),
      tap(()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'successfully added',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.roter.navigate(['/admin/community'])
        }, 2000);
      
      })
    ),
    {dispatch:false}
  )

  //------------------COMMUNITY LIST-------------------
  communityList$ = createEffect(()=>
  this.action$.pipe(
    ofType(communityListAction),
    mergeMap(()=>{
      return this.authService.communityList().pipe(
        map((result:any)=>result.community),
        map((Result)=>{
          
          return communityListSuccessAction({communityList:Result})
        })
      )
    })
  )
  )

  //-----------REMOVE COMMUNITY-------------
  removeCommunity$ = createEffect(()=>
  this.action$.pipe(
    ofType(removeCommunityAction),
    mergeMap((Result)=>{
      return this.authService.removeCommunity(Result).pipe(
        map((Responce)=>{
          console.log(Responce);
          
          return removeCommunitySuccessAction({success:true})
        })
      )
    })
  )
  )

  //----------------REMOVE MEMBER------------------
  removeMember$ = createEffect(()=>
  this.action$.pipe(
    ofType(removeMemberAction),
    mergeMap((Request)=>{
      return this.authService.removeMember(Request).pipe(
        map((Responce)=>{
          console.log(Responce);
          
          return removeMemberSuccessAction({success:true})
        })
      )
    })
  )
  )

  //----------------ADD BADGE----------------------
  addBadge$ = createEffect(() =>
  this.action$.pipe(
    ofType(addBadgeAction),
    mergeMap((Request)=>{
      return this.authService.addBadge(Request).pipe(
        map((Result)=>{
          console.log(Result);
          
          return addBadgeSuccessAction({success:true})
        })
      )
    })
  )
  )
  redirectAfterSuccess$ = createEffect(
    ()=>
    this.action$.pipe(
      ofType(addBadgeSuccessAction),
      tap(()=>{
        Swal.fire({
          position: 'top-end',
          icon: 'success',
          title: 'Your work has been saved',
          showConfirmButton: false,
          timer: 1500
        })
        setTimeout(() => {
          this.roter.navigate(['/admin/badge'])
        }, 2000);
       
      })
    ),
    {dispatch:false}
  )

  //-----------------BADGE LIST-----------------
  badgeList$ = createEffect(()=>
  this.action$.pipe(
    ofType(badgeListAction),
    mergeMap(()=>{
      return this.authService.badgeList().pipe(
        map((result:any)=>result.badgelist),
        map((Result)=>{
          console.log(Result);
          
          return badgeListSuccessAction({badges:Result})
        })
      )
    })
  ))

//-----------EDIT BADGE-------------------------
editBadge$ = createEffect(()=>
this.action$.pipe(
  ofType(editBadgeAction),
  mergeMap((Request)=>{
    return this.authService.editBadge(Request).pipe(
      map((result)=>{
        console.log(result);
         return editBadgeSuccessAction({success:true})
      })
    )
  })
)
)

redirectAfter$ = createEffect(
  ()=>
  this.action$.pipe(
    ofType(editBadgeSuccessAction),
    tap(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Your work has been saved',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(() => {
      this.roter.navigate(['/admin/badge'])
        
      }, 2000);
    })
  ),
  {dispatch:false}
)

//==================USER===========================
//--------------USER PROFILE-----------------------
userProfile$ = createEffect(()=>
this.action$.pipe(
  ofType(userProfileAction),
  mergeMap(()=>{
    return this.authService.userProfile().pipe(
      map((result:any)=>result.profile),
      map((Result=>{
         return userProfileSuccessAction({profile:Result})
      }))
    )
  })
)
)

//--------------------EDIT PROFILE----------------------
editProfile$ = createEffect(()=>
this.action$.pipe(
  ofType(updateProfileAction),
  mergeMap((data:any)=>{
    return this.authService.updateProfile(data).pipe(
      map((Result)=>{
        console.log(Result);
        
        return updateProfileSuccessAction({success:true})
      })
    )
  })
)
)

redirectAfterProEdut$ = createEffect(
  ()=>
  this.action$.pipe(
    ofType(updateProfileSuccessAction),
    tap(()=>{
      Swal.fire({
        position: 'top-end',
        icon: 'success',
        title: 'Successfully updated',
        showConfirmButton: false,
        timer: 1500
      })
      setTimeout(()=>{
        this.roter.navigate(['/profile'])
      },2000)
      
    })
  ),
  {dispatch:false}
)

//-------------------USERS----------------
// usersDetails$ = createEffect(()=>
// this.action$.pipe(
//   ofType(usersAction),
//   mergeMap(()=>{
//     return this.authService.users().pipe(
//       map((Result:any)=>Result.users),
//       map((result)=>{
//         console.log(result)
//         return usersSuccessAction({users:result})
//       })
//     )
//   })
// )
// )

//----------------SINGLE USER-------------------------
// singleUser$ = createEffect(()=>
// this.action$.pipe(
//   ofType(singleUserAction),
//   mergeMap((Request)=>{
//     return this.authService.singleUser(Request).pipe(
//       map((result:any)=>result.profile),
//       map((Result)=>{
//         return singleUserSuccessAction({single:Result})
//       })
//     )
//   })
// )
// )

//---------------GET QN----------------------------
qnList$ = createEffect(()=>
this.action$.pipe(
  ofType(getQuestionsAction),
  mergeMap(()=>{
    return this.authService.getQuestions().pipe(
      map((result:any)=> result.questions),
      map((Result)=>{
        console.log(Result);
        
        return getQuestionsSuccessAction({questions:Result})
      })
    )
  })
))
  constructor(
    private action$: Actions,
    private authService: AuthService,
    private roter: Router,
    private location: Location
  ) {}
}
