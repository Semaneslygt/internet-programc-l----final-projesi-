import { MatPaginator } from '@angular/material/paginator';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatTableDataSource } from '@angular/material/table';
import { ApiService } from 'src/app/services/api.service';
import { Uye } from 'src/app/models/Uye';
import { MatSort } from '@angular/material/sort';
import { UyeDialogComponent } from '../dialogs/uye-dialog/uye-dialog.component';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { UyelisteleComponent } from '../uyelistele/uyelistele.component';

@Component({
  selector: 'app-uye',
  templateUrl: './uye.component.html',
  styleUrls: ['./uye.component.css']
})
export class UyeComponent implements OnInit {
  uyeler!:Uye[];
  displayedColumns=['uyeID','adSoyad','email','sifre','adres','admin','islemler' ];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;
  dialogRef: MatDialogRef<UyeDialogComponent > |undefined;
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent > |undefined;
  s:Sonuc|undefined;


  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { }

  ngOnInit() {
    this.UyeListele();
  }
  UyeListele(){
    this.apiServis.UyeListele().subscribe((d:any ) => {
      this.uyeler =d;
      this.dataSource= new MatTableDataSource(this.uyeler);
      this.dataSource.sort =this.sort;
    this.dataSource.paginator =this.paginator
    });
  }
  Filtrele(e: any) {
    var deger = e.target.value;
    this.dataSource.filter = deger.trim().toLowerCase();
    if (this.dataSource.paginator) {
      this.dataSource.paginator.firstPage();
    }
  }
  
  UyeDuzenle(kayit:Uye){
    this.dialogRef = this.matDialog.open(UyeDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: kayit }});
        this.dialogRef.afterClosed().subscribe(d=>{
        kayit.adSoyad=d.adSoyad;
        kayit.uyeID=d.uyeID;
        kayit.email=d.email;
        kayit.sifre=d.sifre;
        kayit.adres=d.adres;
        kayit.admin=d.admin;
        
        this.apiServis.UyeDuzenle(kayit).subscribe((s:Sonuc|any) => {
          this.alert.AlertUygula(s);
        });
        })
   }     
  

UyeSil(kayit:Uye){
this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
  width:'500px'
});
this.confirmDialogRef.componentInstance.dialogMesaj = kayit  +  "  isimli üye silinecektir.Onaylıyor musunuz?";
this.confirmDialogRef.afterClosed().subscribe(d=>{
  if(d){
    this.apiServis.UyeSil(kayit.uyeID).subscribe((s:Sonuc|any ) => {
      this.alert.AlertUygula(s);
      if(s.islem){
        this.UyeListele();

      }
    })
  }
})

}


UyeEkle() {
  var yeniKayit:Uye = new Uye();
  this.dialogRef = this.matDialog.open(UyeDialogComponent, {
    width: "400px",
    data: {
      islem: 'ekle',
      kayit: yeniKayit }});
      this.dialogRef.afterClosed().subscribe(d=>{
        this.apiServis.UyeOlustur(d).subscribe((s:any) =>{
          this.alert.AlertUygula(s);
          if(s.islem) {
            this.UyeListele();}    }); });}
      
            }     
   



