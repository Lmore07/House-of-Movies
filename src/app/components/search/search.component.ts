import { Component, HostListener } from '@angular/core';
import { MediaType } from 'src/app/interfaces/types';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';
import { Subject, debounceTime } from 'rxjs';

@Component({
  selector: 'app-search',
  templateUrl: './search.component.html',
  styleUrls: ['./search.component.css'],
})
export class SearchComponent {
  query!: string;
  page = 1;
  maxPages!: number;
  dataInfo!: any[];
  private searchSubject = new Subject<string>();
  faStarOutline = iconos.faStar;
  throttle = 50;
  scrollDistance = 1;
  faSearch = iconos.faSearch;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService
  ) {}

  ngOnInit() {
    this.searchSubject.pipe(debounceTime(500)).subscribe((searchTerm) => {
      this.loadData(1);
    });
  }

  loadData(page: number = 1) {
    this.infoService.searchMedia(this.query, page).subscribe(
      (data) => {
        this.dataInfo = data.results;
        this.maxPages = data.total_pages;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  @HostListener('scroll', ['$event.target'])
  onScroll(elem: any) {
    if (elem.offsetHeight + elem.scrollTop >= elem.scrollHeight) {
      this.page++;
      this.loadMorePages();
    }
  }

  @HostListener('document:keyup', ['$event'])
  handleKeyboardEvent(event: KeyboardEvent) {
    if (event.target instanceof HTMLInputElement) {
      if (this.query !== null && this.query != '' && this.query != undefined) {
        this.searchSubject.next(this.query);
      }
    }
  }

  loadMorePages() {
    this.infoService.searchMedia(this.query, this.page).subscribe(
      (data) => {
        this.dataInfo = this.dataInfo.concat(data.results);
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImage(image: string) {
    return this.infoService._fetchImage(image, 200, 300);
  }

  goToVideoDetail(video: any) {
    console.log(
      (video.media_type == 'movie'
        ? 'movie'
        : video.media_type == 'tv'
        ? 'serie'
        : 'person') +
        '/' +
        video.id
    );
    this.router.navigateByUrl(
      (video.media_type == 'movie'
        ? 'movie'
        : video.media_type == 'tv'
        ? 'serie'
        : 'person') +
        '/' +
        video.id
    );
  }

  maxStars = 5;

  getStars(vote: number) {
    const stars = Math.round((this.maxStars / 10) * vote);
    return stars;
  }
}
