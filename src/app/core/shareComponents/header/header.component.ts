import { Component, Input, OnInit } from '@angular/core';
import { ActivatedRoute, NavigationEnd, Router } from '@angular/router';
import { BehaviorSubject } from 'rxjs/internal/BehaviorSubject';
import { RouteService } from '../../services/route.service';
import { Observable } from 'rxjs/internal/Observable';
import { map } from 'rxjs';
import { UserService } from '../../services/user.service';
import { User } from '../../models/user.interface';

@Component({
  selector: 'app-header',
  templateUrl: './header.component.html',
  styleUrls: ['./header.component.scss']
})
export class HeaderComponent implements OnInit{
  checkMainRoute:boolean=false;
  loggedInUser?:User
  currentUrl$ = new BehaviorSubject<string | undefined>(undefined);

  constructor(private router: Router, private userService: UserService) {
    this.router.events.subscribe((event) => {
      if (event instanceof NavigationEnd) {
        this.currentUrl$.next(event.url);
      }
    });
  }

   async ngOnInit() {
    this.isMainRoute().subscribe((mainRoute)=>{
      this.checkMainRoute=mainRoute
    })
 
    this.loggedInUser=this.userService.getActiveLogInUser()
  
    console.log("login user",this.loggedInUser)

  }



  isMainRoute(): Observable<boolean> {
    return this.currentUrl$.pipe(
      map((url) => {
        if (url) {
          return url === '/videos';
        }
        return false;
      })
    );
  }



}
