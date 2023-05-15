import { Component, OnInit, ViewChild, ElementRef, ViewEncapsulation, Input, OnDestroy, OnChanges, SimpleChanges } from '@angular/core';
import { ActivatedRoute } from '@angular/router';
import  videojs from 'video.js';
import IClip from '../models/clip.model';
import { DatePipe } from '@angular/common';
import {  Subscription } from 'rxjs';
import { CommentService } from '../services/comment.service';
@Component({
  selector: 'app-clip',
  templateUrl: './clip.component.html',
  styleUrls: ['./clip.component.css'],
  encapsulation: ViewEncapsulation.None,
  providers: [DatePipe]


})
export class ClipComponent implements OnInit, OnChanges {
  @Input() activeClip: IClip | null = null;
  @ViewChild('videoPlayer', {static: true}) target?: ElementRef;
  player?: videojs.Player
  clip?: IClip
  clipId: string | null =null;

  private routeSub: Subscription;
  constructor(public route: ActivatedRoute, private commentService: CommentService){
    // this.routeSub = this.route.params.subscribe( {

    //   next: (params) =>{

    //     this.commentService.getComments(params['id'])
    //   }

    // });

  }

 async ngOnInit() {

    this.player = videojs(this.target?.nativeElement)

   this.route.data.subscribe(data => {
    this.clip = data['clip'] as IClip

    this.player?.src({
      src: this.clip.url,
      type: 'video/mp4'
    })
   })
  }

  ngOnChanges(): void {
      console.log('component changed')
  }





}
