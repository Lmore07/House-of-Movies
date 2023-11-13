import { Component } from '@angular/core';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-serie',
  templateUrl: './serie.component.html',
  styleUrls: ['./serie.component.css']
})
export class SerieComponent {

  populars!: any[];
  bestRanking!: any[];
  nowPlaying!: any[];

  constructor(private infoService: InformationService) {}

  ngOnInit() {
    this.loadPopulars();
    this.loadBestRanking();
    this.loadNowPlaying();
  }

  loadPopulars() {
    this.infoService.listMedia('tv', 'popular', 1).subscribe(
      (data) => {
        this.populars = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBestRanking() {
    this.infoService.listMedia('tv', 'top_rated', 1).subscribe(
      (data) => {
        this.bestRanking = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadNowPlaying() {
    this.infoService.listMedia('tv', 'airing_today', 1).subscribe(
      (data) => {
        this.nowPlaying = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
