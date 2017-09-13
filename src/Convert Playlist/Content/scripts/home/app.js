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

            var idUsuario = $(this).attr("data-usuario");
            var idPlaylist = $(this).attr("data-playlist");

            $('#btn-exportar').show();

            var playlist = _procurarPlaylist(idUsuario, idPlaylist);

            var nomePlaylist = ('- ' + playlist.Nome);

            parametros.playlistSelecionada = playlist;

            $('#status').hide();

            $("#nome-playlist").text(nomePlaylist);

            $.ajax({
                async: true,
                url: parametros.urls.apiPlaylistTrack,
                type: "post",
                data: { Id: idPlaylist, IdUsuario: idUsuario },
                success: function (data) {
                    playlist.Musicas = data;
                    PlaylistTrack.povoarTabela(data);
                }
            });

        });
    }

    var _exportarEventoClick = function () {
        $("#btn-exportar").on('click', async function () {

            iniciarBlockUI = false;

            PlaylistTrack.adicionarColunaExportado();

            var playlist = parametros.playlistSelecionada;

            AjaxQueueExtension.limparQueue();


            $.ajax({
                async: true,
                url: parametros.urls.apiCriarPlaylist,
                type: "Post",
                data: { Nome: playlist.Nome },
                success: function (data) {
                    _exportarPlaylist(data);
                }
            });
        });
    }
    
    var _exportarPlaylist = function (idPlaylist) {

        var playlist = parametros.playlistSelecionada;

        $('#status').show();

        $('#status #total').text(playlist.Musicas.length);

        $('#status #atual').text(0);

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


    _carregar();
    _eventoClickPlaylist();
    _exportarEventoClick();
    _carregarEventoLoadAjax();
}