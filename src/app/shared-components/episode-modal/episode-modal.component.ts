import { ViewService } from 'src/app/services/view.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA, MatDialog } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { DownloadComponent } from '../download/download.component';

interface video {
  audio: string;
  audio_key: string;
  domain: string;
  quality: string;
  server: string;
  url: string;
}

@Component({
  selector: 'app-episode-modal',
  templateUrl: './episode-modal.component.html',
  styleUrls: ['./episode-modal.component.css'],
})
export class EpisodeModalComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog,
    private viewService: ViewService
  ) { }

  faDropwdown = iconos.faChevronDown;
  videosLatino!: any;
  videosEnglish!: any;
  videosJapanese!: any;
  videosSpanish!: any;
  videos: video[] = [];
  videosApi1!: any;
  videoSelected!: string;
  faDownload = iconos.faDownload;
  download: any[] = [];

  ngOnInit() {
    if (this.data.api == 'One') {
      this.loadVideosApiOne();
    } else if (this.data.api == 'Two') {
      this.loadVideosApiTwo();
    }
  }

  loadVideosApiOne() {
    console.log(this.data.link);
    let url = this.data.link.url.slug
      .replace('series', 'serie')
      .replace('movies', 'serie')
      .replace('seasons', 'temporada')
      .replace('episodes', 'episodio');
    this.viewService.viewAndDownloadSerie(url).subscribe(
      (data) => {
        this.videosApi1 = data.pageProps.episode.videos;
        this.download = data.pageProps.episode.videos;
        this.videoSelected = this.returnCorsProxy(this.videosApi1.latino[0].result);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  returnCorsProxy(url: string) {
    return 'https://corsproxy.io/?' + encodeURIComponent(`${url}`);
  }

  goToDownload() {
    const combinedArray = Object.entries(this.download).reduce(
      (accumulator, [language, currentArray]) => {
        const arrayWithLanguage = currentArray.map((obj: any) => ({
          ...obj,
          language: language,
        }));
        return accumulator.concat(arrayWithLanguage);
      },
      []
    );

    console.log(combinedArray);
    this.dialog.open(DownloadComponent, {
      data: {
        download: combinedArray,
      },
    });
  }

  loadVideosApiTwo() {
    this.videos = this.data.link.embeds;
    this.videosLatino = this.videos.filter(
      (objeto) => objeto.audio == 'LATINO'
    );
    this.videosEnglish = this.videos.filter(
      (objeto) => objeto.audio == 'INGLES'
    );
    this.videosSpanish = this.videos.filter(
      (objeto) => objeto.audio == 'ESPAÑOL'
    );
    this.videoSelected = this.returnCorsProxy(this.videosLatino[0].url);
  }

  safeUrl(url: string) {
    try {
      return this.sanitizer.bypassSecurityTrustResourceUrl(url);
    } catch (error) {
      console.log(error);
      return '';
    }
  }

  changeServer(url: string) {
    this.videoSelected = this.returnCorsProxy(url);
  }
}
