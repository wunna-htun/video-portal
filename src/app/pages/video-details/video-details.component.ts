import { Component, OnInit } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Videos } from 'src/app/core/models/video.interface';
import { UserService } from 'src/app/core/services/user.service';
import { VideoService } from 'src/app/core/services/video.service';

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

  constructor(private userService :UserService,private videoService:VideoService,private activeRoute:ActivatedRoute) {}

  ngOnInit() {
    // Initialize your component properties if needed


    
    console.log("videoDetails",this.videoDetails)
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const videoId = params.get('videoId');
      this.getVideoDetailById(videoId);
      this.getVideoReactionsById(videoId);
      this.getActiveLoggedUserDetails();
    });

  }

  updateVideoTitle(videoId: string) {
    // Implement the logic to update the video title here
  }

  videoSaveReaction(reactionType: string) {
    // Implement the logic to save a reaction here
  }


  getActiveLoggedUserDetails() {
    this.loggedInUserDetails = this.userService.getActiveLogInUser();

    console.log('loggedinUser', this.loggedInUserDetails);
  } 


  getVideoDetailById(videoId: any) {
    // this.subscriptions.push(
    //   this.videoService.getVideoDetailsById(videoId).subscribe({
    //     next: (videoDetail: any) => {
    //       console.log('Success', videoDetail);
    //       this.videoDetails = videoDetail;
    //       this.videoTitle = videoDetail.title;
    //     },
    //     error: (error) => {
    //       console.error('Get indetail video api failed', error);
    //     },
    //   })
    // );



      this.videoService.getVideoDetailsById(videoId).subscribe({
        next: (videoDetail: any) => {
          console.log('Success', videoDetail);
          this.videoDetails = videoDetail;
          this.videoTitle = videoDetail.title;
        },
        error: (error) => {
          console.error('Get indetail video api failed', error);
        },
      })
  }

  getVideoReactionsById(videoId: any) {
    // this.subscriptions.push(
    //   this.videoService.getVideoReactionById(videoId).subscribe({
    //     next: (reactionList) => {
    //       console.log('reactionList', reactionList);
    //       this.videoReactionList = reactionList.reverse();
    //     },
    //     error: (error) => {
    //       console.error('Video Reaction API Got Failed', error);
    //     },
    //   })
    // );
  }


}
