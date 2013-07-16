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

angular.scenario.dsl('selectBox', function() {
    var chain = {};

    chain.selectOption = function(value) {
        return this.addFutureAction("select '" + this.name + "' option '" + value + "'", function($window, $document, done) {
            var select = $document.elements('select[name="$1"]', this.name);
            var option = select.find('option[value="' + value + '"]');
            if (option.length) {
                select.val(value);
            } else {
                option = select.find('option:contains("' + value + '")');
                if (option.length) {
                    select.val(option.val());
                }
            }
            select.trigger('change');
            done();
        });
    };

    chain.option = function() {
        return this.addFutureAction("selected option '" + this.name, function($window, $document, done) {
            var select = $document.elements('select[name="$1"]', this.name);
            var option = select.val();
            var options = select.find('option');
            done(null,options[option].text);
        });
    };

    chain.options = function() {
        return this.addFutureAction("select options '" + this.name, function($window, $document, done) {
            var select = $document.elements('select[name="$1"]', this.name);
            var options = select.find('option'), items = [];

            for(var i = 0; i < options.length; i++) {
                items.push(options[i].text);
            }

            done(null,items);
        });
    };

    return function(name) {
        this.name = name;
        return chain;
    };
});
