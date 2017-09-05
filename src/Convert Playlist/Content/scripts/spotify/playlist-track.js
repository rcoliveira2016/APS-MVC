var PlaylistTrack = (function () {

    var idElement;

    var _povoarTabela = function (playlistTrack) {
        var tbody = $("#" + idElement).find("tbody");

        tbody.empty();

        for (var i = 0; i < playlistTrack.length; i++) {
            var tr = document.createElement("tr");

            var tdNome = document.createElement("td");
            tdNome.innerHTML = playlistTrack[i].Nome

            var tdArtista = document.createElement("td");
            tdArtista.innerHTML = playlistTrack[i].Artista

            var tdAlbum = document.createElement("td");
            tdAlbum.innerHTML = playlistTrack[i].Album;

            $(tr).append(tdNome);
            $(tr).append(tdArtista);
            $(tr).append(tdAlbum);
            $(tbody).append(tr);

        }

    }

    var _carregar = function () {
        var div = document.createElement("div");
        div.className = "table-responsive";

        var table = document.createElement("table");
        table.className = "table no-margin";

        var thead = document.createElement("thead");

        var tbody = document.createElement("tbody");

        var trThead = document.createElement("tr");

        var thNome = document.createElement("th");
        thNome.innerHTML = "Nome";

        var thArtista = document.createElement("th");
        thArtista.innerHTML = "Atista";

        var thAlbum = document.createElement("th");
        thAlbum.innerHTML = "Álbum";

        $(trThead).append(thNome);
        $(trThead).append(thArtista);
        $(trThead).append(thAlbum);

        $(thead).append(trThead);

        $(table).append(thead);

        

        table.append(tbody);

        $(div).append(table);

        $("#" + idElement).html(div);

    }

    return {
        abrir: function (id) {
            idElement = id;
            _carregar();
        },
        povoarTabela: function (data) {
            _povoarTabela(data);
        }
    };

})()