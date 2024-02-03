import { MusicService } from '@/app/service/music.service';
import { getAverageColor, getDarkColor, getGrayishColor } from '@/utils/color';
import {
  AfterViewInit,
  Component,
  ElementRef,
  OnDestroy,
  OnInit,
  ViewChild,
} from '@angular/core';

@Component({
  selector: 'app-music-player',
  templateUrl: './music-player.component.html',
  styleUrls: ['./music-player.component.scss'],
})
export class MusicPlayerComponent implements OnInit, AfterViewInit, OnDestroy {
  play = false;
  isIyric = false;

  isPress = false;

  musicList = [];
  currentMusic = {
    musicUrl: '',
    lyric: '',
    musicName: '',
    musicAuthor: '',
    picUrl: '',
  };
  currentLyric: any;

  index = 0;
  total = 0;

  timer1: any;
  timer2: any;
  @ViewChild('container')
  container!: ElementRef;

  @ViewChild('playerOpener')
  playerOpener!: ElementRef;

  @ViewChild('audio')
  audio!: ElementRef;

  @ViewChild('voiceFrequency')
  voiceFrequency!: ElementRef;
  ctx: any;
  audioInit = false;
  dataArray: any;
  analyser: any;

  @ViewChild('wantChangeColorEle')
  wantChangeColorEle!: any;
  @ViewChild('getBgLightColor')
  getBgLightColor!: any;
  @ViewChild('album')
  album!: any;
  @ViewChild('scrollContainer')
  scrollContainer!: any;

  currentLyricIndex = 0;

  playerModel: 'danqu' | 'shunxu' | 'suiji' = 'shunxu';

  constructor(private musicService: MusicService) {}

  ngOnInit(): void {
    this.musicService.getMusicInfo().subscribe((res) => {
      if (res.code === 200) {
        this.musicList = res.result;
        this.index = 0;
        this.currentMusic = this.musicList[this.index];
        this.total = this.musicList.length;
        this.lyricSegment();
        this.getMixLightColor(
          this.getBgLightColor.nativeElement,
          this.wantChangeColorEle.nativeElement,
        );
      }
    });
  }

  ngAfterViewInit(): void {
    this.getMixLightColor(
      this.getBgLightColor.nativeElement,
      this.wantChangeColorEle.nativeElement,
    );

    window.addEventListener('mouseup', this.closePress);
    this.audio.nativeElement.addEventListener(
      'timeupdate',
      this.audioTimeupdateCallback,
    );
    this.audio.nativeElement.addEventListener('ended', this.audioEndedCallback);

    //初始化canvas
    this.voiceFrequency.nativeElement.width = 350;
    this.voiceFrequency.nativeElement.height = 350;
    this.ctx = this.voiceFrequency.nativeElement.getContext('2d');
    //初始化音频上下文
    this.audio.nativeElement.addEventListener('play', this.audioPlayCallback);
    this.audio.nativeElement.addEventListener('pause', this.audioPauseCallback);
    this.draw();
  }

  //下一首歌的回调
  nextCallback = () => {
    if (this.playerModel === 'suiji') {
      this.randomSong();
    } else {
      this.nextSong();
    }
  };

  //歌词分割
  lyricSegment = () => {
    this.currentLyric = this.currentMusic.lyric
      ? this.currentMusic.lyric.split('[').map((item: any) => {
          const temp = item.split(']');
          if (temp[0] && temp[1])
            return [this.timecodeToSeconds(temp[0]), temp[1]];
          else return [''];
        })
      : '';
  };

  //获取图片浅色作为背景颜色
  getMixLightColor = (canvas: any, wantChangeColorEle: any) => {
    if (!canvas && !wantChangeColorEle && !this.currentMusic) return;
    canvas.width = 10;
    canvas.height = 10;
    const ctx = canvas.getContext('2d');
    // 将图片加载到 canvas 中
    const img = new Image();
    img.crossOrigin = 'Anonymous'; // 跨域图片需要设置
    img.onload = () => {
      ctx.drawImage(img, 0, 0, canvas.width, canvas.height);

      // 获取图片的主色调
      const pixelData = ctx.getImageData(
        0,
        0,
        canvas.width,
        canvas.height,
      ).data;
      const averageColor = getAverageColor(pixelData);

      // 将背景颜色设置为主色调的浅色版本
      const darkColor = getDarkColor(averageColor);
      wantChangeColorEle.style.backgroundColor = darkColor;
      this.scrollContainer
        ? (this.scrollContainer.nativeElement.style.color =
            getGrayishColor(darkColor))
        : '';
    };

    // 图片来源
    img.src = this.currentMusic.picUrl;
  };

