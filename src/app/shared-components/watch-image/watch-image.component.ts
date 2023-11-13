import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { InformationService } from 'src/app/services/information.service';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-watch-image',
  templateUrl: './watch-image.component.html',
  styleUrls: ['./watch-image.component.css'],
})
export class WatchImageComponent {
  faTimes = iconos.faTimes;
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private infoService: InformationService
  ) {}

  getImage() {
    return this.infoService._fetchImageOriginal(this.data.url);
  }
}
