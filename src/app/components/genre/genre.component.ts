import { Component, HostListener } from '@angular/core';
import { MediaType } from 'src/app/interfaces/types';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-genre',
  templateUrl: './genre.component.html',
  styleUrls: ['./genre.component.css'],
})
export class GenreComponent {
  type!: MediaType;
  idGenre!: number;
  genreTitle!: string;
  page = 1;
  maxPages!: number;
  dataInfo!: any[];
  faStarOutline = iconos.faStar;
  throttle = 50;
  scrollDistance = 1;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private loadingService: LoadingService,
    private router: Router,
    private infoService: InformationService
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.type = params.get('type')! as MediaType;
      if (this.type == 'serie') {
        this.type = 'tv';
      }
      this.idGenre = Number.parseInt(params.get('id')!);
      this.loadData(this.page);
      this.getGenres();
    });
  }

  getGenres() {
    this.infoService.getGenresByType(this.type).subscribe(
      (data) => {
        this.genreTitle = data.genres.filter(
          (objeto: any) => objeto.id == this.idGenre
        )[0].name;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadData(page: number = 1) {
    this.infoService.getMediaByGenre(this.idGenre, this.type, page).subscribe(
      (data) => {
        this.dataInfo = data.results;
        this.maxPages = data.total_pages;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadMorePages() {
    this.infoService
      .getMediaByGenre(this.idGenre, this.type, this.page)
      .subscribe(
        (data) => {
          this.dataInfo = this.dataInfo.concat(data.results);
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

  getImage(image: string) {
    return this.infoService._fetchImage(image, 200, 300);
  }

  goToVideoDetail(video: any) {
    this.router.navigateByUrl(
      this.type == 'movie' ? 'movie' : 'serie' + '/' + video.id
    );
  }

  maxStars = 5;

  getStars(vote: number) {
    const stars = Math.round((this.maxStars / 10) * vote);
    return stars;
  }
}
