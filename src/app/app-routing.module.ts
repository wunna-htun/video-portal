import { NgModule } from '@angular/core';
import { RouterModule, Routes } from '@angular/router';
import { VideoDetailsComponent } from './pages/video-details/video-details.component';
import { VideoListComponent } from './pages/video-list/video-list.component';


const routes: Routes = [
  { path: 'videos', component: VideoListComponent },
  { path: 'videos/:videoId', component: VideoDetailsComponent },
  { path: '', redirectTo: '/videos', pathMatch: 'full' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
