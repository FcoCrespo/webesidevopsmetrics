import { DatePipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { MatDatepickerModule } from '@angular/material/datepicker'
import { MatFormFieldModule } from '@angular/material/form-field';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';
import { jsPDF } from 'jspdf';
import domtoimage from 'dom-to-image';
import autoTable from 'jspdf-autotable';
import {FormGroup, FormControl} from '@angular/forms';


export interface BranchesData {
  idGithub:string;  
  repository: string;
  name: string;
  order: string;
}

export interface CommitsData {
  id:string;
  oid:string;
  messageHeadline:string;
  message:string;
  pushedDate:DatePipe;
  changedFiles:number;
  authorName:string;
  branch:string;
  repository:string;
}


@Component({
  selector: 'app-commitsauthorfechas',
  templateUrl: './commitsauthorfechas.component.html',
  styleUrls: ['./commitsauthorfechas.component.css']
})
export class CommitsauthorfechasComponent  implements OnInit {

  desde = new  Date('December 25, 1995 13:30:00');
  hasta =  new Date();

  range = new FormGroup({
    start: new FormControl(),
    end: new FormControl()
  });

  data: CommitsData[];
  commits: CommitsData[] = [];
  public commitsLenght : number = 0;

  branch: BranchesData;

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  public authorName: string = "";
  public filtro_valor: string = "";
  
  
  idfechas1:string;
  idfechas2:string;
  fechabeginmodificada:string;
  fechaendmodificada:string;

  constructor(private commitService : CommitService,
              private route: ActivatedRoute,
              private router: Router,
              private authService: AuthService) { 

              var values = JSON.parse(localStorage.getItem("currentUser")!);
              this.username = values.username;
              this.tokenpass = values.tokenPass;
              this.role = values.role;
              this.branch = JSON.parse(localStorage.getItem("BranchData")!);
              this.authorName = localStorage.getItem("DataLabelChart")!;

              this.fechabeginmodificada = this.Adaptarformatofecha(localStorage.getItem("begindate")!);
              this.fechaendmodificada = this.Adaptarformatofecha(localStorage.getItem("enddate")!);

              

  }

  Adaptarformatofecha(fechaSin: String ){
    var datosfecha = fechaSin.split("-");
    console.log(datosfecha[2]+'/'+datosfecha[1]+'/'+datosfecha[0]+' 00:00');
    return datosfecha[2]+'/'+datosfecha[1]+'/'+datosfecha[0]+' 00:00';
  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');
    document.getElementById('userlogin')!.innerText = this.username;
    var owner = "";

    if(this.branch.repository.localeCompare("eSalud")==0){
      console.log("entro en sherrerap");
      owner='sherrerap';
    }
    else{
      console.log("entro en crespo");
      owner='FcoCrespo';
    }

    const message = {reponame:this.branch.repository,
                     authorname:this.authorName,
                     branch:this.branch.name,
                     begindate:this.fechabeginmodificada,
                     enddate:this.fechaendmodificada};
                     

    this.commitService.getCommitsBranchAuthorDates(this.tokenpass, message)
      .subscribe((data: CommitsData[]) => {
        this.data = data;
        this.commitsLenght = data.length;
        console.log(this.commitsLenght);
        this.commits = this.data;

        document.getElementById("buscador")!.style.visibility = "visible";
        document.getElementById("titulo")!.innerText="Commits Information in Branch "+this.branch.name+" of "+this.authorName+". Total: "+data.length;

        document.getElementById("report")!.style.visibility = "visible";
        document.getElementById("tablacommits")!.style.visibility = "visible";
        document.getElementById("selectorfechas1")!.style.visibility = "visible";
        document.getElementById("selectorfechas2")!.style.visibility = "visible";
        document.getElementById("labelFiltroTabla")!.style.visibility = "visible";
        document.getElementById("resetdates")!.style.visibility = "visible";
        document.getElementById("labelFiltroDates")!.style.visibility = "visible";
        document.getElementById("labelfechas1")!.style.visibility = "visible";
        document.getElementById("labelfechas2")!.style.visibility = "visible";
        this.idfechas1=localStorage.getItem("begindate")!;
        this.idfechas2=localStorage.getItem("enddate")!;
        window.scrollTo(0,0);

    });

    
  }

  ReiniciarFechas(){
    this.router.navigate(['/commitsauthor']);
  }

  async pdf(){

    var scale = 2;
    const doc = new jsPDF('l', 'mm', 'a4');

    autoTable(doc, { html: '#imprimir'});
    
    var f = new Date();
    var mes = f.getMonth() + 1;
    doc.save('Commits_report_Author_'+this.authorName+'_Branch_' + f.getDate() + "-" + mes + "-" + f.getFullYear() + '-' + f.getHours() + '-' + f.getMinutes() + '.pdf');

  }

  setDateTime(dateTime) {
    //let pipe = new DatePipe('es-ES');
    let pipe = new DatePipe('en-En');


    const date = pipe.transform(dateTime, 'medium', 'UTC');

    return date;
  }

  handleSearch(value: string){
    this.filtro_valor= value;
  }
  
  

  mostrarResultados(){
    var content = localStorage.getItem("commitsFilter");
    console.log(content);
    let row = document.createElement('p');   
      row.className = 'row'; 
      if(content!=null){
        row.innerHTML = content; 
        document.querySelector('.showInputField')!.appendChild(row); 
      }
  }

  totalCommits(){
    return this.commitsLenght;
  }

  commitDate(commit: CommitsData){
    return this.setDateTime(commit.pushedDate); 
  }

  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goToRepositories(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goToBranches(){
		this.router.navigate(['/branches']); // navigate to other page
	}

  goToCommits(){
		this.router.navigate(['/commitsmetrics']); // navigate to other page
	}


  logout() {
    this.authService.logout();
    this.router.navigate(['/login']);
  }
  
}
