
import { Component, OnInit, Output, EventEmitter } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
})
export class LeftNavComponent implements OnInit {
  
  @Output()
  public newEvent : EventEmitter<boolean> = new EventEmitter<boolean>(false);
  public isCollapsed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  public toggleCollapsedNav(){
    this.isCollapsed = !this.isCollapsed;
    this.newEvent.emit(this.isCollapsed);
  }

}
