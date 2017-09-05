using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Convert_Playlist.ViewModel
{
    public class UsuarioSpotify
    {
        public string Id { get; set; }

        public string Nome { get; set; }

        public string Foto { get; set; }

        public ICollection<PlaylistItem> Playlist { get; set; }
    }
}