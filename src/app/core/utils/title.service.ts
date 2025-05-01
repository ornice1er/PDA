import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Titre par défaut');
  private hasWhatsappSubject = new BehaviorSubject<boolean>(false);
  private isPfc = new BehaviorSubject<boolean>(false);

  public title$ = this.titleSubject.asObservable();
  public hasWhatsappSubject$ = this.hasWhatsappSubject.asObservable();
  public isPfc$ = this.isPfc.asObservable();

  setTitle(title: string) {
    this.titleSubject.next(title);
  }

  setWhatsappState(state: boolean) {
    this.hasWhatsappSubject.next(state);
  }
  
  setPfcState(state: boolean) {
    this.isPfc.next(state);
  }
}
