import { HostListener, Component, OnInit, AfterViewInit, ElementRef, ViewChild } from '@angular/core';
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
  selector: 'app-repositoryinfo',
  templateUrl: './repositoryinfo.component.html',
  styleUrls: ['./repositoryinfo.component.css']
})
export class RepositoryinfoComponent implements OnInit, AfterViewInit {

  
  data: RepositoryData[] = [];
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
    
  
  }

  ngAfterViewInit(){

    console.log("afterinit");
    setTimeout(() => {
      document.getElementById('userlogin')!.innerText = this.username;
      var dataRepository = JSON.parse(localStorage.getItem("RepositoryData")!);
      document.getElementById('titlePage')!.innerText = "Repository Info - Name: "+dataRepository.repository+" , Owner: "+dataRepository.owner;
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

  clickControlMetrics(){
    this.router.navigate(['/branches']);
  }
  clickProductMetrics(){
    this.router.navigate(['/productmetricsrepo']);
  }

  clickIssues(){
    this.router.navigate(['/issuesrepo']);
  }

  clickTestMetrics(){
    this.router.navigate(['/testmetricsrepo']);
  }

  clickRepoOps(){
    this.router.navigate(['/repoops']);
  }

  clickUsers(){
    this.router.navigate(['/repousers']);
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

