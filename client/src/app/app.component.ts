import { Component } from '@angular/core';
import { Observable } from 'rxjs';
import { Store } from '@ngrx/store';

import * as AppSelectors from './state/app.selectors';

@Component({
  selector: 'app-root',
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.css']
})
export class AppComponent {
  activeComponentTitle$: Observable<string>;

  constructor(
    private store: Store
  ) {
    this.activeComponentTitle$ = this.store.select(AppSelectors.activeComponentTitle);
  }
}
