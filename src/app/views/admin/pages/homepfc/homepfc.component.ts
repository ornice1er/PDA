import { Component, OnInit } from '@angular/core';
import { RouterOutlet } from '@angular/router';
import { TitleService } from '../../../../core/utils/title.service';
import { LocalStorageService } from '../../../../core/utils/local-stoarge-service';
import { GlobalName } from '../../../../core/utils/global-name';

@Component({
  selector: 'app-homepfc',
  standalone: true,
  imports: [RouterOutlet],
  templateUrl: './homepfc.component.html',
  styleUrls: ['./homepfc.component.css'],
})
export class HomepfcComponent implements OnInit {
  user: any;
  constructor(
    private titleService: TitleService,
    private local_service: LocalStorageService
  ) {
    // if(localStorage.getItem(GlobalName.tokenNameMat)!=undefined) this.user=this.local_service.get(GlobalName.tokenNameMat);
  }
  ngOnInit(): void {
    this.titleService.setTitle('Espace Point Focal Communal');
    this.user = this.local_service.get(GlobalName.userNameMat);
    if (this.user) {
      this.titleService.setUserConnectedState(this.user);
      if (this.user?.agent_user?.categorie_acteur === 'Mairie') {
        this.titleService.setPfcState(3);
      } else {
        this.titleService.setPfcState(1);
      }
    }
  }
}
