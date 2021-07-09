import { HostListener, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { CommitService } from 'src/app/services/commit.service';

export interface Tokens {
  id: string;
  owner: string;
  secretT: string;
}


@Component({
  selector: 'app-updatetoken',
  templateUrl: './updatetoken.component.html',
  styleUrls: ['./updatetoken.component.css']
})
export class UpdatetokenComponent implements OnInit {


  data: Tokens[] = [];
  tokens: Tokens[] = [];

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  public updateowner: string = "";

  ownervalue: string="";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private commitService: CommitService) { }

    async ngOnInit() {
      document.body.classList.add('bg-img-white');

      var values = JSON.parse(localStorage.getItem("currentUser")!);
      this.username = values.username;
      this.tokenpass = values.tokenPass;
      this.role = values.role;

      var updatetoken = JSON.parse(localStorage.getItem("updatetoken")!);

      this.updateowner= updatetoken;

      await this.commitService.getAllTokens(this.tokenpass)
        .subscribe((data: Tokens[]) => {

          document.getElementById('userlogin')!.innerText = this.username;
          
          this.data = data;
          this.tokens = this.data;

          this.ownervalue = this.updateowner;
      }); 
      
      
  }


  UpdateUser(){
    var newtokeninput= (<HTMLInputElement>document.getElementById('idnewtokeninput')).value;

    if (newtokeninput === ''
      || newtokeninput === undefined) {

      
      alert("Some fields needed for updating the token are empty.")

    } 

    else{


            const message = {owner: this.ownervalue,
                secretT:newtokeninput};
            

            this.commitService.updateToken(this.tokenpass, message)
            .subscribe(data => {

            });    

            alert("User updated correctly.");
            this.goUserOps();
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

