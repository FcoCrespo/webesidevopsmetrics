import {
  ChangeDetectionStrategy,
  ChangeDetectorRef,
  Component,
  Input,
  OnInit,
  QueryList,
  ViewChildren,
  ElementRef,
  AfterViewInit,
  Renderer2,
  HostListener
} from '@angular/core';
import { DatePipe } from '@angular/common';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { Chart } from 'admin-lte/node_modules/chart.js';
import { Observable } from 'rxjs';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import autoTable from 'jspdf-autotable';

export interface BranchesData {
  idGithub: string;
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
  pushedDate: DatePipe;
  changedFiles: string;
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
  commitsTable = {} as UsersCommits;
  commitsTableArray: UsersCommits[] = [];
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




  public trs;

  public repositoryName : string = "";
  public owner : string = "";

  constructor(
    private commitService: CommitService,
    public route: ActivatedRoute,
    public router: Router,
    public authService: AuthService,
    public renderer: Renderer2,
    public elementRef: ElementRef
  ) {
    this.idCanvas = 0;
    var repository = JSON.parse(localStorage.getItem("RepositoryData")!);
    this.repositoryName = repository.repository;
    this.owner = repository.owner;
  }

  async ngOnInit() {
    document.body.classList.add('bg-img-white');


    this.charts = [];
    this.branch = JSON.parse(localStorage.getItem("BranchData")!);
    console.log(this.branch);
    var values = JSON.parse(localStorage.getItem("currentUser")!);
    this.username = values.username;
    this.tokenpass = values.tokenPass;
    this.role = values.role;

    

    await this.commitService.getCommitsBranch(this.tokenpass, this.branch.name, this.branch.repository, this.owner)
      .subscribe((data: CommitsData[]) => {
        
        document.getElementById('userlogin')!.innerText = this.username;
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

        document.getElementById('chartbox')!.innerHTML='<div class="card-body"><div id="divChartBar" class="chart"></div>';
        document.getElementById('chartbox2')!.innerHTML='<div class="card-body"><div id="divChartCircle" class="chart"></div>';
        document.getElementById('chartbox3')!.innerHTML='<div class="card-body"><div id="divChartLine" class="chart"></div>';
        document.getElementById('chartbox4')!.innerHTML='<div class="card-body"><div id="divChartPie" class="chart"></div>';

        this.crearCanvasBarCommitAuthor();
        this.crearCanvasDonutCommitAuthor();
        this.crearCanvasLineCommitAuthor();
        this.crearCanvasPieCommitAuthor();
        document.getElementById("report")!.style.visibility = "visible";
        console.log(this.charts[0]);
        console.log(this.charts[1]);

        this.obtenerDatosTabla();
        console.log(this.commitsTableArray);
        this.rellenarDatosTabla();

        this.ngAfterViewInit();


      });

  }

  public ngAfterViewInit() {
    // Solution for catching click events on anchors using querySelectorAll:
    this.trs = this.elementRef.nativeElement.querySelectorAll('tr');
    this.trs.forEach((tr: HTMLTableElement) => {
      tr.addEventListener('click', this.handleAnchorClick)
    })
  }

  public handleAnchorClick = (event: Event) => {
    event.preventDefault();

    const element = event.target as HTMLTableElement;
    const padre = element.parentNode;
    const hijos = padre?.children;

    // @ts-ignore
    if (hijos[0].textContent !== '#' && hijos[1].textContent !== 'User' && hijos[2].textContent !== '# Commits') {
      // @ts-ignore
      console.log(hijos[0].textContent + " - " + hijos[1].textContent + " - " + hijos[2].textContent);
      // @ts-ignore
      localStorage.setItem('DataLabelChart', hijos[1].textContent);
      this.router.navigate(['/commitsauthor']);
    }


  }

  rellenarDatosTabla() {
    var myhtml = "";
    var myhtmlaux = "";
    for (var i = 0; i < this.commitsTableArray.length; i++) {

      var tr = document.createElement('tr');
      tr.setAttribute("style", "background-color:white");
      tr.setAttribute("onmouseover", "this.setAttribute('style','background-color:#D3D3D3; cursor:pointer;');");
      tr.setAttribute("onmouseout", "this.setAttribute('style','background-color:white');");


      var td1 = document.createElement('td');
      td1.innerText = String(this.commitsTableArray[i].n);
      var td2 = document.createElement('td');
      td2.innerText = String(this.commitsTableArray[i].name);
      var td3 = document.createElement('td');
      td3.innerText = String(this.commitsTableArray[i].ncommits);

      tr.appendChild(td1);
      tr.appendChild(td2);
      tr.appendChild(td3);

      document.getElementById('tableBodyCommits')!.appendChild(tr);

    }


  }

