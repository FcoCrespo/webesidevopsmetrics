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
  selector: 'app-createtoken',
  templateUrl: './createtoken.component.html',
  styleUrls: ['./createtoken.component.css']
})
export class CreatetokenComponent implements OnInit {

  
  data: Tokens[] = [];
  tokens: Tokens[] = [];

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

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

      await this.commitService.getAllTokens(this.tokenpass)
        .subscribe((data: Tokens[]) => {

          document.getElementById('userlogin')!.innerText = this.username;
          this.data = data;
          this.tokens = this.data;
        },
        (err) => {console.log(err);
    
          if(err=="TypeError: Cannot read property 'message' of null"){
            alert("Expired Session.")
            this.router.navigate(['/login']);
          }
          
        });   
  }
  
  createNewToken(){

    var ownerinput= (<HTMLInputElement>document.getElementById('idownerinput')).value;
    var secretTinput= (<HTMLInputElement>document.getElementById('idsecretTinput')).value;

    var existe = false;
    var strongRegex = new RegExp("^(?=.*[a-z])(?=.*[A-Z])(?=.*[0-9])(?=.{8,})");

    if (ownerinput === undefined 
      || ownerinput === ''
      || secretTinput === ''
      || secretTinput === undefined) {

      
      alert("Some fields needed for a new token are empty.")

    } 

    else{

      for(var i=0; i<this.tokens.length; i++){
        if(this.tokens[i].owner===ownerinput){
          existe=true;
        }
      }

      if(existe==true){
        alert("The owner for a new token already exists in the system. Write other.");
        this.ownervalue='';
      }
      else{

            const message = {owner:ownerinput,
              secretT:secretTinput};

            this.commitService.saveToken(this.tokenpass, message)
            .subscribe(data => {

            });    

            alert("New token added correctly.");
            this.goUserOps();


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
