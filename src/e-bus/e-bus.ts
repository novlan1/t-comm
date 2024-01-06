export class EventBus {
  private events: Record<string, Array<Function>>;

  constructor() {
    this.events = {};
  }

  emit(eventName: string, data: any) {
    if (this.events[eventName]) {
      this.events[eventName].forEach((fn) => {
        fn(data);
      });
    }
  }
  on(eventName: string, fn: any) {
    this.events[eventName] = this.events[eventName] || [];
    this.events[eventName].push(fn);
  }

  off(eventName: string, fn: any) {
    if (!fn) {
      delete this.events[eventName];
      return;
    }
    if (this.events[eventName]) {
      for (let i = 0; i < this.events[eventName].length; i++) {
        if (this.events[eventName][i] === fn) {
          this.events[eventName].splice(i, 1);
          break;
        }
      }
    }
  }
}
