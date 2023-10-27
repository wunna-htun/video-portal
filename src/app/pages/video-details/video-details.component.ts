import { Component, OnInit } from '@angular/core';
import { Videos } from 'src/app/core/models/video.interface';

@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss']
})
export class VideoDetailsComponent implements OnInit {
  videoDetails?: any;
  loggedInUserDetails: any;
  videoTitleUpdated?: boolean;
  videoTitle?: string ="";
  videoReactionList?: any[];

  constructor() {}

  ngOnInit() {
    // Initialize your component properties if needed
  }

  updateVideoTitle(videoId: string) {
    // Implement the logic to update the video title here
  }

  videoSaveReaction(reactionType: string) {
    // Implement the logic to save a reaction here
  }
}
