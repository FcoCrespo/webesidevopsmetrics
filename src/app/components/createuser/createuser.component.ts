import { HostListener, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export interface Users {
  id: string;
  username: string;
  role: string;
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

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  usernamevalue: string="";
  passvalue: string="";
  repeatpassvalue: string="";

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
  }
  
  createNewUser(){

    var usernameinput= (<HTMLInputElement>document.getElementById('idusernameinput')).value;
    var passinput= (<HTMLInputElement>document.getElementById('idpassinput')).value;
    var repeatpassinput= (<HTMLInputElement>document.getElementById('idrepeatpassinput')).value;

    var existe = false;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (usernameinput === undefined 
      || usernameinput === ''
      || passinput === ''
      || passinput === undefined
      || repeatpassinput === ''
      || repeatpassinput === undefined) {

      
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
        
        if(passinput===repeatpassinput){
          

          if(strongRegex.test(passinput)){

            const message = {username:usernameinput,
              password:passinput,
              role:'admin'};

            this.userService.register(this.tokenpass, message)
            .subscribe(data => {

            });    

            alert("New user created correctly.");
            this.goUserOps();
          }
          else{
            console.log(passinput)
            alert("The password must be greater than 8 characters. Must include at least one capital letter and one number");
            this.passvalue='';
            this.repeatpassvalue='';
          }
        }


        else{
          alert("The passwords fields are different");
          this.passvalue='';
          this.repeatpassvalue='';
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
