import { MatTabsModule } from '@angular/material/tabs';
import { CUSTOM_ELEMENTS_SCHEMA, NgModule } from '@angular/core';
import { BrowserModule } from '@angular/platform-browser';
import { HTTP_INTERCEPTORS, HttpClientModule } from '@angular/common/http';
import { AppRoutingModule } from './app-routing.module';
import { AppComponent } from './app.component';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SerieComponent } from './components/serie/serie.component';
import { FontAwesomeModule } from '@fortawesome/angular-fontawesome';
import { InformationSerieComponent } from './components/serie/information-serie/information-serie.component';
import { InformationMovieComponent } from './components/movie/information-movie/information-movie.component';
import { SliderComponent } from './shared-components/slider/slider.component';
import { SliderSerieComponent } from './shared-components/slider-serie/slider-serie.component';
import { MatTooltipModule } from '@angular/material/tooltip';
import { BrowserAnimationsModule } from '@angular/platform-browser/animations';
import { MatChipsModule } from '@angular/material/chips';
import { SliderPersonComponent } from './shared-components/slider-person/slider-person.component';
import { SliderSeasonsComponent } from './shared-components/slider-seasons/slider-seasons.component';
import { MatDialogModule } from '@angular/material/dialog';
import { MatButtonModule } from '@angular/material/button';
import { EpisodeModalComponent } from './shared-components/episode-modal/episode-modal.component';
import { SearchComponent } from './components/search/search.component';
import { GenreComponent } from './components/genre/genre.component';
import { PersonComponent } from './components/person/person.component';
import { InfiniteScrollModule } from 'ngx-infinite-scroll';
import { CategoryComponent } from './components/category/category.component';
import { FormsModule } from '@angular/forms';
import { MatExpansionModule } from '@angular/material/expansion';
import { WatchVideoInfoComponent } from './shared-components/watch-video-info/watch-video-info.component';
import { WatchImageComponent } from './shared-components/watch-image/watch-image.component';
import { LoadingComponent } from './shared-components/loading/loading.component';
import { LoadingInterceptor } from './interceptors/loading.interceptor';
import { DownloadComponent } from './shared-components/download/download.component';

@NgModule({
  declarations: [
    AppComponent,
    HomeComponent,
    MovieComponent,
    SerieComponent,
    InformationSerieComponent,
    InformationMovieComponent,
    SliderComponent,
    SliderSerieComponent,
    SliderPersonComponent,
    SliderSeasonsComponent,
    EpisodeModalComponent,
    SearchComponent,
    GenreComponent,
    PersonComponent,
    CategoryComponent,
    WatchVideoInfoComponent,
    WatchImageComponent,
    LoadingComponent,
    DownloadComponent,
  ],
  imports: [
    FormsModule,
    BrowserModule,
    MatChipsModule,
    HttpClientModule,
    MatDialogModule,
    MatButtonModule,
    InfiniteScrollModule,
    MatTabsModule,
    AppRoutingModule,
    FontAwesomeModule,
    MatExpansionModule,
    BrowserAnimationsModule,
    MatTooltipModule,
  ],
  bootstrap: [AppComponent],
  providers: [
    {
      provide: HTTP_INTERCEPTORS,
      useClass: LoadingInterceptor,
      multi: true,
    },
  ],
  schemas: [CUSTOM_ELEMENTS_SCHEMA],
})
export class AppModule {}
