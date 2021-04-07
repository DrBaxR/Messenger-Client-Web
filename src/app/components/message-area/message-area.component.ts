import { Component, Input, OnChanges, OnDestroy, OnInit, SimpleChanges } from '@angular/core';
import { FormControl } from '@angular/forms';
import { RxStompService } from '@stomp/ng2-stompjs';
import { Message } from '@stomp/stompjs';
import { Subscription } from 'rxjs';
import { AppMessage } from 'src/app/data-models/app-message';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-message-area',
  templateUrl: './message-area.component.html',
  styleUrls: ['./message-area.component.scss']
})
export class MessageAreaComponent implements OnInit, OnDestroy, OnChanges {
  @Input('user') user: User;
  @Input('groupId') groupId: string;
  // array with all the users in the group
  @Input('groupUsers') groupUsers: User[];

  messages: AppMessage[] = [];
  topicSubscription: Subscription = null;
  messageInput: FormControl;

  constructor(
    private apiService: ApiService,
    private rxStompService: RxStompService
  ) { }

  ngOnInit(): void {
    this.messageInput = new FormControl('');

    // will probably have to move this to onChanges
    this.apiService.getGroupMessages(this.groupId).subscribe(messages => {
      this.messages = messages;
      console.log(messages);
      this.connect();
    });
  }

  ngOnChanges(changes: SimpleChanges) {
    // if (changes.groupId) {
    //   if (this.groupId && this.topicSubscription) {
    //     console.log('changes');

    //     this.topicSubscription.unsubscribe();
    //     this.apiService.getGroupMessages(this.groupId).subscribe(messages => {
    //       this.messages = messages;
    //       this.connect();
    //     });
    //   }
    // }

    // if (changes.groupUsers) {
    //   console.log(this.groupUsers);
    // }
  }

  connect() {
    this.topicSubscription = this.rxStompService.watch(`/topic/group.${this.groupId}`).subscribe((message: Message) => {
      this.messages.push(JSON.parse(message.body));
    });
  }

  sendMessage(text: string) {
    const message = {
      text: text,
      sender: this.user.id,
      date: new Date().toISOString()
    }

    this.rxStompService.publish({
      destination: `/ws/group.chat/${this.groupId}`,
      body: JSON.stringify(message)
    });
  }

  ngOnDestroy() {
    this.topicSubscription.unsubscribe();
  }

  onSendButtonClick() {
    this.sendMessage(this.messageInput.value);

    this.messageInput.setValue('');
  }

  getMessageUser(message: AppMessage) {
    const user = this.groupUsers.find(user => user.id === message.sender);

    return user ? user.username : 'Unknown';
  }
}
