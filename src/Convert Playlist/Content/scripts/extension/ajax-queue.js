"use strict";

var AjaxQueueExtension = (function() {
    var ajaxQueue = $({});
    var currentRequest = null;

    $.ajaxQueue = function(ajaxOpts) {
        // Hold the original complete function.
        var oldComplete = ajaxOpts.complete;
        // Queue our ajax request.
        ajaxQueue.queue(function(next) {
            // Create a complete callback to fire the next event in the queue.
            ajaxOpts.complete = function() {
                // Fire the original complete if it was there.
                if (oldComplete) {
                    oldComplete.apply(this, arguments);
                }
                // Run the next query in the queue.
                next();
            };
            // Run the query.
            currentRequest = $.ajax(ajaxOpts);
        });


    };

    var _clearQueue = function() {
        ajaxQueue.clearQueue();
        if (currentRequest) {
            currentRequest.abort();
        }
    }

    return {
        limparQueue: function() {
            _clearQueue();
        },
        post: function(url, data, sucesso, erro, manobra) {
            $.ajaxQueue({
                type: "POST",
                url: url,
                data: data,
                async: true,
                cache: false,
                success: sucesso,
                error: erro,
                aux: manobra
            });
        }
    }

})();