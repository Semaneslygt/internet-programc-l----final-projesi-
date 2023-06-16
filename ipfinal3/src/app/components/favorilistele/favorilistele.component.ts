import { Favori } from './../../models/Favori';
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
import { FavorisecDialogComponent } from '../dialogs/favorisec-dialog/favorisec-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-favorilistele',
  templateUrl: './favorilistele.component.html',
  styleUrls: ['./favorilistele.component.css']
})
export class FavorilisteleComponent implements OnInit {
  favoriler!:Favori[];
  secFavori!:Favori;
  uyeID!:string;
  displayedColumns!:['favoriID','uyeID', 'ipNumarasi', 'urunID','islemler' ];
  dataSource: any;
  urunID!:string;
@ViewChild(MatSort) sort:MatSort |undefined;
@ViewChild(MatPaginator) paginator:MatPaginator |undefined;  
ConfirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
favoriDialogRef!: MatDialogRef<FavorisecDialogComponent>; 
  favoriID!: string;
  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }

  ngOnInit() {
    this.route.params.subscribe(p=> {
      this.urunID = p ['urunID'];
      this.FavoriGetir();
      this.FavoriListele();
    })
   }

  FavoriGetir() {
    this.apiServis.FavoriById("1007 ").subscribe((d:Favori |any) => {
      this.secFavori = d;
    })
  }
 



  FavoriListele(){
    this.apiServis.FavoriUrunListe(this.favoriID).subscribe((d:any)=> {
      this.favoriler =d;
      this.dataSource=new MatTableDataSource(this.favoriler);
      this.dataSource.sort=this.sort;

    })
  }
  FavoriSec(favoriID:string){
    this.favoriID= favoriID;
  }
  Kaydet() {
    if (this.favoriID == ""){
      var s: Sonuc =new Sonuc();
      s.islem=false;
      s.mesaj="Favori Seçiniz";
      this.alert.AlertUygula(s);

      return;
    }
    var kayit:Favori=new Favori();
    kayit.favoriID=this.favoriID;
    kayit.uyeID=this.uyeID;

    this.apiServis.FavoriOlustur(kayit).subscribe((s: any )=>{
      this.alert.AlertUygula(s);
      if (s.islem){
        this.FavoriListele();
      }
    });
  }
  FavoriSil(kayit: Favori){
    this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.favoriBilgi.favoriID + "Numaralı Favori Silinecektir Onaylıyor Musunuz?";
    this.ConfirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.FavoriSil(kayit.favoriID).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.FavoriListele();
          }
        });
        
      }
    });
  }
  
  FavoriEkle() {
    this.favoriDialogRef = this.matDialog.open(FavorisecDialogComponent, {
      width: "500px;" });

    this.favoriDialogRef.afterClosed().subscribe(d => {
      if (d) {
        var kayit = new Favori();
        kayit.favoriID = d.favoriID;
        kayit.urunID = this.urunID;
        this.apiServis.FavoriOlustur(kayit).subscribe((s:any) => {
          this.alert.AlertUygula(s)
          if (s.islem) {
            this.FavoriListele();
          }
        });
          
      }
    });
     
    }
  }


