import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements AfterViewInit, OnDestroy {
  play = false;
  isIyric = false;

  isPress = false;

  timer1: any;
  timer2: any;
  @ViewChild('container')
  container!: ElementRef;

  @ViewChild('playerOpener')
  playerOpener!: ElementRef;

  ngAfterViewInit(): void {
    window.addEventListener('mouseup', this.closePress);
  }

  playAudio() {
    this.play = !this.play;
    if (this.play) {
      this.container.nativeElement
        .querySelector('.musicPic')
        .classList.add('playingOnPic');
    } else {
      this.container.nativeElement
        .querySelector('.musicPic')
        .classList.remove('playingOnPic');
    }
  }
  toggleIyric() {
    this.isIyric = !this.isIyric;
  }

  //进度条调整
  onMousedown() {
    this.isPress = true;
  }
  setProgress(e: any) {
    if (e.type === 'mousemove') {
      if (this.isPress) {
        const rect = e.target.getBoundingClientRect();
        const lengthPencentage = ((e.x - rect.x) / rect.width) * 100;
        document.documentElement.style.setProperty(
          '--progressWidth',
          lengthPencentage + '%',
        );
      }
    } else {
      const rect = e.target.getBoundingClientRect();
      const lengthPencentage = ((e.x - rect.x) / rect.width) * 100;
      document.documentElement.style.setProperty(
        '--progressWidth',
        lengthPencentage + '%',
      );
    }
  }
  closePress = () => {
    this.isPress = false;
  };

  nextSong() {}
  prevSong() {}
  close() {
    if (!this.timer1) {
      this.container.nativeElement.classList.add('closePlayer');
      this.timer1 = setTimeout(() => {
        this.playerOpener.nativeElement.classList.remove('toLeave');
        this.playerOpener.nativeElement.classList.add('toShow');
        this.container.nativeElement.classList.remove('closePlayer');
        this.container.nativeElement.style.display = 'none';
        clearTimeout(this.timer1);
        this.timer1 = null;
      }, 1000);
    }
  }
  open() {
    if (!this.timer2) {
      this.container.nativeElement.style.display = '';
      this.container.nativeElement.classList.add('openPlayer');
      this.playerOpener.nativeElement.classList.remove('toShow');
      this.playerOpener.nativeElement.classList.add('toLeave');
      this.timer2 = setTimeout(() => {
        this.container.nativeElement.classList.remove('openPlayer');
        clearTimeout(this.timer2);
        this.timer2 = null;
      }, 1000);
    }
  }

  ngOnDestroy(): void {
    //Called once, before the instance is destroyed.
    //Add 'implements OnDestroy' to the class.
    window.removeEventListener('mouseup', this.closePress);
  }
}
