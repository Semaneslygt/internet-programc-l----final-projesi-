import { ConfirmDialogComponent } from './../dialogs/confirm-dialog/confirm-dialog.component';
import { Component, OnInit, ViewChild } from '@angular/core';
import { MatPaginator } from '@angular/material/paginator';
import { MatSort } from '@angular/material/sort';
import { MatTableDataSource } from '@angular/material/table';
import { Sepet } from 'src/app/models/Sepet';
import { ApiService } from 'src/app/services/api.service';
import { MatDialog, MatDialogRef } from '@angular/material/dialog';
import { MyAlertService } from 'src/app/services/myAlert.service';
import { SepetDialogComponent } from '../dialogs/sepet-dialog/sepet-dialog.component';
import { Sonuc } from 'src/app/models/Sonuc';
@Component({
  selector: 'app-sepet',
  templateUrl: './sepet.component.html',
  styleUrls: ['./sepet.component.css']
})
export class SepetComponent implements OnInit {
  sepetler!:Sepet[] ;
  displayedColumns=['sepetID','uyeID','ipNumarasi','urunID','islemler'];
  dataSource:any;
  @ViewChild(MatSort) sort:MatSort | undefined;
  @ViewChild(MatPaginator) paginator:MatPaginator |undefined;
  dialogRef: MatDialogRef<SepetDialogComponent > |undefined;
  s!:Sonuc;
  confirmDialogRef!: MatDialogRef<ConfirmDialogComponent > ;
sepet: any;
  

  constructor(
    public apiServis:ApiService,
    public matDialog: MatDialog,
    public alert: MyAlertService

  ) { 
    
  }

  ngOnInit() {
    this.SepetListele();

  }
  SepetListele () 
  {this.apiServis.SepetListele().subscribe((d:any ) => {
    this.sepetler =d;
    // console.log(d);
    this.dataSource= new MatTableDataSource(this.sepetler);
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
  SepeteEkle(){
    var yeniKayit:Sepet = new Sepet ();
    this.dialogRef = this.matDialog.open(SepetDialogComponent, {
      width:"500px",
      data: {
        islem: 'ekle',
        kayit :yeniKayit }});
        this.dialogRef.afterClosed().subscribe(d=> {
          this.apiServis.SepetOlustur(d).subscribe((s:any ) =>{
            this.alert.AlertUygula(s);
            if(s.islem) {
              this.SepetListele();}})})}

  
        

   SepetDuzenle(kayit:Sepet){
    this.dialogRef = this.matDialog.open(SepetDialogComponent, {
      width: "400px",
      data: {
        islem: 'duzenle',
        kayit: kayit }});
        this.dialogRef.afterClosed().subscribe(d=> {
          
        kayit.urunID=d.urunID;
        kayit.sepetID=d.sepetID;
        kayit.uyeID=d.uyeID;
        kayit.ipNumarasi=d.ipNumarasi;
          
        this.apiServis.SepetDuzenle(kayit).subscribe((s:Sonuc|any) => {
          this.alert.AlertUygula(s);
        });
        })
   }     
  //  SepetSil(kayit:Sepet){
  //   this.dialogRef = this.matDialog.open(SepetDialogComponent, {
  //     width: "500px",});
      
  //    this.confirmDialogRef.componentInstance.dialogMesaj=kayit.sepetID+" isimli sepet silinecektir. Onaylıyor musunuz?"
  //    this.confirmDialogRef.afterClosed().subscribe(d=> {
  //     if(d){
  //       this.apiServis.SepetSil(kayit.sepetID).subscribe((s:Sonuc|any) => {
  //         this.alert.AlertUygula(s);
  //         if(s.islem){
  //           this.SepetListele
  //         }
  //       })
  //     }
  //    })
    
  SepetUrunSil(kayit:Sepet){
    this.confirmDialogRef = this.matDialog.open(ConfirmDialogComponent,{
      width : '500px' });
      this.confirmDialogRef.componentInstance.dialogMesaj = kayit.sepetID + "numaralı sepet silinecektir. Onaylıyor musunuz??";
      this.confirmDialogRef.afterClosed().subscribe(d=>{
        if(d) {
          this.apiServis.SepetUrunSil("/" + kayit.sepetID).subscribe((s:Sonuc |any ) => {
            this.alert.AlertUygula(s);
            if(s.islem) {
              this.SepetListele();
            }
          })
        }
      })
  }

  
}
  
  //   SepetUrunSil(kayit:Sepet){
  //     this.confirmDialogRef=this.matDialog.open(ConfirmDialogComponent,{
  //       width:'500px'});
  //     this.confirmDialogRef.componentInstance.dialogMesaj = kayit.sepetID + "numaralı sepet silinecektir. onaylıyor musunuz??";
  //     this.confirmDialogRef.afterClosed().subscribe(d => {
  //       if(d) {
  //         this.apiServis.SepetUrunSil( "/" + kayit.sepetID).subscribe((s:Sonuc |any ) => {
  //           this.alert.AlertUygula(s);
  //           if(s.islem) {
  //             this.SepetListele();}
  //         })
  //       }
  //     })
  //   }

  // }
    


   


