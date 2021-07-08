import { HostListener, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { IssueService } from 'src/app/services/issue.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface RepositoryData {
  repository:string;  
  owner: string;
}

export interface UserGithubRepo {
   idusergithub: string;
   repository: string;
   owner: string;
}


@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  
  data: RepositoryData[] = [];
  repositories: RepositoryData[] = [];

  reposuser: UserGithubRepo[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
  public names: string = "";
  public chartData: string = "";
  public repositoriesLenght : number = 0;


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commitService : CommitService,
    private issueService : IssueService) {

    var values = JSON.parse(localStorage.getItem("currentUser")!);
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    this.role = values.role;
    this.names = "BRANCHES \n";
    this.repositoriesLenght = 0;


    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");

  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');
    this.commitService.getRepositories(this.tokenpass)
      .subscribe((data: RepositoryData[]) => {

        if(this.role!=='admin'){
          console.log("entro")
          var values = JSON.parse(localStorage.getItem("currentUser")!);
          console.log(values.userGithub)
          this.commitService.getReposUserGithub(this.tokenpass, values.userGithub)
          .subscribe((datareposuser: UserGithubRepo[]) => {

            this.reposuser = datareposuser;

            for(var i = 0; i<this.reposuser.length; i++){
        
              for(var j = 0; j<data.length; j++){
             
                if(this.reposuser[i].repository === data[j].repository && this.reposuser[i].owner === data[j].owner){

                  this.repositories.push(data[j]);
                }
                
              }
            }

          });
        }
        else{
          this.data = data;
          this.repositoriesLenght = data.length;
          this.repositories = this.data;
        }
        
        localStorage.setItem('repositories', JSON.stringify(this.repositories));
        document.getElementById('userlogin')!.innerText = this.username;
    },
    (err) => {

      if(err=="TypeError: Cannot read property 'message' of null"){
        alert("Expired Session.")
        this.router.navigate(['/login']);
      }
      
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
    this.router.navigate(['/repositoryinfo']);      
  }

  

  AddNewRepository(){
    var reponameinput= (<HTMLInputElement>document.getElementById('idrespositoryinput')).value;
    var ownerinput= (<HTMLInputElement>document.getElementById('idownerinput')).value;
    
  
    if (reponameinput === undefined 
      || reponameinput === ''
      || ownerinput === ''
      || ownerinput === undefined) {

      
      alert("Some fields needed for a new repository are empty.")

    }

    else{
      var existe = false;
      for(var i=0; i<this.repositories.length; i++){
        if(this.repositories[i].owner === ownerinput && this.repositories[i].repository === reponameinput){
          existe =true;
        }
      }

      if(existe){
        alert("This repository is already in the system.")
      }
      else{

        this.commitService.getBranches(this.tokenpass, reponameinput, ownerinput)
        .subscribe(dataCommits => {   
            alert("Adding repository "+ reponameinput+ ".")
            window.location.reload();
        },
        (err) => {
                  alert("The repository does not exist or you do not have permissions on it.")
                  window.location.reload();
        });
        this.commitService.getCommits(this.tokenpass, reponameinput, ownerinput)
        .subscribe(dataCommits => {   
        
        });


        this.issueService.getIssues(this.tokenpass, reponameinput, ownerinput)
          .subscribe(dataIssues => {   

        });
        
        
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
