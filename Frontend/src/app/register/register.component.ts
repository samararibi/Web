import { Component ,OnInit } from '@angular/core';
import { AuthService } from '../services/auth.service';
import { Router } from '@angular/router';

@Component({
  selector: 'app-register',
  templateUrl: './register.component.html',
  styleUrls: ['./register.component.css']
})
export class RegisterComponent implements OnInit {
  candidate={
    firstName:'',
    lastName:'',
    email:'',
    password:''

  }


  constructor(private _candidate : AuthService , private router: Router) {}
ngOnInit(): void {
  
}
register(){
  let fd = new FormData()
  fd.append('firstName',this.candidate.firstName)
  fd.append('lastName',this.candidate.lastName)
  fd.append('email',this.candidate.email)
  fd.append('password',this.candidate.password)
  this._candidate.register(fd)
  .subscribe(
    res=>{
      this.router.navigate(['/login']);
    }
  )
}
}
