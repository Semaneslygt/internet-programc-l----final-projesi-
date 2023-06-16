import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Urun } from 'src/app/models/Urun';
import { UyeDialogComponent } from '../uye-dialog/uye-dialog.component';

@Component({
  selector: 'app-urun-dialog',
  templateUrl: './urun-dialog.component.html',
  styleUrls: ['./urun-dialog.component.css']
})
export class UrunDialogComponent implements OnInit {
  urunDialogBaslik:string |undefined;
  islem:string |undefined;
  yeniKayit!:Urun;
  frm!:FormGroup ;
  
  constructor(
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<UrunDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) 
  {
    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem =='ekle'){
      this.urunDialogBaslik ="Ürün Ekle";
    }
    if(this.islem =='duzenle'){
      this.urunDialogBaslik ="Ürün Düzenle";
    }
    if(this.islem =='sil'){
      this.urunDialogBaslik ="Ürün Sil";
    }
    
    if(this.islem =='listele'){
      this.urunDialogBaslik ="Ürün Listele";
    }
  
    this.frm=this.FormOlustur();
    }

  ngOnInit() {
  }
  FormOlustur() : FormGroup {
    return this.frmBuilder.group({
      "urunID"      :[this.yeniKayit.urunID],
      "urunAdi"     :[this.yeniKayit.urunAdi],
      "kategoriID"  :[this.yeniKayit.kategoriId],
      "urunAciklama":[this.yeniKayit.urunAciklama],
      "listeGorsel" :[this.yeniKayit.listeGorsel],
      "stok"        :[this.yeniKayit.stok],
      "gelisFiyati" :[this.yeniKayit.gelisFiyati],
      "satisFiyati" :[this.yeniKayit.satisFiyati],
      "kdvOran"     :[this.yeniKayit.kdvOran],
      "satılanAdet" :[this.yeniKayit.satilanAdet],


    })
  }

}
