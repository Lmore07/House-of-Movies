import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import { DomSanitizer } from '@angular/platform-browser';

@Component({
  selector: 'app-watch-video-info',
  templateUrl: './watch-video-info.component.html',
  styleUrls: ['./watch-video-info.component.css'],
})
export class WatchVideoInfoComponent {
  constructor(
    @Inject(MAT_DIALOG_DATA) public data: any,
    private sanitizer: DomSanitizer
  ) {}

  safeUrl() {
    try {
      return this.sanitizer.bypassSecurityTrustResourceUrl(
        'https://www.youtube.com/embed/' +
          this.data.url +
          '?si=xKl6RTWwRHnaSJWd'
      );
    } catch (error) {
      console.log(error);
      return '';
    }
  }
}
