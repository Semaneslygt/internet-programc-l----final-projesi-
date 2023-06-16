import { Uye } from 'src/app/models/Uye';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-uye-dialog',
  templateUrl: './uye-dialog.component.html',
  styleUrls: ['./uye-dialog.component.css']
})
export class UyeDialogComponent implements OnInit {
uyeDialogBaslik:string|undefined;
islem:string |undefined;
yeniKayit!:Uye;
frm!:FormGroup ;

  constructor( 
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<UyeDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
    ) { 

      this.islem=data.islem;
      this.yeniKayit=data.kayit;
      if(this.islem =='ekle'){
        this.uyeDialogBaslik ="Üye Ekle";
      }
      if(this.islem =='duzenle'){
        this.uyeDialogBaslik ="Üye Düzenle";
      }
      if(this.islem =='sil'){
        this.uyeDialogBaslik ="Üye Sil";
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
