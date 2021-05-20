import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})

export class BranchesComponent implements OnInit {

  data: BranchesData[] = [];
  branches: BranchesData[] = [];
  public username: string = "";
  public tokenpass: string = "";
  public repositoryName : string = "";
  public owner : string = "";
  public role: string = "";
  public names: string = "";
  public chartData: string = "";
  public branchesLenght : number = 0;
  

  constructor(private commitService : CommitService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) {
    var values = JSON.parse(localStorage.getItem("currentUser")!);
    var repository = JSON.parse(localStorage.getItem("RepositoryData")!);
    this.repositoryName = repository.repository;
    this.owner = repository.owner;
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    console.log(this.tokenpass);
    this.role = values.role;
    this.names = "BRANCHES \n";
    this.branchesLenght = 0;

    this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");
    
  }
  

  ngOnInit() {

    document.body.classList.add('bg-img-white');
    this.commitService.getBranches(this.tokenpass, this.repositoryName, this.owner)
      .subscribe((data: BranchesData[]) => {
        this.data = data;
        console.log(this.data);
        this.branchesLenght = data.length;
        this.branches = this.data;
        localStorage.setItem('branches', JSON.stringify(this.branches));
        this.repositoryName = this.branches[0].repository;
        document.getElementById("repositoryname")!.style.visibility = "visible";
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

  clickEvent(branch: BranchesData){
    localStorage.setItem('BranchData', JSON.stringify(branch));
    this.router.navigate(['/commitsmetrics']);      
  }

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
