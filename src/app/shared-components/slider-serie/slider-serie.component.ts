import {
  Component,
  ElementRef,
  HostListener,
  Input,
  OnChanges,
  SimpleChanges,
  ViewChild,
} from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { InformationService } from 'src/app/services/information.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-slider-serie',
  templateUrl: './slider-serie.component.html',
  styleUrls: ['./slider-serie.component.css'],
})
export class SliderSerieComponent implements OnChanges {
  /*Vector de prueba*/
  @Input() carouselExample: string = '';
  @Input() arrayVideosDetail2: any[] = [];
  @Input() location: string = '';
  @Input() videoTitle: string = 'Videos';
  @Input() query: string = '';

  faAngleLeft = iconos.faChevronLeft;
  faAngleRight = iconos.faChevronRight;
  faStarOutline = iconos.faStar;

  // swiper parameters

  constructor(private infoService: InformationService, private route: Router) {}

  ngOnChanges(changes: SimpleChanges): void {
    this.checkWidth();
  }

  ngOnInit() {
    this.checkWidth();
  }

  goToCategory() {
    return '/serie/category/' + this.query;
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }

  checkWidth() {
    const width = window.innerWidth;
    const swiperEl = document.getElementById('serieSlider');
    if (width >= 1200) {
      swiperEl?.setAttribute('slides-per-view', '4');
    } else if (width >= 768) {
      swiperEl?.setAttribute('slides-per-view', '3');
    } else if (width >= 560) {
      swiperEl?.setAttribute('slides-per-view', '2');
    } else {
      swiperEl?.setAttribute('slides-per-view', '1');
    }
  }

  getImage(image: string) {
    return this.infoService._fetchImage(image, 200, 300);
  }

  maxStars = 5;

  getStars(vote: number) {
    const stars = Math.round((this.maxStars / 10) * vote);
    return stars;
  }

  goToVideoDetail(video: any) {
    this.route.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.route.navigate(['/serie', video.id]);
    });
  }
}
