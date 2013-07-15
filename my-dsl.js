angular.scenario.dsl('textBox', function() {
    var chain = {};

    chain.input = function(value) {
        return this.addFutureAction("text box '" + this.selector + "' input '" + value + "'", function($window, $document, done) {
            var textBox =  $document.find(this.selector);
            textBox.val(value);
            textBox.trigger('input');
            done();
        });
    };

    return function(selector) {
        this.selector = selector;
        return chain;
    };
});
