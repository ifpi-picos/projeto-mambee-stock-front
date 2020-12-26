import { Component, OnInit, Input } from '@angular/core';
import { Router } from '@angular/router';
import { AuthService } from 'src/app/core/auth/auth.service';
import { UserService } from 'src/app/core/models/user/user.service';

@Component({
  selector: 'default',
  templateUrl: './default.component.html',
  styleUrls: ['./default.component.css']
})
export class DefaultComponent implements OnInit {
  public userRole: string;
  @Input() innerApp: boolean;
  constructor(
    private auth: AuthService,
    public router: Router,
    private userService: UserService
    ){}
  ngOnInit(): void {
    this.auth.authUser().subscribe(user=>{
      this.userService.get(user.uid).subscribe(doc=>{
        this.userRole = doc.role
      })
    })
  }
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