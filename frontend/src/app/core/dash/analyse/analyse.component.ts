import { Component, ElementRef, OnInit, ViewChild } from '@angular/core';
declare function scrip(): any;
//declare function trim():any

@Component({
  selector: 'app-analyse',
  templateUrl: './analyse.component.html',
  styleUrls: ['./analyse.component.css'],
})
export class AnalyseComponent implements OnInit {
  start!: any;
  end!:any
 // @ViewChild('videoPlayer', { static: false }) videoplayer!: ElementRef;

  constructor() {}

  ngOnInit(): void {
    scrip();
  }

  trim() {
    var player = {
      video: <HTMLVideoElement>document.getElementsByClassName('video')[0],
      start: 0,
      end: null,
      controls: {
        play: <HTMLVideoElement>(
          document.getElementsByClassName('play-control')[0]
        ),
        seekToStart: <HTMLVideoElement>(
          document.getElementsByClassName('seek-start')[0]
        ),
        seekToEnd: <HTMLVideoElement>(
          document.getElementsByClassName('seek-end')[0]
        ),
        reset: <HTMLVideoElement>(
          document.getElementsByClassName('reset-control')[0]
        ),
      },
    };

    if (player.video.currentTime <= 10) {
      this.start = player.video.currentTime;
      this.end=player.video.currentTime +10
      console.log(player.video.currentTime);
      
    } else {
      this.start = player.video.currentTime - 10;
      this.end=player.video.currentTime +10
      console.log(this.start);
      console.log(this.end);
    }
  }

  
}
