var App = function (parametros) {

    var iniciarBlockUI = true;

    var _carregar = function () {
        $(".usuario-nome").html(parametros.viewModel.Nome);
        $(".usuario-img").attr('src', parametros.viewModel.Foto);

        _carregarPlaylists();

        PlaylistTrack.abrir("playlist");

        $('[data-toggle="tooltip"]').tooltip();
    };


    var _carregarEventoLoadAjax = function () {
        $(document).ajaxStart(function () {
            if (iniciarBlockUI) {
                $.blockUI();
            }
        });
        $(document).ajaxStop(function () {
            $.unblockUI();
        });
        $(document).ajaxError(function () {
            $.unblockUI();
        });   
    };

    var _carregarPlaylists = function () {
        var ul = $(".main-sidebar .sidebar ul.sidebar-menu");
        var playlist = parametros.viewModel.Playlist;
        for (var i = 0; i < playlist.length; i++) {
            var li = new PlaylistsItem(playlist[i]);
            ul.append(li);
        }
    }



    var _eventoClickPlaylist = function () {
        $("a.playlist-click").click(function (e) {
            e.preventDefault();
            var element = this;
            if (AjaxQueueExtension.status.filaExecutada()) {

                var idUsuario = $(this).attr("data-usuario");
                var idPlaylist = $(this).attr("data-playlist");
                var playlist = _procurarPlaylist(idUsuario, idPlaylist);

                DialogoExtension.dialogoSimOuNao(
                    'Alerta',
                    'Você deseja cancelar a exportação da playlist ' + playlist.Nome,
                    function (dialog) {
                        iniciarBlockUI = true;
                        AjaxQueueExtension.limparQueue();
                        _criarPlaylistTrack(element);
                        dialog.close();
                    },
                   function (dialog) {
                        dialog.close();
                    }
                )
            } else {
                _criarPlaylistTrack(element);
            }
                      

        });
    }

    var _exportarEventoClick = function () {
        $("#btn-exportar").on('click', async function () {

            if (AjaxQueueExtension.status.filaExecutada()) {
                DialogoExtension.dialogoAlertDangerOk("A playlist já está sendo exportada");
                return;
            }      

            iniciarBlockUI = false;                      

            PlaylistTrack.adicionarColunaExportado();

            var playlist = parametros.playlistSelecionada;

            AjaxQueueExtension.limparQueue();

            AjaxExtension.post(
                parametros.urls.apiCriarPlaylist,
                { Nome: playlist.Nome },
                function (data) {
                    _exportarPlaylist(data);
                },
                function (data) {
                    iniciarBlockUI = true;
                }
            );
        });
    }
    
    var _exportarPlaylist = function (idPlaylist) {        

        var playlist = parametros.playlistSelecionada;

        $('#status').show();

        $('#status #total').text(playlist.Musicas.length);

        $('#status #atual').text(0);

        AjaxQueueExtension.iniciarFila();

        for (var i = 0; i < playlist.Musicas.length; i++) {

            var nome = playlist.Musicas[i].Nome + " - " + playlist.Musicas[i].Artista;

            AjaxQueueExtension.post(
                parametros.urls.apiCriarPlaylistItem,
                { Nome: nome, IdPlaylist: idPlaylist },
                function (data) {
                    PlaylistTrack.setarStatusTd(this.aux.index, data)
                    $('#status #atual').text(this.aux.index+1);
                },
                function () {
                    console.log("error");
                    iniciarBlockUI = true;
                },
                { index: i }
            );

        }

        AjaxQueueExtension.finalizarFila();

        iniciarBlockUI = true;
    }

    var _procurarPlaylist = function (idUsuario, idPlaylist) {
        for (var i = 0; i < parametros.viewModel.Playlist.length; i++) {
            var playlist = parametros.viewModel.Playlist[i];

            if (playlist.IdUsuario == idUsuario && playlist.Id == idPlaylist) {
                return playlist;
            }
        }
        return null;
    }

    var _criarPlaylistTrack = function (elemento) {
        var idUsuario = $(elemento).attr("data-usuario");
        var idPlaylist = $(elemento).attr("data-playlist");

        var playlist = _procurarPlaylist(idUsuario, idPlaylist);

        _criarPlaylistTrackTabela(playlist, idPlaylist, idUsuario);
        
    }

    var _eventoPesquisaPlaylist = function () {
        $("form.sidebar-form").submit(function (e) {
            e.preventDefault();

            var element = $(this).find("input");

            if (AjaxQueueExtension.status.filaExecutada()) {

                var playlist = parametros.playlistSelecionada

                DialogoExtension.dialogoSimOuNao(
                    'Alerta',
                    'Você deseja cancelar a exportação da playlist ' + playlist.Nome,
                    function (dialog) {
                        iniciarBlockUI = true;
                        AjaxQueueExtension.limparQueue();


                        _pesquisarPlaylist(element);


                        dialog.close();
                    },
                    function (dialog) {
                        dialog.close();
                    }
                )

            } else {
                _pesquisarPlaylist(element);
            }

        });
    }

    var _criarPlaylistTrackTabela = function (playlist, idPlaylist, idUsuario) {

        var nomePlaylist = ('- ' + playlist.Nome);

        $('#btn-exportar').show();

        parametros.playlistSelecionada = playlist;

        $('#status').hide();

        $("#nome-playlist").text(nomePlaylist);

        AjaxExtension.post(
            parametros.urls.apiPlaylistTrack,
            { Id: idPlaylist, IdUsuario: idUsuario },
            function (data) {
                playlist.Musicas = data;
                PlaylistTrack.povoarTabela(data);
            }
        );
    }

    var _pesquisarPlaylist = function (element) {
        var url = $(element).val();
        if (!url.match(/^(spotify:user:([a-zA-z0-9])+:playlist:([a-zA-z0-9])+)/)) {
            DialogoExtension.dialogoAlertDangerOk("Playlist não existe", function () { });
            return;
        }

        var slipUrl = url.split(':');

        var user = slipUrl[2];

        var playlist = slipUrl[4];


        AjaxExtension.post(
            parametros.urls.apiPesquisarPlaylist,
            { Url: url },
            function (data) {
                _criarPlaylistTrackTabela(data, playlist, user);
            },
            function (data) {
                DialogoExtension.dialogoAlertDangerOk("Playlist não existe", function () { });
                iniciarBlockUI = true;
            }
        );
    }

    _carregar();
    _eventoClickPlaylist();
    _exportarEventoClick();
    _carregarEventoLoadAjax();
    _eventoPesquisaPlaylist();
}