import { closedFloat, judgeSeason, seasonSelect } from '@/utils/seasonFloat';
import { Component, ElementRef, ViewChild } from '@angular/core';

@Component({
  selector: 'app-circle-menu',
  templateUrl: './circle-menu.component.html',
  styleUrls: ['./circle-menu.component.scss']
})
export class CircleMenuComponent {
  flag=true
  @ViewChild('menu')
  menu!: ElementRef;
  ngAfterViewInit(): void {
    document.querySelector('[has-ripple="true"]')?.addEventListener('click', () => {
      document.getElementById('menu-btn')!.classList.toggle('clicked')
      this.menu.nativeElement.classList.toggle('open')
      this.menu.nativeElement.querySelectorAll('a').forEach((item: any,index:number) => {
        item.addEventListener('click', (e: any) => {
          e.preventDefault();
          this.menu.nativeElement.querySelectorAll('.menuitem-wrapper')[index].classList.add('spin')
          let timer = setTimeout( ()=> {
            this.menu.nativeElement.querySelectorAll('.menuitem-wrapper')[index].classList.remove('spin')
            document.getElementById('menu-btn')!.classList.remove('clicked')
            this.menu.nativeElement.classList.remove('open')
            clearTimeout(timer)
          }, 800);
        })
      });
    })
  }
  changeSeason(type:'Spring'|'Summer'|'Winter'|'Autumn'){
    seasonSelect(type)
  }
  toggleFloat(){
    if(this.flag) {
      closedFloat()
    }else{
      seasonSelect(judgeSeason())
    }
    this.flag=!this.flag
  }
}
