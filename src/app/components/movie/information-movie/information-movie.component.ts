import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';
import { ViewService } from 'src/app/services/view.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { MatDialog } from '@angular/material/dialog';
import { WatchVideoInfoComponent } from 'src/app/shared-components/watch-video-info/watch-video-info.component';
import { WatchImageComponent } from 'src/app/shared-components/watch-image/watch-image.component';

@Component({
  selector: 'app-information-movie',
  templateUrl: './information-movie.component.html',
  styleUrls: ['./information-movie.component.css'],
})
export class InformationMovieComponent {
  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService,
    private viewService: ViewService,
    private sanitizer: DomSanitizer,
    public dialog: MatDialog
  ) {}

  movieId!: number;
  recommendations!: any[];
  movieInfo: any;
  faDropwdown = iconos.faChevronDown;
  videos!: any;
  faPlay = iconos.faPlay;
  download!: any;
  videoSelected!: string;
  selectOverview: boolean = true;
  faEye = iconos.faEye;

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.movieId = Number.parseInt(params.get('id')!);
      this.loadMovie();
      this.getRecommended();
      this.getViewAndDownload();
    });
  }

  goToVideo(id: string) {
    this.dialog.open(WatchVideoInfoComponent, {
      data: {
        url: id,
      },
    });
  }

  goToImage(id: string) {
    this.dialog.open(WatchImageComponent, {
      data: {
        url: id,
      },
    });
  }


  getImage(image: string, width: number, height: number) {
    return this.infoService._fetchImage(image, width, height);
  }

  getImageVideo(video: any) {
    return this.infoService.getImageYoutube(video.key, 400, 600);
  }

  changeTab(event: any) {
    if (event.index != 0) {
      this.selectOverview = false;
    } else {
      this.selectOverview = true;
    }
  }

  getViewAndDownload() {
    this.viewService.viewAndDownloadMovie(this.movieId).subscribe(
      (data) => {
        this.videos = data.pageProps.thisMovie.videos;
        this.videoSelected = this.videos.latino[0].result;
        this.download = data.pageProps.thisMovie.downloads;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeServer(url: string) {
    this.videoSelected = url;
  }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  formatMoney(amount: number) {
    return new Intl.NumberFormat('en-US', {
      style: 'currency',
      currency: 'USD',
    }).format(amount);
  }

  formatDate(date: string) {
    const d = new Date(date);
    const day = d.getDate() + 1;
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
  }

  convertMinsToHoursMins(mins: number) {
    let hours = Math.floor(mins / 60);
    let minutes = mins % 60;
    return `${hours}h ${minutes}min`;
  }

  findDirectors(people: any[]) {
    return people.filter((person) => {
      return person.job === 'Director';
    });
  }

  loadMovie() {
    this.infoService.getInfoMovieSerie('movie', this.movieId).subscribe(
      (data) => {
        this.movieInfo = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRecommended() {
    this.infoService.getRecommendations('movie', this.movieId, 1).subscribe(
      (data) => {
        this.recommendations = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
