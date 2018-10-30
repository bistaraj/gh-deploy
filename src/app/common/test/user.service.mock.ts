import {Injectable} from '@angular/core';
import { IUser } from 'src/app/models/user.interface';

@Injectable()

export class MockUpdateService {

    constructor() {
       let users$:IUser= {
            "id": "1",
            "name": "Leanne Graham",
            "username": "Bret",
            "email": "Sincere@april.biz"
       };

    }
}
