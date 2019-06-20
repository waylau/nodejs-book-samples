import { Component, OnInit } from '@angular/core';
import { User } from '../user';

@Component({
  selector: 'app-users',
  templateUrl: './users.component.html',
  styleUrls: ['./users.component.css']
})
export class UsersComponent implements OnInit {
  // 用户属性
  user : User = {
    id: 1,
    name: '老卫'
  };

  
  constructor() { }

  ngOnInit() {
  }

}
