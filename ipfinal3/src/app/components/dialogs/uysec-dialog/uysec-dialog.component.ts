import { Uye } from 'src/app/models/Uye';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';


@Component({
  selector: 'app-uysec-dialog',
  templateUrl: './uysec-dialog.component.html',
  styleUrls: ['./uysec-dialog.component.css']
})
export class UysecDialogComponent implements OnInit {
  uyeSecDialogBaslik!:string;
  yeniKayit!:Uye;
  frm!:FormGroup;
  islem!: string;


  constructor(
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<UysecDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) { 
      this.islem=data.islem;
      this.yeniKayit=data.kayit;
      if(this.islem =='ekle'){
        this.uyeSecDialogBaslik ="Üye Ekle";
      }
      if(this.islem =='duzenle'){
        this.uyeSecDialogBaslik ="Üye Düzenle";
      }
      if(this.islem =='sil'){
        this.uyeSecDialogBaslik ="Üye Sil";
      } 
     this.frm=this.FormOlustur();
     
    }
  ngOnInit() {
  }
FormOlustur() : FormGroup{
  return this.frmBuilder.group({
    "uyeID"   :[this.yeniKayit.uyeID],
    "adSoyad" :[this.yeniKayit.adSoyad],
    "email"   :[this.yeniKayit.email],
    "sifre"   :[this.yeniKayit.sifre],
    "adres"   :[this.yeniKayit.adres],
    "admin"   :[this.yeniKayit.admin],


  })
}

}
