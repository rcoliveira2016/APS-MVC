using Convert_Playlist.Helper.Attribute;
using Convert_Playlist.Negocio;
using Convert_Playlist.ViewModel.Parametros;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Net;
using System.Net.Http;
using System.Threading.Tasks;
using System.Web.Http;

namespace Convert_Playlist.Controllers
{
    public class YoutubeController : ApiController
    {

        [HttpException]
        [HttpPost]
        public async Task<string> CriarPlaylist(CriarPlaylistParametro criarPlaylistParametro)
        {
            var negocio = new YoutubeNegocio();
            return await negocio.CriarPlaylist(criarPlaylistParametro);
        }

        [HttpException]
        [HttpPost]
        public async Task<bool> CriarPlaylistItem(CriarPlaylistItemParametro criarPlaylistItemParametro)
        {
            var negocio = new YoutubeNegocio();
            return await negocio.CriarPlaylistItem(criarPlaylistItemParametro);
        }
    }
}
