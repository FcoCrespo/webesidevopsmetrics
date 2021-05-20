import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'admin-lte/node_modules/chart.js';
import { Observable } from 'rxjs';
import jsPDF from 'jspdf';
import html2canvas from 'html2canvas';

export interface BranchesData {
  idGithub: string;
  repository: string;
  name: string;
  order: string;
}

export interface CommitsData {
  id: string;
  oid: string;
  messageHeadline: string;
  message: string;
  pushedDate: DatePipe;
  changedFiles: number;
  authorName: string;
  branch: string;
  repository: string;
}

@Component({
  selector: 'app-commitsmetrics',
  changeDetection: ChangeDetectionStrategy.OnPush,
  templateUrl: './commitsmetrics.component.html',
  styleUrls: ['./commitsmetrics.component.css']
})
export class CommitsmetricsComponent implements OnInit {

  public idCanvas: number = 0;

  branch = {} as BranchesData;
  data: CommitsData[] = [];
  commits: CommitsData[] = [];

  public commitsLenght: number = 0;

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  labelsCommitsDate: Array<string> = [];
  numCommitsDate: Array<number> = [];

  labelsCommitsAuthor: Array<string> = [];
  numCommitsAuthor: Array<number> = [];

  ordersBranches: Array<string> = [];
  colorsCommits: Array<string> = [];
  charts: Array<Chart> = [];
  colors: Array<string> = ['rgb(255, 99, 132)',
    'rgb(54, 162, 235)',
    'rgb(255, 206, 86)',
    'rgb(75, 192, 192)',
    'rgb(153, 102, 255)',
    'rgb(255, 159, 64)',
    'rgb(255, 0, 54)',
    'rgb(219, 217, 36)',
    'rgb(0, 255, 201)'];


  constructor(
    private commitService: CommitService,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService
  ) {
    this.idCanvas = 0;
  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');
    

    this.branch = JSON.parse(localStorage.getItem("BranchData")!);
    console.log(this.branch);
    var values = JSON.parse(localStorage.getItem("currentUser")!);
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    this.role = values.role;

    var owner = "";

    if (this.branch.repository.localeCompare("eSalud") == 0) {
      console.log("entro en sherrerap");
      owner = 'sherrerap';
    }
    else {
      console.log("entro en crespo");
      owner = 'FcoCrespo';
    }

    this.commitService.getCommitsBranch(this.tokenpass, this.branch.name, this.branch.repository, owner)
      .subscribe((data: CommitsData[]) => {
        this.data = data;
        this.commitsLenght = data.length;
        this.commits = this.data;
        console.log(this.commitsLenght);

        this.obtenerLabelsCommitsAuthor();
        console.log(this.labelsCommitsAuthor);
        this.contarCommitsAuthor();
        console.log(this.numCommitsAuthor);

        var colores = 0;
        for (var cont = 0; cont < this.labelsCommitsAuthor.length; cont++) {
          this.colorsCommits.push(this.colors[colores])
          colores = colores + 1;
          if (colores == this.colors.length) {
            colores = 0;
          }
        }
        this.crearCanvasBarCommitAuthor();
        this.crearCanvasPieCommitAuthor();
      });

    document.getElementById("report")!.style.visibility = "visible";

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

  crearCanvasBarCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChart')!.appendChild(myCanvasExample);
    var myRouter = this.router;
    var myChart = new Chart("myChart" + this.idCanvas, {
      type: 'bar',
      data: {
        labels: this.labelsCommitsAuthor,
        datasets: [{
          label: 'Number of Commits per Author in ' + this.branch.name + ' Branch ',
          data: this.numCommitsAuthor,
          backgroundColor: this.colorsCommits,
          borderColor: this.colorsCommits,
          borderWidth: 1
        }]
      },
      options: {
        scales: {
          yAxes: [{
            ticks: {
              beginAtZero: true
            }
          }]
        }
      }
    });
  }

  crearCanvasPieCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChartCircle')!.appendChild(myCanvasExample);
    var myRouter = this.router;
    var myChart = new Chart("myChart" + this.idCanvas, {
      type: 'doughnut',
      data: {
        labels: this.labelsCommitsAuthor,
        datasets: [{
          label: 'Number of Commits per Author in ' + this.branch.name + ' Branch ',
          data: this.numCommitsAuthor,
          backgroundColor: this.colorsCommits,
          borderColor: 'rgb(255,255,255)',
          borderWidth: 1
        }]
      }
    });
  }

  goHome() {
    this.router.navigate(['/repos']); // navigate to other page
  }

  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
}
