using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;

namespace Convert_Playlist.Common.Exception
{
    public class TokenSpotifyException : SystemException
    {
        public TokenSpotifyException(string mensagem):base(mensagem)
        {

        }
    }
}