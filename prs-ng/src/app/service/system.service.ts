import { Injectable } from '@angular/core';

@Injectable({
  providedIn: 'root'
})
export class SystemService {
  data = {
    about: 'System Service',
    user: {
      loggedIn: false,
      instance: null
    }
  }

  constructor() { }
}
