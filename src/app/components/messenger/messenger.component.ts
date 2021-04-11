import { ChangeDetectorRef, Component, OnInit, ViewChild } from '@angular/core';
import { ModalDismissReasons, NgbAlert, NgbModal } from '@ng-bootstrap/ng-bootstrap';
import { Observable, Subject } from 'rxjs';
import { debounceTime } from 'rxjs/operators';
import { Group } from 'src/app/data-models/group';
import { User } from 'src/app/data-models/user';
import { ApiService } from 'src/app/services/api.service';

@Component({
  selector: 'app-messenger',
  templateUrl: './messenger.component.html',
  styleUrls: ['./messenger.component.scss']
})
export class MessengerComponent implements OnInit {

  @ViewChild('successAlert', { static: false }) successAlert: NgbAlert;
  @ViewChild('dangerAlert', { static: false }) dangerAlert: NgbAlert;

  private _success = new Subject<string>();
  private _danger = new Subject<string>();

  groupId: string;
  user: User;
  successMessage = '';
  dangerMessage = '';
  alertTimeout = 3000;
  userGroups$: Observable<Group[]>;
  groupUsers$: Observable<User[]>;

  constructor(
    private apiService: ApiService,
    private modalService: NgbModal
  ) { }

  ngOnInit(): void {
    this._success.subscribe(message => this.successMessage = message);
    this._success.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.successAlert?.close());

    this._danger.subscribe(message => this.dangerMessage = message);
    this._danger.pipe(debounceTime(this.alertTimeout)).subscribe(() => this.dangerAlert?.close());

    this.apiService.loggedUser$.asObservable().subscribe(user => {
      this.user = user;

      if (user) {
        this.userGroups$ = this.apiService.getUserGroups(this.user?.id);
        this.userGroups$.subscribe(groups => {
          this.groupId = groups[0]?.id;
        })
      }
    });
  }

  changeGroup(group: string) {
    this.groupId = group;
    if (this.groupId) {
      this.groupUsers$ = this.apiService.getGroupUsers(group);
    }
  }

  onGroupCreated(name: string) {
    const newGroup = {
      name: name
    } as any as Group;

    this.apiService.createUserGroup(this.user.id, newGroup).subscribe(
      value => this.userGroups$ = this.apiService.getUserGroups(this.user.id),
      () => this._danger.next('An error occured while creating the group!')
    );
  }

  onUserAddedToGroup(event: { email: string, groupId: string }) {
    this.apiService.addGroupUser(event.email, event.groupId).subscribe({
      next: user => {
        this.groupUsers$ = this.apiService.getGroupUsers(this.groupId);
        this._success.next(`<b>${user.username}</b> was successfully added to the group!`)
      },
      error: () => this._danger.next(`Could not find user with email address <b>${event.email}</b>`)
    });
  }

  onGroupDeleted(groupId: string) {
    this.apiService.deleteGroup(groupId).subscribe(
      () => {
        this.userGroups$ = this.apiService.getUserGroups(this.user.id);
        this._success.next('Group successfully deleted!');
      },
      () => this._danger.next('An error occured while deleting the group!')
    );
  }

  onGroupDeletedError(message: string) {
    this._danger.next(message);
  }

  openDeleteDialog(content, groupId: string) {
    this.modalService.open(content, {ariaLabelledBy: 'modal-basic-title', centered: true}).result.then((result) => {
      if(result === 'OK') {
        this.onGroupDeleted(groupId);
      }
    }, (reason) => {});
  }
}
