import { HostListener, Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { IssueService } from 'src/app/services/issue.service';
import { MetricService } from 'src/app/services/metric.service';
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
  selector: 'app-repoops',
  templateUrl: './repoops.component.html',
  styleUrls: ['./repoops.component.css']
})
export class RepoopsComponent implements OnInit, AfterViewInit {

  
  data: RepositoryData[] = [];
  repositorydata: RepositoryData;
  repositories: RepositoryData[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";
  public names: string = "";
  public chartData: string = "";
  public repositoriesLenght : number = 0;

  @ViewChild("userlogin") userlogin: ElementRef;
  @ViewChild("titlePage") titlePage: ElementRef;

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commitService : CommitService,
    private issueService : IssueService,
    private metricService : MetricService) {

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
    
  
  }

  ngAfterViewInit(){

    console.log("afterinit");
    setTimeout(() => {
      document.getElementById('userlogin')!.innerText = this.username;
      this.repositorydata = JSON.parse(localStorage.getItem("RepositoryData")!);
      document.getElementById('titlePage')!.innerText = "Repository Update Ops - Name: "+this.repositorydata.repository+" , Owner: "+this.repositorydata.owner;
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

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserGithub(){
    this.router.navigate(['/usersgithub']); 
  }

  goRepositoryInfo(){
    this.router.navigate(['/repositoryinfo']); 
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

  clickUpdateCommits(){
    
    this.commitService.getCommits(this.tokenpass, this.repositorydata.repository, this.repositorydata.owner)
    .subscribe(data => {
     
    });
    alert("Updating commits.")
  }

  clickUpdateIssues(){
    
    this.issueService.getIssues(this.tokenpass, this.repositorydata.repository, this.repositorydata.owner)
    .subscribe(data => {
      this.issueService.updateIssues(this.tokenpass, this.repositorydata.repository, this.repositorydata.owner)
      .subscribe(dataupdate => {
      });
    },
    (err) => {
      alert("The repository does not have any issues to be saved.")
    });
    alert("Updating issues.")
  }

  clickUpdateTestMetrics(){
    
    this.metricService.saveTestMetrics(this.tokenpass, this.repositorydata.repository, this.repositorydata.owner)
    .subscribe(data => {
     
    });
    alert("Updating test metrics.")
  }

  clickUpdateProductMetrics(){
    
    this.metricService.saveMetrics(this.tokenpass, this.repositorydata.repository, this.repositorydata.owner)
    .subscribe(data => {
    
    });
    alert("Updating product metrics.")
  }

  
  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
