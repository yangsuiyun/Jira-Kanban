import { IssuesService } from './../../shared/services/issues.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
import { Issue } from 'src/assets/interfaces/Project';
import { MenuItem } from 'primeng/api';
import {
  debounceTime,
  distinctUntilChanged,
  filter,
  fromEvent,
  Subject,
  tap,
} from 'rxjs';
import { User } from 'src/app/shared/interfacrs/user.model';
@Component({
  selector: 'app-board',
  templateUrl: './board.component.html',
})
export class BoardComponent implements OnInit {
  public title = 'Design System';
  @ViewChild('input') input: ElementRef = {} as ElementRef;
  public items: MenuItem[] = [];

  public home: any;

  public toDo: Issue[] = [];
  public functionalReview: Issue[] = [];
  public inProgress: Issue[] = [];
  public qa: Issue[] = [];
  public blocked: Issue[] = [];
  public done: Issue[] = [];
  public userAvatarList: User[] = [];
  public selectedUsers: User[] = [];

  public totalArr: Issue[] = [];

  public terms$ = new Subject<string>();

  constructor(private issueService: IssuesService) {}

  ngOnInit() {
    this.items = [
      { label: 'Projects' },
      { label: 'Jira' },
      { label: 'Design System' },
    ];
    this.issueService.getIssues().subscribe((res) => {
      this.generateList(res);
    });
    this.issueService.getMember().subscribe((res) => {
      res.forEach((element, index) => {
        let n: string[] = [];
        n = element.name.split(' ');

        this.userAvatarList.push({
          id: element.id,
          firstName: n[0],
          lastName: n[n.length - 1],
          avatarUrl: this.appendUrl(index),
        });
      });
    });
  }

  public appendUrl(index: number) : string{
    if (index === 0) {
      return 'assets/images/avatar1.png';
    }
    if (index === 1 ) {
      return 'assets/images/avatar2.png';
    }
    if (index % 3 === 0) {
      return 'assets/images/avatar3.png';
    }
    if (index % 4 === 0 && index>2) {
      return 'assets/images/avatar4.png';
    }
    else{
      return 'assets/images/avatar4.png';
    }
  }

  public useAvatarSelectionFilter(event: any) {
    console.log(event);
    let tempArr: User[]= [];
    event.forEach((ele: User) => {
      let a = ele as any;
      tempArr.push(a.firstName);
    });
    this.issueService.getSpecificMember(tempArr).subscribe((res)=>{
      debugger;
      console.log(res);
      /**
       * Getting the correct data;
       */
      let finalNames = []
      for(let i=0;i<res.length;i++){
        finalNames.push(res[i].name);
      }
      let fList: Issue[]= [];
      for(let j =0; j<finalNames.length;j++){
        let element = finalNames[j];
        fList = this.totalArr.filter((x)=> x.assignee.includes(element))
        
      }
      this.generateList(fList);
      // this.generateList(res);
    })
  }

  public generateList(res: Issue[]) {
    this.toDo = res.filter((result) => result.status === StoryType.TODO);
    this.functionalReview = res.filter(
      (result) => result.status === StoryType.FUNCTIONAL_REVIEW
    );
    this.inProgress = res.filter(
      (result) => result.status === StoryType.IN_PROGRESS
    );
    // this.qa = res.filter((result) => result.status === StoryType.QA);
    // this.blocked = res.filter(
    //   (result) => result.status === StoryType.BLOCKED
    // );
    this.done = res.filter((result) => result.status === StoryType.DONE);
  }

  ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(400),
        distinctUntilChanged(),
        tap((text) => {
          this.issueService
            .getStartingWithIssues(this.input.nativeElement.value)
            .subscribe((res) => {
              this.totalArr= res;
              this.generateList(res);
            });
          // Backend call for getting issues that starts with a particular word.
        })
      )
      .subscribe();
  }

  drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let x = event.previousContainer.data[event.previousIndex];
      switch (event.container.id) {
        case StoryType.TODO: {
          x.status = StoryType.TODO;
          break;
        }
        case StoryType.DONE: {
          x.status = StoryType.DONE;
          break;
        }
        case StoryType.FUNCTIONAL_REVIEW: {
          x.status = StoryType.FUNCTIONAL_REVIEW;
          break;
        }
        case StoryType.IN_PROGRESS: {
          x.status = StoryType.IN_PROGRESS;
          break;
        }
        // case StoryType.QA: {
        //   x.status = StoryType.QA;
        //   break;
        // }
        // case StoryType.BLOCKED: {
        //   x.status = StoryType.BLOCKED;
        //   break;
        // }
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.issueService.editIssues(x.id, x).subscribe((res) => {
        // console.log(res);
      });
    }
  }
}
export enum StoryType {
  TODO = 'To Do',
  FUNCTIONAL_REVIEW = 'Functional Review',
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
  // QA = 'QA',
  // BLOCKED = 'BLOCKED',
}
