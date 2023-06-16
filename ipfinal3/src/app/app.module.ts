import { UrunDialogComponent } from './components/dialogs/urun-dialog/urun-dialog.component';
import { ConfirmDialogComponent } from './components/dialogs/confirm-dialog/confirm-dialog.component';
import { NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { HomeComponent } from './components/home/home.component';
import { MaterialModule } from './material.module';
import { AlertDialogComponent } from './components/dialogs/alert-dialog/alert-dialog.component';
import { MyAlertService } from './services/myAlert.service';
import { HttpClientModule } from '@angular/common/http';
import { MainNavComponent } from './components/main-nav/main-nav.component';
import { UyeComponent } from './components/uye/uye.component';
import { UrunComponent } from './components/urun/urun.component';
import { SepetComponent } from './components/sepet/sepet.component';
import { FavoriComponent } from './components/favori/favori.component';
import { MarkaComponent } from './components/marka/marka.component';
import { KategoriComponent } from './components/kategori/kategori.component';
import { ReactiveFormsModule } from '@angular/forms';
import { UyeDialogComponent } from './components/dialogs/uye-dialog/uye-dialog.component';
import { FavoriDialogComponent } from './components/dialogs/favori-dialog/favori-dialog.component';
import { KategoriDialogComponent } from './components/dialogs/kategori-dialog/kategori-dialog.component';
import { MarkaDialogComponent } from './components/dialogs/marka-dialog/marka-dialog.component';
import { SepetDialogComponent } from './components/dialogs/sepet-dialog/sepet-dialog.component';
import { UrunlisteleComponent } from './components/urunlistele/urunlistele.component';
import { UyelisteleComponent } from './components/uyelistele/uyelistele.component';
import { FavorilisteleComponent } from './components/favorilistele/favorilistele.component';
import { MarkalisteleComponent } from './components/markalistele/markalistele.component';
import { KategorilisteleComponent } from './components/kategorilistele/kategorilistele.component';
import { FotoDialogComponent } from './components/dialogs/foto-dialog/foto-dialog.component';
import { SepetlisteleComponent } from './components/sepetlistele/sepetlistele.component';
import { UrunsecDialogComponent } from './components/dialogs/urunsec-dialog/urunsec-dialog.component';
import { UysecDialogComponent } from './components/dialogs/uysec-dialog/uysec-dialog.component';
import { FavorisecDialogComponent } from './components/dialogs/favorisec-dialog/favorisec-dialog.component';
import { MarkasecDialogComponent } from './components/dialogs/markasec-dialog/markasec-dialog.component';
import { SepetsecDialogComponent } from './components/dialogs/sepetsec-dialog/sepetsec-dialog.component';
import {MatToolbarModule} from '@angular/material/toolbar'; 
import { KategorisecDialogComponent } from './components/dialogs/kategorisec-dialog/kategorisec-dialog.component';
import { ListegorselyukleDialogComponent } from './components/dialogs/listegorselyukle-dialog/listegorselyukle-dialog.component';
import { LoginComponent } from './components/login/login.component';
import {MatMenuModule} from '@angular/material/menu';


@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MainNavComponent,
    UyeComponent,
    UrunComponent,
    SepetComponent,
    FavoriComponent,
    MarkaComponent,
    KategoriComponent,
    UrunlisteleComponent,
    UyelisteleComponent,
    FavorilisteleComponent,
    MarkalisteleComponent,
    KategorilisteleComponent,
    SepetlisteleComponent,
    LoginComponent,
    
  

    //dialoglar
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    UyeDialogComponent,
    FavoriDialogComponent,
    KategoriDialogComponent,
    MarkaDialogComponent,
    SepetDialogComponent,
    UysecDialogComponent,
    FavorisecDialogComponent,
    KategorisecDialogComponent,
    MarkasecDialogComponent,
    UrunsecDialogComponent,
    SepetsecDialogComponent,
    ListegorselyukleDialogComponent,

  ],
  imports: [
    BrowserModule,
    AppRoutingModule,
    BrowserAnimationsModule,
    MaterialModule,
    HttpClientModule,
    ReactiveFormsModule,
    
    
    
  ],
  entryComponents:[
    AlertDialogComponent,
    ConfirmDialogComponent,
    UrunDialogComponent,
    FavoriDialogComponent,
    MarkaDialogComponent,
    SepetDialogComponent,
    KategoriDialogComponent,
    UyeDialogComponent,
    ListegorselyukleDialogComponent,
    
  ],
  providers: [MyAlertService],
  bootstrap: [AppComponent]
})
export class AppModule { }
