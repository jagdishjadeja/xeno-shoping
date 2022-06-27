import { Component, OnInit } from '@angular/core';
import { doc, Firestore, getDoc } from '@angular/fire/firestore';
import { FormControl, FormGroup } from '@angular/forms';
import { ActivatedRoute, Router } from '@angular/router';
import { FirebaseService } from 'src/app/firebase.service';
import { ControlsOf } from 'src/app/models/controls.type';
import { ItemModel } from 'src/app/models/item.model';

@Component({
  selector: 'app-add-edit',
  templateUrl: './add-edit.component.html',
  styleUrls: ['./add-edit.component.scss'],
})
export class AddEditComponent implements OnInit {
  itemForm = new FormGroup<ControlsOf<ItemModel>>({
    category: new FormControl(null, { nonNullable: true }),
    description: new FormControl(null, { nonNullable: true }),
    name: new FormControl(null, { nonNullable: true }),
  });

  constructor(
    private readonly router: Router,
    private readonly route: ActivatedRoute,
    private readonly afs: FirebaseService
  ) {}

  ngOnInit(): void {}

  addItem() {
    if (this.itemForm.valid) {
      // continue further
      let itemDetails = this.itemForm.value;
      console.log(itemDetails);
    }
  }
}
