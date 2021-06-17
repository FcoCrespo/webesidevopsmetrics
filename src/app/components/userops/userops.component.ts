import { HostListener, Component, OnInit} from '@angular/core';
import { AuthService } from 'src/app/services/auth.service';
import { Router, ActivatedRoute } from '@angular/router';
import { UserService } from 'src/app/services/user.service';

export interface Users {
  id: string;
  username: string;
  role: string;
}


@Component({
  selector: 'app-userops',
  templateUrl: './userops.component.html',
  styleUrls: ['./userops.component.css']
})
export class UseropsComponent implements OnInit {


  usersTable = {} as Users;
  data: Users[] = [];
  users: Users[] = [];


  public username: string = "";
  public tokenpass: string = "";
  public role: string = "";

  constructor(private route: ActivatedRoute,
    private router: Router,
    private authService: AuthService, 
    private userService: UserService) { }

    async ngOnInit() {
      document.body.classList.add('bg-img-white');

      var values = JSON.parse(localStorage.getItem("currentUser")!);
      this.username = values.username;
      this.tokenpass = values.tokenPass;
      this.role = values.role;

      await this.userService.getAll(this.tokenpass)
        .subscribe((data: Users[]) => {

          document.getElementById('userlogin')!.innerText = this.username;
          this.data = data;

          for(var i=0; i<this.data.length; i++){
            
            if(this.data[i].role=="admin"){
              this.users.push(this.data[i]);
            }
            
          }
      });    
  }

  createUser(){
    this.router.navigate(['/createuser']); 
  }

  deleteUser(user:Users){
    if(confirm("Are you sure to delete "+user.username)) {
      this.userService.delete(this.tokenpass, user.id)
            .subscribe(data => {

      });

      alert("User deleted correctly.")
      window.location.reload();
    }
  }

  updateUser(user:Users){
    localStorage.setItem('updateuser', JSON.stringify(user));
    this.router.navigate(['/updateuser']); 
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

  goUserGithub(){
    this.router.navigate(['/usersgithub']); 
  }


  logout() {
    localStorage.clear();
    this.authService.logout();
    this.router.navigate(['/login']);
  }


}
