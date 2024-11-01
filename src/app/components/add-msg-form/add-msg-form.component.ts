import { BoardMsgService } from '@/app/service/board-msg.service';
import { resType } from '@/types/response/response';
import { Component, EventEmitter, Input, OnInit, Output } from '@angular/core';
import { FormControl, FormGroup, Validators } from '@angular/forms';
import { ActivatedRoute } from '@angular/router';
import { NzMessageService } from 'ng-zorro-antd/message';

@Component({
  selector: 'app-add-msg-form',
  templateUrl: './add-msg-form.component.html',
  styleUrls: ['./add-msg-form.component.scss'],
})
export class AddMsgFormComponent implements OnInit {
  @Input()
  smallSize!: boolean;
  @Input()
  articleId = '';
  @Input()
  fatherMsgId = '';
  @Output()
  reloadMsg = new EventEmitter();
  isMsgBoard = false;

  emojiBoardVisible = false;

  emojis: any = `😀,😃,😄,😁,😆,😅,😂,🤣,🥲,🥹,😊,😇,🙂,🙃,😉,😌,😍,🥰,😘,😗,😙,😚,😋,😛,😝,😜,🤪,🤨,🧐,🤓,😎,🥸,🤩,🥳,🙂‍↕️,😏,😒,🙂‍↔️,😞,😔,😟,😕,🙁,☹️,😣,😖,😫,😩,🥺,😢,😭,😮‍💨,😤,😠,😡,🤬,🤯,😳,🥵,🥶,😱,😨,😰,😥,😓,🫣,🤗,🫡,🤔,🫢,🤭,🤫,🤥,😶,😶‍🌫️,😐,😑,😬,🫨,🫠,🙄,😯,😦,😧,😮,😲,🥱,😴,🤤,😪,😵,😵‍💫,🫥,🤐,🥴,🤢,🤮,🤧,😷,🤒,🤕,🤑,🤠,😈,👿,👹,👺,🤡,💩,👻,💀,☠️,👽,👾,🤖,🎃,😺,😸,😹,😻,😼,😽,🙀,😿,😾,👋,🤚,🖐,✋,🖖,👌,🤌,🤏,✌️,🤞,🫰,🤟,🤘,🤙,🫵,🫱,🫲,🫸,🫷,🫳,🫴,👈,👉,👆,🖕,👇,☝️,👍,👎,✊,👊,🤛,🤜,👏,🫶,🙌,👐,🤲,🤝,🙏,✍️,💅,🤳,💪,🦾,🦵,🦿,🦶,👣,👂,🦻,👃,🫀,🫁,🧠,🦷,🦴,👀,👁,👅,👄,🫦,💋,🩸,🐶,🐱,🐭,🐹,🐰,🦊,🐻,🐼,🐻‍❄️,🐨,🐯,🦁,🐮,🐷,🐽,🐸,🐵,🙈,🙉,🙊,🐒,🐔,🐧,🐦,🐦‍⬛,🐤,🐣,🐥,🦆,🦅,🦉,🦇,🐺,🐗,🐴,🦄,🐝,🪱,🐛,🦋,🐌,🐞,🐜,🪰,🪲,🪳,🦟,🦗,🕷,🕸,🦂,🐢,🐍,🦎,🦖,🦕,🐙,🦑,🦐,🦞,🦀,🪼,🪸,🐡,🐠,🐟,🐬,🐳,🐋,🦈,🐊,🐅,🐆,🦓,🫏,🦍,🦧,🦣,🐘,🦛,🦏,🐪,🐫,🦒,🦘,🦬,🐃,🐂,🐄,🐎,🐖,🐏,🐑,🦙,🐐,🦌,🫎,🐕,🐩,🦮,🐕‍🦺,🐈,🐈‍⬛,🪽,🪶,🐓,🦃,🦤,🦚,🦜,🦢,🪿,🦩,🕊,🐇,🦝,🦨,🦡,🦫,🦦,🦥,🐁,🐀,🐿,🦔,🐾,🐉,🐲,🐦‍🔥,🌵,🎄,🌲,🌳,🌴,🪹,🪺,🪵,🌱,🌿,☘️,🍀,🎍,🪴,🎋,🍃,🍂,🍁,🍄,🍄‍🟫,🐚,🪨,🌾,💐,🌷,🪷,🌹,🥀,🌺,🌸,🪻,🌼,🌻,🌞,🌝,🌛,🌜,🌚,🌕,🌖,🌗,🌘,🌑,🌒,🌓,🌔,🌙,🌎,🌍,🌏,🪐,💫,⭐️,🌟,✨,⚡️,☄️,💥,🔥,🌪,🌈,☀️,🌤,⛅️,🌥,☁️,🌦,🌧,⛈,🌩,🌨,❄️,☃️,⛄️,🌬,💨,💧,💦,🫧,☔️,☂️,🌊`;

  msgBoardData: FormGroup = new FormGroup({
    name: new FormControl('', [Validators.required, Validators.max(20)]),
    mail: new FormControl('', [Validators.required, Validators.email]),
    website: new FormControl(''),
    content: new FormControl('', [Validators.required]),
  });
  get name() {
    return this.msgBoardData.get('name');
  }
  get mail() {
    return this.msgBoardData.get('mail');
  }
  get content() {
    return this.msgBoardData.get('content');
  }
  sendMsg() {
    if (this.msgBoardData.valid) {
      this.addMsg();
    } else {
      Object.values(this.msgBoardData.controls).forEach((control) => {
        if (control.invalid) {
          control.markAsDirty();
          control.updateValueAndValidity({ onlySelf: true });
        }
      });
      this.message.warning('请正确填写表单');
    }
  }
  addMsg() {
    const data = {
      ...this.msgBoardData.value,
      name: this.msgBoardData.value.name.slice(0, 10),
    };
    if (this.fatherMsgId) data.fatherMsgId = this.fatherMsgId;
    if (this.articleId) data.articleId = this.articleId;
    if (this.isMsgBoard) {
      this.boardMsgService
        .addMsgForBoard(data)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.message.success('评论成功，博主审核后才能看见o~~');
            this.msgBoardData.reset();
            this.reloadMsg.emit();
          } else {
            this.message.warning(res.msg as string);
          }
        });
    } else {
      this.boardMsgService
        .addMsgForArticle(data)
        .subscribe((res: resType<any>) => {
          if (res.code === 200) {
            this.message.success('评论成功，博主审核后才能看见o~~');
            this.msgBoardData.reset();
            this.reloadMsg.emit();
          } else {
            this.message.warning(res.msg as string);
          }
        });
    }
  }
  addEmoji(emoji: any) {
    this.content?.setValue(this.content.value + emoji);
  }
  ngOnInit(): void {
    this.route.url.subscribe((res) => {
      this.isMsgBoard = res[0].path === 'msgboard' ? true : false;
    });
    this.emojis = this.emojis.split(',');
  }
  constructor(
    private message: NzMessageService,
    private boardMsgService: BoardMsgService,
    private route: ActivatedRoute,
  ) {}
}
