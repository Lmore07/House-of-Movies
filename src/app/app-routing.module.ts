import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { HomeComponent } from './components/home/home.component';
import { MovieComponent } from './components/movie/movie.component';
import { SerieComponent } from './components/serie/serie.component';
import { InformationSerieComponent } from './components/serie/information-serie/information-serie.component';
import { InformationMovieComponent } from './components/movie/information-movie/information-movie.component';
import { CategoryComponent } from './components/category/category.component';
import { GenreComponent } from './components/genre/genre.component';
import { SearchComponent } from './components/search/search.component';
import { PersonComponent } from './components/person/person.component';

const routes: Routes = [
  { path: '', pathMatch: 'full', redirectTo: 'home' },
  { path: 'home', component: HomeComponent },
  { path: 'movies', component: MovieComponent },
  { path: 'movie/:id', component: InformationMovieComponent },
  { path: 'series', component: SerieComponent },
  { path: 'serie/:id', component: InformationSerieComponent },
  { path: ':type/category/:query', component: CategoryComponent },
  { path: 'genre/:id/:type', component: GenreComponent },
  { path: 'search', component: SearchComponent },
  { path: 'person/:id', component: PersonComponent },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule],
})
export class AppRoutingModule {}
