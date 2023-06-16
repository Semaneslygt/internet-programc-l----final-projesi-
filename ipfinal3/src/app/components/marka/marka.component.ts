import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Marka } from 'src/app/models/Marka';
import { ApiService } from 'src/app/services/api.service';
import { MarkaDialogComponent } from '../dialogs/marka-dialog/marka-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { Urun } from 'src/app/models/Urun';
@Component({
  selector: 'app-marka',
  templateUrl: './marka.component.html',
  styleUrls: ['./marka.component.css']
})
export class MarkaComponent implements OnInit {
  markalar!:Marka[] ;
  displayedColumns=['markaID','markaAdi','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;
  s:Sonuc|undefined;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent > ;
  dialogRef: MatDialogRef<MarkaDialogComponent > |undefined;
  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public alert:MyAlertService,


  ) { }

  ngOnInit() {
    this.MarkaListele();
    
  }
  MarkaListele(){
    this.apiServis.MarkaListele().subscribe((d:any ) => {
      this.markalar =d;
      // console.log(d);
      this.dataSource= new MatTableDataSource(this.markalar);
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
MarkaEkle() {
  var yeniKayit:Marka = new Marka();
  this.dialogRef = this.matDialog.open(MarkaDialogComponent, {
    width: "400px",
    data: {
      islem: 'ekle',
      kayit: yeniKayit }});
    this.dialogRef.afterClosed().subscribe(d=>{
      this.apiServis.MarkaOlustur(d).subscribe((s:any) => {
        this.alert.AlertUygula(s);
        if (s.islem) {
          this.MarkaListele();
        }
      })
    })

  
  
  
  
  }


MarkaDuzenle(kayit:Marka){
  this.dialogRef = this.matDialog.open(MarkaDialogComponent, {
    width: "400px",
    data: {
      islem: 'duzenle',
      kayit: kayit }});
      this.dialogRef.afterClosed().subscribe(d=>{
        
        kayit.markaID=d.markaID;
        kayit.markaAdi=d.markaAdi;
          
        this.apiServis.MarkaDuzenle(kayit).subscribe((s:Sonuc|any) => {
          this.alert.AlertUygula(s);
        });
      })
 }     
//  MarkaSil(kayit:Marka){
//   this.dialogRef = this.matDialog.open(MarkaDialogComponent, {
//     width: "400px",
//   });
  
//   this.confirmDialogRef.componentInstance.dialogMesaj=kayit.markaID+" isimli kullanıcı silinecektir. Onaylıyor musunuz?"
//   this.confirmDialogRef.afterClosed().subscribe((d: any)=> {
//    if(d){
//      this.apiServis.UyeSil(kayit.markaID).subscribe((s:Sonuc|any) => {
//        this.alert.AlertUygula(s);
//        if(s.islem){
//          this.MarkaListele
//        }
//      })
//    }
//   })



MarkaSil(kayit:Marka) {
  this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent ,{
    width :'500px' });
    this.confirmDialogRef.componentInstance.dialogMesaj = kayit.markaAdi + "isimli marka silinecektir. onaylıyor musunuz?";
    this.confirmDialogRef.afterClosed().subscribe(d=> {
      if (d) {
        this.apiServis.MarkaSil("/" +kayit.markaID).subscribe((s:Sonuc |any) =>{
          this.alert.AlertUygula(s);
          if(s.islem){
            this.MarkaListele();
            
          }
        }
        )

      }
    })
}
}