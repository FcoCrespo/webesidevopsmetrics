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
  selector: 'app-updateuser',
  templateUrl: './updateuser.component.html',
  styleUrls: ['./updateuser.component.css']
})
export class UpdateuserComponent implements OnInit {

  usersTable = {} as Users;
  data: Users[] = [];
  users: Users[] = [];

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  public updateusername: string = "";
  public updaterole: string = "";

  usernamevalue: string="";
  newpassvalue: string="";
  newrepeatpassvalue: string="";

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

      var updateuser = JSON.parse(localStorage.getItem("updateuser")!);
      console.log(updateuser)
      this.updateusername = updateuser.username;


      await this.userService.getAll(this.tokenpass)
        .subscribe((data: Users[]) => {

          document.getElementById('userlogin')!.innerText = this.username;
          
          this.data = data;
          this.users = this.data;

          this.usernamevalue = this.updateusername;
      }); 
      
      
  }


  UpdateUser(){
    var newpassinput= (<HTMLInputElement>document.getElementById('idnewpassinput')).value;
    var newrepeatpassinput= (<HTMLInputElement>document.getElementById('idnewrepeatpassinput')).value;

    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (newpassinput === ''
      || newpassinput === undefined
      || newrepeatpassinput === ''
      || newrepeatpassinput === undefined) {

      
      alert("Some fields needed for a new user are empty.")

    } 

    else{

      
        
        if(newpassinput===newrepeatpassinput){
          

          if(strongRegex.test(newpassinput)){

            const message = {username: this.usernamevalue,
                password:newpassinput};
            

            this.userService.update(this.tokenpass, this.usernamevalue, message)
            .subscribe(data => {

            });    

            alert("User updated correctly.");
            this.goUserOps();
          }
          else{
            alert("The password must be greater than 8 characters. Must include at least one capital letter and one number");
            this.newpassvalue='';
            this.newrepeatpassvalue='';
          }
        }


        else{
          alert("The passwords fields are different");
          this.newpassvalue='';
          this.newrepeatpassvalue='';
        }

      

    }


  }

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserOps(){
    if(this.role==='admin'){
      this.router.navigate(['/userops']); // navigate to other page
    }
    else{
      this.router.navigate(['/useroptions']); // navigate to other page
    }
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
