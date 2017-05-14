import { trigger, animate, transition, style } from '@angular/animations';

export const fadeAnimation = trigger('fadeInAnimation', [
    transition(':enter', [
      style({ opacity: 0 }),
      animate('.3s', style({ opacity: 1 }))
    ]),
  ]
);
