import { HostListener ,Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { DatePipe } from '@angular/common';

export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

export interface BranchesLastCommit {
  idGithub:string;  
  name:string; 
  repository: string;
  oid: string;
  pushedDate: Date;
  authorname: string;
  authorid: string;
  authoridGithub: string;
}


@Component({
  selector: 'app-branches',
  templateUrl: './branches.component.html',
  styleUrls: ['./branches.component.css']
})

export class BranchesComponent implements OnInit {

 
  data: BranchesData[] = [];
  branches: BranchesData[] = [];
  branchesLastCommit: BranchesLastCommit[] = [];
  branchesLastCommitOrdered: BranchesLastCommit[] = [];
  BranchesComplete: BranchesLastCommit[] = [];
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
  

  async ngOnInit() {

    document.body.classList.add('bg-img-white');

    await this.commitService.getLastCommitRepo(this.tokenpass, this.repositoryName)
          .subscribe(async(data: BranchesLastCommit[]) => {

            this.branchesLastCommit = data;
            console.log(this.branchesLastCommit);
            this.branchesLastCommitOrdered = this.sortData();
            console.log(this.branchesLastCommitOrdered);
            
           
            await this.commitService.getBranches(this.tokenpass, this.repositoryName, this.owner)
            .subscribe(async(data: BranchesData[]) => {
                this.data = data;
                document.getElementById('userlogin')!.innerText = this.username;
                this.branchesLenght = data.length;
                this.branches = this.data;
                console.log(this.branches);
                if(this.data.length==0){
                  console.log("Needs order.")
                  document.getElementById("labelorderrepository")!.style.visibility = "visible";
                  document.getElementById("buttonorderrepository")!.style.visibility = "visible";
                }
                else{
                  localStorage.setItem('branches', JSON.stringify(this.branches));
        
                  this.repositoryName = this.branches[0].repository;
                  document.getElementById("repositoryname")!.style.visibility = "visible";

                  for(var i=0; i<this.branchesLastCommitOrdered.length; i++){
                    for(var j=0; j<this.branches.length; j++){
                    
                      if(this.branches[j].idGithub===this.branchesLastCommitOrdered[i].idGithub){
                        this.BranchesComplete.push(this.branchesLastCommitOrdered[i]);
                      }

                    }
                  }

                }
            });
    });

  }

  sortData() {
    return this.branchesLastCommit.sort((a, b) => {
      return <any>new Date(b.pushedDate) - <any>new Date(a.pushedDate);
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

  clickEvent(branch: BranchesLastCommit){
    localStorage.setItem('BranchData', JSON.stringify(branch));
    this.router.navigate(['/commitsmetrics']);      
  }

  OrderRepository(){
    console.log(this.repositoryName+" "+this.owner);

    this.commitService.getBranchesFirstCommit(this.tokenpass, this.repositoryName, this.owner)
            .subscribe(data => {
              window.location.reload();
    }
    ,
        (err) => {console.log(err)
          window.location.reload();
    });
  }

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goToRepositories(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserGithub(){
    this.router.navigate(['/usersgithub']); 
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

  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
