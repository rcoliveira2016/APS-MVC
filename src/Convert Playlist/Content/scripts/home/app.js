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

        $('#btn-exportar').show();

        var playlist = _procurarPlaylist(idUsuario, idPlaylist);

        var nomePlaylist = ('- ' + playlist.Nome);

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

    _carregar();
    _eventoClickPlaylist();
    _exportarEventoClick();
    _carregarEventoLoadAjax();
}