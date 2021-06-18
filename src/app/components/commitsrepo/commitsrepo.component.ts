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
import * as moment from 'moment';
import { ThrowStmt } from '@angular/compiler';

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
  pushedDateStr: string;
  changedFiles: string;
  authorName: string;
  branch: string;
  repository: string;
}

@Component({
  selector: 'app-commitsrepo',
  templateUrl: './commitsrepo.component.html',
  styleUrls: ['./commitsrepo.component.css']
})
export class CommitsrepoComponent implements OnInit, AfterViewInit {

  
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
  colorsArray: Array<string> = [];
  semitransparentcolorsArray: Array<string> = [];
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

    semitransparentcolors: Array<string> = ['rgba(255, 99, 132,0.3)',
    'rgba(54, 162, 235, 0.2)',
    'rgba(255, 206, 86, 0.2)',
    'rgba(75, 192, 192, 0.2)',
    'rgba(153, 102, 255, 0.2)',
    'rgba(255, 159, 64, 0.2)',
    'rgba(255, 0, 54, 0.2)',
    'rgba(219, 217, 36, 0.2)',
    'rgba(0, 255, 201, 0.2)'];


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

      this.branch = JSON.parse(localStorage.getItem("BranchData")!);
  
  
      this.chartData = localStorage.getItem("DataLabelChart") + " " + localStorage.getItem("DataChart");

  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');

