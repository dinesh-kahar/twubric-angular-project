import { Component, OnInit } from '@angular/core';
import * as moment from 'moment';
import { appLevelConstant } from 'src/app/shared/applevelconstant';
import { TwitterServiceService } from 'src/app/twitter-service.service';


@Component({
  selector: 'app-follower-data',
  templateUrl: './follower-data.component.html',
  styleUrls: ['./follower-data.component.css'],
  providers: [appLevelConstant]
})
export class FollowerDataComponent implements OnInit {

  date = new Date();
  startDate = new Date(this.date.getFullYear(), this.date.getMonth(), 1);
  endDate = new Date();
  selectedSortValue = 'total';
  followeDeatils: any[];
  followerData: any[];
  req: { fromDate: Date; toDate: Date; };
  displayMess = "Loading...";
  loadingMess: string;
  upArrowImg = "assets/images/up-arrow-icon.png";
  downArrowImg = "assets/images/down-arrow-icon.png";

  constructor(
    private twubricservice: TwitterServiceService,
    public appLevelConstant: appLevelConstant
  ) { }

  ngOnInit(): void {
    this.req = {
      fromDate: this.startDate,
      toDate: this.endDate,
    }
    this.getFollowersDetails(this.req);
  }

  getStartDate(value) {
    this.endDate = null;
    this.req = {
      fromDate: this.startDate,
      toDate: this.endDate,
    }
    if (this.startDate && this.endDate && value) {
      this.getFollowersDetails(this.req);
    }
  }

  getEndDate(value) {
    this.req = {
      fromDate: this.startDate,
      toDate: this.endDate,
    }
    if (this.startDate && this.endDate && value) {
      this.getFollowersDetails(this.req);
    }
  }

  getFollowersDetails(req) {
    this.displayMess = this.loadingMess;
    this.twubricservice.getTwubricData().subscribe(response => {
      if (response && response.length) {
        const finalData = response.map(ele => ({
          ...ele,
          total: ele.twubric.total,
          friends: ele.twubric.friends,
          influence: ele.twubric.influence,
          chirpiness: ele.twubric.chirpiness,
          join_new_date: moment.unix(ele.join_date).format("Do MMM YYYY"),
        })).filter(ele => {
          const joinDate = moment.unix(ele.join_date);
          return moment(req.fromDate) <= joinDate && joinDate <= moment(req.toDate);
        });
  
        if (finalData.length) {
          this.followerData = finalData;
          this.followeDeatils = this.followerData;
          this.getSortByValue('total');
        } else {
          this.displayNoRecordFound();
        }
      } else {
        this.displayNoRecordFound();
      }
    });
  }
  
  displayNoRecordFound() {
    this.followeDeatils = [];
    this.followerData = [];
    this.displayMess = "No Record Found";
  }
  

  getSortByValue(value) {
    this.selectedSortValue = value;
    this.sortData('asc');
  }

  sortData(event) {
    const value = {
      value: this.selectedSortValue,
      key: event,
    }
    this.followeDeatils = this.getDataSort(this.followerData, value);
  }

  removeFollower(removeValue) {
    this.followeDeatils = this.followeDeatils.filter(ele => ele.uid !== removeValue.uid);
    this.followerData = [...this.followeDeatils]; 
    if (this.followeDeatils.length === 0) {
      this.displayMess = "No Record Found";
    }
  }
  
  getDataSort(data, headerkey) {
    const sort = headerkey.key === 'asc' ? 1 : -1;
  
    data.sort((d1, d2) => {
      const a = d1[headerkey.value];
      const b = d2[headerkey.value];
      return sort * (a < b ? -1 : (a > b ? 1 : 0));
    });
    return data;
  }
  
}
