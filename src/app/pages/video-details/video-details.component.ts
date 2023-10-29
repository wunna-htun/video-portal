import { Component, ElementRef, OnInit, ViewChild,ChangeDetectorRef } from '@angular/core';
import { ActivatedRoute, ParamMap } from '@angular/router';
import { Subscription } from 'rxjs/internal/Subscription';
import { AddReactionToVideoPayload, Videos } from 'src/app/core/models/video.interface';
import { UserService } from 'src/app/core/services/user.service';
import { VideoService } from 'src/app/core/services/video.service';
import html2canvas from 'html2canvas';
import { environment } from 'src/environments/environment';
import { animate, state, style, transition, trigger } from '@angular/animations';
import { User } from 'src/app/core/models/user.interface';
@Component({
  selector: 'app-video-details',
  templateUrl: './video-details.component.html',
  styleUrls: ['./video-details.component.scss'],
  // animations: [
  //   trigger('starAnimation', [
  //     state('visible', style({})),
  //     transition(':enter', [
  //       style({ transform: 'translateY(0)', opacity: 1 }),
  //       animate('1s', style({ transform: 'translateY(-100%)', opacity: 0 }))
  //     ]),
  //   ]),
  // ],

  // animations: [
  //   trigger('starAnimation', [
  //     state('visible', style({
  //       transform: 'translate(0, 0)',
  //       opacity: 1
  //     })),
  //     transition(':enter', [
  //       style({
  //         transform: 'translate(0, 100%)',
  //         opacity: 0
  //       }),
  //       animate('1s', style({
  //         transform: 'translate(0, 0)',
  //         opacity: 1
  //       }))
  //     ]),
  //     transition(':leave', [
  //       animate('1s', style({
  //         transform: 'translate(0, -100%)',
  //         opacity: 0
  //       }))
  //     ])
  //   ])
  // ],

  animations: [
    trigger('starAnimation', [
      state('visible', style({
        transform: 'translate(0, 0)',
        opacity: 1
      })),
      transition(':enter', [
        style({
          transform: 'translate(0, 100%)',
          opacity: 0
        }),
        animate('1s', style({
          transform: 'translate(0, 0)',
          opacity: 1
        }))
      ]),
      transition(':leave', [
        animate('1s', style({
          transform: 'translate(0, -100%)',
          opacity: 0
        }))
      ])
    ])
  ]

})
export class VideoDetailsComponent implements OnInit {
  videoDetails?: any;
  loggedInUserDetails: User|null=null;
  videoTitleUpdated?: boolean;
  videoTitle?: string = "";
  videoReactionList?: any[];
  subscriptions: Subscription[] = [];
  showStar: boolean = true;
  isVideoPlaying: boolean = false;
  starState = 'visible';

  @ViewChild('videoPlayer') videoPlayer!: ElementRef;



  constructor(private userService: UserService, private videoService: VideoService, private activeRoute: ActivatedRoute,    private cdf: ChangeDetectorRef,
    ) { }

  ngOnInit() {
    // Initialize your component properties if needed



    console.log("videoDetails", this.videoDetails)
    this.activeRoute.paramMap.subscribe((params: ParamMap) => {
      const videoId = params.get('videoId');
      this.getVideoDetailById(videoId);
      this.getVideoReactionsById(videoId);
      this.getActiveLoggedUserDetails();
    });

  }




  updateVideoTitle(videoId: string) {
    const payload = {
      title: this.videoTitle,
    };
    console.log("update vidoe",payload)
    

     this.subscriptions.push(
      this.videoService.updateExistingVideoDetailsById(payload, videoId).subscribe({
        next: (res:any) => {
          console.log('Video Title updated successfully', res);
          this.videoTitleUpdated = true;
          this.videoTitle=res.title;
          this.cdf.detectChanges();
        },
      })
    );

   
  }


  toggleAnimation() {
    this.starState = this.starState === 'visible' ? 'invisible' : 'visible';
  }


  showStarAnimation() {
    console.log("showStarAnimation")
    console.log('showStar set to true',this.showStar); // Add this for debugging

    this.showStar = true;
    this.cdf.detectChanges(); // Trigger change detection

    setTimeout(() => {
      this.showStar = false;
      console.log('showStar set to false',this.showStar); // Add this for debugging

      this.cdf.detectChanges(); // Trigger change detection

    }, 10000); // Adjust the time as needed


  
  }

  async videoSaveReaction(eventType: 'star' | 'snapshot') {
    console.log(
      'Video save Reaction',
      this.videoPlayer.nativeElement.currentTime
    );

    const payload: AddReactionToVideoPayload = {
      videoId: this.videoDetails.id,
      type: eventType,
      timeframe: this.videoPlayer.nativeElement.currentTime,
    };


    if (eventType === 'snapshot') {

      if (this.videoPlayer.nativeElement.readyState >= 2) {
        const canvas = await html2canvas(this.videoPlayer.nativeElement);
        const snapshotDataUri = canvas.toDataURL('image/png');
        // console.log('Snapshot taken and saved to payload', snapshotDataUri);
        payload.dataUri = snapshotDataUri;
      } else {
        console.log('Video is not ready for snapshot capture.');
      }
    }else{
      this.toggleAnimation();
    }
    
    console.log("this.videoDetails.previewUrl", this.videoDetails.previewUrl)

    this.subscriptions.push(
      this.videoService.reactToExistingVideoById(payload).subscribe({
        next: (reactionRes) => {
          console.log('Reaction save success', reactionRes);
          this.getVideoReactionsById(this.videoDetails.id);
        },
        error: (error) => {
          console.error('Video Reaction API Failed', error);
        },
      })
    );


  }


  togglePlayState() {
    console.log("togglePlayState ")
    this.showStarAnimation();
    if (this.videoPlayer.nativeElement.paused) {
      this.videoPlayer.nativeElement.play();
    } else {
      this.videoPlayer.nativeElement.pause();
    }
  }

  videoPlaying() {
    console.log("videoPlaying")
    this.showStarAnimation()
    this.isVideoPlaying = true;
    // Handle logic for when the video is playing
  }

  videoPaused() {
    console.log("videoPaused")
    this.isVideoPlaying = false;
    // Handle logic for when the video is paused
  }


  getActiveLoggedUserDetails() {
    this.loggedInUserDetails = this.userService.getActiveLogInUser();
    console.log('loggedinUser', this.loggedInUserDetails);
  }


  getVideoDetailById(videoId: any) {
    this.subscriptions.push(
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
    );

  }

  getVideoReactionsById(videoId: any) {
    this.subscriptions.push(
      this.videoService.getVideoReactionById(videoId).subscribe({
        next: (reactionList) => {
          console.log('reactionList', reactionList);
          this.videoReactionList = reactionList.reverse();
        },
        error: (error) => {
          console.error('Video Reaction API Got Failed', error);
        },
      })
    );
  }


  formatTimestamp(timestamp: number): string {
    const hours = Math.floor(timestamp / 3600);
    const minutes = Math.floor((timestamp % 3600) / 60);
    const seconds = Math.floor(timestamp % 60);
    return `${hours.toString().padStart(2, '0')}:${minutes.toString().padStart(2, '0')}:${seconds.toString().padStart(2, '0')}`;
  }


}



