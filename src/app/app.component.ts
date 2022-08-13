import { Component, OnInit, HostListener } from '@angular/core';
import { TokenService } from './services/token.service';
import { Router } from '@angular/router';
import { ViewportScroller } from '@angular/common';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css'],
})
export class AppComponent implements OnInit {
  isLogin = false;
  roles!: string[];
  authority!: string;

  constructor(
    private tokenService: TokenService,
    private router: Router,
    private scroller: ViewportScroller
  ) {}

  ngOnInit() {
    if (this.tokenService.getToken()) {
      this.isLogin = true;
      this.roles = [];
      this.roles = this.tokenService.getAuthorities();
      this.roles.every((rol) => {
        if (rol === 'ROLE_ADMIN') {
          this.authority = 'admin';
          return false;
        }
        this.authority = 'user';
        return true;
      });
    }
  }
  nav_bar = false;
  logo_ff = true;

  @HostListener("document:scroll")
  scrollfunction() {
    (document.documentElement.scrollTop > 1500 ? this.nav_bar = true : this.nav_bar = false) 
  }

  navegarA(anchor: string) {
    this.scroller.setOffset([0, 80]);
    this.scroller.scrollToAnchor(anchor);
  }

  logOut(): void {
    this.tokenService.logOut();
    this.isLogin = false;
    this.authority = '';
    this.router.navigate(['portfolio']);
    window.location.reload();
  }

  
}