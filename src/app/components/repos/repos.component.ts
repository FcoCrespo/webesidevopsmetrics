import { Component, OnInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';

export interface RepositoryData {
  repository:string;  
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

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
