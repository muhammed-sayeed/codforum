import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { AuthService } from 'src/app/services/auth.service';
import { editUserAction } from 'src/app/store/action/edituser';

@Component({
  selector: 'app-edituser',
  templateUrl: './edituser.component.html',
  styleUrls: ['./edituser.component.css'],
})
export class EdituserComponent {
  Id = this.Router.snapshot.paramMap.get('id');
  username = this.Router.snapshot.paramMap.get('username');
  phone = this.Router.snapshot.paramMap.get('phone');
  email = this.Router.snapshot.paramMap.get('email');

  constructor(
    private router: Router,
    private Router: ActivatedRoute,
    private authservice: AuthService,
    private store: Store
  ) {}

  updateSubmit() {
    const user = {
      Id: this.Id,
      username: this.username,
      email: this.email,
      phone: this.phone,
    };

    this.store.dispatch(editUserAction(user));
  }
}
