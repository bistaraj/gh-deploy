import { Component, OnInit } from "@angular/core";
import { FormGroup, FormControl, Validators } from "@angular/forms";
import { UsernameValidators } from "src/app/common/validators/username-validators";
import { IUser } from "src/app/models/user.interface";
import { UserService } from "src/app/service/user.service";
import { AppError } from "src/app/common/error/app-error";
import { BadInput } from "src/app/common/error/bad-input";
import { Router } from "@angular/router";

@Component({
  selector: "app-add-user",
  templateUrl: "./add-user.component.html",
  styleUrls: ["./add-user.component.css"]
})
export class AddUserComponent {
  isCreated: boolean = false;
  private user: IUser[];
  constructor(private userService: UserService, private router: Router) {}
  form = new FormGroup({
    name: new FormControl("", Validators.required),
    email: new FormControl("", [Validators.required, Validators.email])
  });

  get name() {
    return this.form.get("name");
  }
  get email() {
    return this.form.get("email");
  }

  submit(data: HTMLInputElement) {
    console.log("form", data);
    this.userService.createUser(data).subscribe(
      resp => {
        console.log("User is created!", data);
        this.isCreated = true;
      },
      (err: AppError) => {
        if (err instanceof BadInput) {
          console.log("Error", err);
          this.router.navigate(["bad-request"]);
        } else {
          console.log("Error", err);
          this.router.navigate(["unexpected-error"]);
        }
      }
    );
  }
  reset(){
    this.isCreated = false;
    this.form.reset();
  }
}
