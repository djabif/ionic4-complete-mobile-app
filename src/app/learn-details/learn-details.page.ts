import { Component, OnInit } from '@angular/core';
// import { isPresent } from 'ionic-angular/util/util';
import { LearnService } from '../services/learn.service';
import { Router } from '@angular/router';


@Component({
  selector: 'app-learn-details',
  templateUrl: './learn-details.page.html',
  styleUrls: ['./learn-details.page.scss'],
})
export class LearnDetailsPage implements OnInit {

  constructor(
    public learnService: LearnService,
    private router: Router
  ) { }

  ngOnInit() {

  }

}
