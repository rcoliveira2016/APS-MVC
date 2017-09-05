var PlaylistsItem = function (playlist) {

    var i = document.createElement("i");
    i.className = "fa fa-play";

    var li = document.createElement("li");

    var span = document.createElement("span");
    span.innerHTML = playlist.Nome;


    var a = document.createElement("a");
    a.href = "#";
    $(a).append(i);
    $(a).append(span);
    a.className = "playlist-click";
    a.setAttribute("data-usuario", playlist.IdUsuario);
    a.setAttribute("data-playlist", playlist.Id);

    $(li).append(a);

    return li;
}