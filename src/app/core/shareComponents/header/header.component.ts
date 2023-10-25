import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RouteService } from '../../services/route.service';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  @Input() userName?: string;
  isMainRoute = false;
  isDetailsRoute = false;
  private currentRoute = new BehaviorSubject<string>(''); // Initialize with an empty string

  constructor(private router: Router,private route: ActivatedRoute ,private routeService:RouteService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentRoute.next(event.url);
      }
    });
  }





  ngOnInit() {

    this.routeService.getCurrentRoute().subscribe((currentRoute:any) => {
      console.log("currentRoute",currentRoute)
      this.isMainRoute = currentRoute === '/videos';
      this.isDetailsRoute = currentRoute.startsWith('/videos/');
    });


    this.route.url.subscribe((segments) => {
      console.log("segments",segments)
      const pathArray = segments.map((segment) => segment.path);
      const currentRoute = pathArray.join('/');
      console.log("currentRoute",currentRoute)
      this.isMainRoute = currentRoute === 'videos';
      this.isDetailsRoute = currentRoute.startsWith('videos/');
    });


    console.log("this.isMainRoute",this.isMainRoute)
    console.log("current ",this.getCurrentRoute())
  }


  getCurrentRoute() {
    return this.currentRoute.asObservable();
  }

  

  // isMainRoute(): boolean {
  //   console.log("check main route",this.router.url === '/videos')
  //   console.log(this.router.url)
  //   console.log(this.route.snapshot.url)
  //   return this.router.url === '/videos';
  // }

  // isDetailsRoute(): boolean {
  //   return this.router.url === '/details';
  // }




}
