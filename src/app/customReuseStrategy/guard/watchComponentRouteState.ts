import { Injectable } from '@angular/core';
import { CanDeactivate } from '@angular/router';
import { Observable } from 'rxjs';

export interface watchComponentDeactivate {
  isLeave: boolean;
  canDeactivate?: () => Observable<boolean> | Promise<boolean> | boolean;
}

@Injectable({
  providedIn: 'root',
})
export class WatchDeactivateGuard
  implements CanDeactivate<watchComponentDeactivate>
{
  canDeactivate(
    component: watchComponentDeactivate,
  ): Observable<boolean> | Promise<boolean> | boolean {
    component.isLeave = true;
    return true;
  }
}
