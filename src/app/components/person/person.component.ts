import { Component } from '@angular/core';
import { ActivatedRoute, Router } from '@angular/router';
import { InformationService } from 'src/app/services/information.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-person',
  templateUrl: './person.component.html',
  styleUrls: ['./person.component.css'],
})
export class PersonComponent {
  personInfo: any;
  personId!: number;
  known_for!: any[];
  faStarOutline = iconos.faStar;
  faQuestion = iconos.faQuestion;
  panelOpenState = false;

  constructor(
    private route: ActivatedRoute,
    private router: Router,
    private infoService: InformationService
  ) {}

  ngOnInit() {
    this.route.paramMap.subscribe((params) => {
      this.personId = Number.parseInt(params.get('id')!);
      this.loadPerson();
    });
  }

  getItemType(item: any) {
    if(item.media_type === 'movie') {
      return '🎬'; // o 'Movie'
    } else {
      return '📺'; // o 'TV'
    }
  }

  loadPerson() {
    this.infoService.getInfoPerson(this.personId).subscribe(
      (data) => {
        this.known_for = data.combined_credits.cast;
        this.known_for = this.known_for.concat(data.combined_credits.crew);
        this.personInfo = data;
      },
      (error) => {
        console.log(error);
      }
    );
  }

  getImage(image: string, width: number, height: number) {
    return this.infoService._fetchImage(image, width, height);
  }

  formatDate(date: string) {
    const d = new Date(date);
    const day = d.getDate() + 1;
    const month = d.getMonth() + 1;
    const year = d.getFullYear();

    return `${day}/${month}/${year}`;
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
