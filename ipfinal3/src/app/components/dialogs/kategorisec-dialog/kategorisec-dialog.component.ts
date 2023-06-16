import { Uye } from 'src/app/models/Uye';
import { FormBuilder } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
import { Component, Inject, OnInit } from '@angular/core';
import { Kategori } from 'src/app/models/Kategori';

@Component({
  selector: 'app-kategorisec-dialog',
  templateUrl: './kategorisec-dialog.component.html',
  styleUrls: ['./kategorisec-dialog.component.css']
})
export class KategorisecDialogComponent implements OnInit {
  kategoriSecDialogBaslik!:string;
  yeniKayit!:Kategori;
  frm!:FormGroup;
  islem!: string;

  constructor(
  
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<KategorisecDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) {
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem =='ekle'){
      this.kategoriSecDialogBaslik ="Kategori Ekle";
    }
    if(this.islem =='duzenle'){
      this.kategoriSecDialogBaslik ="Kategori Düzenle";
    }
    if(this.islem =='sil'){
      this.kategoriSecDialogBaslik ="Kategori Sil";
    } 
   this.frm=this.FormOlustur();
   
   }

  ngOnInit() {
  }
  FormOlustur() : FormGroup{
    return this.frmBuilder.group({
      "markaID"   :[this.yeniKayit.markaID],
      "markaAdi" :[this.yeniKayit.markaAdi],
}
  )}
}