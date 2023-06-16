import { Component, OnInit, ViewChild } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { Favori } from 'src/app/models/Favori';
import { FavoriDialogComponent } from '../favori-dialog/favori-dialog.component';
import { ConfirmDialogComponent } from '../confirm-dialog/confirm-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { MatTableDataSource } from '@angular/material/table';

@Component({
  selector: 'app-favorisec-dialog',
  templateUrl: './favorisec-dialog.component.html',
  styleUrls: ['./favorisec-dialog.component.css']
})
export class FavorisecDialogComponent implements OnInit {
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
}