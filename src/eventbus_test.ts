/// <reference path="../typings/jasmine/jasmine.d.ts"/>

import * as events from "./eventbus";

describe("Test event bus", function() {

    class TestEvent implements events.Event {
        name: string = "TestEvent";
        constructor(public data?: string) { }
    }

    var eventBus: events.EventBus;

    beforeEach(function() {
        eventBus = new events.EventBus();
    });

    it("calls event handlers", function() {
        var handler = jasmine.createSpy("handler");
        var reg = eventBus.listen(new TestEvent(), handler);

        var e = new TestEvent("Hello World")
        eventBus.emit(e);

        expect(handler.calls.count()).toBe(1);
        expect(handler).toHaveBeenCalledWith(e);
    });

    it("doesn't call unregistered handlers", function() {
        var handler = jasmine.createSpy("handler");
        var reg = eventBus.listen(new TestEvent(), handler);

        reg.unregister();
        var e = new TestEvent("Hello World")
        eventBus.emit(e);
        expect(handler.calls.count()).toBe(0);
    });

    it("only calls once to one off handlers", function() {
        var handler = jasmine.createSpy("event handler");
        var reg = eventBus.listen(new TestEvent(), (e) => {
            reg.unregister();
            handler(e);
        });

        var e = new TestEvent("Hello World")
        eventBus.emit(e);
        eventBus.emit(e);

        expect(handler.calls.count()).toBe(1);
        expect(handler).toHaveBeenCalledWith(e);
    });

    it("throws an error if handler is unregistered", function() {
        var reg = eventBus.listen(new TestEvent(), (e) => { });

        reg.unregister();

        try {
            reg.unregister();
            fail();
        } catch (e) {
            expect(e.message).toBe("Event handler not registered.");
        }
    });

    it("do not call handlers registered during event handling", function() {
        var handler1 = jasmine.createSpy("event handler 1");
        var handler2 = jasmine.createSpy("event handler 2");

        var reg = eventBus.listen(new TestEvent(), (e) => {
            handler1(e);
            eventBus.listen(new TestEvent(), handler2);
        });

        var e = new TestEvent("Hello World")
        eventBus.emit(e);
        eventBus.emit(e);

        expect(handler1.calls.count()).toBe(2);
        expect(handler1).toHaveBeenCalledWith(e);
        expect(handler2.calls.count()).toBe(1);
    });

});
