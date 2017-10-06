using Convert_Playlist.Negocio;
using Convert_Playlist.ViewModel;
using Convert_Playlist.ViewModel.Parametros;
using SpotifyAPI.Web.Models;
using System;
using System.Collections.Generic;
using System.Threading.Tasks;
using System.Web.Http;
using System.Web.Http.Filters;
using System.Web.Http.Results;
using System.Threading;
using System.Web.Http.ExceptionHandling;
using System.Net;
using System.Net.Http;
using Convert_Playlist.Helper.Attribute;

namespace Convert_Playlist.Controllers
{
    public class SpotifyController : ApiController
    {
        [HttpException]
        public async Task<JsonResult<ICollection<SimplePlaylist>>> Get(string id)
        {
            var spotify = new SpotifyNegocio();
            var t = await spotify.BuscarPlaylistUsuario(id);
            return Json(t);
        }

        [HttpException]
        [HttpPost]
        public async Task<JsonResult<ICollection<PlaylistTrackItem>>> PlaylistTrack(PlaylistTrackParametro playlistTrackParametro)
        {
            var spotify = new SpotifyNegocio();
            spotify = null;
            var playList = await spotify.BuscarPlaylistTrack(playlistTrackParametro);

            return Json(playList);
        }

    }
}
