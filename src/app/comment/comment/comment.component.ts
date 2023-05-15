import { Component, Input } from '@angular/core';
import IComment from '../../models/comment.model';
import { DatePipe } from '@angular/common';

@Component({
  selector: 'app-comment',
  templateUrl: './comment.component.html',
  styleUrls: ['./comment.component.css']
})
export class CommentComponent {
  @Input() comment : IComment ;

}
