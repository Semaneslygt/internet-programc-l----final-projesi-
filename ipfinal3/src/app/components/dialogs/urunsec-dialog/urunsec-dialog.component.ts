import { Uye } from 'src/app/models/Uye';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';

@Component({
  selector: 'app-urunsec-dialog',
  templateUrl: './urunsec-dialog.component.html',
  styleUrls: ['./urunsec-dialog.component.css']
})
export class UrunsecDialogComponent implements OnInit {
  urunSecDialogBaslik!:string;
  yeniKayit!:Uye;
  frm!:FormGroup;
  islem!: string;

  constructor(
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<UrunsecDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) { this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem =='ekle'){
      this.urunSecDialogBaslik ="Ürün Ekle";
    }
    if(this.islem =='duzenle'){
      this.urunSecDialogBaslik ="ÜyÜrüne Düzenle";
    }
    if(this.islem =='sil'){
      this.urunSecDialogBaslik ="Ürün Sil";
    } 
   this.frm=this.FormOlustur();
   
  }
ngOnInit() {
}
FormOlustur() : FormGroup{
return this.frmBuilder.group({
  "urunID"   :[this.yeniKayit.urunID],
  "urunAdi" :[this.yeniKayit.urunAdi],
  "kategoriID"   :[this.yeniKayit.kategoriID],
  "urunAciklama"   :[this.yeniKayit.urunAciklama],
  "stok"   :[this.yeniKayit.stok],
  "gelisFiyati"   :[this.yeniKayit.gelisFiyati],
  "satisFiyati"   :[this.yeniKayit.satisFiyati],



})
}

}
