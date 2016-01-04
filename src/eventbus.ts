/// <reference path="../typings/es6-collections/es6-collections.d.ts"/>

/**
 * An Event Bus event.
 *
 * Subclasses must define a unique and immutable 'name'.
 */
export interface Event {
    name: string;
}

/**
 * An event handler.
 */
export type EventHandler<T extends Event> = (event: T) => void;

/**
 * Registration objects returned when an event handler is added,
 * used to deregister.
 */
export interface HandlerRegistration {

    /**
     * Deregisters the handler associated with this registration object.
     */
    unregister(): void;
}

/**
 * Dispatches Events to interested parties.
 *
 * Eases decoupling by allowing objects to interact without having direct
 * dependencies upon one another, and without requiring event sources to
 * deal with maintaining handler lists.
 *
 * There will typically be one EventBus per application, broadcasting
 * events that may be of general interest.
 */
export class EventBus {

    private handlers = new Map<string, EventHandler<Event>[]>();

    /**
     * Adds an event handler to receive events of a given type.
     * Returns a handler registration used to deregister.
     */
    on<T extends Event>(event: T, handler: EventHandler<T>): HandlerRegistration {

        var h = this.handlers.get(event.name);
        if (h == null) {
            h = [];
            this.handlers.set(event.name, h);
        }

        h.push(handler);
        return {
            unregister: () => {
                var h = this.handlers.get(event.name) || [];
                var index = h.indexOf(handler);
                if (index == -1) {
                    throw new Error("Event handler not registered.");
                }
                h.splice(index, 1);
                if (h.length == 0) {
                    this.handlers.delete(event.name);
                }
            }
        };
    }

    /**
     * Fires a given event to all handlers listening to it.
     */
    emit(event: Event) {
        var handlers = this.handlers.get(event.name) || [];
        handlers.forEach(h => {
            h(event);
        });
    }
}
