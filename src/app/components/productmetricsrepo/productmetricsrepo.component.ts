import { HostListener, Component, OnInit, AfterViewInit } from '@angular/core';
import { map } from 'rxjs/operators';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'admin-lte/node_modules/chart.js';
import { Observable } from 'rxjs';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import autoTable from 'jspdf-autotable';

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

export interface UsersCommits {
  n: number;
  name: string;
  ncommits: number;
}

export interface CommitsData {
  id: string;
  oid: string;
  messageHeadline: string;
  message: string;
  pushedDate: Date;
  changedFiles: string;
  authorName: string;
  branch: string;
  repository: string;
}

@Component({
  selector: 'app-productmetricsrepo',
  templateUrl: './productmetricsrepo.component.html',
  styleUrls: ['./productmetricsrepo.component.css']
})
export class ProductmetricsrepoComponent implements OnInit {

  
  repositorydata: RepositoryData;
  repositories: RepositoryData[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public owner : string = "";
  public repositoryName : string = "";
  public role: string = "";
  public names: string = "";
  public chartData: string = "";
  public repositoriesLenght : number = 0;

  public idCanvas: number = 0;

  branch = {} as BranchesData;
  commitsTable = {} as UsersCommits;
  commitsTableArray: UsersCommits[] = [];
  data: CommitsData[] = [];
  commits: CommitsData[] = [];

  public commitsLenght: number = 0;

  labelsCommitsDate: Array<string> = [];
  numCommitsDate: Array<number> = [];

  labelsCommitsAuthor: Array<string> = [];
  numCommitsAuthor: Array<number> = [];

  ordersBranches: Array<string> = [];
  colorsCommits: Array<string> = [];
  charts: Array<Chart> = [];
  arrayDeCadenas: Array<string> = [];
  colors: Array<string> = ['rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 0, 54)',
    'rgb(219, 217, 36)',
    'rgb(0, 255, 201)'];


  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService,
    private commitService : CommitService) {

      var repository = JSON.parse(localStorage.getItem("RepositoryData")!);
      this.repositoryName = repository.repository;
      this.owner = repository.owner;
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

    this.commitService.getCommitsBranch(this.tokenpass, this.branch.name, this.branch.repository, this.owner)
      .subscribe((data: CommitsData[]) => {
        
        this.data = data;
        this.commitsLenght = data.length;
        this.commits = this.data;
        console.log(this.commitsLenght);
        console.log(this.commits);
        
        /*var colores = 0;
        for (var cont = 0; cont < this.labelsCommitsAuthor.length; cont++) {
          this.colorsCommits.push(this.colors[colores])
          colores = colores + 1;
          if (colores == this.colors.length) {
            colores = 0;
          }
        }*/

      });

  }

  ngAfterViewInit(){

    console.log("afterinit");
    setTimeout(() => {
      document.getElementById('userlogin')!.innerText = this.username;
      this.repositorydata = JSON.parse(localStorage.getItem("RepositoryData")!);
      document.getElementById('titlePage')!.innerText = "Repository Commits - Name: "+this.repositorydata.repository+" , Owner: "+this.repositorydata.owner;
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
  
  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}

