using Convert_Playlist.Helper.Attribute;
using Convert_Playlist.Negocio;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Convert_Playlist.Controllers
{
    public class HomeController : Controller
    {
        [MVCException]
        public async Task<ActionResult> Index()
        {
            var spotifyNegocio = new SpotifyNegocio();
            if (!spotifyNegocio.Logado) {
                return RedirectToAction(nameof(Login));
            }
            var view = await spotifyNegocio.pegarUsuario();
            return View(view);
        }

        public ActionResult AnotherLink()
        {
            return View("Index");
        }

        [MVCException]
        [HttpPost]
        public async Task<ActionResult> Login()
        {
            var spotifyNegocio = new SpotifyNegocio();
            var logado = await spotifyNegocio.Login();
            if (logado) {
                var view = await spotifyNegocio.pegarUsuario();
                return View("Index", view);
            }

            ViewBag.Erros = new string[] { "Erro no login"};
            return View("Acesso/Longin");
        }


        public ActionResult Login(bool logout = false, string[] erros=null) {
            ViewBag.Erros = erros;
            return View("Acesso/Longin");
        }
    }
}
