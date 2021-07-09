import { HostListener, Component, OnInit, AfterViewInit } from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-aboutme',
  templateUrl: './aboutme.component.html',
  styleUrls: ['./aboutme.component.css']
})
export class AboutmeComponent implements OnInit, AfterViewInit {

  public username: string = "";
  public role: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService) {

      var values = JSON.parse(localStorage.getItem("currentUser")!);
      this.username = values.username;
      this.role  = values.role;
      
    }

  ngOnInit(): void {
  }

  ngAfterViewInit(){

    console.log("afterinit");
    setTimeout(() => {
      document.getElementById('userlogin')!.innerText = this.username;
    });
    
  }

  webESI(){

    window.location.href = 'https://esi.uclm.es/';
  }

  webUCLM(){

    window.location.href = 'https://www.uclm.es/';
  }


  goHome(){
		this.router.navigate(['/repos']); // navigate to other page
	}

  goUserOps(){
    if(this.role==='admin'){
      this.router.navigate(['/userops']); // navigate to other page
    }
    else{
      this.router.navigate(['/useroptions']); // navigate to other page
    }
		
	}

  goAboutMe(){
		this.router.navigate(['/aboutme']); // navigate to other page
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
