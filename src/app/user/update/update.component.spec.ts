import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { UpdateComponent } from './update.component';
import {RouterTestingModule} from '@angular/router/testing';
import {UserService} from '../../service/user.service';
import { EmptyComponent } from 'src/app/common/test/empty.mock';
import {MockUpdateService} from 'src/app/common/test/user.service.mock';
import {ReactiveFormsModule} from '@angular/forms';
import { IUser } from "src/app/models/user.interface";

describe('UpdateComponent', () => {
  let component: UpdateComponent;
  let fixture: ComponentFixture<UpdateComponent>;


  beforeEach(async(() => {
    TestBed.configureTestingModule({
      imports:[ReactiveFormsModule,
        RouterTestingModule.withRoutes([
        {
         // path:'',component:EmptyComponent,
          path:'user/1', component:EmptyComponent
        }
      ])
    ],
      declarations: [ UpdateComponent, EmptyComponent ],
      providers:[{provide:UserService, useClass:MockUpdateService}]
    })
    .compileComponents();
  }));

  beforeEach(() => {
    fixture = TestBed.createComponent(UpdateComponent);
    component = fixture.componentInstance;
    fixture.detectChanges();
    let id='1';
    component.user=
      {
        "id": "1",
        "name": "Leanne Graham",
        "username": "Bret",
        "email": "Sincere@april.biz"
        };
  });

  xit('should create', () => {
    expect(component).toBeTruthy();
  });

// describe('updateUser', ()=> {
//   it('should update user', ()=> {
//     component.updateUser(component.user);
//       expect("Leanne Graham").toEqual(component.user.name);
//     });
//   });
});

