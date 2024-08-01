import { io } from 'socket.io-client';

const socket = io('ws://localhost:3500');

const activity = document.getElementById('activity') as HTMLDivElement;
const msgInput = document.getElementById('messageInput') as HTMLInputElement;

function sendMessage(e: Event): void {
  e.preventDefault();
  if (msgInput.value) {
    socket.emit('message', msgInput.value);
    msgInput.value = '';
  }
  msgInput.focus();
}

const form = document.querySelector('form');
form?.addEventListener('submit', sendMessage);

socket.on('message', (data: string) => {
  if (activity) {
    activity.textContent = '';
  }
  const listItem = document.createElement('li');
  listItem.textContent = data;
  document.querySelector('ul')?.appendChild(listItem);
});

msgInput.addEventListener('keypress', () => {
  socket.emit(
    'activity',
    socket.id ? socket.id.substring(0, 5) : 'uknown user',
  );
});

let activityTimer: ReturnType<typeof setTimeout>;

socket.on('activity', (name: string) => {
  if (activity) {
    activity.textContent = `${name} is typing...`;

    clearTimeout(activityTimer);
    activityTimer = setTimeout(() => {
      activity.textContent = '';
    }, 3000);
  }
});
