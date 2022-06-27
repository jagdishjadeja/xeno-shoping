import { Component, OnDestroy, OnInit } from '@angular/core';
import {
  addDoc,
  collection,
  collectionData,
  CollectionReference,
  Firestore,
  getDoc,
  query,
  where,
} from '@angular/fire/firestore';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { doc, setDoc } from '@firebase/firestore';
import { Subscription } from 'rxjs';
import { RegisterModel } from 'src/app/models/register.model';
import { User } from 'src/app/models/user.model';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.scss'],
})
export class RegisterComponent implements OnInit, OnDestroy {
  loader = false;
  registerForm = new FormGroup<RegisterModel>({
    firstName: new FormControl('', [Validators.required]),
    lastName: new FormControl('', [Validators.required]),
    email: new FormControl('', [Validators.required]),
  });

  subscription: Subscription[] = [];
  userId = '';

  constructor(
    private readonly route: ActivatedRoute,
    private readonly afs: Firestore,
    private readonly router: Router
  ) {}

  async getDocument(coll: string, id: string) {
    const snap = await getDoc(doc(this.afs, coll, id));
    if (snap.exists()) return snap.data();
    else return Promise.reject(Error(`No such document: ${coll}.${id}`));
  }

  ngOnInit(): void {
    let paramSub = this.route.params.subscribe(async (params) => {
      let userId = params['id'];
      this.userId = userId;
      console.log(userId);
      if (userId == '') {
        this.router.navigate(['auth/login']);
      }

      try {
        let userData = (await this.getDocument('user', userId)) as User;
        console.log(userData);
      } catch (error) {
        console.log(error);
      }

      // let subs = collectionData<User>(
      //   query<User>(
      //     collection(this.afs, 'user') as CollectionReference<User>,
      //     where('id', '==', userId)
      //   ),
      //   { idField: 'id' }
      // ).subscribe({
      //   next: async (users) => {
      //     console.log(users);
      //     if (users.length > 0) {
      //       // user not found
      //       // redirect back to login screen
      //       this.router.navigate(['auth/login']);
      //     } else {
      //       // check if user has provided all info
      //       let user = users[0];
      //       if (user.fullName == '') {
      //         // register users
      //       } else {
      //         // login user and redirect to home
      //         this.router.navigate(['/home']);
      //       }
      //     }
      //   },
      //   error: (err) => {
      //     console.log(err);
      //   },
      //   complete: () => {},
      // });
      // this.subscription.push(subs);
    });

    this.subscription.push(paramSub);
  }

  async registerSubmit(): Promise<void> {
    if (!this.registerForm.valid) {
      return;
    }

    // form is valid update in firestore
    let updateDoc = doc(this.afs, 'user', this.userId);

    let result = await setDoc(updateDoc, this.registerForm.value);
    console.log(result);

    this.router.navigate(['/home']);
  }

  ngOnDestroy(): void {
    this.subscription.forEach((x) => x.unsubscribe);
  }
}
