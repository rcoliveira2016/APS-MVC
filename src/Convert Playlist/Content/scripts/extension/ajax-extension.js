"use strict";

var AjaxQueueExtension = (function () {
    var _ajaxBase = function (url, data, sucesso, erro, typeRequest) {
        $.ajaxQueue({
            type: typeRequest,
            url: url,
            data: data,
            async: true,
            cache: false,
            success: function (data) {
                if (typeof sucesso === 'function')
                    sucesso(data);
            },
            error: function (data) {
                if (typeof erro === 'function')
                    erro(data);
                else {
                    console.log(data);
                }
            },
            aux: manobra
        });
    }


    return {
        get: function (url, data, sucesso, erro) {
            _ajaxBase(url, data, sucesso, erro, "GET")
        },
        post: function (url, data, sucesso, erro) {
            _ajaxBase(url, data, sucesso, erro, "POST")
        }
    }

})();