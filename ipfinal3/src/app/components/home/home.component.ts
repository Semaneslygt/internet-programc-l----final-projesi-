import { Component, OnInit } from '@angular/core';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { Sonuc } from 'src/app/models/Sonuc';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { ApiService } from 'src/app/services/api.service';
import { MatTableDataSource } from '@angular/material/table';
import { Urun } from 'src/app/models/Urun';



@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css']
})
export class HomeComponent implements OnInit {
  confirmDialogRef: MatDialogRef<ConfirmDialogComponent> | undefined;
  displayedColumns=[ 'urunID','urunAdi','kategoriID','urunAciklama','listeGorsel','stok','gelisFiyati','satisFiyati' ,'kdvOran','satılanAdet','islemler']
  dataSource: any;
  urunler!:Urun[] ;
  paginator: any;
  sort: any;


  constructor(
    public alert:MyAlertService,
    public matDialog:MatDialog,
    public apiServis:ApiService,
  ) { }

  ngOnInit() {
  }
  AlertAc(p:boolean) {
    var s:Sonuc=new Sonuc;
    s.islem=p;
    s.mesaj="Bu Bir Alert Testidir";
    this.alert.AlertUygula(s);}

    ConfirmAc(){
      this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
        width:'500px '
      });
      this.confirmDialogRef.componentInstance.dialogMesaj="Kayıt Silinecek Emin Misiniz?"
      this.confirmDialogRef.afterClosed().subscribe(d=> {
        console.log(d);
        if(d) {
          //silme rutini
          
        }
      });
    }

    UrunListele () 
    {
      this.apiServis.UrunListele().subscribe((d:any ) => {
      this.urunler =d;
      // console.log(d);
      this.dataSource= new MatTableDataSource(this.urunler);
      this.dataSource.sort =this.sort;
      this.dataSource.paginator =this.paginator;
    });

}
}