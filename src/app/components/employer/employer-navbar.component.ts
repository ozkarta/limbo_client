import { Component } from '@angular/core';

import { ChatService } from '../../modules/http/chat.service';

@Component({
  selector: 'employer',
  templateUrl: '../../views/employer/employer-navbar.component.html',
  styleUrls: ['../../styles/employer/employer-navbar.style.css']
})
export class EmployerNavbarComponent {
  title = 'app works!';

  constructor(private chatService: ChatService){}
}
