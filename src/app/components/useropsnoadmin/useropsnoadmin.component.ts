import { HostListener, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';
import { CommitService } from 'src/app/services/commit.service';

export interface Users {
  id: string;
  username: string;
  role: string;
  email: string;
  userGithub: string;
}

export interface Tokens {
  id: string;
  owner: string;
  secretT: string;
}


@Component({
  selector: 'app-useropsnoadmin',
  templateUrl: './useropsnoadmin.component.html',
  styleUrls: ['./useropsnoadmin.component.css']
})
export class UseropsnoadminComponent implements OnInit {


  usersTable = {} as Users;
  data: Users[] = [];
  users: Users[] = [];
  
  

  dataToken: Tokens[] = [];
  tokens: Tokens[] = [];


  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
  public idusergithub: string = "";

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
      this.idusergithub = values.userGithub;

      await this.userService.getAll(this.tokenpass)
        .subscribe((data: Users[]) => {

          document.getElementById('userlogin')!.innerText = this.username;
          this.data = data;

          for(var i=0; i<this.data.length; i++){
            
            
            if(this.data[i].userGithub === this.idusergithub){

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

  
  updateUser(user:Users){
    localStorage.setItem('updateuser', JSON.stringify(user));
    this.router.navigate(['/updateuser']); 
  }

  viewUser(user:Users){
    localStorage.setItem('usergithubid', JSON.stringify(user));
    this.router.navigate(['/usersgithubops']); 
  }

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserOps(){
		if(this.role==='admin'){
      console.log("soy admin");
      this.router.navigate(['/userops']); // navigate to other page
    }
    else{
      console.log("no soy admin");
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
