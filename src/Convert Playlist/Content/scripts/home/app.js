var App = function (parametros) {

    var _carregar = function () {
        $(".usuario-nome").html(parametros.viewModel.Nome);
        $(".usuario-img").attr('src', parametros.viewModel.Foto);

        _carregarPlaylists();

        PlaylistTrack.abrir("playlist");

        $('[data-toggle="tooltip"]').tooltip();
    };


    var _carregarEventoLoadAjax = function () {
        $(document).ajaxStart(function () {
            $.blockUI();
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
            ul.append(new PlaylistsItem(playlist[i]));
        }
    }



    var _eventoClickPlaylist = function () {
        $("a.playlist-click").click(function (e) {
            e.preventDefault();
            var idUsuario = $(this).attr("data-usuario");
            var idPlaylist = $(this).attr("data-playlist");

            var nomePlaylist = ('- ' + $(this).find("span").html());

            $("#nome-playlist").html(nomePlaylist);


            $.ajax({
                async: true,
                url: parametros.urls.apiPlaylistTrack,
                type: "post",
                data: { Id: idPlaylist, IdUsuario: idUsuario },
                success: function (data) {
                    PlaylistTrack.povoarTabela(data);
                }
            });

        });
    }

    _carregar();
    _eventoClickPlaylist();
    _carregarEventoLoadAjax();
}