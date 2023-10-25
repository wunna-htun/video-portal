import { Component, OnInit } from '@angular/core';
import { Router } from '@angular/router';
import { Subscription } from 'rxjs';
import { Videos } from 'src/app/core/models/video.interface';
import { VideoService } from 'src/app/core/services/video.service';
@Component({
  selector: 'app-video-list',
  templateUrl: './video-list.component.html',
  styleUrls: ['./video-list.component.scss']
})
export class VideoListComponent implements OnInit {
  viewList = [
    {
      view: 'grid',
      icon: 'fa-brands fa-windows',
      active: true,
    },
    {
      view: 'list',
      icon: 'fa-solid fa-list',
      active: false,
    },
  ];

  activeViewMode!: any;

  allVideoList: Videos[] = [];

  subscriptions: Subscription[] = [];

  constructor(private videoService: VideoService, private router: Router) {}

  ngOnInit(): void {
    this.getActiveView();

    this.getAllVideos();
  }

  getAllVideos() {
    this.subscriptions.push(
      this.videoService.getAllVideos().subscribe({
        next: (videoList) => {
          console.log('video List', videoList);
          this.allVideoList = videoList;
        },
        error: (error) => {
          console.error('Get All Video list API failed', error);
        },
      })
    );
  }

  onChangeView(i: number) {
    this.viewList.forEach((res: any, index) =>
      index == i ? (res.active = true) : (res.active = false)
    );
    this.getActiveView();
  }

  getActiveView() {
    this.activeViewMode = this.viewList.find(
      (viewModeList) => viewModeList.active
    );

    return this.activeViewMode;
  }

  openVideoDetailPage(videoId: any) {
    this.router.navigate(['/detail-video', videoId]);
  }

  ngOnDestroy(): void {
    this.subscriptions.forEach((subscription) => subscription.unsubscribe());
  }
}
