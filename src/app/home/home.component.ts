import { Component, OnInit } from '@angular/core';
import {WebsocketService} from "@app/home/websocket.service";

@Component({
  selector: 'app-home',
  templateUrl: './home.component.html',
  styleUrls: ['./home.component.scss']
})
export class HomeComponent implements OnInit {

  constructor(public websocketService: WebsocketService) { }

  go() {

  }
  ngOnInit() {
    this.websocketService.joinRoom({user:'dfsd', room: 'r1'});

  }

}
