import { Component, OnInit } from '@angular/core';
import dayGridPlugin from '@fullcalendar/daygrid';
import interactionPlugin from '@fullcalendar/interaction';

@Component({
  selector: 'app-calendario',
  templateUrl: './calendario.component.html',
  styleUrls: ['./calendario.component.scss']
})
export class CalendarioComponent implements OnInit {
  calendarOptions: any;

  ngOnInit() {
    this.calendarOptions = {
      initialView: 'dayGridMonth',
      dateClick: this.handleDateClick.bind(this),
      plugins: [dayGridPlugin, interactionPlugin,],
      events: [
        { title: 'Evento de Teste', date: '2025-02-10' },
        { title: 'Outro Evento', date: '2025-02-12' }
      ]
    };
  }

  handleDateClick() {
    alert('Data clicada: ' + 'arg.dateStr');
  }
}
