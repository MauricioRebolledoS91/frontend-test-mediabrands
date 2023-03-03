import { Component } from '@angular/core';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';
import Swal from 'sweetalert2';

@Component({
  selector: 'app-list-users',
  templateUrl: './list-users.component.html',
  styleUrls: ['./list-users.component.css']
})
export class ListUsersComponent {
  userList: user[] = [];
  constructor(private userService: UserService,
    private toastr: ToastrService){
    this.getUsers();
  }

  getUsers(){
    this.userService.getUserList().subscribe(data => {
      console.log(data);
      this.userList = data;
    }, error => {
      console.log(error);
    })
  }

  async deleteUser(UserId: string){
    await Swal.fire({
      title: 'Estás seguro de querer borrar este registro?',
      showDenyButton: true,
      confirmButtonText: 'Yes',
      denyButtonText: 'No',
      customClass: {
        actions: 'my-actions',
        confirmButton: 'order-2',
      }
    }).then((result) => {
      if (result.isConfirmed) {
        this.userService.deleteUser(UserId).subscribe(data =>
          {
            this.toastr.success('El usuario se ha eliminado', 'Registro eliminado');
            this.getUsers();
          }, error => {
            console.log(error);
          });
      } else if (result.isDenied) {
        //Swal.fire('Changes are not saved', '', 'info')
      }
    })


  }

  editUser(user: user){
    this.userService.addUserEdit(user);
  }
}
