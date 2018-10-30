import { BrowserModule } from '@angular/platform-browser';
import { NgModule } from '@angular/core';
import {BrowserAnimationsModule} from '@angular/platform-browser/animations';
import { RouterModule } from '@angular/router';
import { HttpClientModule } from '@angular/common/http';
import { FormsModule, ReactiveFormsModule } from '@angular/forms';


// Material
import {MatToolbarModule} from '@angular/material/toolbar';
import {MatCardModule} from '@angular/material/card';
import {MatDividerModule} from '@angular/material/divider';
import {MatListModule} from '@angular/material/list';
import {MatTabsModule} from '@angular/material/tabs';
import {MatButtonModule} from '@angular/material/button';
import {MatInputModule, MatInput} from '@angular/material/input';
import {MatIconModule} from '@angular/material/icon';
import {MatMenuModule} from '@angular/material/menu';

import { AppComponent } from './app.component';
import { NotFoundComponent } from './common/not-found/not-found.component';
import { UserComponent } from './user/user.component';
import { AddUserComponent } from './user/add-user/add-user.component';
import { BadRequestComponent } from './common/bad-request/bad-request.component';
import { UnexpectedErrorComponent } from './common/unexpected-error/unexpected-error.component';
import { UpdateComponent } from './user/update/update.component';
import { UserService } from './service/user.service';
import { EmptyComponent } from './common/test/empty.mock';

@NgModule({
  declarations: [
    AppComponent,
    NotFoundComponent,
    UserComponent,
    AddUserComponent,
    BadRequestComponent,
    UnexpectedErrorComponent,
    UpdateComponent,
    EmptyComponent
  ],
  imports: [
    BrowserModule,
    BrowserAnimationsModule,
    FormsModule,
    ReactiveFormsModule,
    HttpClientModule,

    RouterModule.forRoot([
      { path: '', component: UserComponent },
      { path: 'users', component: UserComponent },
      { path: 'users/:id', component: UpdateComponent },
      { path: 'not-found', component: UserComponent },
      { path: 'bad-request', component: UserComponent },
      { path: 'unexpected-error', component: UserComponent },
      { path: '**', component: UserComponent }
    ]),

    MatCardModule,
    MatDividerModule,
    MatListModule,
    MatTabsModule,
    MatButtonModule,
    MatInputModule,
    MatToolbarModule,
    MatIconModule,
    MatMenuModule
  ],
  providers: [UserService],
  bootstrap: [AppComponent]
})
export class AppModule { }
