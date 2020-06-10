import { Injectable } from '@angular/core';
import { Subject } from 'rxjs';

// Cette classe est résponsable de l'apparition du Loader.
@Injectable()
export class LoaderService {
  isLoading = new Subject<boolean>();

  show() {
    this.isLoading.next(true);
  }

  hide() {
    this.isLoading.next(false);
  }
}
