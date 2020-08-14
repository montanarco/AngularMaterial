import { Component, OnInit } from '@angular/core';
import { MatDialogRef } from '@angular/material/dialog';
import { User } from '../../models/user';
import { FormControl, Validators } from '@angular/forms';
import { UserService } from '../../services/user.service';

@Component({
  selector: 'app-new-contact-dialog',
  templateUrl: './new-contact-dialog.component.html',
  styleUrls: ['./new-contact-dialog.component.css']
})
export class NewContactDialogComponent implements OnInit {

  constructor(
    private dialogRef: MatDialogRef<NewContactDialogComponent>,
    private service: UserService
    ) { }

  avatars = [
    'svg-1', 'svg-2', 'svg-3', 'svg-4' 
  ];

  name = new FormControl('', [Validators.required]);

  getErrorMessage() {
    if (this.name.hasError('required')) {
      return 'You must enter a value';
    }

    return this.name.hasError('requiered') ? 'You must enter a name' : '';
  }
  user: User;
  ngOnInit(): void {
    this.user = new User();
  }

  save(){
    this.service.addUser(this.user).then(user=>{
      this.dialogRef.close(this.user);
    })
  }

  dismiss(){
    this.dialogRef.close(null);
  }

}
