import { AfterViewChecked, Component, ElementRef, EventEmitter, Input, OnChanges, OnDestroy, OnInit, Output, SimpleChanges, ViewChild } from '@angular/core';
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

  @Output() groupDeletedError: EventEmitter<string> = new EventEmitter();

  @ViewChild('messagesArea') messagesContainer: ElementRef;

  messages: AppMessage[] = [];
  topicSubscription: Subscription = null;
  messageInput: FormControl;
  page: number = 0;
  SIZE: number = 20;
  initialMessagesCount: number;
  viewPrepared = false;
  endReached = false;
  scrolledUp = false;

  constructor(
    private apiService: ApiService,
    private rxStompService: RxStompService
  ) { }

  ngOnInit(): void {
    this.messageInput = new FormControl('');

    if (this.groupId) {
      this.apiService.getGroupMessages(this.groupId, this.page, this.SIZE).subscribe(messages => {
        this.messages = messages;
        this.messages.reverse();
        this.page = 1;
        this.initialMessagesCount = messages.length;

        this.connect();
      });
    }
  }

  ngOnChanges(changes: SimpleChanges) {
    if (this.user && this.groupId && this.groupUsers) {
      this.viewPrepared = true;
    } else {
      this.viewPrepared = false;
    }

    if (changes.groupId) {
      if (this.groupId) {
        if (this.topicSubscription) {
          this.topicSubscription.unsubscribe();
        }

        this.apiService.getGroupMessages(this.groupId).subscribe(
          messages => {
            this.messages = messages;
            this.messages.reverse();
            this.page = 1;
            this.endReached = false;
            this.initialMessagesCount = messages.length;
            this.scrolledUp = false;

            this.connect();
          },
          () => this.groupDeletedError.emit('This group does not exist, it probably was <b>deleted by another user</b>. Please refresh your page!')
        );
      }
    }
  }

  ngAfterViewChecked() {
    if(!this.scrolledUp) {
      this.scrollToBottom();
    }
  }

  connect() {
    this.topicSubscription = this.rxStompService.watch(`/topic/group.${this.groupId}`).subscribe((message: Message) => {
      this.messages.push(JSON.parse(message.body));
      this.scrolledUp = false;
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
    this.topicSubscription?.unsubscribe();
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
    if (!this.endReached) {
      this.apiService.getGroupMessages(this.groupId, this.page, this.SIZE).subscribe(newMessages => {
        if (newMessages.length >= this.SIZE) {
          this.messages.reverse();
          this.messages.push(...newMessages);
          this.messages.reverse();
          this.page++;
        } else {
          this.endReached = true;
        }
      })
    }
  }

  scrollToBottom() {
    try {
      this.messagesContainer.nativeElement.scrollTop = this.messagesContainer.nativeElement.scrollHeight;
    } catch (err) { }
  }

  onScrollUp() {
    this.extendMessagesToNextPage();
    this.scrolledUp = true;
  }
}
