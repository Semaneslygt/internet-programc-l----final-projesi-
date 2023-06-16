import { Marka } from 'src/app/models/Marka';
import { ConfirmDialogComponent } from '../dialogs/confirm-dialog/confirm-dialog.component';
import { MarkaDialogComponent } from '../dialogs/marka-dialog/marka-dialog.component';
import { Uye } from './../../models/Uye';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ApiService } from 'src/app/services/api.service';
import { Component, OnInit, ViewChild } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import { MatTableDataSource } from '@angular/material/table';
import { MatSort } from '@angular/material/sort';
import { MatPaginator } from '@angular/material/paginator';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MarkasecDialogComponent } from '../dialogs/markasec-dialog/markasec-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';

@Component({
  selector: 'app-markalistele',
  templateUrl: './markalistele.component.html',
  styleUrls: ['./markalistele.component.css']
})
export class MarkalisteleComponent implements OnInit {
  markalar!: Marka[];
  secMarka!:Marka;
  urunID!:string;
  displayedColumns!:['markaID','markaAdi','islemler'];
  dataSource: any;
  @ViewChild(MatSort) sort:MatSort |undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;  
  ConfirmDialogRef!: MatDialogRef<ConfirmDialogComponent>;
  markaDialogRef!: MatDialogRef<MarkasecDialogComponent>; 
  uyeID!: string;
  markaID!: string;
  markaAdi!: string;



  constructor(
    public apiServis: ApiService,
    public route: ActivatedRoute,
    public alert: MyAlertService,
    public matDialog: MatDialog
  ) { }
  
  ngOnInit() {
    this.route.params.subscribe(p=> {
      this.uyeID = p ['uyeID'];
      this.MarkaGetir();
      this.MarkaListele();
  })
  }
  MarkaGetir() {
    this.apiServis.MarkaById("1").subscribe((d:Marka |any) => {
      this.secMarka = d; })}

MarkaListele(){
        this.apiServis.MarkaUrunListe(this.markaID).subscribe((d:any)=> {
          this.markalar =d;
          this.dataSource=new MatTableDataSource(this.markalar);
          this.dataSource.sort=this.sort;
    
        })
      }

MarkaEkle() {
        this.markaDialogRef = this.matDialog.open(MarkasecDialogComponent, {
          width: "500px;" });
    
        this.markaDialogRef.afterClosed().subscribe(d => {
          if (d) {
            var kayit = new Marka();
            kayit.markaID = d.markaID;
            kayit.markaAdi = this.markaAdi;
            this.apiServis.MarkaOlustur(kayit).subscribe((s:any) => {
              this.alert.AlertUygula(s)
              if (s.islem) {
                this.MarkaListele();
      }
    });
      
  }
}); 
}

MarkaSec(markaID:string){
  this.markaID= markaID;
 }
Kaydet() {
  if (this.markaID == ""){
    var s: Sonuc =new Sonuc();
    s.islem=false;
    s.mesaj="Marka Seçiniz";
    this.alert.AlertUygula(s);

    return;
  }
  var kayit:Marka=new Marka();
  kayit.markaID=this.markaID;
  kayit.markaAdi=this.markaAdi;

  this.apiServis.MarkaOlustur(kayit).subscribe((s: any )=>{
    this.alert.AlertUygula(s);
    if (s.islem){
      this.MarkaListele();
    }
  });}
  
MarkaSil(kayit: Marka){
    this.ConfirmDialogRef=this.matDialog.open(ConfirmDialogComponent, {
      width: '400px'
    });
    this.ConfirmDialogRef.componentInstance.dialogMesaj = kayit.markaBilgi.markaID + "Numaralı Marka Silinecektir Onaylıyor Musunuz?";
    this.ConfirmDialogRef.afterClosed().subscribe(d=>{
      if (d){
        this.apiServis.MarkaSil(kayit.markaID).subscribe((s:any)=>{
          this.alert.AlertUygula(s);
          if (s.islem){
            this.MarkaListele();
          }
        });
        
      }
    });
  }
  


        }
    

