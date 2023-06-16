import { KategorilisteleComponent } from './components/kategorilistele/kategorilistele.component';
import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { UyeComponent } from './components/uye/uye.component';
import { UrunComponent } from './components/urun/urun.component';
import { SepetComponent } from './components/sepet/sepet.component';
import { FavoriComponent } from './components/favori/favori.component';
import { MarkaComponent } from './components/marka/marka.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { UrunlisteleComponent } from './components/urunlistele/urunlistele.component';
import { UyelisteleComponent } from './components/uyelistele/uyelistele.component';
import { MarkalisteleComponent } from './components/markalistele/markalistele.component';
import { SepetlisteleComponent } from './components/sepetlistele/sepetlistele.component';
import { FavorilisteleComponent } from './components/favorilistele/favorilistele.component';
import { LoginComponent } from './components/login/login.component';

const routes: Routes = [
  {
    path:'',
    component:HomeComponent
  },
  {
    path:'uye',
    component:UyeComponent
  },
  {
    path:'urun',
    component:UrunComponent
  },
  {
    path:'sepet',
    component:SepetComponent
  },
  {
    path:'favori',
    component:FavoriComponent
  },
  {
    path:'marka',
    component:MarkaComponent
  },
  {
    path:'kategori',
    component:KategoriComponent
  },
  {
    path:'kategorilistele/:kategoriID',
    component:KategorilisteleComponent
  },
  {
    path:'urunlistele/:urunID',
    component:UrunlisteleComponent
  },
  {
    path:'uyelistele/:uyeID',
    component:UyelisteleComponent
  },
  {
    path:'markalistele/:markaID',
    component:MarkalisteleComponent
  },
  {
    path:'sepetlistele/:sepetID',
    component:SepetlisteleComponent
  },
  {
    path:'favorilistele/:favoriID',
    component:FavorilisteleComponent
  },
  {
    path:'login',
    component:LoginComponent
  },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
