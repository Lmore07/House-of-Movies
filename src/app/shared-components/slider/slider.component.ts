import { InformationService } from 'src/app/services/information.service';
import {
  Component,
  ElementRef,
  HostListener,
  Input,
  ViewChild,
} from '@angular/core';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { register } from 'swiper/element/bundle';
import { Router } from '@angular/router';
register();

@Component({
  selector: 'app-slider',
  templateUrl: './slider.component.html',
  styleUrls: ['./slider.component.css'],
})
export class SliderComponent {
  /*Vector de prueba*/
  @Input() carouselExample: string = '';
  @Input() arrayVideosDetail1: any[] = [];
  @Input() location: string = '';
  @Input() videoTitle: string = 'Videos';
  @Input() query: string = '';

  faAngleLeft = iconos.faChevronLeft;
  faAngleRight = iconos.faChevronRight;
  faStarOutline = iconos.faStar;
  constructor(private infoService: InformationService, private ruta: Router) {}

  ngOnInit() {
    this.checkWidth();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }

  goToCategory() {
    return '/movie/category/' + this.query;
  }

  checkWidth() {
    const width = window.innerWidth;
    const swiperEl = document.querySelectorAll('swiper-container');
    swiperEl.forEach((object) => {
      if (width >= 1200) {
        object?.setAttribute('slides-per-view', '4');
      } else if (width >= 768) {
        object?.setAttribute('slides-per-view', '3');
      } else if (width >= 560) {
        object?.setAttribute('slides-per-view', '2');
      } else {
        object?.setAttribute('slides-per-view', '1');
      }
    });
  }

  getImage(image: string) {
    return this.infoService._fetchImage(image, 200, 300);
  }

  goToVideoDetail(video: any) {
    this.ruta.navigateByUrl('/', { skipLocationChange: true }).then(() => {
      this.ruta.navigate(['/movie', video.id]);
    });
  }

  maxStars = 5;

  getStars(vote: number) {
    const stars = Math.round((this.maxStars / 10) * vote);
    return stars;
  }
}
