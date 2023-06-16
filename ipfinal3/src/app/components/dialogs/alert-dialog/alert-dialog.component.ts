import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-alert-dialog',
  templateUrl: './alert-dialog.component.html',
  styleUrls: ['./alert-dialog.component.css']
})
export class AlertDialogComponent implements OnInit {
  dialogBaslik: string | undefined;
  dialogMesaj: string | undefined;
  dialogIslem: boolean | undefined;
  constructor(
    public dialogRef:MatDialogRef<AlertDialogComponent>
  ) { }

  ngOnInit() {
  }

}