  //画频率
  draw = () => {
    //每次画完都准备下一次的绘制
    requestAnimationFrame(this.draw);
    //如果音频没有初始化或没播放，则不画
    if (!this.audioInit) return;
    const { width, height } = this.voiceFrequency.nativeElement;
    //初始化画布
    this.ctx.clearRect(0, 0, width, height);
    const centerX = width / 2;
    const centerY = height / 2;
    const radius = 125;
    //存入数据
    this.analyser.getByteFrequencyData(this.dataArray);
    const count = 40;
    const barWidth = (2 * Math.PI * radius) / count / 2 - 1;
    let angle1 = 0;
    let angle2 = Math.PI;
    const angleI = (2 * Math.PI) / count / 2;
    let i = 90;
    while (i++ < count + 90) {
      const j = (((i - 1) * 17) % 70) + 90;
      const data = this.dataArray[j];
      const barHeight = (data / 255) * 50;
      const x0 = centerX + radius * Math.cos(angle1);
      const y0 = centerY + radius * Math.sin(angle1);
      const x1 = centerX + (radius + barHeight) * Math.cos(angle1);
      const y1 = centerY + (radius + barHeight) * Math.sin(angle1);
      const x2 = centerX + radius * Math.cos(angle2);
      const y2 = centerY + radius * Math.sin(angle2);
      const x3 = centerX + (radius + barHeight) * Math.cos(angle2);
      const y3 = centerY + (radius + barHeight) * Math.sin(angle2);
      // 绘制直线
      this.ctx.beginPath();
      this.ctx.moveTo(x0, y0);
      this.ctx.lineTo(x1, y1);
      this.ctx.moveTo(x2, y2);
      this.ctx.lineTo(x3, y3);
      this.ctx.strokeStyle = '#9ca3af';
      this.ctx.lineWidth = barWidth;
      this.ctx.stroke();
      this.ctx.closePath();
      angle1 += angleI;
      angle2 += angleI;
    }
  };
  //audio播放事件
  audioPlayCallback = () => {
    if (this.audioInit) {
      return;
    }
    //获取音频上下文
    const atx = new AudioContext();
    //获取音频源节点
    const source = atx.createMediaElementSource(this.audio.nativeElement);
    //获取分析器
    this.analyser = atx.createAnalyser();
    this.analyser.fftSize = 512;
    //创建存储数组
    this.dataArray = new Uint8Array(this.analyser.frequencyBinCount);
    //连接源节点和分析器，有助于将数据传入分析器
    source.connect(this.analyser);
    //连接分析器和扬声器，能够发出声音
    this.analyser.connect(atx.destination);
    this.audioInit = true;
  };
  //audio播放中事件
  audioTimeupdateCallback = () => {
    const lengthPencentage =
      (this.audio.nativeElement.currentTime /
        this.audio.nativeElement.duration) *
      100;
    document.documentElement.style.setProperty(
      '--progressWidth',
      lengthPencentage + '%',
    );
    //歌词滚动定位
    if (this.currentLyric) {
      const active =
        this.scrollContainer.nativeElement.querySelector('#active');
      if (active.dataset.index !== this.currentLyricIndex) {
        this.currentLyricIndex = active.dataset.index;
        requestAnimationFrame(() => {
          active.scrollIntoView({
            behavior: 'smooth',
            block: 'center',
          });
        });
      }
    }
  };
  //audio结束事件
  audioEndedCallback = () => {
    this.playerModelControler();
  };
  //audio停止事件
  audioPauseCallback = () => {};

  //歌词点击跳转
  lyricTransform = (time: any) => {
    if (time) {
      this.audio.nativeElement.currentTime = time;
    }
  };

  //秒转时间
  secondsToTime(seconds: any) {
    if (seconds > 60 * 60) return '时间太大';
    const minutesTemp = Math.floor(seconds / 60);
    const remainingSecondsTemp = Math.floor(seconds % 60);
    const minutes = Object.is(minutesTemp, NaN) ? 0 : minutesTemp;
    const remainingSeconds = Object.is(remainingSecondsTemp, NaN)
      ? 0
      : remainingSecondsTemp;
    const formattedTime = `${this.padZero(minutes)}:${this.padZero(
      remainingSeconds,
    )}`;
    return formattedTime;
  }
  padZero(value: any) {
    return value < 10 ? `0${value}` : value;
  }
  //时间转秒
  timecodeToSeconds(timecode: string) {
    const [minutes, secondsAndMilliseconds] = timecode.split(':');
    const [seconds, milliseconds] = secondsAndMilliseconds.split('.');

    const totalSeconds = parseInt(minutes) * 60 + parseInt(seconds);
    const totalMilliseconds = totalSeconds * 1000 + parseInt(milliseconds);

    return totalMilliseconds / 1000;
  }

