
class Event {
    constructor(title, date, time) {
      this.title = title;
      this.date = date;
      this.time = time;
    }
  }
  

  class UI {
    static displayEvents() {
        console.log("hello");
      const events = Store.getEvents();
  
      events.forEach((event) => UI.addEventToCalendar(event));
    } 
  
    static addEventToCalendar(event) {
      const list = document.querySelector('#event-list');
  
      const row = document.createElement('tr');
  
      row.innerHTML = `
        <td>${event.title}</td>
        <td>${event.date}</td>
        <td>${event.time}</td>
        <td><a href="#" class="btn btn-danger btn-sm delete">X</a></td>
      `;
  
      list.appendChild(row);
    }
  
    static deleteEvent(el) {
      if(el.classList.contains('delete')) {
        el.parentElement.parentElement.remove();
      }
    }
  
    static showAlert(message, className) {
      const div = document.createElement('div');
      div.className = `alert alert-${className}`;
      div.appendChild(document.createTextNode(message));
      const container = document.querySelector('.container');
      const form = document.querySelector('#event-form');
      container.insertBefore(div, form);
  

      setTimeout(() => document.querySelector('.alert').remove(), 3000);
    }
  
    static clearFields() {
      document.querySelector('#title').value = '';
      document.querySelector('#date').value = '';
      document.querySelector('#time').value = '';
    }
  }
  

  class Store {
    static getEvents() {
      let events;
      if(window.localStorage.getItem('events') === null) {
        events = [];
      } else {
        events = JSON.parse(window.localStorage.getItem('events'));
      }
  
      return events;
    }
  
    static addEvent(event) {
      const events = Store.getEvents();
      events.push(event);
      window.localStorage.setItem('events', JSON.stringify(events));
    }
  
    static removeEvent(time) {
      const events = Store.getEvents();
  
      events.forEach((event, index) => {
        if(event.time === time) {
          events.splice(index, 1);
        }
      });
  
      window.localStorage.setItem('events', JSON.stringify(events));
    }
  }
  

  document.addEventListener('DOMContentLoaded', UI.displayEvents);
  

  document.querySelector('#event-form').addEventListener('submit', (e) => {

    e.preventDefault();

    const title = document.querySelector('#title').value;
    const date = document.querySelector('#date').value;
    const time = document.querySelector('#time').value;
  

    if(title === '' || date === '' || time === '') {
      UI.showAlert('Please fill in all fields', 'danger');
    } 
    else {
      const event = new Event(title, date, time);
  

      UI.addEventToCalendar(event);
       Store.addEvent(event);
       
       UI.showAlert('Event Added', 'success');
      UI.clearFields();
    }
  });
  

  document.querySelector('#event-list').addEventListener('click', (e) => {
  UI.deleteEvent(e.target);
    Store.removeEvent(e.target.parentElement.previousElementSibling.textContent);
  UI.showAlert('Event Removed', 'success');
  }); 