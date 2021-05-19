import { Component, OnInit  } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';

export interface RepositoryData {
  repository:string;  
  owner: string;
}

@Component({
  selector: 'app-repositories',
  templateUrl: './repositories.component.html',
  styleUrls: ['./repositories.component.css']
})
export class RepositoriesComponent implements OnInit {

  data!: RepositoryData[];
  repositories: RepositoryData[] = [];
  public username: string;
  public tokenpass: string;
  public role: string;
  public names: string;
  public chartData: string;
  public repositoriesLenght : number = 0;


  async pdf(){

    let ids: Array<string>;
    ids = ['imprimir', 'imprimir2'];

    const div = document.getElementById('imprimir')!;
    var scale = 2;
    const doc = new jsPDF('l', 'mm', 'a4');

    const length = ids.length;
    for (let i = 0; i < length; i++) {
      const chart = document.getElementById(ids[i])!;
      await domtoimage.toPng(chart, {
        width: chart.clientWidth * scale,
        height: chart.clientHeight * scale,
        style: {
         transform: 'scale('+scale+')',
         transformOrigin: 'top left'
       },
       quality: 1
      }).then((dataUrl) => {
      
        doc.addImage(dataUrl, 'PNG', 50, 50, 160, 110);
        if (i < (length - 1)) {
          doc.addPage();
        }
        
      });
    }

    var f = new Date();
    var mes = f.getMonth() + 1;
    doc.save('Commits_report_Branch_' + f.getDate() + "-" + mes + "-" + f.getFullYear() + '-' + f.getHours() + '-' + f.getMinutes() + '.pdf');
  

  }

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
    this.router.navigate(['/admin']);      
  }

  
  goHome(){
		this.router.navigate(['/repositories']); // navigate to other page
	}

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
