import { Component, OnInit } from '@angular/core';
import { QuestionService } from '../services/question.service';
import { AnswerService } from '../services/answer.service';
import { Router, ActivatedRoute } from '@angular/router';
import { LoadingController, AlertController, ModalController } from '@ionic/angular';
import { ManageAnswerPage } from '../manage-answer/manage-answer.page';
import { Question } from '../../../sdk';
import { forkJoin } from 'rxjs';

@Component({
  selector: 'app-question-details',
  templateUrl: './question-details.page.html',
  styleUrls: ['./question-details.page.scss'],
})
export class QuestionDetailsPage implements OnInit {

  answers: Array<any> = [];
  question: any = new Question();
  questionId: any;

  constructor(
    public questionService: QuestionService,
    public answerService: AnswerService,
    public loadingController: LoadingController,
    public alertController: AlertController,
    private router: Router,
    private route: ActivatedRoute,
    public modalCtrl: ModalController
  ) { }

  async ngOnInit() {
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    this.route.params.subscribe(
      param => {
        if(param.id){
          this.questionId = param.id;
          forkJoin([
            this.questionService.getQuestion(param.id),
            this.answerService.getAnswers(param.id)
          ])
          .subscribe(data => {
            this.question = data[0][0];
            this.answers = data[1];
            loading.dismiss();
          })
        }
      }
    )
  }

  async getAnswers(){
    const loading = await this.loadingController.create({
      message: 'Please wait...'
    });
    await loading.present();
    loading.present();
    this.answerService.getAnswers(this.questionId)
    .then(res => {
      this.answers = res;
      loading.dismiss();
    })
  }

  upVoteQuestion(){
    this.question.positiveVotes += 1;
    this.questionService.updateQuestion(this.question)
    .then(res => console.log(res))
  }

  downVoteQuestion(){
    this.question.negativeVotes += 1;
    this.questionService.updateQuestion(this.question)
    .then(res => console.log(res))
  }

  addPositiveVote(answer){
    answer.positiveVotes += 1;
    this.answerService.updateAnswer(answer)
    .then(res => this.getAnswers())
  }

  addNegativeVote(answer){
    answer.negativeVotes += 1;
    this.answerService.updateAnswer(answer)
    .then(res => this.getAnswers())
  }

  async delete(answerId){
    const alert = await this.alertController.create({
      header: 'Delete answer',
      message: 'Are you sure you want to delete this answer?',
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
            this.answerService.deleteAnswer(answerId)
            .then(res => this.getAnswers())
          }
        }
      ]
    });
    await alert.present();
  }

  async createAnswerModal() {
    let create_answer_data = {
      mode: 'Create',
      questionId: this.questionId
    };
    const create_answer_modal = await this.modalCtrl.create({
      component: ManageAnswerPage,
      componentProps: { data: create_answer_data }
    });

    create_answer_modal.onDidDismiss().then(data => {
       this.getAnswers();
    });
    await create_answer_modal.present();
  }

  async editAnswerModal(answer) {
    let edit_answer_data = {
      mode: 'Edit',
      answer: answer,
      questionId: this.questionId
    };
    const edit_answer_modal = await this.modalCtrl.create({
      component: ManageAnswerPage,
      componentProps: { data: edit_answer_data }
    });
    edit_answer_modal.onDidDismiss().then(data => {
      this.getAnswers();
    });

    await edit_answer_modal.present();
  }

}
