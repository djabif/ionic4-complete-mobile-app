import { Component, OnInit } from '@angular/core';
import { ModalController, NavParams } from '@ionic/angular';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { AnswerService } from '../services/answer.service';
import { Answer } from '../../../sdk';

@Component({
  selector: 'app-manage-answer',
  templateUrl: './manage-answer.page.html',
  styleUrls: ['./manage-answer.page.scss'],
})
export class ManageAnswerPage implements OnInit {

  _mode : string = "";
  _question_id: string = "";
  _answer_id: string = "";
  answerForm: FormGroup;
  answer: Answer = new Answer();

  constructor(
    public navParams: NavParams,
    public modalCtrl: ModalController,
    public answerService: AnswerService
  ) { }

  ngOnInit() {
    this.answerForm = new FormGroup({
      answer: new FormControl(this.answer.answer, Validators.required)
    })
    let data = this.navParams.get('data');
    this._mode = data.mode;
    this._question_id = data.questionId;
    this._answer_id = data.answerId;
    if(data.answer){
      debugger
      this.answer = data.answer;
      this.answerForm.patchValue({
        answer: data.answer.answer
      })
    }
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalCtrl.dismiss(data);
  }

  onSubmit(value){
    debugger
    let data = value;
    data.questionId = this._question_id;
    if(this.answer.answer){
      data.id = this.answer.id;
      data.positiveVotes = this.answer.positiveVotes;
      data.negativeVotes = this.answer.negativeVotes;
      this.answerService.updateAnswer(data)
      .then( res => this.dismiss())
    }
    else{
      this.answerService.createAnswer(value)
      .then( res => this.dismiss())
    }
  }

}
