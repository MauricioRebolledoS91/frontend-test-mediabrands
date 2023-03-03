import { Component, EventEmitter, Output } from '@angular/core';
import { FormBuilder, FormGroup, Validators } from '@angular/forms';
import { ToastrService } from 'ngx-toastr';
import { user } from 'src/app/models/user';
import { UserService } from 'src/app/services/user.service';

@Component({
  selector: 'app-create-user',
  templateUrl: './create-user.component.html',
  styleUrls: ['./create-user.component.css']
})
export class CreateUserComponent {
  form: FormGroup;
  action = 'Agregar';
  id: string | undefined;
  @Output() userEditedOrAdded = new EventEmitter<void>();

  constructor(private fb: FormBuilder,
    private userService: UserService,
    private toastr: ToastrService){
    this.form = this.fb.group({
      firstName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(25)]],
      lastName: ['', [Validators.required, Validators.minLength(4), Validators.maxLength(25)]],
      email: ['', [Validators.required, Validators.minLength(8), Validators.maxLength(25), Validators.email]],
      userName: ['', [Validators.required, Validators.minLength(3), Validators.maxLength(12)]]
    })
  }

  ngOnInit(): void{
    this.userService.getUserEdit().subscribe(data => {
      this.id = data.id;
      console.log(data);
      this.action = 'Editar';
      this.form.patchValue({
        firstName: data.firstName,
        lastName: data.lastName,
        email: data.email,
        userName: data.userName
      })
    })
  }

  saveUser(){
    if(this.id === undefined){
      this.addUser();
    }else{
      this.editUser(this.id);
    }

  }

  editUser(id: string) {
    const user: any = {
      id: id,
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      userName: this.form.value.userName
    }
    this.userService.updateUser(id, user).subscribe(data =>{
      if(data.success){
        this.action = 'Agregar';
      this.form.reset();
      this.id = undefined;
      this.toastr.info('El usuario se actualizó con éxito', 'Registro actualizado');
      this.userEditedOrAdded.emit();
       }else{
      this.toastr.error(data.message,'Error');
      this.userEditedOrAdded.emit();
      }

    } , error => {
      console.log(error);
      this.toastr.error(error,'Error');
    })
  }

  addUser(){
    const user: user = {
      id: '121',
      firstName: this.form.value.firstName,
      lastName: this.form.value.lastName,
      email: this.form.value.email,
      userName: this.form.value.userName
    }
    this.userService.saveUser(user).subscribe(data => {
      console.log('usuario registrado');
      if(data.success){
      this.toastr.success('El usuario se ha registrado con éxito','Usuario registrado');
      this.userEditedOrAdded.emit();
      this.form.reset();
      }else{
      this.toastr.error(data.message,'Error');
      this.userEditedOrAdded.emit();
      }

    }, error => {
      console.log(error);
      const errorMessage = error.error.message; // obtener el mensaje de error
    const cleanErrorMessage = errorMessage.split(':')[1].trim(); // extraer solo el mensaje limpio
      this.toastr.error(cleanErrorMessage,'Error');
    })
    console.log(user);
  }

}
