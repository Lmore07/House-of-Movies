import { Component, HostListener } from '@angular/core';
import { Router } from '@angular/router';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent {
  fagraduation = iconos.faGraduationCap;
  faHome = iconos.faHome;
  faMovie = iconos.faFilm;
  faSerie = iconos.faTelevision;
  faSearch=iconos.faSearch;
  indice: number = 0;
  isCollapsed = false;

  title = 'cinema';
  constructor(public ruta: Router) {}

  ngOnInit(){

  }

  @HostListener('window:resize')
  onResize() {
    this.checkWidth();
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

  toggleSidebar() {
    this.isCollapsed = !this.isCollapsed;
  }

  cambiarIndice(indice: number) {
    this.indice = indice;
    switch (indice) {
      case 0:
        this.ruta.navigateByUrl('home');
        break;
      case 1:
        this.ruta.navigateByUrl('movies');
        break;
      case 2:
        this.ruta.navigateByUrl('series');
        break;
      case 3:
        this.ruta.navigateByUrl('search');
        break;
    }
  }
}
