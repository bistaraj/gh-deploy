import { TestBed, inject } from '@angular/core/testing';
import {HttpClientTestingModule, HttpTestingController} from '@angular/common/http/testing';
import { UserService } from './user.service';
import {IUser} from '../models/user.interface';
import { HttpClient } from 'selenium-webdriver/http';
import { CommonModule } from '@angular/common';
import { RouterTestingModule } from '@angular/router/testing';
import { EmptyComponent } from 'src/app/common/test/empty.mock';

describe('UserService', () => {
  let userService:UserService;
  let fakeBackend:HttpTestingController;
  beforeEach(() => {
    TestBed.configureTestingModule({
      imports:[
        CommonModule,
        HttpClientTestingModule,
        RouterTestingModule.withRoutes([
          {
            path:'',
            component:EmptyComponent
          }
        ])
      ],
      providers: [UserService],
      declarations:[EmptyComponent]
    });
    userService=TestBed.get(UserService);
    fakeBackend=TestBed.get(HttpTestingController);
  });



  it('should be injectable', ()=> {
    expect (userService).toBeTruthy();
  })

  describe('listUser', () => {
    it('should list user', () => {
      const user: IUser =
        {
          "id": "1",
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz"
          };
        userService.listUser().subscribe(value => {
        expect(value).toEqual(user);
      });
      fakeBackend
        .expectOne('http://jsonplaceholder.typicode.com/users')
        .flush(user);
    });
  });

  describe ('create User', ()=> {
    it('should create user', ()=> {
      const user: IUser =
      {
        "id": "1",
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
        };
        userService.createUser(user).subscribe(value => {
          expect(value).toEqual(user);
        });
        fakeBackend
          .expectOne('http://jsonplaceholder.typicode.com/users')
          .flush(user);
      });
    });

    describe ('Update User', ()=> {
      it('should update user', ()=> {
        const id=1;
        const user: IUser =
        {
          "id": "1",
          "name": "Leanne Graham",
          "username": "Bret",
          "email": "Sincere@april.biz"
          };
          userService.updateUser(id,user).subscribe(value => {
            expect(value).toEqual(user);
          });
          fakeBackend
            .expectOne('http://jsonplaceholder.typicode.com/users/1')
            .flush(user);
        });
      });

  });


