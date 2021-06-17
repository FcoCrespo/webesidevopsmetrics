import { HostListener, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { FormGroup } from '@angular/forms';

export interface RepositoryData {
  repository:string;  
  owner: string;
}

export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

export interface UsersGithub{
  id:string;
  idGithub:string;
  name:String;
  login:String;
  avatarURL:String;
  repositories:RepositoryData[];
}

@Component({
  selector: 'app-repousers',
  templateUrl: './repousers.component.html',
  styleUrls: ['./repousers.component.css']
})
export class RepousersComponent implements OnInit, AfterViewInit {

  
  data: UsersGithub[] = [];
  repositories: RepositoryData[] = [];
  usersGithub: UsersGithub[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
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
      console.log(this.tokenpass);
      this.role = values.role;
      this.names = "BRANCHES \n";
      this.repositoriesLenght = 0;


    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");

  }

  ngOnInit() {


    document.body.classList.add('bg-img-white');
    var dataRepository = JSON.parse(localStorage.getItem("RepositoryData")!);

    this.commitService.getUserGithubRepo(this.tokenpass, dataRepository.repository, dataRepository.owner)
      .subscribe((data: UsersGithub[]) => {
        this.data = data;
        console.log(this.data);
        this.usersGithubLenght = data.length;
        this.usersGithub = this.data;
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
      var dataRepository = JSON.parse(localStorage.getItem("RepositoryData")!);
      document.getElementById('titlePage')!.innerText = "Repository Users of Repository: "+dataRepository.repository+" , Owner: "+dataRepository.owner;
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

