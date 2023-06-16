import { Kategori } from 'src/app/models/Kategori';
import { Component, Inject, OnInit } from '@angular/core';
import { FormBuilder, FormGroup } from '@angular/forms';
import { MAT_DIALOG_DATA, MatDialog, MatDialogRef } from '@angular/material/dialog';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-kategori-dialog',
  templateUrl: './kategori-dialog.component.html',
  styleUrls: ['./kategori-dialog.component.css']
})
export class KategoriDialogComponent implements OnInit {
  kategoriDialogBaslik:string | undefined;
  islem: string;
  yeniKayit:Kategori;
  frm!:FormGroup;
  
constructor(
     public frmBuilder: FormBuilder,
     public dialogRef:MatDialogRef<KategoriDialogComponent>,
     @Inject(MAT_DIALOG_DATA) public data :any,
) {
  this.islem = data.islem;
  this.yeniKayit = data.kayit;

    if(this.islem =='ekle'){
      this.kategoriDialogBaslik ="Kategori Ekle";
    }
    if(this.islem =='duzenle'){
      this.kategoriDialogBaslik ="Kategori Düzenle";
    }

    if(this.islem =='sil'){
      this.kategoriDialogBaslik ="Kategori Sil";
    }


  this.frm = this.FormOlustur();
}



ngOnInit() {
  throw new Error('Method not implemented.');
}





FormOlustur() : FormGroup{
  return this.frmBuilder.group({
    "kategoriID"  :[this.yeniKayit.kategoriID],
    "kategoriAdi" :[this.yeniKayit.kategoriAdi],
    

  })
}

}
