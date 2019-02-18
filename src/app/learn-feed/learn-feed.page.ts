import { Component, OnInit } from '@angular/core';
// import { isPresent } from 'ionic-angular/util/util';
import { LearnService } from '../services/learn.service';
import { CategoryModel } from '../services/learn.model';
import { Router } from '@angular/router';

@Component({
  selector: 'app-learn-feed',
  templateUrl: './learn-feed.page.html',
  styleUrls: ['./learn-feed.page.scss'],
})
export class LearnFeedPage implements OnInit {

  categories : Array<CategoryModel> = new Array<CategoryModel>();

  constructor(
    public learnService: LearnService,
    private router: Router
  ) { }

  ngOnInit() {
    this.learnService.getFeedCategories()
    .subscribe(data => {
      this.categories = data.categories
    });
  }

  openDetails(params) {
    this.router.navigate(["/learn-details"]);
  }

}
