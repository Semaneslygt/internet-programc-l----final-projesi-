import { ListegorselyukleDialogComponent } from './../dialogs/listegorselyukle-dialog/listegorselyukle-dialog.component';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Urun } from 'src/app/models/Urun';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { UrunDialogComponent } from '../dialogs/urun-dialog/urun-dialog.component';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { UrunsecDialogComponent } from '../dialogs/urunsec-dialog/urunsec-dialog.component';
import { FotoDialogComponent } from '../dialogs/foto-dialog/foto-dialog.component';
import { ListeGorsel } from 'src/app/models/ListeGorsel';
@Component({
  selector: 'app-urun',
  templateUrl: './urun.component.html',
  styleUrls: ['./urun.component.css']
})
export class UrunComponent implements OnInit {
  urunler!:Urun[] ;
  displayedColumns=[ 'urunID','urunAdi','kategoriID','urunAciklama','listeGorsel','stok','gelisFiyati','satisFiyati' ,'kdvOran','satılanAdet','islemler']
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent > ;
  dialogRef: MatDialogRef<UrunDialogComponent > |undefined;
  GorselDialogRef: MatDialogRef<ListegorselyukleDialogComponent > |undefined;

  s!:Sonuc;

constructor(
  public apiServis:ApiService,
  public matDialog: MatDialog,
   public alert: MyAlertService
) { }

  ngOnInit() {
    this.UrunListele();
  }

  UrunListele () 
  {this.apiServis.UrunListele().subscribe((d:any ) => {
    this.urunler =d;
    // console.log(d);
    this.dataSource= new MatTableDataSource(this.urunler);
    this.dataSource.sort =this.sort;
    this.dataSource.paginator =this.paginator;
  });
  }
 
  Filtrele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  UrunEkle(){
    var yeniKayit:Urun = new Urun ();
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width:"500px",
      data: {
        islem: 'ekle',
        kayit :yeniKayit }});
        this.dialogRef.afterClosed().subscribe(d=> {
          this.apiServis.UrunOlustur(d).subscribe((s:any ) =>{
            this.alert.AlertUygula(s);
            if(s.islem) {
              this.UrunListele();}})})}


UrunDuzenle(kayit:Urun){
    this.dialogRef = this.matDialog.open(UrunDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: kayit }});
        this.dialogRef.afterClosed().subscribe(d=>{
          
        kayit.urunID=d.urunID;
        kayit.urunAdi=d.urunAdi;
        kayit.kategoriId=d.kategoriID;
        kayit.urunAciklama=d.urunAciklama;
        kayit.listeGorsel=d.listeGorsel;
        kayit.stok=d.stok;
        kayit.gelisFiyati=d.gelisFiyati;
        kayit.satisFiyati=d.satisFiyati;
        kayit.kdvOran=d.kdvOran;
        kayit.satisFiyati=d.satisFiyati;
          
        this.apiServis.UrunDuzenle(kayit).subscribe((s:Sonuc|any) => {
        this.alert.AlertUygula(s);
        });
        });
   }
UrunGorselGuncelle(kayit:Urun){
    this.GorselDialogRef =this.matDialog.open(ListegorselyukleDialogComponent, {
      width: '400px',
      data:kayit, });    
  this.GorselDialogRef.afterClosed().subscribe((d:ListeGorsel |any)=>{
    if (d){
      d.urunID=kayit.urunID;
      this.apiServis.UrunListeGorsel(d).subscribe((s:any)=>{
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.UrunListele();
        }
      });
    }
  });
   }

   }
       
  
    

    
