import { Favori } from 'src/app/models/Favori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-favori-dialog',
  templateUrl: './favori-dialog.component.html',
  styleUrls: ['./favori-dialog.component.css']
})
export class FavoriDialogComponent implements OnInit {
  favoriDialogBaslik:string|undefined;
  islem:string |undefined;
  frm!:FormGroup;
  yeniKayit!:Favori;
  constructor(
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<FavoriDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) { 

    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem =='ekle'){
      this.favoriDialogBaslik ="Favori Ekle";
    }
    if(this.islem =='duzenle'){
      this.favoriDialogBaslik ="Favori Düzenle";
    }
    if(this.islem =='sil'){
      this.favoriDialogBaslik ="Favori Sil";
    }
    
     this.frm=this.FormOlustur();
  }

  ngOnInit() {
  }

  FormOlustur() : FormGroup {
    return this.frmBuilder.group({
      "favoriID"    :[this.yeniKayit.favoriID],
      "uyeID"       :[this.yeniKayit.uyeID],
      "ipNumarasi"  :[this.yeniKayit.ipNumarasi],
      "urunID"      :[this.yeniKayit.urunID],

    })
}
}