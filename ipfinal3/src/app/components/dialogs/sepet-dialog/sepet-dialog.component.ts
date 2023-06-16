import { Sepet } from 'src/app/models/Sepet';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormControl, } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { FormGroup } from '@angular/forms';
@Component({
  selector: 'app-sepet-dialog',
  templateUrl: './sepet-dialog.component.html',
  styleUrls: ['./sepet-dialog.component.css']
})
export class SepetDialogComponent implements OnInit {
  sepetDialogBaslik:string |undefined;
  islem:string |undefined;
  yeniKayit!:Sepet;
  frm!:FormGroup ;
  
  constructor( 
    
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<SepetDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data: any,
    
  
  ) {

    this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem =='ekle'){
      this.sepetDialogBaslik ="Sepete Ekle";
    }
    if(this.islem =='duzenle'){
      this.sepetDialogBaslik ="Sepeti Düzenle";
    }
    
     if(this.islem =='sil'){
       this.sepetDialogBaslik ="Sepeti Sil";
     }
    this.frm=this.FormOlustur();
    
   }

  ngOnInit() {
  }
  
  FormOlustur() : FormGroup{
    return this.frmBuilder.group({
      "uyeID"       :[this.yeniKayit.uyeID],
      "sepetID"    :[this.yeniKayit.sepetID],
      "ipNumarasi" :[this.yeniKayit.ipNumarasi],
      "urunID"     :[this.yeniKayit.urunID],

    })
  }
}
