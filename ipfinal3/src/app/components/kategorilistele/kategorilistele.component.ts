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
import { Kategori } from 'src/app/models/Kategori';
import { KategorisecDialogComponent } from '../dialogs/kategorisec-dialog/kategorisec-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';


@Component({
  selector: 'app-kategorilistele',
  templateUrl: './kategorilistele.component.html',
  styleUrls: ['./kategorilistele.component.css']
})
export class KategorilisteleComponent implements OnInit {
kategoriler!:Kategori[];
secKategori!:Kategori;
uyeID!:string;
displayedColumns!:['kategoriID','kategoriAdi','admin','islemler' ];
dataSource: any;
urunID!:string;
@ViewChild(MatSort) sort:MatSort |undefined;
@ViewChild(MatPaginator) paginator:MatPaginator |undefined;  
ConfirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
kategoriDialogRef!: MatDialogRef<KategorisecDialogComponent>; 
  kategoriID!: string;
  kategoriAdi: string | undefined;
  islem!:Sonuc;
  constructor(
    
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=> {
      this.uyeID = p ['uyeID'];
      this.KategoriGetir();
      this.KategoriListele();
    })
   }

KategoriGetir() {
    this.apiServis.KategoriById("3").subscribe((d:Uye |any) => {
      this.secKategori = d;
    })
  }
KategoriListele(){
    this.apiServis.KategoriUrunListe(this.kategoriID).subscribe((d:any)=> {
      this.kategoriler =d;
      this.dataSource=new MatTableDataSource(this.kategoriler);
      this.dataSource.sort=this.sort;
      this.dataSource.paginator = this.paginator;

    })
  } 
  
  KategoriEkle() {
    this.kategoriDialogRef = this.matDialog.open(KategorisecDialogComponent, {
      width: "500px;" });

    this.kategoriDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit = new Kategori();
        kayit.kategoriID = d.kategoriID;
        kayit.urunID = this.urunID;
        this.apiServis.KategoriOlustur(kayit).subscribe((s:any) => {
          this.alert.AlertUygula(s)
          if (s.islem) {
            this.KategoriListele();
          }
        });
          
      }
    });
   }
   
 KategoriSec(kategoriID:string){
  this.kategoriID= kategoriID;
 }
Kaydet() {
  if (this.kategoriID == ""){
    var s: Sonuc =new Sonuc();
    s.islem=false;
    s.mesaj="Kategori Seçiniz";
    this.alert.AlertUygula(s);

    return;
  }
  var kayit:Kategori=new Kategori();
  kayit.kategoriAdi=this.kategoriAdi;
  kayit.kategoriID=this.kategoriID;

  this.apiServis.KategoriOlustur(kayit).subscribe((s: any )=>{
    this.alert.AlertUygula(s);
    if (s.islem){
      this.KategoriListele();
    }
  });}
  
  KategoriSil(kayit: Kategori){
    this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.kategoriBilgi.kategoriID + "Numaralı Kategori Silinecektir Onaylıyor Musunuz?";
    this.ConfirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.KategoriSil(kayit.kategoriID).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.KategoriListele();
          }
        });
        
      }
    });
  }
    }

