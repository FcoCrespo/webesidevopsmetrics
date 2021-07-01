import { HostListener, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CommitService } from 'src/app/services/commit.service';

export interface Users {
  id: string;
  username: string;
  role: string;
}

export interface Tokens {
  id: string;
  owner: string;
  secretT: string;
}


@Component({
  selector: 'app-userops',
  templateUrl: './userops.component.html',
  styleUrls: ['./userops.component.css']
})
export class UseropsComponent implements OnInit {


  usersTable = {} as Users;
  data: Users[] = [];
  users: Users[] = [];

  dataToken: Tokens[] = [];
  tokens: Tokens[] = [];


  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private userService: UserService,
    private commitService: CommitService) { }

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

          for(var i=0; i<this.data.length; i++){
            
            if(this.data[i].role=="admin"){
              this.users.push(this.data[i]);
            }
            
          }
        },
        (err) => {console.log(err);
    
          if(err=="TypeError: Cannot read property 'message' of null"){
            alert("Expired Session.")
            this.router.navigate(['/login']);
          }
          
      });   

      await this.commitService.getAllTokens(this.tokenpass)
        .subscribe((data: Tokens[]) => {

          this.dataToken = data;

          for(var i=0; i<this.dataToken.length; i++){
            
              this.tokens.push(this.dataToken[i]);
            
            
          }
        },
        (err) => {console.log(err);
    
          if(err=="TypeError: Cannot read property 'message' of null"){
            alert("Expired Session.")
            this.router.navigate(['/login']);
          }
          
      });  
  }

  createUser(){
    this.router.navigate(['/createuser']); 
  }

  deleteUser(user:Users){
    if(confirm("Are you sure to delete "+user.username)) {
      this.userService.delete(this.tokenpass, user.id)
            .subscribe(data => {

      });

      alert("User deleted correctly.")
      window.location.reload();
    }
  }

  updateUser(user:Users){
    localStorage.setItem('updateuser', JSON.stringify(user));
    this.router.navigate(['/updateuser']); 
  }

  createToken(){
    this.router.navigate(['/createtoken']); 
  }

  deleteToken(token:Tokens){
    if(confirm("Are you sure to delete this token?")) {
      this.commitService.deleteToken(this.tokenpass, token.owner)
            .subscribe(data => {

      });

      alert("Token deleted correctly.")
      window.location.reload();
    }
  }

  updateToken(token:Tokens){
    localStorage.setItem('updatetoken', JSON.stringify(token.owner));
    this.router.navigate(['/updatetoken']); 
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

  hashPassword(password: string){
    return "*".repeat(password.length/2)
  }


  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
