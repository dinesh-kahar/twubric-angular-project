import { Component, OnInit } from '@angular/core';
import { appLevelConstant } from 'src/app/shared/applevelconstant';

@Component({
  selector: 'app-user-detail',
  templateUrl: './user-detail.component.html',
  styleUrls: ['./user-detail.component.css'],
  providers: [appLevelConstant]
})
export class UserDetailComponent implements OnInit {
  userProfileImage = "assets/images/profile-picture.jpg";

  constructor(
    public appLevelConstant: appLevelConstant
  ) { }

  ngOnInit() {
  }

}
