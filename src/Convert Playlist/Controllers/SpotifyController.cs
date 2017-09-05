using Convert_Playlist.Negocio;
using Convert_Playlist.ViewModel;
using Convert_Playlist.ViewModel.Parametros;
using SpotifyAPI.Web.Models;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Results;

namespace Convert_Playlist.Controllers
{
    public class SpotifyController : ApiController
    {

        public async Task<JsonResult<ICollection<SimplePlaylist>>> Get(string id)
        {
            var spotify = new SpotifyNegocio();
            var t = await spotify.BuscarPlaylistUsuario(id);
            return Json(t);
        }

        [System.Web.Http.HttpPost]
        public async Task<JsonResult<ICollection<PlaylistTrackItem>>> PlaylistTrack(PlaylistTrackParametro playlistTrackParametro)
        {
            var spotify = new SpotifyNegocio();
            var t = await spotify.BuscarPlaylistTrack(playlistTrackParametro);
            return Json(t);
        }

    }

    
}
