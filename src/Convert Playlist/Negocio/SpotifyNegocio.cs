using Convert_Playlist.Helper;
using Convert_Playlist.ViewModel;
using Convert_Playlist.ViewModel.Parametros;
using SpotifyAPI.Web.Models;
using System;
using System.Collections.Generic;
using System.IO;
using System.Linq;
using System.Net;
using System.Threading.Tasks;
using System.Web;
using System.Web.Profile;

namespace Convert_Playlist.Negocio
{
    public class SpotifyNegocio
    {

        public SpotifyNegocio()
        {

        }

        public async Task<bool> Login()
        {
            if (Sessao.spotify == null || !Sessao.spotify.logged) {
                var spotify = new SpotifyHelper();
                var estaLogado = await spotify.Login();

                if (estaLogado)
                    Sessao.spotify = spotify;

                return estaLogado;
            }

            return true;
        }

        public async Task<ICollection<SimplePlaylist>> BuscarPlaylistUsuario(string idUsuario){
            Task.Run(() => Login()).Wait();
            return await Sessao.spotify.GetPlaylists(idUsuario);
        }

        public async Task<ICollection<PlaylistTrackItem>> BuscarPlaylistTrack(PlaylistTrackParametro playlistTrackParametro)
        {
            Task.Run(() => Login()).Wait();
            var playlistTrack = await Sessao.spotify.GetPlaylistFullTracksAll(playlistTrackParametro.Id, playlistTrackParametro.IdUsuario);
            return playlistTrack.Select(x => new PlaylistTrackItem
            {
                Id = x.Id,
                Nome = x.Name,
                Album = x.Album.Name,
                Artista = x.Artists
                            .Select(y => y.Name)
                            .Aggregate((i, e) => $"{i}, {e}")
            }).ToList();
           
        }

        public async Task<UsuarioSpotify> pegarUsuario()
        {
            Task.Run(() => Login()).Wait();
            var usuario = await Sessao.spotify.GetUserProflie();

            var listaDePlaylist = await Sessao.spotify.GetPlaylists(usuario.Id);

            return new UsuarioSpotify
            {
                Foto = usuario.Images[0].Url,
                Id = usuario.Id,
                Nome = usuario.DisplayName,
                Playlist = listaDePlaylist.Select(x => new PlaylistItem { IdUsuario = x.Owner.Id, Nome = x.Name, Id= x.Id}).ToList()
            };
        }

        public bool Logado { get {
                return Sessao.spotify != null && Sessao.spotify.logged;
            } }
    }
}