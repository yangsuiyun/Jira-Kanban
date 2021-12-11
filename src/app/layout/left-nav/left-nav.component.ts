import { Component, OnInit } from '@angular/core';

@Component({
  selector: 'app-left-nav',
  templateUrl: './left-nav.component.html',
})
export class LeftNavComponent implements OnInit {
  
  public isCollapsed: boolean = false;
  constructor() { }

  ngOnInit(): void {
  }

  public toggleCollapsedNav(){
    this.isCollapsed = !this.isCollapsed;
  }

}
