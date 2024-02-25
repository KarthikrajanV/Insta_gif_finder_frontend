// admin-auth.service.ts

import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';
import { environment } from '../environments/environment.development';

@Injectable({
  providedIn: 'root',
})
export class AdminAuthService {
  private adminKey = environment.adminPass;
  private isAuthenticatedSubject = new BehaviorSubject<boolean>(false);

  isAuthenticated$ = this.isAuthenticatedSubject.asObservable();

  constructor() {
    this.checkAuthentication();
  }

  private checkAuthentication() {
    const storedKey = localStorage.getItem('adminKey');
    if (storedKey && storedKey === this.adminKey) {
      this.isAuthenticatedSubject.next(true);
    } else {
      this.isAuthenticatedSubject.next(false);
    }
  }

  authenticateAdmin(key: string): boolean {
    if (key === this.adminKey) {
      localStorage.setItem('adminKey', key);
      this.isAuthenticatedSubject.next(true);
      return true;
    } else {
      return false;
    }
  }

  logout() {
    localStorage.removeItem('adminKey');
    this.isAuthenticatedSubject.next(false);
  }
}
