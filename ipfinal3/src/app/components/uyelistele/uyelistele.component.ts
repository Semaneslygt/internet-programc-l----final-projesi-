import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Uye } from './../../models/Uye';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { Urun } from 'src/app/models/Urun';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UysecDialogComponent } from '../dialogs/uysec-dialog/uysec-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { MaterialModule } from 'src/app/material.module';

@Component({
  selector: 'app-uyelistele',
  templateUrl: './uyelistele.component.html',
  styleUrls: ['./uyelistele.component.css']
})
export class UyelisteleComponent implements OnInit {
  uyeler!:Uye[];
  secUye!:Uye;
  urunler!:Urun[];
  uyeID!:string;
  displayedColumns!:['uyeID','adSoyad','email','sifre','adres','admin' ,'islemler'];
  dataSource: any;
  urunID!:string;
@ViewChild(MatSort) sort:MatSort |undefined;
@ViewChild(MatPaginator) paginator:MatPaginator |undefined;  
ConfirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
uyeDialogRef!: MatDialogRef<UysecDialogComponent>; 
  adSoyad!: string;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }
  
  ngOnInit()
   {
    this.route.params.subscribe(p=> {
      this.uyeID = p ['uyeID'];
      this.UyeGetir();
      this.UyeListele();
      this.UrunListele();

    })
   }

UyeGetir() {
    this.apiServis.UyeById(this.uyeID).subscribe((d:Uye |any) => {
      this.secUye = d;
    })
  }
UyeSec(uyeID:string){
    this.uyeID= uyeID;
   }
Kaydet() {
    if (this.uyeID == ""){
      var s: Sonuc =new Sonuc();
      s.islem=false;
      s.mesaj="Üye Seçiniz";
      this.alert.AlertUygula(s);

      return;
    }
    var kayit:Uye=new Uye();
    kayit.adSoyad=this.adSoyad;
    kayit.uyeID=this.uyeID;

    this.apiServis.UyeOlustur(kayit).subscribe((s: any )=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.UyeListele();
      }
    });}
    
UyeSil(kayit: Uye){
      this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
        width: '400px'
      });
      this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.uyeBilgi.uyeID + "Numaralı Üye Silinecektir Onaylıyor Musunuz?";
      this.ConfirmDialogRef.afterClosed().subscribe(d=>{
        if (d){
          this.apiServis.UyeSil(kayit.uyeID).subscribe((s:any)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.UyeListele();
            }
          });
          
        }
      });
    }
    
 



  UyeListele(){
    this.apiServis.UrunUyeListe(this.urunID).subscribe((d:any)=> {
      this.uyeler =d;
      this.dataSource=new MatTableDataSource(this.uyeler);
      this.dataSource.sort=this.sort;

    })
  }
  
  UyeEkle() {
    this.uyeDialogRef = this.matDialog.open(UysecDialogComponent, {
      width: "500px;" });

    this.uyeDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit = new Uye();
        kayit.uyeID = d.uyeID;
        kayit.urunID = this.urunID;
        this.apiServis.UyeOlustur(kayit).subscribe((s:any) => {
          this.alert.AlertUygula(s)
          if (s.islem) {
            this.UyeListele();
          }
        });
          
      }
    });
     
    }
    UrunListele(){
      
    this.apiServis.UrunListe ().subscribe((d:Uye | any)=> {
      this.urunler =d;

    })
    }
 
  //  UyeById(){
  //   this.apiServis.UyeById(this.uyeID).subscribe((d:any) => {
   //     this.secUye =d;

   //   })
   // }

  }