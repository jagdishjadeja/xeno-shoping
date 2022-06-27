import { Component, OnDestroy, OnInit } from '@angular/core';
import { Auth } from '@angular/fire/auth';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  query,
  where,
} from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { ControlsOf } from 'src/app/models/controls.type';
import { LoginModel } from 'src/app/models/login.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.scss'],
})
export class LoginComponent implements OnInit, OnDestroy {
  loginForm = new FormGroup<ControlsOf<LoginModel>>({
    password: new FormControl(null, { nonNullable: true }),
    username: new FormControl(null, { nonNullable: true }),
  });

  showpassword = false;

  subscription: Subscription[] = [];

  loading = false;
  constructor(
    private readonly afs: Firestore,
    private readonly auth: Auth,
    private router: Router
  ) {}

  ngOnInit(): void {}

  login() {
    this.loading = true;
    let loginCredential = this.loginForm.value;
    console.log(loginCredential);

    let subs = collectionData<User>(
      query<User>(
        collection(this.afs, 'user') as CollectionReference<User>,
        where('username', '==', loginCredential.username)
      ),
      { idField: 'id' }
    ).subscribe({
      next: async (x) => {
        console.log(x);
        if (x.length == 0) {
          // user not found
          // very new user
          // create data in firebase and redirecrt to register
          const userCol = collection(this.afs, 'user');
          let newUser: User = {
            email: '',
            password: loginCredential.password!,
            username: loginCredential.username!,
            firstName: '',
            lastName: '',
            fullName: '',
          };
          let result = await addDoc(userCol, newUser);
          console.log(result);
        } else {
          // check if user has provided all info
          let user = x[0];
          if (user.fullName == '') {
            //redirect to profile creation page
            // with userid to retrieve user data later on register page
            this.router.navigate(['auth/register/' + user.id]);
          } else {
            // login user and redirect to home
            // this.router.navigate(['/home']);
          }
        }
      },
      error: (err) => {
        console.log(err);
      },
      complete: () => {
        this.loading = false;
      },
    });

    this.subscription.push(subs);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((x) => x.unsubscribe);
  }
}
