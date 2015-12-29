namespace Events {

  export interface Event {
    name: string;
  }

  export interface EventHandler<T extends Event> {
    onEvent(e : T) : void;
  }

  export interface HandlerRegistration {
    unregister() : void;
  }

  export class EventBus {

    private handlers : {[ key : string] : EventHandler<Event>[]} = {};

    listen<T extends Event>(event: T, handler: EventHandler<T>) : HandlerRegistration {

      var h = this.handlers[event.name];

      if (h == null) {
        h = [];
        this.handlers[event.name] = h;
      }

      h.push(handler);
      return {
        unregister : () => {
          var h = this.handlers[event.name] || [];
          var index = h.indexOf(handler);
          if (index == -1) {
            throw new Error("Event handler not registered.");
          }
          h.splice(index, 1);
          if (h.length == 0) {
            delete this.handlers[event.name];
          }
        }
      };
    }

    emit(event: Event) {
      var handlers = this.handlers[event.name] || [];
      handlers.forEach(h => {
        h.onEvent(event);
      });
    }
  }
}
