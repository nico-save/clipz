import { Component, Input, OnInit } from '@angular/core';
import { ModalService } from '../../services/modal.service';
import IClip from 'src/app/models/clip.model';
import { CommentService } from 'src/app/services/comment.service';

import IComment from 'src/app/models/comment.model';
import { ActivatedRoute } from '@angular/router';
import { Observable, Subscription } from 'rxjs';
import { AuthService } from 'src/app/services/auth.service';


@Component({
  selector: 'app-comments-list',
  templateUrl: './comments-list.component.html',
  styleUrls: ['./comments-list.component.css'],

})
export class CommentsListComponent implements OnInit {
@Input() show = true;
@Input() clip: IClip | null = null;
commentsById$ :Observable<IComment[]>




private routeSub: Subscription;
constructor(
  private modalService: ModalService,
  public commentService: CommentService,
  public route: ActivatedRoute,
  public auth: AuthService,
)
  {

  }

ngOnInit(): void {
  this.routeSub = this.route.params.subscribe(params => {
    this.commentsById$ =  this.commentService.getComments(params['id'])


  });

}


toggleComments = ($event: Event) => {
  $event.preventDefault()
   this.show = !this.show
}

openModal($event: Event, clip: IClip) {
  $event.preventDefault();
  this.clip = clip;
  this.modalService.toggleModal('addComment')

}



}
