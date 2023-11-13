import * as iconos from '@fortawesome/free-solid-svg-icons';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  OnInit,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { InformationService } from 'src/app/services/information.service';
import { Router } from '@angular/router';
import { ViewService } from 'src/app/services/view.service';
import { MatDialog } from '@angular/material/dialog';
import { EpisodeModalComponent } from '../episode-modal/episode-modal.component';

@Component({
  selector: 'app-slider-seasons',
  templateUrl: './slider-seasons.component.html',
  styleUrls: ['./slider-seasons.component.css'],
})
export class SliderSeasonsComponent implements OnChanges, OnInit {
  @Input() seasons: any[] = [];
  @Input() infoSeasons: any[] = [];
  @Input() api: string = '';
  @Input() videoTitle: string = 'Temporadas';
  faStarOutline = iconos.faStar;
  combinedArray: any[] = [];
  selectSeasonTwo!: any;
  stringSeasonTwo: string = '';
  selectSeasonOne!: any;
  stringSeasonOne: string = '';
  lastImage2: string = '';
  constructor(
    private infoService: InformationService,
    private route: Router,
    private viewService: ViewService,
    public dialog: MatDialog
  ) {}

  goToView(episode: any) {
    console.log(episode);
    this.dialog.open(EpisodeModalComponent, {
      data: {
        link: episode,
        api: this.api,
      },
    });
  }

  ngOnChanges(changes: SimpleChanges): void {
    this.checkWidth();
    this.combinedArray = [];
    console.log(this.infoSeasons);
    for (let i = 0; i < this.infoSeasons.length; i++) {
      this.combinedArray.push({
        view: this.seasons[i],
        info: this.infoSeasons[i],
      });
    }
    console.log(this.combinedArray);
    if (this.api == 'One') {
      this.selectSeasonOne = this.combinedArray[0].view.episodes;
      this.stringSeasonOne = this.combinedArray[0].info.name;
    } else if (this.api == 'Two') {
      this.selectSeasonTwo = this.combinedArray[0].view;
      this.stringSeasonTwo = this.combinedArray[0].info.name;
    }
  }

  ngOnInit() {
    this.combinedArray = [];
    for (let i = 0; i < this.infoSeasons.length; i++) {
      this.combinedArray.push({
        view: this.seasons[i],
        info: this.infoSeasons[i],
      });
    }
    this.checkWidth();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }

  checkWidth() {
    const width = window.innerWidth;
    const swiperEl = document.getElementById('seasonSlider');
    if (width >= 1200) {
      swiperEl?.setAttribute('slides-per-view', '5');
    } else if (width >= 768) {
      swiperEl?.setAttribute('slides-per-view', '4');
    } else if (width >= 560) {
      swiperEl?.setAttribute('slides-per-view', '3');
    } else {
      swiperEl?.setAttribute('slides-per-view', '2');
    }
  }

  getImage(image: string) {
    return this.infoService._fetchImage(image, 200, 300);
  }

  getImage2Episode(image: string) {
    if (image != '' && image != null && image != undefined) {
      this.lastImage2 = image;
      return this.viewService.getImage2(this.lastImage2);
    }
    return this.viewService.getImage2(this.lastImage2);
  }

  goToSeason(season: any) {
    if (this.api == 'One') {
      this.selectSeasonOne = season.view.episodes;
      this.stringSeasonOne = season.info.name;
    } else if (this.api == 'Two') {
      this.selectSeasonTwo = season.view;
      this.stringSeasonTwo = season.info.name;
    }
  }
}
