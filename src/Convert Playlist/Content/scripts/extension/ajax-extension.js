"use strict";

var AjaxExtension = (function () {
    var _ajaxBase = function (url, data, sucesso, erro, typeRequest) {
        $.ajax({
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
            statusCode: {
                500: function (data) {
                    DialogoExtension.dialogoAlertDangerOk("Erro no servidor");
                    console.log(data);
                },
                404: function () {
                    DialogoExtension.dialogoAlertDangerOk("Ação não foi encontrada");
                }
            }
        });
    }


    return {
        get: function (url, data, sucesso, erro = null) {
            _ajaxBase(url, data, sucesso, erro, "GET")
        },
        post: function (url, data, sucesso, erro = null) {
            _ajaxBase(url, data, sucesso, erro, "POST")
        }
    }

})();