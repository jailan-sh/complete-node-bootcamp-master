const EventEmmiter = require("events");

class Sale extends EventEmmiter {
  constructor() {
    super();
  }
}

const myEmmiter = new Sale();
