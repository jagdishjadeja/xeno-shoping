import { Component, OnInit } from '@angular/core';
import { NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { AddEditComponent } from '../add-edit/add-edit.component';

@Component({
  selector: 'app-list',
  templateUrl: './list.component.html',
  styleUrls: ['./list.component.scss'],
})
export class ListComponent implements OnInit {
  constructor(private readonly modalService: NgbModal) {}

  ngOnInit(): void {}

  showAddItemDialog() {
    this.modalService
      .open(AddEditComponent, { ariaLabelledBy: 'modal-basic-title' })
      .result.then(
        (result) => {
          // this.closeResult = `Closed with: ${result}`;
          console.log(result);
        },
        (reason) => {
          // this.closeResult = `Dismissed ${this.getDismissReason(reason)}`;
          console.log(reason);
        }
      )
      .catch((err) => {
        console.log(err);
      });
  }
}
