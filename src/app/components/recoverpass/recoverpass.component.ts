import { HostListener, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-recoverpass',
  templateUrl: './recoverpass.component.html',
  styleUrls: ['./recoverpass.component.css']
})
export class RecoverpassComponent implements OnInit {

  loginForm!: FormGroup;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success!: string;

  emailvalue: string="";

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private userService: UserService
  ) {
    // redirige al inicio si ya estás logueado
    //this.checkLogin();
  }


  ngOnInit() {

   

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      email: ['', Validators.required]
    });


  }

  // getter para obtener los controles del form
  get f() { return this.loginForm.controls; }

  onSubmit() {
    var usernameinput= (<HTMLInputElement>document.getElementById('username')).value;
    var emailinput= (<HTMLInputElement>document.getElementById('email')).value;
    var strongRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    if (usernameinput === ''
      || usernameinput === undefined
      || emailinput === ''
      || emailinput === undefined) {

      
      alert("Some fields needed to recover your password are empty.")

    }

    else{

      if(strongRegex.test(emailinput)){
        document.getElementById('botonAcceso')!.setAttribute("disabled", "disabled");
        this.submitted = true;
  
        // resetea las alarmas al acceder
        this.error = "";
        this.success = "";
  
          this.userService.recoverpassword(this.f.username.value, this.f.email.value)
            .subscribe(
              data => {
                
          });
          alert("A new password has been send to your email.");
          this.router.navigate(['/login']);
        }
      else{
        alert("The email is not in correct format (...@...)");
        this.emailvalue = '';
      }
    }
      
      
  } 

  GoToLogin(){
    this.router.navigate(['/login']);
  }


    

}