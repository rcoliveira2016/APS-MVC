using Convert_Playlist.Helper;
using Convert_Playlist.ViewModel.Parametros;
using Google.Apis.YouTube.v3;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Convert_Playlist.Negocio
{


    public class YoutubeNegocio
    {


        private async void Login()
        {
            if (Sessao.youtube == null)
            {
                var youtube = new YoutubeHelper();
                var estaLogado = await youtube.Login();

                if (estaLogado)
                    Sessao.youtube = youtube;
            }
        }
        

        public async Task<string> CriarPlaylist(CriarPlaylistParametro criarPlaylistParametro)
        {
            Login();
            return await Sessao.youtube.CreatePlaylist(criarPlaylistParametro.Nome);
        }

        public async Task<bool> CriarPlaylistItem(CriarPlaylistItemParametro criarPlaylistItemParametro)
        {
            Login();
            return await Sessao.youtube.AddItemPlaylist(criarPlaylistItemParametro.IdPlaylist, criarPlaylistItemParametro.Nome);
        }

    }
    
}