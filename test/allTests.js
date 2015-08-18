/**
 * Unit Testing
 A unit test is a way of instantiating a subset of an application to apply stimulus to it. Small, structured modules help keep unit tests concise and focused.

 Each module can only be loaded once per injector. Usually an Angular app has only one injector and modules are only loaded once. Each test has its own injector and modules are loaded multiple times.
 In all of these examples we are going to assume this module definition:
 */
angular.module('greetMod', []).

    factory('alert', function($window) {
        return function(text) {
            $window.alert(text);
        }
    }).

    value('salutation', 'Hello').

    factory('greet', function(alert, salutation) {
        return function(name) {
            alert(salutation + ' ' + name + '!');
        }
    });


//Let's write some tests to show how to override configuration in tests.
describe('myApp', function() {
    // load application module (`greetMod`) then load a special
    // test module which overrides `$window` with a mock version,
    // so that calling `window.alert()` will not block the test
    // runner with a real alert box.
    beforeEach(module('greetMod', function($provide) {
        $provide.value('$window', {
            alert: jasmine.createSpy('alert')
        });
    }));

    // inject() will create the injector and inject the `greet` and
    // `$window` into the tests.
    it('should alert on $window', inject(function(greet, $window) {
        greet('World');
        expect($window.alert).toHaveBeenCalledWith('Hello World!');
    }));

    // this is another way of overriding configuration in the
    // tests using inline `module` and `inject` methods.
    it('should alert using the alert service', function() {
        var alertSpy = jasmine.createSpy('alert');
        module(function($provide) {
            $provide.value('alert', alertSpy);
        });
        inject(function(greet) {
            greet('World');
            expect(alertSpy).toHaveBeenCalledWith('Hello World!');
        });
    });
});