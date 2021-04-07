import { AfterViewChecked, Component, ElementRef, Input, OnChanges, OnDestroy, OnInit, SimpleChanges, ViewChild } from '@angular/core';
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
export class MessageAreaComponent implements OnInit, OnDestroy, OnChanges, AfterViewChecked {
  @Input('user') user: User;
  @Input('groupId') groupId: string;
  @Input('groupUsers') groupUsers: User[];

  @ViewChild('messagesArea') messagesContainer: ElementRef;

  messages: AppMessage[] = [];
  topicSubscription: Subscription = null;
  messageInput: FormControl;
  page: number = 0;
  SIZE: number = 20;

  constructor(
    private apiService: ApiService,
    private rxStompService: RxStompService
  ) { }

  ngOnInit(): void {
    this.messageInput = new FormControl('');

    // will probably have to move this to onChanges
    this.apiService.getGroupMessages(this.groupId, this.page, this.SIZE).subscribe(messages => {
      this.messages = messages;
      this.messages.reverse();
      this.page++;

      this.connect();
    });
  }

  ngAfterViewChecked() {
    // this.scrollToBottom();
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
      // this.scrollToBottom();
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

  onMessageSent() {
    this.sendMessage(this.messageInput.value);

    this.messageInput.setValue('');
  }

  getMessageUser(message: AppMessage) {
    const user = this.groupUsers.find(user => user.id === message.sender);

    return user ? user.username : 'Unknown';
  }

  extendMessagesToNextPage() {
    this.apiService.getGroupMessages(this.groupId, this.page, this.SIZE).subscribe(newMessages => {
      this.messages.reverse();
      this.messages.push(...newMessages);
      this.messages.reverse();
      this.page++;
    })
  }

  // TODO: make this not be called everytime a message is received
  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }
}