  //切换播放模式
  togglePlayerModel() {
    this.playerModel =
      this.playerModel === 'shunxu'
        ? 'suiji'
        : this.playerModel === 'suiji'
        ? 'danqu'
        : 'shunxu';
    if (this.playerModel === 'shunxu') {
      this.playerModelControler = () => {
        this.nextSong();
      };
    } else if (this.playerModel === 'suiji') {
      this.playerModelControler = () => {
        this.randomSong();
      };
    } else {
      this.playerModelControler = () => {
        this.audio.nativeElement.currentTime = 0;
        requestAnimationFrame(() => {
          if (this.play) this.audio.nativeElement.play();
        });
      };
    }
  }
  playerModelControler = () => {
    this.nextSong();
  };

  playAudio() {
    this.play = !this.play;
    if (this.play) {
      this.container.nativeElement
        .querySelector('.musicPic')
        .classList.add('playingOnPic');
      this.audio.nativeElement.play();
    } else {
      this.container.nativeElement
        .querySelector('.musicPic')
        .classList.remove('playingOnPic');
      this.audio.nativeElement.pause();
    }
  }
  toggleIyric() {
    this.isIyric = !this.isIyric;
    if (this.isIyric) {
      this.wantChangeColorEle.nativeElement.style.transform = 'rotateY(360deg)';
      this.wantChangeColorEle.nativeElement.style.borderRadius = '10%';
      this.album.nativeElement.style.transform = 'rotateY(180deg)';
    } else {
      this.wantChangeColorEle.nativeElement.style.transform = 'rotateY(180deg)';
      this.wantChangeColorEle.nativeElement.style.borderRadius = '100%';
      this.album.nativeElement.style.transform = 'rotateY(0deg)';
    }
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
        this.audio.nativeElement.currentTime =
          (this.audio.nativeElement.duration * lengthPencentage) / 100;
      }
    } else {
      const rect = e.target.getBoundingClientRect();
      const lengthPencentage = ((e.x - rect.x) / rect.width) * 100;
      document.documentElement.style.setProperty(
        '--progressWidth',
        lengthPencentage + '%',
      );
      this.audio.nativeElement.currentTime =
        (this.audio.nativeElement.duration * lengthPencentage) / 100;
    }
  }
  closePress = () => {
    this.isPress = false;
  };

  nextSong() {
    if (this.index === this.total - 1) this.index = 0;
    else this.index++;
    this.currentMusic = this.musicList[this.index];
    requestAnimationFrame(() => {
      if (this.play) this.audio.nativeElement.play();
    });
    this.lyricSegment();
    this.getMixLightColor(
      this.getBgLightColor.nativeElement,
      this.wantChangeColorEle.nativeElement,
    );
  }
  prevSong() {
    if (this.index === 0) this.index = this.total - 1;
    else this.index--;
    this.currentMusic = this.musicList[this.index];
    requestAnimationFrame(() => {
      if (this.play) this.audio.nativeElement.play();
    });
    this.lyricSegment();
    this.getMixLightColor(
      this.getBgLightColor.nativeElement,
      this.wantChangeColorEle.nativeElement,
    );
  }
  randomSong() {
    let i = Math.floor(Math.random() * this.musicList.length);
    while (i === this.index) {
      i = Math.floor(Math.random() * this.musicList.length);
    }
    this.index = i;
    this.currentMusic = this.musicList[this.index];
    requestAnimationFrame(() => {
      if (this.play) this.audio.nativeElement.play();
    });
    this.lyricSegment();
    this.getMixLightColor(
      this.getBgLightColor.nativeElement,
      this.wantChangeColorEle.nativeElement,
    );
  }
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
    this.audio.nativeElement.removeEventListener(
      'timeupdate',
      this.audioTimeupdateCallback,
    );
    this.audio.nativeElement.removeEventListener(
      'ended',
      this.audioEndedCallback,
    );
  }
}
