import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, OnInit } from '@angular/core';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  todo = ['Get to work', 'Pick up groceries', 'Go home', 'Fall asleep'];

  done = ['Take a shower', 'Check e-mail', 'Walk dog'];

  xyz = ['A', 'B', 'C'];
  constructor() {}

  ngOnInit() {
    console.log(this.todo);
    console.log(this.done);
  }

  drop(event: CdkDragDrop<string[]>) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    }

    console.log(this.todo);
    console.log(this.done);
  }
}
export enum Type {
  TODO = 'To Do',
  FUNCTIONAL_REVIEW = 'Functional Review',
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  QA = 'QA',
  BLOCKED = 'BLOCKED',
}
