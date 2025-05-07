import { Injectable } from '@angular/core';
import { BehaviorSubject } from 'rxjs';

@Injectable({
  providedIn: 'root'
})
export class TitleService {
  private titleSubject = new BehaviorSubject<string>('Titre par défaut');
  private hasWhatsappSubject = new BehaviorSubject<boolean>(false);
  private espace = new BehaviorSubject<number>(0);

  public title$ = this.titleSubject.asObservable();
  public hasWhatsappSubject$ = this.hasWhatsappSubject.asObservable();
  public espace$ = this.espace.asObservable();

  setTitle(title: string) {
    this.titleSubject.next(title);
  }

  setWhatsappState(state: boolean) {
    this.hasWhatsappSubject.next(state);
  }
  
  setPfcState(level: number) {
    this.espace.next(level);
  }
}
