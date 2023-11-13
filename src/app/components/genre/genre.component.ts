import { Component, HostListener } from '@angular/core';
import { MediaType } from 'src/app/interfaces/types';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';

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

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      console.log(JSON.stringify(params));
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
        console.log(data);
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
          console.log('Loading media');
          console.log(data);
          this.dataInfo = this.dataInfo.concat(data.results);
          console.log('Data loaded');
          console.log(this.dataInfo);
        },
        (error) => {
          console.log(error);
        }
      );
  }

  @HostListener('scroll', ['$event.target'])
  onScroll(elem: any) {
    if (elem.offsetHeight + elem.scrollTop >= elem.scrollHeight) {
      console.log("It's Lit");
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
