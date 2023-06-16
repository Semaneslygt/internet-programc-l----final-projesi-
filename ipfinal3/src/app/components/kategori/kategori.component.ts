import { MatTableDataSource } from '@angular/material/table';
import { Component, OnInit, ViewChild } from '@angular/core';
import { Kategori } from 'src/app/models/Kategori';
import { ApiService } from 'src/app/services/api.service';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { KategoriDialogComponent } from '../dialogs/kategori-dialog/kategori-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
@Component({
  selector: 'app-kategori',
  templateUrl: './kategori.component.html',
  styleUrls: ['./kategori.component.css']
})
export class KategoriComponent implements OnInit {
  kategoriler:Kategori[] | undefined;
  displayedColumns=['kategoriID','kategoriAdi','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;
  dialogRef: MatDialogRef<KategoriDialogComponent > |undefined;
  s:Sonuc|undefined;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent > ;

  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public alert:MyAlertService

  ) { } 
  ngOnInit() {
    this.KategoriListele();

  }
    KategoriListele(){
      this.apiServis.KategoriListele().subscribe((d:any ) => {
        this.kategoriler =d;
        // console.log(d);
        this.dataSource= new MatTableDataSource(this.kategoriler);
        this.dataSource.sort = this.sort;
        this.dataSource.paginator = this.paginator;
      });
    }
    Filtrele(e: any) {
      var deger = e.target.value;
      this.dataSource.filter = deger.trim().toLowerCase();
      if (this.dataSource.paginator) {
        this.dataSource.paginator.firstPage();
      }
    }
    
   KategoriDuzenle(kayit:Kategori){
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: kayit }});
        this.dialogRef.afterClosed().subscribe(d=>{
          
        
        kayit.kategoriAdi=d.kategoriAdi;
        kayit.kategoriID=d.kategoriID;
          
        this.apiServis.KategoriDuzenle(kayit).subscribe((s:Sonuc|any) => {
          this.alert.AlertUygula(s);
        });
        })
   }    
   KategoriSil(kayit:Kategori){
    this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
      width: "400px",});
      
     this.confirmDialogRef.componentInstance.dialogMesaj=kayit.kategoriID+" isimli kategori silinecektir. Onaylıyor musunuz?"
     this.confirmDialogRef.afterClosed().subscribe(d=> {
      if(d){
        this.apiServis.KategoriSil(kayit.kategoriID).subscribe((s:Sonuc|any) => {
          this.alert.AlertUygula(s);
          if(s.islem){
            this.KategoriListele
          }
        })
      }
     })



}
KategoriEkle() {
  var yeniKayit:Kategori = new Kategori();
  this.dialogRef = this.matDialog.open(KategoriDialogComponent, {
    width: "400px",
    data: {
      islem: 'ekle',
      kayit: yeniKayit }});
      this.dialogRef.afterClosed().subscribe(d=>{
        this.apiServis.UyeOlustur(d).subscribe((s:any) =>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.KategoriListele();

          }
          

        });

    });
  }}