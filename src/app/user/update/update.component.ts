import { Component, OnInit, Input } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsernameValidators } from "src/app/common/validators/username-validators";
import { IUser } from "src/app/models/user.interface";
import { ActivatedRoute, Router } from "@angular/router";
import { UserService } from "src/app/service/user.service";
import { AppError } from "src/app/common/error/app-error";
import { NotFoundError } from "src/app/common/error/not-found";

@Component({
  selector: "app-update",
  templateUrl: "./update.component.html",
  styleUrls: ["./update.component.css"]
})
export class UpdateComponent {
  id: string;
  user: IUser;
  isUpdated: boolean = false;
  constructor(
    private route: ActivatedRoute,
    private userService: UserService,
    private router: Router){
    route.params.subscribe(param => {
      this.id = param['id'];
      this.userService.getUser(param['id'])
        .subscribe(
          (resp: IUser) => {
            this.user = resp;
            this._setValue(this.user);
          },
          (err: AppError) => {
            console.log(err.originalError);
            if (err instanceof NotFoundError) {
              console.log("Error", err);
              this.router.navigate(["not-found"]);
            } else {
              console.log("Error", err);
              this.router.navigate(["unexpected-error"]);
            }
          }
        )
    })
  }

  form = new FormGroup({
    firstName: new FormControl("", Validators.required),
    lastName: new FormControl("", Validators.required),
    userName: new FormControl(
      "",
      [Validators.required, UsernameValidators.canNotContainSpace],
      UsernameValidators.shouldBeUnique
    ),
    email: new FormControl(
      " ",
      [Validators.email, Validators.required, UsernameValidators.canNotContainSpace],
      UsernameValidators.shouldBeUnique
    )
  });

  get firstName() {
    return this.form.get("firstName");
  }
  get lastName() {
    return this.form.get("lastName");
  }
  get userName() {
    return this.form.get("userName");
  }
  get email() {
    return this.form.get("email");
  }

  reset() {
    this.isUpdated = false;
    this._setValue(this.user);
  }

  updateUser(data){
    console.info('Update User', data);
    this.userService.updateUser(this.id, data)
      .subscribe(
        (resp: IUser[]) => {
          if(resp){
            this.isUpdated = true;
          }
        },
        (err: AppError) => {
          console.log(err.originalError);
          if (err instanceof NotFoundError) {
            console.log("Error", err);
            this.router.navigate(["not-found"]);
          } else {
            console.log("Error", err);
            this.router.navigate(["unexpected-error"]);
          }
        }
      );
  }

  _setValue(resp){
    let fullName = resp['name'].split(' ');
            this.firstName.setValue(fullName[0]);
            this.lastName.setValue(fullName[1]);
            this.userName.setValue(resp['username']);
            this.email.setValue(resp['email']);
  }
}
