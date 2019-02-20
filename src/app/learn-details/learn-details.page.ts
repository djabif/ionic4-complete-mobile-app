import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { LearnService } from '../services/learn.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { forkJoin } from 'rxjs';
import { ManageQuestionPage } from '../manage-question/manage-question.page';

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
    private route: ActivatedRoute,
    public modalCtrl: ModalController
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
        if(param.categorySlug){
          forkJoin([
            this.learnService.getCategoryBySlug(param.categorySlug),
            this.questionService.getQuestionsBySlug(param.categorySlug)
          ])
          .subscribe(data => {
            this.category = data[0];
            this.questions = data[1];
          })
        } else{
          this.category = null;
        }
        loading.dismiss();
      }
    )
  }

  async createQuestionModal() {
    const create_question_modal = await this.modalCtrl.create({
      component: ManageQuestionPage,
      componentProps: { slug: this.category.slug }
    });

    create_question_modal.onDidDismiss().then(res => {
      debugger
      this.getQuestions();
    });

    await create_question_modal.present();
  }

  async delete(questionId){
    const alert = await this.alertController.create({
      header: 'Delete question',
      message: 'Are you sure you want to delete this question?',
      buttons: [
        {
          text: 'No',
          role: 'cancel',
          handler: () => {
            console.log('No clicked');
          }
        },
        {
          text: 'Yes',
          handler: () => {
            this.questionService.deleteQuestion(questionId)
            .then(res => this.getQuestions());
            this.answerService.getAnswers(questionId)
            .then(answers => {
              for(let answer of answers){
                this.answerService.deleteAnswer(answer.id);
              }
            })
          }
        }
      ]
    });
    await alert.present();
  }

  addPositiveVote(question){
    let data = question;
    data.positiveVotes += 1;
    data.questionSlug = this.category.slug;
    this.questionService.updateQuestion(data)
    .then(res => this.getQuestions())
  }

  addNegativeVote(question){
    let data = question;
    data.negativeVotes += 1;
    data.questionSlug = this.category.slug;
    this.questionService.updateQuestion(data)
    .then(res => this.getQuestions())
  }

  // countAnswers(questionId){
  //   return this.answerService.countAnswers(questionId)
  //   .then(res => console.log(res))
  // }

  openAnswers(question){
    this.router.navigate(["/question-details", {
      id: question.id
    }]);
  }

}
