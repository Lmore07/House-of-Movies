import { Component, ElementRef, HostListener, Input, ViewChild } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { InformationService } from 'src/app/services/information.service';
import { register } from 'swiper/element/bundle';
register();

@Component({
  selector: 'app-slider-person',
  templateUrl: './slider-person.component.html',
  styleUrls: ['./slider-person.component.css'],
})
export class SliderPersonComponent {
  /*Vector de prueba*/
  @Input() carouselExample: string = '';
  @Input() arrayVideosDetail1: any[] = [];
  @Input() location: string = '';
  @Input() videoTitle: string = 'Videos';
  @ViewChild('cardsContainer') cardsContainer!: ElementRef;
  faAngleLeft = iconos.faChevronLeft;
  faAngleRight = iconos.faChevronRight;
  constructor(private infoService: InformationService, private ruta: Router) {}

  ngOnInit() {
    this.checkWidth();
  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
  }

  checkWidth() {
    const width = window.innerWidth;
    const swiperEl = document.getElementById('swiper-person');

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

  goToVideoDetail(video: any) {
    this.ruta.navigateByUrl('person/' + video.id);
  }
}
