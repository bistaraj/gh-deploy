import { Component, OnInit, Output, EventEmitter } from "@angular/core";
import { UserService } from "src/app/service/user.service";
import { AppError } from "src/app/common/error/app-error";
import { NotFoundError } from "src/app/common/error/not-found";
import { Router } from "@angular/router";
import { BadInput } from "src/app/common/error/bad-input";
import { IUser } from "src/app/models/user.interface";

@Component({
  selector: "app-user",
  templateUrl: "./user.component.html",
  styleUrls: ["./user.component.css"]
})
export class UserComponent implements OnInit {
  title: string = 'USER LIST';
  users: IUser[];
  @Output() user = new EventEmitter<Event>();

  constructor(
    private userService: UserService,
    private router: Router) {}

  ngOnInit() {
    this.userService.listUser().subscribe(
      (resp: IUser[]) => {
        this.users = resp;
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
  deleteUser(post) {
    this.userService.deleteUser(post.id).subscribe(
      resp => {
        let index = this.users.indexOf(post);
        this.users.splice(index,1);
        console.info('User Deleted:', post);
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
}
