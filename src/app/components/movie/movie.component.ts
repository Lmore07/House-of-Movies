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
  counter = 0;
  loading = true;

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
        this.counter++;
        if (this.counter == 4) {
          this.loading = false;
        }
        this.populars = data.results;
      },
      (error) => {
        this.loading=false;
        console.log(error);
      }
    );
  }

  loadBestRanking() {
    this.infoService.listMedia('movie', 'top_rated', 1).subscribe(
      (data) => {
        this.counter++;
        if (this.counter == 4) {
          this.loading = false;
        }
        this.bestRanking = data.results;
      },
      (error) => {
        this.loading=false;
        console.log(error);
      }
    );
  }

  loadUpcoming() {
    this.infoService.listMedia('movie', 'upcoming', 1).subscribe(
      (data) => {
        this.counter++;
        if (this.counter == 4) {
          this.loading = false;
        }
        this.upcoming = data.results;
      },
      (error) => {
        this.loading=false;
        console.log(error);
      }
    );
  }

  loadNowPlaying() {
    this.infoService.listMedia('movie', 'now_playing', 1).subscribe(
      (data) => {
        this.counter++;
        if (this.counter == 4) {
          this.loading = false;
        }
        this.nowPlaying = data.results;
      },
      (error) => {
        this.loading=false;
        console.log(error);
      }
    );
  }
}
