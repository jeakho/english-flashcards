import { Component, OnInit } from '@angular/core';
import { FormControl, Validators } from '@angular/forms';
import { MatDialogRef } from '@angular/material/dialog';
import { InstantlyAppearedErrorStateMatcher } from '@app/shared/error-state-matchers/instantlyAppearedErrorStateMatcher';

export interface CreateListDialogData {
  title: string;
}

@Component({
  selector: 'app-create-list-dialog',
  templateUrl: './create-list-dialog.component.html',
  styleUrls: ['./create-list-dialog.component.css']
})
export class CreateListDialogComponent implements OnInit {
  title = '';
  instantlyAppearedErrorStateMatcher = new InstantlyAppearedErrorStateMatcher();
  listTitleControl = new FormControl('', {
    validators: [
      Validators.required, 
      Validators.pattern(/^[a-zA-z0-9 ]+$/)
    ]
  });

  constructor(
    public dialogRef: MatDialogRef<CreateListDialogComponent>
  ) {
  }

  onSubmitClick(): void {
    this.dialogRef.close(this.listTitleControl.value);
  }

  onCancelClick(): void {
    this.dialogRef.close();
  }

  ngOnInit(): void {
  }

}
