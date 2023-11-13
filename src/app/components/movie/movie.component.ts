import { Component } from '@angular/core';
import { InformationService } from 'src/app/services/information.service';

@Component({
  selector: 'app-movie',
  templateUrl: './movie.component.html',
  styleUrls: ['./movie.component.css'],
})
export class MovieComponent {
  populars!: any[];
  bestRanking!: any[];
  upcoming!: any[];
  nowPlaying!: any[];

  constructor(private infoService: InformationService) {}

  ngOnInit() {
    this.loadPopulars();
    this.loadBestRanking();
    this.loadUpcoming();
    this.loadNowPlaying();
  }

  loadPopulars() {
    this.infoService.listMedia('movie', 'popular', 1).subscribe(
      (data) => {
        this.populars = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadBestRanking() {
    this.infoService.listMedia('movie', 'top_rated', 1).subscribe(
      (data) => {
        this.bestRanking = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadUpcoming() {
    this.infoService.listMedia('movie', 'upcoming', 1).subscribe(
      (data) => {
        this.upcoming = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  loadNowPlaying() {
    this.infoService.listMedia('movie', 'now_playing', 1).subscribe(
      (data) => {
        this.nowPlaying = data.results;
      },
      (error) => {
        console.log(error);
      }
    );
  }
}
