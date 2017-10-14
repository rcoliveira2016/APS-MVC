"use strict";

var DialogoExtension = (function () {
    
    var _dialogoAlertOk = function (mensagem, typeDialogo, eventoOk) {
        BootstrapDialog.show({
            type: typeDialogo,
            title: 'Alerta',
            message: mensagem,
            buttons: [{
                label: 'Ok',
                action: function (dialog) {
                    if (typeof eventoOk === 'function')
                        eventoOk(dialog);

                    dialog.close();
                }
            }]
        });
    }

    var _dialogoAlertDangerOk = function (mensagem, eventoOk) {
        _dialogoAlertOk(mensagem, BootstrapDialog.TYPE_DANGER, eventoOk);
    }

    var dialogoSimOuNao = function (titulo, mensagem, eventoSim, eventoNao) {
        BootstrapDialog.show({
            title: titulo,
            message: mensagem,
            buttons: [{
                label: 'Sim',
                action: function (dialog) {
                    if (typeof eventoSim === 'function')
                        eventoSim(dialog);
                }
            }, {
                label: 'Não',
                action: function (dialog) {
                    if (typeof eventoNao === 'function')
                        eventoNao(dialog);
                }
            }]
        });
    }

    return {
        dialogoAlertDangerOk: function (mensagem, eventoOk = null) {
            _dialogoAlertDangerOk(mensagem, eventoOk);
        },
        dialogoSimOuNao: function (titulo, mensagem, eventSim, eventNao) {
            dialogoSimOuNao(titulo, mensagem, eventSim, eventNao)
        }
    }

})();