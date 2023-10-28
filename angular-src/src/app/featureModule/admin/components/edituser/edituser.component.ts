import { Component } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { Store } from '@ngrx/store';
import { editUserAction } from 'src/app/featureModule/store/actions/edituser';
import { adminService } from '../../services/adminservice';

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
    private authservice: adminService,
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
