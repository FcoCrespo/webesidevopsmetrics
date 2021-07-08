import { HostListener, Component, OnInit, NgModule} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { FormGroup, FormControl, Validators} from '@angular/forms';


export interface Users {
  id: string;
  username: string;
  role: string;
  email: string;
  userGithub: string;
}

export interface Rol {
  value: string;
  viewValue: string;
}

export interface Repository {
  repository: string;
  owner: string;
}

export interface UsersGithubFree{
  id: string;
  name: string;
  login: string;
  repositories : Repository[];
}


@Component({
  selector: 'app-createuser',
  templateUrl: './createuser.component.html',
  styleUrls: ['./createuser.component.css']
})
export class CreateuserComponent implements OnInit {

  usersTable = {} as Users;
  data: Users[] = [];
  users: Users[] = [];


  datafree: UsersGithubFree[] = [];
  usersfree: UsersGithubFree[] = [];

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  usernamevalue: string="";
  emailvalue: string="";

  
  roles : string[]=['admin', 'manager', 'dev'];
  selectedRole= 'admin';

  form = new FormGroup({
    website: new FormControl('', Validators.required)
  });

  selectedUserFree: UsersGithubFree;
  
  get f(){
    return this.form.controls;
  }
  
  submit(){
    console.log(this.form.value);
  }
  changeWebsite(e) {
    console.log(e.target.value);
  }

  

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private userService: UserService) { }

    async ngOnInit() {
      document.body.classList.add('bg-img-white');

      var values = JSON.parse(localStorage.getItem("currentUser")!);
      this.username = values.username;
      this.tokenpass = values.tokenPass;
      this.role = values.role;

      await this.userService.getAll(this.tokenpass)
        .subscribe((data: Users[]) => {

          document.getElementById('userlogin')!.innerText = this.username;
          this.data = data;
          this.users = this.data;
        },
        (err) => {console.log(err);
    
          if(err=="TypeError: Cannot read property 'message' of null"){
            alert("Expired Session.")
            this.router.navigate(['/login']);
          }
          
      });   

      await this.userService.getusersgithubfree(this.tokenpass)
        .subscribe((data: UsersGithubFree[]) => {

          
          this.datafree = data;
          this.usersfree = this.datafree;

          document.getElementById("idcreatenewuseraction")!.style.visibility = "visible";
        },
        (err) => {console.log(err);
    
          if(err=="TypeError: Cannot read property 'message' of null"){
            alert("Expired Session.")
            this.router.navigate(['/login']);
          }
          
      });   
  }

  onChangeRole(newValue) {
    console.log(newValue);
    this.selectedRole = newValue;

    if(this.selectedRole==='manager' || this.selectedRole==='dev'){
      document.getElementById("usersfreebox")!.style.display = "block";
      document.getElementById("usersfreelabel")!.style.display= "block";
    }
    else{
      document.getElementById("usersfreebox")!.style.display = "none";
      document.getElementById("usersfreelabel")!.style.display = "none";
    }
    
    
  }

  onChangeUser(value){
    this.selectedUserFree = value;
    console.log(this.selectedUserFree.name +" "+ this.selectedUserFree.id)
  }

  createNewUser(){

    

    var usernameinput= (<HTMLInputElement>document.getElementById('idusernameinput')).value;
    var emailinput= (<HTMLInputElement>document.getElementById('emailinput')).value;

    var existe = false;
    var strongRegex = new RegExp("^[a-zA-Z0-9+_.-]+@[a-zA-Z0-9.-]+$");

    if (usernameinput === undefined 
      || usernameinput === ''
      || emailinput === ''
      || emailinput === undefined) {

      
      alert("Some fields needed for a new user are empty.")

    } 

    else{

      for(var i=0; i<this.users.length; i++){
        if(this.users[i].username===usernameinput){
          existe=true;
        }
      }

      if(existe==true){
        alert("The username already exists in the system. Write other.");
        this.usernamevalue='';
      }
      else{
        
          if(strongRegex.test(emailinput)){

            var userGithubvalue = '';

            if(this.selectedRole !== 'admin'){
              userGithubvalue = this.selectedUserFree.id;
            }

            const message = {username:usernameinput,
              email:emailinput,
              role: this.selectedRole,
              userGithub: userGithubvalue};

            this.userService.register(this.tokenpass, message)
            .subscribe(data => {

            });    

            alert("New user created correctly.");
            this.goUserOps();
          }
          else{
            alert("The email is not in correct format (...@...)");
            this.emailvalue = '';
          }
      }


    }


  }

  

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserOps(){
		this.router.navigate(['/userops']); // navigate to other page
	}

  goAboutMe(){
		this.router.navigate(['/aboutme']); // navigate to other page
	}

  goUserGithub(){
    this.router.navigate(['/usersgithub']); 
  }


  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
