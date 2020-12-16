import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {

  @Input() innerApp: boolean;
  constructor(private auth: AuthService,public router: Router){}
  ngOnInit(): void {}
  hideMenu(){
    let menu = document.getElementById("sidenav")
    menu.style.width = '0px'
  }
  showMenu(){
    let menu = document.getElementById("sidenav")
    menu.style.width = '250px'
  }
  logout(){
    this.auth.signout()
    .then(()=>this.router.navigate(['/']))
  }
}