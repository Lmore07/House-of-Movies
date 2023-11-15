import { Component, Inject } from '@angular/core';
import { MAT_DIALOG_DATA } from '@angular/material/dialog';
import * as iconos from '@fortawesome/free-solid-svg-icons';

@Component({
  selector: 'app-download',
  templateUrl: './download.component.html',
  styleUrls: ['./download.component.css'],
})
export class DownloadComponent {
  constructor(@Inject(MAT_DIALOG_DATA) public data: any) {}

  faDownload = iconos.faDownload;
  ngOnInit() {
    console.log(this.data);
  }
}
