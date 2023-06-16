import { Component, OnInit } from '@angular/core';
import { Sonuc } from 'src/app/models/Sonuc';
import { ApiService } from 'src/app/services/api.service';
import { MyAlertService } from 'src/app/services/myAlert.service';

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {
  constructor(
    public apiServis:ApiService,
    public alert:MyAlertService,  
  ) { }

  ngOnInit() {
  }
  OturumAc(email:string,sifre:string ){
    this.apiServis.TokenAl(email,sifre).subscribe((d:any )=> {
      
      localStorage.setItem("token",d.acces_token );
      localStorage.setItem("uid",d.UyeID );
      localStorage.setItem("email",d.UyeEmail );
      localStorage.setItem("adiSoyadi",d.UyeAdiSoyadi );
      localStorage.setItem("uyeYetkileri",d.UyeYetkileri );
      location.href="/urunler";


    },err=> {
      var s:Sonuc = new Sonuc();
      s.islem=false;
      s.mesaj="kullanıcı adı veya şifre geçersizdir"
      this.alert.AlertUygula(s)
      localStorage.setItem("token","hülooo" );

      });

  }

}
