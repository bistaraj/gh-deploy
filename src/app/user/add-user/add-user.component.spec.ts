import { async, ComponentFixture, TestBed } from '@angular/core/testing';

import { AddUserComponent } from './add-user.component';
import { UserService } from 'src/app/service/user.service';
import { Router } from '@angular/router';

describe('AddUserComponent', () => {
  let component: AddUserComponent;
  let service: UserService;
  let router: Router;
  let fixture: ComponentFixture<AddUserComponent>;

  beforeEach(async(() => {
    component = new AddUserComponent(service, router);
  }));

  beforeEach(() => {
    // fixture = TestBed.createComponent(AddUserComponent);
    // component = fixture.componentInstance;
    // fixture.detectChanges();
  });
});
