import { IssuesService } from './../../shared/services/issues.service';
import {
  CdkDragDrop,
  moveItemInArray,
  transferArrayItem,
} from '@angular/cdk/drag-drop';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnInit,
  ViewChild,
} from '@angular/core';
import { Issue } from 'src/assets/interfaces/Project';
import { MenuItem, SelectItem } from 'primeng/api';
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
export class BoardComponent implements OnInit, AfterViewInit {
  public title = 'Design System';

  public autoResize: boolean = true;

  public property =
    "I wanted to introduce you my latest application: Angular Spotify.It is a simple Spotify client built with Angular 11, Nx workspace, ngrx, TailwindCSS and ng-zorro.Check out the live application -> https://spotify.trungk18.com.Source code: https://github.com/trungk18/angular-spotify.Spotify premium is required for the Web Playback SDK to play music. If you are using a free account, you can still browse the app, but it couldn't play the music. Sorry about that";

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
  public isCollapsed: boolean = false;

  /**
   * Dropdowns
   */
  public statusOptions: SelectItem[] = [
    { label: 'To Do', value: StoryStatus.TODO },
    { label: 'In Progress', value: StoryStatus.IN_PROGRESS },
    { label: 'Functional Review', value: StoryStatus.FUNCTIONAL_REVIEW },
    { label: 'Done', value: StoryStatus.DONE },
  ];

  public priorityOptions: SelectItem[] = [
    { label: 'Low', value: 'Low' },
    { label: 'High', value: 'High' },
    { label: 'Medium', value: 'Medium' },
  ]

  public countries: SelectItem[] = [{label:'Unassigned', value: 'Unassigned'}];

  public statusModel: string = '';
  public selectedCountry!: User;
  public selectedPriority: string = ''; 

  /**
   * Dialog
   */
  public displayModal: boolean = false;

  constructor(private issueService: IssuesService) {}

  ngOnInit() {
    this.items = [
      { label: 'Projects' },
      { label: 'Jira' },
      { label: 'Design System' },
    ];
    this.issueService.getIssues().subscribe((res) => {
      this.totalArr = res;
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
      this.userAvatarList.forEach((user) => {
        this.countries.push({
          label: user.firstName + ' ' + user.lastName,
          value: user.firstName + ' ' + user.lastName,
        });
      });
    });
  }

  public openDialog() {
    this.displayModal = true;
  }

  public fetchAvatarFromAssignee(assignee: string): any {
    let url;
    this.userAvatarList.forEach((user: User) => {
      if (user.firstName && assignee.includes(user.firstName)) {
        url = user.avatarUrl;
      }
    });
    return url;
  }

  public appendUrl(index: number): string {
    if (index === 0) {
      return 'assets/images/avatar1.png';
    }
    if (index === 1) {
      return 'assets/images/avatar2.png';
    }
    if (index % 3 === 0) {
      return 'assets/images/avatar3.png';
    }
    if (index % 4 === 0 && index > 2) {
      return 'assets/images/avatar4.png';
    } else {
      return 'assets/images/avatar4.png';
    }
  }

  public getPriority(priority: string) {
    switch (priority) {
      case 'High': {
        return 'High';
      }
      case 'Low': {
        return 'Low';
      }
      case 'Medium': {
        return 'Medium';
      }
      default: {
        return '';
      }
    }
  }

  public useAvatarSelectionFilter(event: any) {
    let tempArr: User[] = [];
    event.forEach((ele: User) => {
      let a = ele as any;
      tempArr.push(a.firstName);
    });
    this.issueService.getSpecificMember(tempArr).subscribe((res) => {
      /**
       * Getting the correct data;
       */
      let finalNames = [];
      for (let i = 0; i < res.length; i++) {
        finalNames.push(res[i].name);
      }
      let fList: Issue[] = [];
      for (let j = 0; j < finalNames.length; j++) {
        let element = finalNames[j];
        this.totalArr.forEach((arrElement) => {
          if (arrElement.assignee.includes(element)) {
            fList.push(arrElement);
          }
        });
      }
      this.generateList(fList);
    });
  }

  public generateList(res: Issue[]) {
    this.toDo = res.filter((result) => result.status === StoryStatus.TODO);
    this.functionalReview = res.filter(
      (result) => result.status === StoryStatus.FUNCTIONAL_REVIEW
    );
    this.inProgress = res.filter(
      (result) => result.status === StoryStatus.IN_PROGRESS
    );
    this.done = res.filter((result) => result.status === StoryStatus.DONE);
  }

  public ngAfterViewInit(): void {
    fromEvent(this.input.nativeElement, 'keyup')
      .pipe(
        filter(Boolean),
        debounceTime(400),
        distinctUntilChanged(),
        tap((text) => {
          this.issueService
            .getStartingWithIssues(this.input.nativeElement.value)
            .subscribe((res) => {
              this.totalArr = res;
              this.generateList(res);
            });
          // Backend call for getting issues that starts with a particular word.
        })
      )
      .subscribe();
  }

  public drop(event: any) {
    if (event.previousContainer === event.container) {
      moveItemInArray(
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );
    } else {
      let x = event.previousContainer.data[event.previousIndex];
      switch (event.container.id) {
        case StoryStatus.TODO: {
          x.status = StoryStatus.TODO;
          break;
        }
        case StoryStatus.DONE: {
          x.status = StoryStatus.DONE;
          break;
        }
        case StoryStatus.FUNCTIONAL_REVIEW: {
          x.status = StoryStatus.FUNCTIONAL_REVIEW;
          break;
        }
        case StoryStatus.IN_PROGRESS: {
          x.status = StoryStatus.IN_PROGRESS;
          break;
        }
      }
      transferArrayItem(
        event.previousContainer.data,
        event.container.data,
        event.previousIndex,
        event.currentIndex
      );

      this.issueService.editIssues(x.id, x).subscribe((res) => {});
    }
  }

  public updateStyleForNav(event: boolean) {
    this.isCollapsed = event;
  }
}
export enum StoryStatus {
  TODO = 'To Do',
  FUNCTIONAL_REVIEW = 'Functional Review',
  DONE = 'Done',
  IN_PROGRESS = 'In Progress',
}

export enum StoryType {
  Story = 'story',
  Bug = 'bug',
  Task = 'task',
  Spike = 'spike',
}
