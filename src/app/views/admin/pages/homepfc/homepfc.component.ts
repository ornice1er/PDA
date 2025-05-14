import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { TitleService } from '../../../../core/utils/title.service';
import { GlobalName } from '../../../../core/utils/global-name';

@Component({
  selector: 'app-homepfc',
  standalone: true,
    imports:[RouterOutlet],
  templateUrl: './homepfc.component.html',
  styleUrls: ['./homepfc.component.css']
})
export class HomepfcComponent implements OnInit {

  constructor(
    private localStorageService:LocalStorageService,
    private titleService: TitleService
    ) { 
  }

  onglet_What:any = false
  user:any = false

  ngOnInit(): void {
    this.titleService.setTitle('Espace Point Focal Communal')
    this.titleService.setPfcState(1)

    if (this.localStorageService.get(GlobalName.tokenNameMat) != null) {
      this.user = this.localStorageService.get(GlobalName.userNameMat)
          this.titleService.setUserConnectedState(this.user)
      //Controle pour acceder à l'onglet WhatsApp
      if(this.user?.attribu_com != null){
        this.titleService.setWhatsappState(true)
      }else{
        this.titleService.setWhatsappState(false)
      }
      
    }

  }

}
