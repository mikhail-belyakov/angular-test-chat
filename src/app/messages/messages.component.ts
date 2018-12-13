import { Component, OnInit } from '@angular/core';
import { SocketService } from '../services/socket/socket.service';
import { Message } from '../services/models/message.model';


@Component({
  selector: 'app-messages',
  templateUrl: './messages.component.html',
  styleUrls: ['./messages.component.css']
})
export class MessagesComponent implements OnInit {
  public messages: Message[];
  private chanel: string;
  private mockData: Message;
  public textMessage: string;
  public sendingMessageStatus: boolean;

  constructor(private socket: SocketService) { }

  ngOnInit() {
    this.mockData = {
      id: 'testUser001',
      username: 'Jane',
      content: ''
    };
    this.sendingMessageStatus = false;
    this.chanel = 'message';
    this.socket.on(this.chanel).subscribe( (data: Message[]) => {
      this.messages = data;
    });
  }

  sendMessage() {
    this.sendingMessageStatus = true;
    const messageData = {...this.mockData, 'content': this.textMessage};
    this.socket.emit(this.chanel, messageData).subscribe(
      (data) => {
        console.log('Success', data);
      },
      (error) => {
        console.log('Error', error);
      },
      () => {
        console.log('complete');
        this.textMessage = '';
        this.sendingMessageStatus = false;
      }
    );
 }
}
