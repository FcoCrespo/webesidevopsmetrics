import { HostListener, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

export interface RepositoryData {
  repository:string;  
  owner: string;
}

export interface UsersGithub{
  id:string;
  idGithub:string;
  name:String;
  login:String;
  avatarURL:String;
  email:String;
  repositories:RepositoryData[];
}

@Component({
  selector: 'app-usersgithub',
  templateUrl: './usersgithub.component.html',
  styleUrls: ['./usersgithub.component.css']
})
export class UsersgithubComponent implements OnInit {

  
  data: UsersGithub[] = [];
  repositories: RepositoryData[] = [];
  usersGithub: UsersGithub[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
  public idusergithub: string = "";
  public names: string = "";
  public chartData: string = "";
  public repositoriesLenght : number = 0;
  public usersGithubLenght : number = 0;
  index:number =1;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commitService : CommitService,) {

      var values = JSON.parse(localStorage.getItem("currentUser")!);
      this.username = values.username;
      this.tokenpass = values.tokenPass;
      this.role = values.role;
      this.idusergithub = values.userGithub;
      this.repositoriesLenght = 0;



  }

  ngOnInit() {


    document.body.classList.add('bg-img-white');

    this.commitService.getUsersGithub(this.tokenpass)
      .subscribe((data: UsersGithub[]) => {
        this.data = data;

        if(this.role==="manager" || this.role==="dev"){
          for(var i=0; i<data.length; i++){
            if(data[i].id === this.idusergithub){
              this.usersGithub.push(data[i]);
            }
          }
        }
        else{
          this.usersGithub = this.data;
        }
        
        

        localStorage.setItem('usersGithubRepo', JSON.stringify(this.usersGithub));
        
        
      },
      (err) => {console.log(err);
  
        if(err=="TypeError: Cannot read property 'message' of null"){
          alert("Expired Session.")
          this.router.navigate(['/login']);
        }
        
      });
    
  }

  ngAfterViewInit(){

    console.log("afterinit");
    setTimeout(() => {
      document.getElementById('userlogin')!.innerText = this.username;
      document.getElementById('titlePage')!.innerText = "Users Github in the System from All Repositories";
    });
    
   }

  get getUsername(): string {
    return this.username;
  }

  get getRole(): string {
    return this.role;
  }

  get getChartData(): string {
    return this.chartData;
  }

  clickEvent(repository: RepositoryData){
    localStorage.setItem('RepositoryData', JSON.stringify(repository));
    this.router.navigate(['/branches']);      
  }

  

  async AddNewRepository(){
    var reponameinput= (<HTMLInputElement>document.getElementById('idrespositoryinput')).value;
    var ownerinput= (<HTMLInputElement>document.getElementById('idownerinput')).value;
    
    console.log(reponameinput);
    console.log(ownerinput);

    if (reponameinput === undefined 
      || reponameinput === ''
      || ownerinput === ''
      || ownerinput === undefined) {

      
      alert("Some fields needed for a new repository are empty.")

    }

    else{

        await this.commitService.getBranches(this.tokenpass, reponameinput, ownerinput)
        .subscribe(async data => {
          await this.commitService.getCommits(this.tokenpass, reponameinput, ownerinput)
          .subscribe(data => {   

          });
             
            alert("Repository added.")
            window.location.reload();
        },
        (err) => {console.log(err)
                  alert("The repository does not exist or you do not have permissions on it.")
        });
       
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

  goRepositoryInfo(){
    this.router.navigate(['/repositoryinfo']); 
  }

  
  goUserRepo(repository: RepositoryData){
    localStorage.setItem('RepositoryData', JSON.stringify(repository));
    this.router.navigate(['/repositoryinfo']);      
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

