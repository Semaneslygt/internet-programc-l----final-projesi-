import { UrunComponent } from './../urun/urun.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MaxLengthValidator } from '@angular/forms';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Favori } from 'src/app/models/Favori';
import { ApiService } from 'src/app/services/api.service';
import { FavoriDialogComponent } from '../dialogs/favori-dialog/favori-dialog.component';
import { MarkaDialogComponent } from '../dialogs/marka-dialog/marka-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { Sonuc } from 'src/app/models/Sonuc';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';

@Component({
  selector: 'app-favori',
  templateUrl: './favori.component.html',
  styleUrls: ['./favori.component.css']
})
export class FavoriComponent implements OnInit {
  favoriler!:Favori[];
  displayedColumns=['favoriID','uyeID', 'ipNumarasi', 'urunID','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;
  dialogRef: MatDialogRef<FavoriDialogComponent > |undefined;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent>|undefined;
  s:Sonuc|undefined;



  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public alert:MyAlertService,
  ) { } 

  ngOnInit() {
    this.FavoriListele();
  }
  
  FavoriListele(){
    this.apiServis.FavoriListele().subscribe((d:any ) => {
      this.favoriler =d;
      // console.log(d);
      this.dataSource= new MatTableDataSource(this.favoriler);
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
FavoriDuzenle(favori:Favori){
  this.dialogRef = this.matDialog.open(FavoriDialogComponent, {
    width: "400px",
    data: {
      islem: 'duzenle',
      kayit: favori }});
      this.dialogRef.afterClosed().subscribe(d=>{
        
        favori.urunID=d.urunID;
        favori.favoriID=d.favoriID;
        favori.ipNumarasi=d.ipNumarasi;
        favori.uyeID=d.uyeID;
          
        this.apiServis.FavoriDuzenle(favori).subscribe((s:Sonuc|any) => {
          this.alert.AlertUygula(s);
        });
      }) }
      
FavoriEkle() {
  var yeniKayit:Favori = new Favori();
  this.dialogRef = this.matDialog.open(FavoriDialogComponent, {
    width: "400px",
    data: {
      islem: 'ekle',
      kayit: yeniKayit }});
      this.dialogRef.afterClosed().subscribe(d=>{
        if(d){
        this.apiServis.FavoriOlustur(d).subscribe((s:any) =>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.FavoriListele(); }
        
  
        });
      }
    });
    }

    FavoriSil(favori:Favori){
      this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
        width:'500px'
      });
      this.confirmDialogRef.componentInstance.dialogMesaj = favori  +  "  isimli favori silinecektir.Onaylıyor musunuz?";
      this.confirmDialogRef.afterClosed().subscribe(d=>{
        if(d){
          this.apiServis.FavoriSil(favori.favoriID).subscribe((s:Sonuc|any ) => {
            this.alert.AlertUygula(s);
            if(s.islem){
              this.FavoriListele();
      
            }
          })
        }
      })
      
      }
}

