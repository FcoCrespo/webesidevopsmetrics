import { DatePipe } from '@angular/common';
import { Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { CommitService } from 'src/app/services/commit.service';
import { Router, ActivatedRoute } from '@angular/router';

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
  selector: 'app-commitsauthor',
  templateUrl: './commitsauthor.component.html'
})
export class CommitsauthorComponent implements OnInit {

  data: CommitsData[];
  commits: CommitsData[] = [];
  public commitsLenght : number = 0;

  branch: BranchesData;

  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  public authorName: string = "";
  public filtro_valor: string = "";
  

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
  }

  ngOnInit() {
    document.body.classList.add('bg-img-white');
    var owner = "";

    if(this.branch.repository.localeCompare("eSalud")==0){
      console.log("entro en sherrerap");
      owner='sherrerap';
    }
    else{
      console.log("entro en crespo");
      owner='FcoCrespo';
    }

    this.commitService.getCommitsBranchAuthor(this.tokenpass, this.branch.name, this.authorName, this.branch.repository, owner)
      .subscribe((data: CommitsData[]) => {
        this.data = data;
        this.commitsLenght = data.length;
        console.log(this.commitsLenght);
        this.commits = this.data;
        
        document.getElementById("buscador")!.style.visibility = "visible";
        document.getElementById("titulo")!.innerText="Commits Information in Branch "+this.branch.name+" of "+this.authorName+". Total: "+data.length;

    });
  }

  setDateTime(dateTime) {
    let pipe = new DatePipe('es-ES');

    const time = pipe.transform(dateTime, 'mediumTime', 'UTC');

    const date = pipe.transform(dateTime, 'dd MMMM yyyy', 'UTC');

    return date + ' Hour: ' + time;
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
  
}
