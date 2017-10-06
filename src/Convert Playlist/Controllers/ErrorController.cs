using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;

namespace Convert_Playlist.Controllers
{
    public class ErrorController : Controller
    {

        public ActionResult Erro500()
        {
            return View();
        }
    }
}