    this.commitService.getCommitsBranch(this.tokenpass, this.branch.name, this.branch.repository, this.owner)
      .subscribe((data: CommitsData[]) => {
        
        this.data = data;
        this.commitsLenght = data.length;
        this.commits = this.data;

        for(var i=0; i<this.commits.length; i++){
          var fecha = moment(new Date(this.commits[i].pushedDate)).format('DD-MMM-YYYY');
          this.commits[i].pushedDateStr=fecha;
        }

      

        this.obtenerLabelsCommitsAuthor();
        this.contarCommitsAuthor();
        
        var colores = 0;
        for (var cont = 0; cont < this.labelsCommitsAuthor.length; cont++) {
          this.colorsArray.push(this.colors[colores]);
          this.semitransparentcolorsArray.push(this.semitransparentcolors[colores]);
          colores = colores + 1;
          if (colores == this.colors.length) {
            colores = 0;
          }
        }
        
        document.getElementById('chartTimelineCommits')!.innerHTML='<div class="card-body"><div id="divChartTimelineCommits" class="chart"></div>';
        this.crearCanvasTimelineCommits();
        document.getElementById("report")!.style.visibility = "visible";

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
      this.repositorydata = JSON.parse(localStorage.getItem("RepositoryData")!);
      document.getElementById('titlePage')!.innerText = "Repository Commits - Name: "+this.repositorydata.repository+" , Owner: "+this.repositorydata.owner;
      
     
      
    
    });
    
  }

  obtenerLabelsCommitsAuthor() {
    var labelsCommitsAuthoraux = [];
    for (var i = 0; i < this.commitsLenght; i++) {
      if (this.commits[i].authorName !== undefined) {
        if (labelsCommitsAuthoraux[this.commits[i].authorName]) continue;
        labelsCommitsAuthoraux[this.commits[i].authorName] = true;
        this.labelsCommitsAuthor.push(this.commits[i].authorName);
      }
    }
  }

  contarCommitsAuthor() {
    var cont = 0;

    for (var j = 0; j < this.labelsCommitsAuthor.length; j++) {
      for (var i = 0; i < this.commitsLenght; i++) {
        if (this.commits[i].authorName !== undefined && this.labelsCommitsAuthor[j] !== undefined) {
          if (this.commits[i].authorName.localeCompare(this.labelsCommitsAuthor[j]) == 0) {
            cont = cont + 1;
          }
        }
      }
      this.numCommitsAuthor.push(cont);
      cont = 0;
    }

  }

  crearCanvasTimelineCommits() {

    this.idCanvas = this.idCanvas + 1;
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 555px; height: 555px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChartTimelineCommits')!.appendChild(myCanvasExample);
  
    var ejemplo;

    var cosas=[
        {
          t: '2015-03-18',
          y: 12
        },
        {
          t: '2015-03-30',
          y: 13
        },
        {
          t: '2016-02-14',
          y: 32
        }
    ];
    
   
    console.log(cosas);
    var newElement = false;
    var auxElement;

    var molde = {
        data:  [{
          t: '2015-03-18',
          y: 12
          },
          {
            t: '2015-03-30',
            y: 13
          },
          {
            t: '2016-02-14',
            y: 32
        }],
        label: this.labelsCommitsAuthor[0],
        lineTension: 0,
        fill: true,
        backgroundColor: this.semitransparentcolorsArray[0],
        borderColor: this.colorsArray[0],
        pointRadius: 4,
        pointBackgroundColor: this.semitransparentcolorsArray[0],
        pointBorderColor: this.colorsArray[0]
   };

   cosas=[];

   var datasets=[{
        data: [{
          t: '2015-03-18',
          y: 12
          },
          {
            t: '2015-03-30',
            y: 13
          },
          {
            t: '2016-02-14',
            y: 32
        }],
        label: this.labelsCommitsAuthor[0],
        lineTension: 0,
        fill: true,
        backgroundColor: this.semitransparentcolorsArray[0],
        borderColor: this.colorsArray[0],
        pointRadius: 4,
        pointBackgroundColor: this.semitransparentcolorsArray[0],
        pointBorderColor: this.colorsArray[0]
    }];
   datasets.pop();

    console.log(this.commits);
    console.log("Lenght de datasets: "+datasets.length)

    var color=0;
    for(var a=0; a<this.labelsCommitsAuthor.length; a++){
      for(var i=0; i<this.commits.length; i++){
        if(this.commits[i].authorName===this.labelsCommitsAuthor[a]){
  
          if(cosas.length==0){
            
            var commitDate =  {
              t: this.commits[i].pushedDateStr,
              y: 1
            }
            cosas.push(commitDate);
          }
          else{
            
            for(var j=0; j<cosas.length; j++){
              
              if(this.commits[i].pushedDateStr==cosas[j].t){
                cosas[j].y = cosas[j].y + 1;
              }
              newElement = false;
              if(this.commits[i].pushedDateStr!==cosas[j].t){
                auxElement =  {
                  t: this.commits[i].pushedDateStr,
                  y: 1
                }
                newElement=true;
              }
            }
            
            if(newElement==true){
              cosas.push(auxElement);
              newElement=false;
            }
          }
          newElement = false;
  
        }
        newElement = false;
      }
      molde={
        data: [{
          t: '2015-03-18',
          y: 12
          },
          {
            t: '2015-03-30',
            y: 13
          },
          {
            t: '2016-02-14',
            y: 32
        }],
        label: this.labelsCommitsAuthor[a],
        lineTension: 0,
        fill: true,
        backgroundColor: this.semitransparentcolorsArray[color],
        borderColor: this.colorsArray[color],
        pointRadius: 4,
        pointBackgroundColor: this.semitransparentcolorsArray[color],
        pointBorderColor: this.colorsArray[color]
      }
      molde.data=[];
      for(var c=0; c<cosas.length; c++){
        molde.data.push(cosas[c])
      }
      cosas=[]
      console.log(molde);
      datasets.push(molde);
      console.log("Lenght de datasets tras meter molde: "+datasets.length)
      color++;
      if(this.colorsArray.length==color){
        color=0;
      }
    }
    

    this.charts[1] = new Chart("myChart" + this.idCanvas, {
      type: 'line',
      options: {
        scales: {
          xAxes: [{
            type: 'time',
            time: {
              unit: 'day',
              unitStepSize: 1,
              displayFormats: {
                 'day': 'DD MMM YYYY'
              }
            }
          }],
          yAxes: [{
            ticks: {
                beginAtZero: true
            }
          }]
        }
      },
      data: {
          datasets
      }
    });
    
  }

  pdf(){

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
		this.router.navigate(['/userops']); // navigate to other page
	}

  goAboutMe(){
		this.router.navigate(['/aboutme']); // navigate to other page
	}

  goBranches(){
    this.router.navigate(['/branches']);
  }
  
  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
