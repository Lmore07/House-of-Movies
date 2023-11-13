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
    console.log('Loading videos API 1');
    console.log(this.data.link);
    let url = this.data.link.url.slug
      .replace('series', 'serie')
      .replace('seasons', 'temporada')
      .replace('episodes', 'episodio');
      console.log(url);
    this.viewService.viewAndDownloadSerie(url).subscribe(
      (data) => {
        this.videosApi1=data.pageProps.episode.videos
        console.log(this.videosApi1)
        this.videoSelected=this.videosApi1.latino[0].result
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadVideosApiTwo() {
    console.log('Loading videos API 2');
    console.log(this.data);
    this.videos = this.data.link.embeds;
    this.videosLatino = this.videos.filter(
      (objeto) => objeto.audio == 'LATINO'
    );
    console.log(this.videosLatino);
    this.videosEnglish = this.videos.filter(
      (objeto) => objeto.audio == 'INGLES'
    );
    console.log(this.videosEnglish);
    this.videosSpanish = this.videos.filter(
      (objeto) => objeto.audio == 'ESPAÑOL'
    );
    this.videoSelected = this.videosLatino[0].url;
    console.log(this.videoSelected);
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
