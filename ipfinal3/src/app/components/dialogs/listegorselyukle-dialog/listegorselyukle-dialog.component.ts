import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { ListeGorsel } from 'src/app/models/ListeGorsel';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
@Component({
  selector: 'app-listegorselyukle-dialog',
  templateUrl: './listegorselyukle-dialog.component.html',
  styleUrls: ['./listegorselyukle-dialog.component.css']
})
export class ListegorselyukleDialogComponent implements OnInit {
  secilenGorsel:any;
  listeGorsel: ListeGorsel =new ListeGorsel;
  secUrun!: Urun;


  constructor(
    public GorselDialogRef : MatDialogRef<ListegorselyukleDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,  
      public apiServis: ApiService,
  ) {

this.secUrun = this.data;

   }

  ngOnInit() {
  }


  GorselSec(e:any) {
    var gorseller  =e.target.files;
    var gorsel = gorseller(0);

    var fr = new FileReader();
    fr.onloadend=()=>{
      this.secilenGorsel= fr.result;
      this.listeGorsel.gorselData = fr.result?.toString();
      this.listeGorsel.gorselUzanti = gorsel.type;

    }

    fr.readAsDataURL(gorsel);


  }

}
