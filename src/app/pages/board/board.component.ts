import { IssuesService } from './../../shared/services/issues.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
import { Issue } from 'src/assets/interfaces/Project';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  public toDo: Issue[] = [];
  public functionalReview: Issue[] = [];
  public inProgress : Issue[] = [];
  public qa: Issue[] = [];
  public blocked: Issue[] = [];
  public done: Issue[] = [];
  constructor(private issueService: IssuesService) {}

  ngOnInit() {
    this.issueService.getIssues().subscribe((res)=>{
      this.toDo = res.filter((result)=> result.status === StoryType.TODO);
      this.functionalReview = res.filter((result)=> result.status === StoryType.FUNCTIONAL_REVIEW);
      this.inProgress = res.filter((result)=> result.status === StoryType.IN_PROGRESS);
      this.qa = res.filter((result)=> result.status === StoryType.QA);
      this.blocked = res.filter((result)=> result.status === StoryType.BLOCKED);
      this.done = res.filter((result)=> result.status === StoryType.DONE );
    })
  }

  drop(event: any) {
    debugger;
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      debugger;
      console.log(event);
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );


      console.log(event.previousContainer.data);
      console.log(event.container.data);
      console.log(event.previousIndex);
      console.log(event.currentIndex);
    }

    // console.log(this.todo);
    // console.log(this.done);
  }
}
export enum StoryType {
  TODO = 'To Do',
  FUNCTIONAL_REVIEW = 'Functional Review',
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'BLOCKED',
}
