import { HostListener, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';


export interface RepositoryData {
  repository:string;  
  owner: string;
}

export interface Users {
  id: string;
  username: string;
  role: string;
  email: string;
  userGithub: string;
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
  selector: 'app-usergithubops',
  templateUrl: './usergithubops.component.html',
  styleUrls: ['./usergithubops.component.css']
})
export class UsergithubopsComponent implements OnInit {

  
  data: UsersGithub[] = [];
  repositories: RepositoryData[] = [];
  usersGithubtotal: UsersGithub[] = [];
  usersGithub: UsersGithub[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
  public names: string = "";
  public chartData: string = "";
  public repositoriesLenght : number = 0;
  public usersGithubLenght : number = 0;
  index:number =1;

  usergithubid = {} as Users;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commitService : CommitService,) {

      var values = JSON.parse(localStorage.getItem("currentUser")!);
      this.username = values.username;
      this.tokenpass = values.tokenPass;
      console.log(this.tokenpass);
      this.role = values.role;
      this.names = "BRANCHES \n";
      this.repositoriesLenght = 0;


    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");

  }

  ngOnInit() {


    document.body.classList.add('bg-img-white');
    this.usergithubid =  JSON.parse(localStorage.getItem("usergithubid")!);

    this.commitService.getUsersGithub(this.tokenpass)
      .subscribe((data: UsersGithub[]) => {
        this.data = data;
        console.log(this.data);
        this.usersGithubLenght = data.length;
        this.usersGithubtotal = this.data;
        for(var i=0; i<this.usersGithubLenght; i++){
          if(this.usersGithubtotal[i].id == this.usergithubid.userGithub){
            this.usersGithub.push(this.usersGithubtotal[i]);
          }
        }
        
        
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


  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserOps(){
		this.router.navigate(['/userops']); // navigate to other page
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

