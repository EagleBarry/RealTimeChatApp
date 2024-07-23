import { Component } from '@angular/core';
import { ChatComponent } from './chat-component/chat.component';

@Component({
  selector: 'app-root',
  standalone: true,
  templateUrl: './app.component.html',
  styleUrls: ['./app.component.scss'],
  imports: [ChatComponent],
})
export class AppComponent {
  title = 'RealTimeChatApp';
}
