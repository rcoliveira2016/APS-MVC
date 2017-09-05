using SpotifyAPI.Web;
using SpotifyAPI.Web.Auth;
using SpotifyAPI.Web.Enums;
using SpotifyAPI.Web.Models;
using System;
using System.Collections.Generic;
using System.Linq;
using System.Threading.Tasks;
using System.Web;

namespace Convert_Playlist.Helper
{
    public class SpotifyHelper
    {

        private SpotifyWebAPI spotifyWebApi;

        private PrivateProfile privateProfile;

        public bool logged { get { return privateProfile != null; } }

        public void Logout()
        {
            spotifyWebApi.Dispose();
        }

        public async Task<bool> Login()
        {


            try
            {
                WebAPIFactory webApiFactory = new WebAPIFactory(
               "http://localhost",
               8000,
               "26d287105e31491889f3cd293d85bfea",
               Scope.UserReadPrivate | Scope.UserReadEmail | Scope.PlaylistReadPrivate | Scope.UserLibraryRead |
               Scope.UserFollowRead | Scope.UserReadBirthdate | Scope.UserTopRead | Scope.PlaylistReadCollaborative |
               Scope.UserReadRecentlyPlayed | Scope.UserReadPlaybackState);
                spotifyWebApi = await webApiFactory.GetWebApi();
            }
            catch (Exception ex)
            {
                return false;
            }

            return (spotifyWebApi != null);
        }

        public async Task<PrivateProfile> GetUserProflie()
        {
            if (privateProfile == null)
                privateProfile = await spotifyWebApi.GetPrivateProfileAsync();
            return privateProfile;
        }

        public async Task<List<FullTrack>> GetSavedTracks()
        {
            Paging<SavedTrack> savedTracks = await spotifyWebApi.GetSavedTracksAsync();
            List<FullTrack> list = savedTracks.Items.Select(track => track.Track).ToList();

            while (savedTracks.Next != null)
            {
                savedTracks = await spotifyWebApi.GetSavedTracksAsync(20, savedTracks.Offset + savedTracks.Limit);
                list.AddRange(savedTracks.Items.Select(track => track.Track));
            }

            return list;
        }

        public async Task<List<SimplePlaylist>> GetPlaylists(string idUser)
        {            
            Paging<SimplePlaylist> playlists = await spotifyWebApi.GetUserPlaylistsAsync(idUser);
            List<SimplePlaylist> list = playlists.Items.ToList();

            while (playlists.Next != null)
            {
                playlists = spotifyWebApi.GetUserPlaylists(idUser, 20, playlists.Offset + playlists.Limit);
                list.AddRange(playlists.Items);
            }

            return list;
        }

        public async Task<List<SimplePlaylist>> GetPlaylists()
        {
            PrivateProfile _profile = GetUserProflie().Result;
            Paging<SimplePlaylist> playlists = await spotifyWebApi.GetUserPlaylistsAsync(_profile.Id);
            List<SimplePlaylist> list = playlists.Items.ToList();

            while (playlists.Next != null)
            {
                playlists = spotifyWebApi.GetUserPlaylists(_profile.Id, 20, playlists.Offset + playlists.Limit);
                list.AddRange(playlists.Items);
            }

            return list;
        }

        public async Task<List<PlaylistTrack>> GetPlaylistTracksAll(string idPlaylist, string idUser)
        {
            Paging<PlaylistTrack> playlists = await spotifyWebApi.GetPlaylistTracksAsync(idUser, idPlaylist, limit: 100);
            List<PlaylistTrack> list = playlists.Items.ToList();

            while (playlists.Next != null)
            {
                playlists = await spotifyWebApi.GetPlaylistTracksAsync(idUser, idPlaylist, limit: 100, offset: (playlists.Offset + playlists.Limit));
                list.AddRange(playlists.Items);
            }

            return list;
        }

        public async Task<List<FullTrack>> GetPlaylistFullTracksAll(string idPlaylist, string idUser)
        {
            Paging<PlaylistTrack> playlists = await spotifyWebApi.GetPlaylistTracksAsync(idUser, idPlaylist, limit: 100);
            List<FullTrack> list = playlists.Items.Select(x => x.Track).ToList();

            while (playlists.Next != null)
            {
                playlists = await spotifyWebApi.GetPlaylistTracksAsync(idUser, idPlaylist, limit: 100, offset: (playlists.Offset + playlists.Limit));
                list.AddRange(playlists.Items.Select(x => x.Track));
            }

            return list;
        }

        public async Task<List<string>> GetFullNamePlaylistFullTracksAll(string idPlaylist, string idUser)
        {
            Paging<PlaylistTrack> playlists = await spotifyWebApi.GetPlaylistTracksAsync(idUser, idPlaylist, limit: 100);
            List<string> list = playlists.Items.Select(x => $" {x.Track.Name} - {x.Track.Artists.Select(y => y.Name).Aggregate((i, e) => $"{i} {e} ") }").ToList();

            while (playlists.Next != null)
            {
                playlists = await spotifyWebApi.GetPlaylistTracksAsync(idUser, idPlaylist, limit: 100, offset: (playlists.Offset + playlists.Limit));
                list.AddRange(playlists.Items.Select(x => $" {x.Track.Name} - {x.Track.Artists.Select(y => y.Name).Aggregate((i, e) => $"{i} {e} ") }").ToList());
            }

            return list;
        }
    }

}
