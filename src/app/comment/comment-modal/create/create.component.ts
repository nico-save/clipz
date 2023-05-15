import { Component, Input, OnChanges, OnDestroy, OnInit } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { Subscription } from 'rxjs';
import firebase from 'firebase/compat/app';
import IClip from 'src/app/models/clip.model';
import { CommentService } from 'src/app/services/comment.service';
import { ModalService } from 'src/app/services/modal.service';
import { AngularFireAuth } from '@angular/fire/compat/auth';
import { AuthService } from 'src/app/services/auth.service';

@Component({
  selector: 'app-create',
  templateUrl: './create.component.html',
  styleUrls: ['./create.component.css']
})
export class CreateComponent implements OnInit, OnDestroy{
  @Input() clip: IClip | null = null;

  docID = '';
  inSubmission = false;
  showAlert = false;
  alertColor = 'blue';
  alertMsg = 'Please wait ... Submitting you comment'
  user: firebase.User | null =null;

  private routeSub: Subscription;
  constructor(
    private modal: ModalService,
    public route: ActivatedRoute,
    private commentService: CommentService,
    private auth: AngularFireAuth,
    public auth2: AuthService,
    ){
      this.routeSub = this.route.params.subscribe(params => {

        this.docID = params['id']
      });
      auth.user.subscribe(user => this.user = user)
    }


    openLoginModal($event: Event) {
      $event.preventDefault();
      this.modal.toggleModal('addComment')
      this.modal.toggleModal('auth')

    }

clipID = new FormControl('', {
  nonNullable: true,
})

comment = new FormControl('', {
  validators:[
  Validators.required,
  Validators.minLength(3)
],
nonNullable: true
})

createCommentForm = new FormGroup({
comment: this.comment,
id: this.clipID
})

async submit( ) {
  if(!this.clip) return
  this.inSubmission = true
  this.showAlert= true
  this.alertColor = 'blue'
  this.alertMsg= 'Please wait... Updating clip'

  try {
    const comment = {
      comment: this.comment.value,
      docId : this.clipID.value,
      uid : this.user?.uid as string,
      displayName : this.user?.displayName as string,
      timestamp: firebase.firestore.FieldValue.serverTimestamp(),
    }

    await this.commentService.createComment(comment)
   // this.commentService.getComments(this.clipID.value)
    setTimeout(() => {
      this.modal.toggleModal('addComment');
      this.showAlert = false;
      this.createCommentForm.reset();
    }, 2000)
  } catch (error) {
    console.log(error);
    this.inSubmission = false
    this.alertColor = 'red'
    this.alertMsg = 'Something went wrong. Try again later'
    return
  }

  // this.activeClip.title = this.title.value
  // this.update.emit(this.activeClip)

  this.inSubmission = false
  this.alertColor = 'green'
  this.alertMsg = 'Success!'
}

  ngOnInit(): void {
      this.modal.register('addComment')
  }

  ngOnChanges() {
    if(!this.clip) return

    this.inSubmission = false
    this.showAlert = false
    this.clipID.setValue(this.docID)
    this.comment.setValue(this.comment.value)
}


  ngOnDestroy(): void {
      this.modal.unregister('addComment')
      this.routeSub.unsubscribe();
  }

}
