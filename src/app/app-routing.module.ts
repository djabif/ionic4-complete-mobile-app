import { NgModule } from '@angular/core';
import { Routes, RouterModule } from '@angular/router';

const routes: Routes = [
  { path: '', redirectTo: 'learn-feed', pathMatch: 'full' },
  { path: 'learn-details', loadChildren: './learn-details/learn-details.module#LearnDetailsPageModule' },
  { path: 'learn-feed', loadChildren: './learn-feed/learn-feed.module#LearnFeedPageModule' },
  { path: 'manage-answer', loadChildren: './manage-answer/manage-answer.module#ManageAnswerPageModule' },
  { path: 'manage-question', loadChildren: './manage-question/manage-question.module#ManageQuestionPageModule' },
  { path: 'question-details', loadChildren: './question-details/question-details.module#QuestionDetailsPageModule' },
];

@NgModule({
  imports: [RouterModule.forRoot(routes)],
  exports: [RouterModule]
})
export class AppRoutingModule { }
