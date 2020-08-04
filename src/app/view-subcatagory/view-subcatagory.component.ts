import { Component, OnInit } from '@angular/core';
import { MediaObserver, MediaChange } from '@angular/flex-layout';
import { AuthService } from '../auth.service';
import { AngularFireDatabase } from 'angularfire2/database';
import { ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-view-subcatagory',
  templateUrl: './view-subcatagory.component.html',
  styleUrls: ['./view-subcatagory.component.css']
})
export class ViewSubcatagoryComponent implements OnInit {
  topicData = [];
  topicDatas = [];
  userName: string;
  size;
  media: any;
  catagory: string;
  subcatagory: string;

  constructor(private mediaObserver: MediaObserver, private auth: AuthService, private route: ActivatedRoute, private db: AngularFireDatabase) {
    route.paramMap.subscribe(param => {
      this.catagory = param.get('catagory');
      this.subcatagory = param.get('subcatagory');
    });

    this.userName = sessionStorage.getItem('username');
    this.db.list("/AssessmentsData/" + this.catagory + "/" + this.subcatagory).snapshotChanges().subscribe(subcatagories => {
      this.topicData = [];
      this.topicDatas = [];
      subcatagories.map(topic => {
        this.topicData.push(topic.key);
      });
      this.topicDatas.push({ catagory: this.catagory, subcatagory: this.subcatagory, topics: this.topicData });
    });
  }
  ngOnInit() {
    this.media = this.mediaObserver.media$.subscribe((change: MediaChange) => {
      if (change.mqAlias === 'xs') {
        this.size = '100%';
      }
      else if (change.mqAlias === 'sm') {
        this.size = '100%';
      }
      else if (change.mqAlias === 'md') {
        this.size = '70%';
      }
      else {
        this.size = '70%';
      }
    });
  }

  signOut() {
    this.auth.logOut();
  }
}