"use strict";

var AjaxQueueExtension = (function() {
    var ajaxQueue = $({}),
        currentRequest = null,
        tamanhoFila = 0,
        iniciado = false;

    $.ajaxQueue = function(ajaxOpts) {

        if (!iniciado) {
            console.log("O AjaxQueueExtension não foi iniciado");
            return;
        }

        var oldComplete = ajaxOpts.complete;
        
        ajaxQueue.queue(function(next) {
            
            ajaxOpts.complete = function() {
                
                if (oldComplete) {
                    oldComplete.apply(this, arguments);
                }
                tamanhoFila--;
                next();
            };
            
            currentRequest = $.ajax(ajaxOpts);
        });

        tamanhoFila++;

    };

    var _status = function () {
        return {
            tamanhoAtual: function () {
                return tamanhoFila;
            },
            filaExecutada: function () {
                return (tamanhoFila>0);
            }
        };
    }

    var _clearQueue = function () {
        tamanhoFila = 0;
        iniciado = false;
        ajaxQueue.clearQueue();
        if (currentRequest) {
            currentRequest.abort();
        }
    }

    return {
        limparQueue: function() {
            _clearQueue();
        },
        iniciarFila: function () {
            tamanhoFila = 0;
            iniciado = true
        },
        finalizarFila: function () {
            iniciado = false
        },
        status: _status(),
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