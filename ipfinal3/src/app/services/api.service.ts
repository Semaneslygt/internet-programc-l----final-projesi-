import { Injectable } from '@angular/core';
import { HttpClient, HttpHeaders } from '@angular/common/http';
import { Urun } from '../models/Urun';
import { Uye } from '../models/Uye';
import { Kategori } from '../models/Kategori';
import { Marka } from '../models/Marka';
import { Favori } from '../models/Favori';
import { Sepet } from '../models/Sepet';






@Injectable({
  providedIn: 'root'
})
export class ApiService {
  UrunGorselGuncelle(d: any) {
    throw new Error('Method not implemented.');
  }
  apiUrl="https://localhost:44337/api/";
  siteUrl="https://localhost:44337/"

constructor( 
  public http: HttpClient
) { }
//ürün servisleri
UrunListele(){
return this.http.get( this.apiUrl+"urunlistele/")
}
UrunById(urunID:number){
  return this.http.get<Urun>(this.apiUrl+"urunbyıd/"+ urunID)
}
UrunOlustur(urun:Urun){
  return this.http.post(this.apiUrl+"urunolustur/",urun)
}
UrunDuzenle(urun:Urun){
  return this.http.put(this.apiUrl+"urunduzenle/",urun)
}
UrunSil(urunID:string){
  return this.http.delete(this.apiUrl+"urunsil/"+ urunID)
}

UrunUyeListe(urunID:string){
  return this.http.get<Urun[]>(this.apiUrl+ "urunuyeliste/"+urunID)
}
UrunListeGorsel(urunID:string){
  return this.http.get(this.apiUrl+ "urunlistegorsel/"+this.UrunListeGorsel )
}


// UrunFotoGuncelle(ogrFoto: OgrFoto) {
//   return this.http.post<Sonuc>(this.apiUrl + "api/ogrfotoguncelle", ogrFoto);
// }
//ürün servisleri
//üye servisleri
  UyeListele(){
  return this.http.get(this.apiUrl+"uyelistele/ ")
  }

  UrunListe() {
    return this.http.get<Urun[]>(this.apiUrl + "api/urunlistele");
  }
  UyeById(uyeID:string){
    return this.http.get<Urun[]>(this.apiUrl+"uyegetir/"+ uyeID)
  }
  UyeOlustur(uye:Uye){
    return this.http.post(this.apiUrl+"uyeolustur/",uye)
  }
  UyeDuzenle(uye:Uye){
    return this.http.put(this.apiUrl+"uyeduzenle/",uye)
  }
  UyeSil(uyeID:string){
    return this.http.delete(this.apiUrl+"uyesil/"+ uyeID)
  }  
  UyeUrunListe(uyeID:string){
    return this.http.get(this.apiUrl+ "uyeurunliste/"+uyeID)
  }
//üye servisleri
//kategori servisleri
  KategoriListele(){
    return this.http.get(this.apiUrl+"kategorilistele/")
    }
    KategoriById(kategoriID:string){
      return this.http.get(this.apiUrl+"kategorigetir/" + kategoriID)
    }
    KategoriOlustur(kategori:Kategori){
      return this.http.post(this.apiUrl+"kategoriolustur/",kategori)
    }
    KategoriDuzenle(kategori:Kategori){
      return this.http.put(this.apiUrl+"kategoriduzenle/",kategori)
    }
    KategoriSil(kategoriID:string){
      return this.http.delete(this.apiUrl+"kategorisil/"+ kategoriID)
    }
    KategoriUrunListe(kategoriID:string){
      return this.http.get<Kategori[]>(this.apiUrl+ "kategoriurunliste/"+ kategoriID )
    }
  
//kategori servisleri
//marka servisleri
  MarkaListele(){
    return this.http.get(this.apiUrl+"markalistele/")
    }
    MarkaById(markaID:string){
      return this.http.get(this.apiUrl + "markabyid/"+ markaID)
    }
    MarkaOlustur(marka:Marka){
      return this.http.post(this.apiUrl+"markaolustur/",marka)
    }
    MarkaDuzenle(marka:Marka){
      return this.http.put(this.apiUrl+"markaduzenle/",marka)
    }
    MarkaSil(markaID:string){
      return this.http.delete(this.apiUrl+"markasil/"+ markaID)
    }
    MarkaUrunListe(markaID:string){
      return this.http.get<Marka[]>(this.apiUrl + "markaurunlistele/" + markaID)
    }
//marka servisleri
//favori servisleri
FavoriListele(){
  return this.http.get(this.apiUrl+"favorilistele/")
  }
  FavoriById(favoriID:string){
    return this.http.get(this.apiUrl+"favoribyıd/"+ favoriID)
  }
  FavoriOlustur(favori:Favori){
    return this.http.post(this.apiUrl+"favoriolustur/",favori)
  }
  FavoriDuzenle(favori:Favori){
    return this.http.put(this.apiUrl+"favoriduzenle/",favori)
  }
  FavoriSil(favoriID:string){
    return this.http.delete(this.apiUrl+"favorisil/"+ favoriID)
  }  
  FavoriUrunListe(favoriID:string){
    return this.http.get<Favori[]>(this.apiUrl + "favoriurunlistele/" + favoriID)
  } 
  FavoriKayitEkle(kayit:Favori){
  return this.http.post(this.apiUrl+"kayitekle", kayit);
  }
//favori servisleri
//sepet servisleri
  SepetListele(){
  return this.http.get(this.apiUrl+"sepetlistele/")
  }
  SepetById(sepetID:string){
    return this.http.get(this.apiUrl+"sepeturunlerbysepetid/"+ sepetID)
  }
  SepetOlustur(sepet:Sepet){
    return this.http.post(this.apiUrl+"sepetolustur/",sepet)
  }
  SepetDuzenle(sepet:Sepet){
    return this.http.put(this.apiUrl+"sepetduzenle/",sepet)
  }
  SepetUrunSil(sepetID:string){
    return this.http.delete(this.apiUrl+"sepeturunsil/"+ sepetID)
  }
  SepetUrunListe(sepetID: string) {
    return this.http.get<Sepet[]>(this.apiUrl + "sepeturunliste/" + sepetID);
  } 
  //sepet servisleri 
  //oturum servisleri
  TokenAl(email:String,sifre:string){
    var data = "username=" + email + "&password=" + sifre + "&grant_type=password"; 
    var reqHeader = new HttpHeaders({"Content-Type":"application/x-www-form-urlencoded"});

    return this.http.post(this.apiUrl + "token" , data , {headers:reqHeader});
  }
  OturumKontrol(){
    if(localStorage.getItem("token")){
      return true;
    }
    else{
      return false;
    }
  }





  //oturum servisleri
}
