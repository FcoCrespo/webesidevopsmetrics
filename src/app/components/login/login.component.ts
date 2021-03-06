import { HostListener, Component, OnInit } from '@angular/core';
import { Router, ActivatedRoute } from '@angular/router';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';

import { AuthService } from '../../services'

@Component({
  selector: 'app-login',
  templateUrl: './login.component.html',
  styleUrls: ['./login.component.css']
})
export class LoginComponent implements OnInit {

  loginForm!: FormGroup;
  loading = false;
  submitted = false;
  returnUrl!: string;
  error!: string;
  success!: string;

 

  constructor(
    private formBuilder: FormBuilder,
    private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService
  ) {
    // redirige al inicio si ya estás logueado
    //this.checkLogin();
  }


  ngOnInit() {

    document.body.classList.add('bg-img');
    //esto desloguea el usuario antes de empezar el proceso
    this.authService.logout();

    this.loginForm = this.formBuilder.group({
      username: ['', Validators.required],
      password: ['', Validators.required]
    });


  }

  // getter para obtener los controles del form
  get f() { return this.loginForm.controls; }

  onSubmit() {
    document.getElementById('botonAcceso')!.setAttribute("disabled", "disabled");
    this.submitted = true;

    // resetea las alarmas al acceder
    this.error = "";
    this.success = "";

    // para si el form es inválido
    if (this.loginForm.invalid) {
      document.getElementById('botonAcceso')!.removeAttribute("disabled");
      return;
    }

    this.loading = true;
    this.authService.login(this.f.username.value, this.f.password.value)
      .subscribe(
        data => {
          /*switch (this.authService.currentUserValue.role) {
            case "admin": {
              this.router.navigate(['/repos']);
              break;
            }
          }*/
          this.router.navigate(['/repos']);
        },
        error => {
          document.getElementById('botonAcceso')!.removeAttribute("disabled");
          this.error = "No active account found with the given credentials.";
          this.loading = false;
        });
  }

  checkLogin() {
    if (this.authService.currentUserValue) {
      /*switch (this.authService.currentUserValue.role) {
        case "admin": {
          this.router.navigate(['/repos']);
          break;
        }
      }*/
      this.router.navigate(['/repos']);
    }
    
  }

  goRecover(){
    this.router.navigate(['/recoverpass']);
  }

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
