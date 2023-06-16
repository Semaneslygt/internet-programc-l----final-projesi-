import { DecimalPipe } from "@angular/common";

export class Urun{
    urunID!: string;   
    kategoriId:number | undefined;
    markaID!:number ;
    urunAdi!:string;
    urunAciklama :string |undefined;
    listeGorsel!: string;
    stok: number |undefined;
    gelisFiyati: DecimalPipe|undefined;
    satisFiyati: DecimalPipe |undefined;
    kdvOran: number |undefined;
    satilanAdet: number |undefined;
    olusturmaTarih: Date |undefined;
    guncellemeTarih:Date |undefined;
    uyeID!: string;
    urunBilgi!:Urun;

}