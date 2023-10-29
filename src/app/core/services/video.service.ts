import { HttpClient } from '@angular/common/http';
import { Injectable } from '@angular/core';
import { environment } from 'src/environments/environment';
import { Videos, VideoReaction, UpdateExistingVideoPayload, AddReactionToVideoPayload } from '../models/video.interface';
import { Observable, map } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class VideoService {

  constructor(private http: HttpClient) {}

  getAllVideos() {
    const getAllVideoAPI = environment.URL + '/api/videos';
    return this.http.get<Videos[]>(getAllVideoAPI);
  }

  getVideoDetailsById(videoId: any) {
    const getVideoDetailsByIdAPI =
      environment.URL + '/api/videos/' + videoId;
    return this.http.get<Videos>(getVideoDetailsByIdAPI);
  }

  getVideoReactionById(videoId: any) {
    const getVideoReactionByIdAPI = `${environment.URL}/api/videos/${videoId}/reactions`;
    return this.http.get<VideoReaction[]>(getVideoReactionByIdAPI);
  }

  updateExistingVideoDetailsById(
    payload: UpdateExistingVideoPayload,
    videoId: any
  ) {
    const updateVideoDetailAPI = `${environment.URL}/api/videos/${videoId}`;
    return this.http.patch(updateVideoDetailAPI, payload);
  }

  reactToExistingVideoById(payload: AddReactionToVideoPayload) {
    const updateReactionToVideoByIdAPI = `${environment.URL}/api/videos/${payload.videoId}/reactions`;
    return this.http.post(updateReactionToVideoByIdAPI, payload);
  }

   




  fetchImageAndConvertToBase64(imageUrl: string): Observable<string> {
    return this.http.get(imageUrl, { responseType: 'blob' }).pipe(
      map((imageBlob: Blob) => {
        const reader = new FileReader();
        reader.readAsDataURL(imageBlob);
        return reader.result as string;
      })
    );
  }
  




}
