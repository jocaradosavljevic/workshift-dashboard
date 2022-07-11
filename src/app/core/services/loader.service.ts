import { Injectable } from '@angular/core';
import { BehaviorSubject, Observable } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class LoaderService {

  private static loaderActive = new BehaviorSubject<boolean>(false);

  static get loader(): Observable<boolean> {
    return this.loaderActive;
  }

  static activate() {
    this.loaderActive.next(true);
  }

  static deactivate() {
    this.loaderActive.next(false);
  }
}
