import { Component, HostListener, Input, Output } from '@angular/core';
import { Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';
import { LoadingService } from 'src/app/services/loading.service';
import { QUERY_LIST } from 'src/constants/lists';

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.css'],
})
export class HomeComponent {
  queries = [QUERY_LIST.movie[0], QUERY_LIST.tv[0]];

  @Output() title1: string = 'Peliculas populares';
  @Output() title2: string = 'Series populares';
  @Output() carouselExample1: string = 'carouselExample1';
  @Output() carouselExample2: string = 'carouselExample2';
  @Output() arrayVideosDetail1!: any[];
  @Output() arrayVideosDetail2!: any[];
  loading = false;
  constructor(
    private infoService: InformationService,
    private loadingService: LoadingService,
    public ruta: Router
  ) {
    this.loadingService.loading$.subscribe((loading) => {
      this.loading = loading;
    });
  }

  ngOnInit() {
    this.queries.forEach((query) => {
      this.infoService.listMedia(query.type, query.query, 1).subscribe(
        (data) => {
          if (query.type == 'movie') this.arrayVideosDetail1 = data.results;
          else this.arrayVideosDetail2 = data.results;
        },
        (error) => {
          console.log(error);
        }
      );
    });
  }
}