  obtenerDatosTabla() {

    for (var i = 0; i < this.labelsCommitsAuthor.length; i++) {

      this.commitsTable = { n: (i + 1), name: this.labelsCommitsAuthor[i], ncommits: this.numCommitsAuthor[i] };

      this.commitsTableArray.push(this.commitsTable);
    }
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
    document.getElementById('divChartBar')!.appendChild(myCanvasExample);
    var myRouter = this.router;
    this.charts[0] = new Chart("myChart" + this.idCanvas, {
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

  crearCanvasDonutCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChartCircle')!.appendChild(myCanvasExample);
    var myRouter = this.router;
    this.charts[1] = new Chart("myChart" + this.idCanvas, {
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

  crearCanvasPieCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 250px; height: 250px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChartPie')!.appendChild(myCanvasExample);
    var myRouter = this.router;
    this.charts[1] = new Chart("myChart" + this.idCanvas, {
      type: 'pie',
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

  crearCanvasLineCommitAuthor() {
    this.idCanvas = this.idCanvas + 1;
    console.log(this.idCanvas);
    var myCanvasExample = document.createElement('canvas');
    myCanvasExample.setAttribute("id", "myChart" + this.idCanvas);
    myCanvasExample.setAttribute("style", "min-height: 555px; height: 555px; max-height: 250px; max-width: 100%;");
    document.getElementById('divChartLine')!.appendChild(myCanvasExample);
    var myRouter = this.router;

    var dataSecond2 = {
      label: "Alcance",
      data: [5],
      lineTension: 0,
      fill: false,
      borderColor: 'black'
    };

    dataSecond2.data.pop();

    var cont:number =0;
    var alcance:number = 6000;
    var nalc:number = 12;
    var inc:number = alcance/nalc;
  
    for(var m=0; m<nalc; m++){
      cont = cont + inc;
      
      dataSecond2.data.push(cont);
    }


    var cosas:any [] = [];

    var j =0;
    for(var i=0; i<24; i++){
      var anio:number = 2006;
      anio = anio+i;

      var fecha:String = ""+anio;

      

      var ejemplo = {
        label: fecha,
        data: [5],
        lineTension: 0,
        fill: false,
        borderColor: this.colorsCommits[j]
      };

      ejemplo.data.pop();

      for(var m=0; m<12; m++){
        ejemplo.data.push(Math.floor(Math.random() * (8000 - 1000 + 1)) + 1000);
      }
      
      cosas.push(ejemplo);

      j++;

      if(j==this.colorsCommits.length){
        j=0;
      }
    }

   

    var elementos={
      labels: ['January', 'February', 'March', 'April', 'May', 'June', 'July', 'August', 'September', 'October', 'November', 'December'],
      datasets: [dataSecond2]
    }
    elementos.datasets.pop();

    for(var i=0; i<cosas.length; i++){
      elementos.datasets.push(cosas[i])
    }

       
    this.charts[1] = new Chart("myChart" + this.idCanvas, {
      type: 'line',
      data: elementos
    });


    /*this.charts[1] = new Chart("myChart" + this.idCanvas, {
      type: 'line',
      options: {
        scales: {
          xAxes: [{
            type: 'time',
          }]
        }
      },
      data: {
        labels: ["2015-03-15T13:03:00.000+00:00", "2015-03-15T13:03:00.000+00:00", "2016-04-15T13:40:00.000+00:00"],
        datasets: [{
          label: 'Demo',
          data: [{
              t: '2015-03-15T13:03:00.000+00:00',
              y: 12
            },
            {
              t: '2015-03-15T13:03:00.000+00:00',
              y: 13
            },
            {
              t: '2016-04-15T13:40:00.000+00:00',
              y: 32
            }
          ],
          lineTension: 0,
          fill: false,
          borderColor: this.colorsCommits[j],
          pointRadius: 10,
          pointBackgroundColor: '#39FF14'
        }]
      }
    });*/

  }

  async pdf() {

    let ids: Array<string>;
    ids = ['divChart', 'divChartCircle'];

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
          transform: 'scale(' + scale + ')',
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
    doc.save('Commits_report_Branch_' + this.branch.name + "_Repository_" + this.branch.repository + "-" + f.getDate() + "-" + mes + "-" + f.getFullYear() + '-' + f.getHours() + '-' + f.getMinutes() + '.pdf');


  }

  goHome() {
    this.router.navigate(['/repos']); // navigate to other page
  }

  goToRepositories(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goToBranches(){
		this.router.navigate(['/branches']); // navigate to other page
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
