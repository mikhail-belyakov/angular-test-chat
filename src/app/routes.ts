import { Routes } from '@angular/router';
import { MessagesComponent } from './messages/messages.component';

export const routes: Routes = [
  {
    path: '',
    redirectTo: 'chat',
    pathMatch: 'full'
  },
  {
    path: 'chat',
    component: MessagesComponent
  }
];
