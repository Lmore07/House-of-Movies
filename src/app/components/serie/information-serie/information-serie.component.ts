import { Component, OnDestroy, OnInit } from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { DomSanitizer } from '@angular/platform-browser';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';
import { ViewService } from 'src/app/services/view.service';
import { MatDialog } from '@angular/material/dialog';
import { WatchVideoInfoComponent } from 'src/app/shared-components/watch-video-info/watch-video-info.component';
import { WatchImageComponent } from 'src/app/shared-components/watch-image/watch-image.component';

@Component({
  selector: 'app-information-serie',
  templateUrl: './information-serie.component.html',
  styleUrls: ['./information-serie.component.css'],
})
export class InformationSerieComponent implements OnDestroy, OnInit {
  serieId!: number;
  recommendations!: any[];
  infoSerie: any;
  faDropwdown = iconos.faChevronDown;
  videos!: any;
  download!: any;
  api = 'One';
  videoSelected!: string;
  seasons!: [];
  faPlay = iconos.faPlay;
  faEye = iconos.faEye;

  selectOverview: boolean = true;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService,
    private viewService: ViewService,
    public dialog: MatDialog,
    private sanitizer: DomSanitizer
  ) {}

  ngOnDestroy(): void {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.recommendations = [];
      this.api = 'One';
      this.videos = [];
      this.seasons = [];
      this.infoSerie = null;
      this.videoSelected = '';
      this.serieId = Number.parseInt(params.get('id')!);
      this.getInfoSerie();
      this.getRecommended();
    });
  }

  safeUrl(url: string) {
    return this.sanitizer.bypassSecurityTrustResourceUrl(url);
  }

  getImage(image: string, width: number, height: number) {
    return this.infoService._fetchImage(image, width, height);
  }

  cleanString(str: string) {
    let cadenaSinEspeciales = str
      .toLowerCase()
      .replace(/[^a-zA-Z0-9áéíóúÁÉÍÓÚüÜ\s]/g, '')
      .replace(/\s+/g, ' ')
      .normalize('NFD')
      .replace(/[\u0300-\u036f]/g, '')
      .replaceAll(' ', '-');
    return cadenaSinEspeciales;
  }

  changeTab(event: any) {
    if (event.index != 0) {
      this.selectOverview = false;
    } else {
      this.selectOverview = true;
    }
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


  getImageVideo(video: any) {
    return this.infoService.getImageYoutube(video.key, 400, 600);
  }

  getSeasonsSerie() {
    this.viewService
      .getSerieInfo(this.serieId, this.cleanString(this.infoSerie.name))
      .subscribe(
        (data) => {
          this.api = 'One';
          this.seasons = data.pageProps.thisSerie.seasons;
        },
        (error) => {
          console.log(error);
          this.viewService
            .getSerieInfo(
              this.serieId,
              this.cleanString(this.infoSerie.original_name)
            )
            .subscribe(
              (data) => {
                this.api = 'One';
                this.seasons = data.pageProps.thisSerie.seasons;
              },
              (error) => {
                console.log(error);
                this.viewService
                  .getMovieAndSerieInfo2(
                    this.cleanString(this.infoSerie.original_name)
                  )
                  .subscribe(
                    (data) => {
                      this.viewService
                        .getEpisodes2(data.data.info._id)
                        .subscribe(
                          (data) => {
                            this.api = 'Two';
                            this.seasons = data.data;
                          },
                          (error) => {
                            console.log(error);
                          }
                        );
                    },
                    (error) => {
                      console.log(error);
                    }
                  );
              }
            );
        }
      );
  }

  getInfoSerie() {
    this.infoService.getInfoMovieSerie('tv', this.serieId).subscribe(
      (data) => {
        this.infoSerie = data;
        this.getSeasonsSerie();
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getRecommended() {
    this.infoService.getRecommendations('tv', this.serieId, 1).subscribe(
      (data) => {
        this.recommendations = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  changeServer(url: string) {
    this.videoSelected = url;
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
}
