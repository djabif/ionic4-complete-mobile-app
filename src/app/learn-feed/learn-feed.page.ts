import { Component, OnInit } from '@angular/core';
import { LearnService } from '../services/learn.service';
import { CategoryModel } from '../services/learn.model';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-learn-feed',
  templateUrl: './learn-feed.page.html',
  styleUrls: ['./learn-feed.page.scss'],
})
export class LearnFeedPage implements OnInit {

  _query : string = '';
  categories : Array<CategoryModel> = new Array<CategoryModel>();

  constructor(
    public learnService: LearnService,
    private route: ActivatedRoute,
    private router: Router
  ) {
  }

  ngOnInit() {
    this.route.queryParams.subscribe(params =>{
      debugger
        this._query = params['query'];
    });
    this.learnService.getFeedCategories()
    .subscribe(data => {
      this.categories = data['categories']
    });
  }

  openDetails(slug) {
    this.router.navigate(["/learn-details", {
      categorySlug: slug
    }]);
  }

}
