import { Sepet } from './../../models/Sepet';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Uye } from './../../models/Uye';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { SepetsecDialogComponent } from '../dialogs/sepetsec-dialog/sepetsec-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-sepetlistele',
  templateUrl: './sepetlistele.component.html',
  styleUrls: ['./sepetlistele.component.css']
})
export class SepetlisteleComponent implements OnInit {
  sepetler!:Sepet[];
  secSepet!:Sepet;
  displayedColumns!:['sepetID','uyeID', 'urunSayisi', 'islemler'] ;
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort |undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;  
  ConfirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  sepetDialogRef!: MatDialogRef<SepetsecDialogComponent>;
  urunID!: any;
  uyeID!: any;
  sepetID!:any;

  constructor(
public apiServis: ApiService,
public route: ActivatedRoute,
public alert: MyAlertService,
public matDialog : MatDialog,
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=> {
      this.sepetID = p ['sepetID'];
      this.SepetGetir();
      // this.SepetListele();
    })
      }
   
  
SepetGetir() {
  this.apiServis.SepetById(this.sepetID).subscribe((d:Sepet |any) => {
    this.secSepet = d;
    console.log(d);
  })
}

SepetListele(){
  this.apiServis.SepetUrunListe(this.sepetID).subscribe((d:any) =>{
    this.sepetler =d;
    this.dataSource=new MatTableDataSource(this.sepetler);
    this.dataSource.sort=this.sort; })}
    
SepetSec(sepetID:string){
    this.sepetID= sepetID;
   }
Kaydet() {
    if (this.sepetID == ""){
      var s: Sonuc =new Sonuc();
      s.islem=false;
      s.mesaj="Ders Seçiniz";
      this.alert.AlertUygula(s);

      return;
    }
  
    var kayit:Sepet=new Sepet();
    kayit.sepetID=this.sepetID;
    kayit.uyeID=this.uyeID;

    this.apiServis.SepetOlustur(kayit).subscribe((s: any )=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.SepetListele();
      }
    });}
    


SepetEkle() {
  
  this.sepetDialogRef = this.matDialog.open(SepetsecDialogComponent, {
    width: "500px;" });

  this.sepetDialogRef.afterClosed().subscribe(d => {
    if (d) {
      var kayit = new Sepet();
      kayit.sepetID = d.sepetID;
      kayit.urunID = this.urunID;
      this.apiServis.SepetOlustur(kayit).subscribe((s:any) => {
        this.alert.AlertUygula(s)
        if (s.islem) {
          this.SepetListele();
        }
      });
        
    }
  });

}   
SepetSil(kayit: Sepet){
  this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
    width: '400px'
  });
  this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.sepetBilgi.sepetID + "Numaralı Sepet Silinecektir Onaylıyor Musunuz?";
  this.ConfirmDialogRef.afterClosed().subscribe(d=>{
    if (d){
      this.apiServis.SepetUrunSil(kayit.sepetID).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if (s.islem){
          this.SepetListele();
        }
      });
      
    }
  });
}


}