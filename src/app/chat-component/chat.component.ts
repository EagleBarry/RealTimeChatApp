import { CommonModule } from '@angular/common';
import { Component, inject, OnInit } from '@angular/core';
import { FormsModule } from '@angular/forms';
import { ChatService } from '../service/chat.service';
@Component({
  selector: 'app-chat-component',
  standalone: true,
  templateUrl: './chat.component.html',
  styleUrls: ['./chat.component.scss'],
  imports: [CommonModule, FormsModule],
})
export class ChatComponent implements OnInit {
  message: string = '';
  messages: string[] = [];
  private chatService = inject(ChatService);

  ngOnInit(): void {
    console.log('ChatComponent initialized');
    this.chatService.getMessage().subscribe((message: string) => {
      console.log('Message received in component:', message);
      this.messages.push(message);
    });
  }

  sendMessage(): void {
    console.log('Sending message from component:', this.message);
    this.chatService.sendMessage(this.message);
    this.message = '';
  }
}
