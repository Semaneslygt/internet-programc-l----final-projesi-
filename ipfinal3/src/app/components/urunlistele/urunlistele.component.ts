import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Urun } from 'src/app/models/Urun';
import { Uye } from 'src/app/models/Uye';
import { UrunsecDialogComponent } from '../dialogs/urunsec-dialog/urunsec-dialog.component';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { ActivatedRoute } from '@angular/router';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';
import { UysecDialogComponent } from '../dialogs/uysec-dialog/uysec-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-urunlistele',
  templateUrl: './urunlistele.component.html',
  styleUrls: ['./urunlistele.component.css']
})
export class UrunlisteleComponent implements OnInit {
  urunler!: Urun[];
  secUrun!: Urun;
  urunID!: any;
  displayedColumns!: ['listeGorsel','urunID','urunAdi','kategoriID','urunAciklama','stok','gelisFiyati','satisFiyati' ,'kdvOran',''];
  dataSource: any;
  @ViewChild(MatSort) sort: MatSort | undefined;
  @ViewChild(MatPaginator) paginator: MatPaginator | undefined;
  ConfirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  urunDialogRef!: MatDialogRef<UrunsecDialogComponent>;
  uyeID!: string;
    urun: any;
    uyeler!:Uye[];
  urunAdi!: string;
    


  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p => {
      this.urunID = p['urunID']
      this.UrunGetir();
      // this.UrunListele();
    })
  }

  UrunGetir() {
    this.apiServis.UrunById(this.urunID).subscribe((d: Urun) => {
      this.secUrun = d;
      console.log(d)
    })
  }
  UrunListele() {
    this.apiServis.UrunUyeListe(this.urunID).subscribe((d: any) => {
      this.urunler = d;
      this.dataSource = new MatTableDataSource(this.urunler);
      this.dataSource.sort = this.sort;

    })
  }
  UrunEkle() {
    this.urunDialogRef = this.matDialog.open(UrunsecDialogComponent, {
      width: "500px;"
    });

    this.urunDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit = new Urun();
        kayit.urunID = d.urunID;
        kayit.uyeID = this.uyeID;
        this.apiServis.UrunOlustur(kayit).subscribe((s: any) => {
          this.alert.AlertUygula(s)
          if (s.islem) {
            this.UrunListele();
          }
        });

      }
    });

  }
UrunSec(urunID:string){
    this.urunID= urunID;
   }
Kaydet() {
    if (this.uyeID == ""){
      var s: Sonuc =new Sonuc();
      s.islem=false;
      s.mesaj="Ürün Seçiniz";
      this.alert.AlertUygula(s);

      return;
    }
    var kayit:Urun=new Urun();
    kayit.urunID=this.urunID;
    kayit.urunAdi=this.urunAdi;

    this.apiServis.UrunOlustur(kayit).subscribe((s: any )=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.UrunListele();
      }
    });}
    
UrunSil(kayit: Urun){
      this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
        width: '400px'
      });
      this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.urunBilgi.urunID + "Numaralı Ürün Silinecektir Onaylıyor Musunuz?";
      this.ConfirmDialogRef.afterClosed().subscribe(d=>{
        if (d){
          this.apiServis.UrunSil(kayit.urunID).subscribe((s:any)=>{
            this.alert.AlertUygula(s);
            if (s.islem){
              this.UrunListele();
            }
          });
          
        }
      });
    }
    



}

