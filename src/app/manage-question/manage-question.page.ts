import { Component, OnInit } from '@angular/core';
import { Validators, FormGroup, FormControl} from '@angular/forms';
import { QuestionService } from '../services/question.service';
import { ModalController, NavParams } from '@ionic/angular';
import { Router, ActivatedRoute } from '@angular/router';

@Component({
  selector: 'app-manage-question',
  templateUrl: './manage-question.page.html',
  styleUrls: ['./manage-question.page.scss'],
})
export class ManageQuestionPage implements OnInit {

  _detail_slug : string;
  questionSlug: string;
  questionForm: FormGroup;

  constructor(
    public modalCtrl: ModalController,
    private route: ActivatedRoute,
    public navParams: NavParams,
    public questionService: QuestionService
  ) { }

  ngOnInit() {
    this.questionForm = new FormGroup({
      question: new FormControl('', Validators.required)
    })
    this.questionSlug = this.navParams.get('slug');
    if(this.questionSlug){
        this._detail_slug = this.questionSlug;
    }
    else{
        this._detail_slug = '';
    }
  }

  dismiss() {
    let data = { 'foo': 'bar' };
    this.modalCtrl.dismiss(data);
  }

  onSubmit(value){
    console.log(this._detail_slug)
    let data = value;
    data.questionSlug = this.questionSlug;
    this.questionService.createQuestion(value)
    .then( res => this.modalCtrl.dismiss() )
  }

}
