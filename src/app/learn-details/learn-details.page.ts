import { Component, OnInit } from '@angular/core';
// import { isPresent } from 'ionic-angular/util/util';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { LearnService } from '../services/learn.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController } from '@ionic/angular';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-learn-details',
  templateUrl: './learn-details.page.html',
  styleUrls: ['./learn-details.page.scss'],
})
export class LearnDetailsPage implements OnInit {

  questions: Array<any> = [];
  category : any;

  constructor(
    public questionService: QuestionService,
    public answerService: AnswerService,
    public learnService: LearnService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute
  ) {

  }

  ngOnInit() {
    this.getQuestions();
  }

  async getQuestions(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.route.params.subscribe(
      param => {
        forkJoin([
          this.learnService.getCategoryBySlug(param.categorySlug),
          this.questionService.getQuestionsBySlug(param.categorySlug)
        ])
        .subscribe(data => {
          debugger
          this.category = data[0];
          this.questions = data[1];
          loading.dismiss();
        })
      }
    )
  }

}
