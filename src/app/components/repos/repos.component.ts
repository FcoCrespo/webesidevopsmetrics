import { HostListener, Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';

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

@Component({
  selector: 'app-repos',
  templateUrl: './repos.component.html',
  styleUrls: ['./repos.component.css']
})
export class ReposComponent implements OnInit {

  
  data: RepositoryData[] = [];
  repositories: RepositoryData[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
  public names: string = "";
  public chartData: string = "";
  public repositoriesLenght : number = 0;


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
    this.commitService.getRepositories(this.tokenpass)
      .subscribe((data: RepositoryData[]) => {
        this.data = data;
        console.log(this.data);
        this.repositoriesLenght = data.length;
        this.repositories = this.data;
        localStorage.setItem('repositories', JSON.stringify(this.repositories));
        document.getElementById('userlogin')!.innerText = this.username;
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

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
