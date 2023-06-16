import { Marka } from 'src/app/models/Marka';
import { Component, Inject, OnInit, inject } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-marka-dialog',
  templateUrl: './marka-dialog.component.html',
  styleUrls: ['./marka-dialog.component.css']
})
export class MarkaDialogComponent implements OnInit {
  markaDialogBaslik:string |undefined;
  islem:string |undefined;
  frm!:FormGroup;
  yeniKayit!:Marka;
  
  constructor(
    public apiServis:ApiService,
    public matdialog:MatDialog,
    public frmBuilder: FormBuilder,
    public dialogRef:MatDialogRef<MarkaDialogComponent>,
    @Inject(MAT_DIALOG_DATA) public data :any,
  ) 
  {this.islem=data.islem;
    this.yeniKayit=data.kayit;
    if(this.islem =='ekle'){
      this.markaDialogBaslik ="Marka Ekle";
    }
    if(this.islem =='duzenle'){
      this.markaDialogBaslik ="Marka Düzenle";
    }
    
    if(this.islem =='sil'){
      this.markaDialogBaslik ="Marka Sil";
    }
    
    this.frm=this.FormOlustur();
 
  }  ngOnInit(){

  }
  FormOlustur() : FormGroup{
    return this.frmBuilder.group({
      "markaID"   :[this.yeniKayit.markaID],
      "markaAdi"  :[this.yeniKayit.markaAdi],
    

    })
  }

}
