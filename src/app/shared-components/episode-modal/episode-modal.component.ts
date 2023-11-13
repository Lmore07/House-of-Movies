import { ViewService } from 'src/app/services/view.service';
import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';
import * as iconos from '@fortawesome/free-solid-svg-icons';

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
    private viewService: ViewService
  ) {}

  faDropwdown = iconos.faChevronDown;
  videosLatino!: any;
  videosEnglish!: any;
  videosJapanese!: any;
  videosSpanish!: any;
  videos: video[] = [];
  videosApi1!: any;
  videoSelected!: string;

  ngOnInit() {
    if (this.data.api == 'One') {
      this.loadVideosApiOne();
    } else if (this.data.api == 'Two') {
      this.loadVideosApiTwo();
    }
  }

  loadVideosApiOne() {
    let url = this.data.link.url.slug
      .replace('series', 'serie')
      .replace('seasons', 'temporada')
      .replace('episodes', 'episodio');
    this.viewService.viewAndDownloadSerie(url).subscribe(
      (data) => {
        this.videosApi1=data.pageProps.episode.videos
        this.videoSelected=this.videosApi1.latino[0].result
      },
      (error) => {
        console.log(error);
      }
    );
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
    this.videoSelected = this.videosLatino[0].url;
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
    this.videoSelected = url;
  }
}
