import { Component, HostListener } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { MediaType } from 'src/app/interfaces/types';
import { InformationService } from 'src/app/services/information.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';
import { LoadingService } from 'src/app/services/loading.service';

@Component({
  selector: 'app-category',
  templateUrl: './category.component.html',
  styleUrls: ['./category.component.css'],
})
export class CategoryComponent {
  type!: MediaType;
  query!: string;
  page = 1;
  maxPages!: number;
  dataInfo!: any[];
  faStarOutline = iconos.faStar;
  throttle = 50;
  scrollDistance = 1;
  loading = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private loadingService: LoadingService,
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
      this.query = params.get('query')!;
      this.loadData(this.page);
    });
  }

  loadData(page: number = 1) {
    this.infoService.listMedia(this.type, this.query, page).subscribe(
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
    this.infoService.listMedia(this.type, this.query, this.page).subscribe(
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
    if (elem.offsetHeight + elem.scrollTop >= elem.scrollHeight - 1) {
      this.page++;
      this.loadMorePages();
    }
  }

  getImage(image: string) {
    return this.infoService._fetchImage(image, 200, 300);
  }

  goToVideoDetail(video: any) {
    this.router.navigateByUrl(
      (this.type == 'movie' ? 'movie' : 'serie') + '/' + video.id
    );
  }

  maxStars = 5;

  getStars(vote: number) {
    const stars = Math.round((this.maxStars / 10) * vote);
    return stars;
  }
}
