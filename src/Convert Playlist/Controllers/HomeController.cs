using Convert_Playlist.Helper.Attribute;
using Convert_Playlist.Negocio;
using System.Threading.Tasks;
using System.Web.Mvc;

namespace Convert_Playlist.Controllers
{
    public class HomeController : Controller
    {

        private SpotifyNegocio spotifyNegocio { get; set; }

        public HomeController()
        {
            spotifyNegocio = new SpotifyNegocio();
        }

        [MVCException]
        public async Task<ActionResult> Index()
        {
            if (!spotifyNegocio.Logado) {
                return RedirectToAction(nameof(Login));
            }
            var view = await spotifyNegocio.pegarUsuario();
            return View(view);
        }

        [MVCException]
        [HttpPost]
        public async Task<ActionResult> Login()
        {
            var logado = await spotifyNegocio.Login();
            if (logado) {
                var view = await spotifyNegocio.pegarUsuario();
                return RedirectToAction(nameof(Index));
            }

            ViewBag.Erros = new string[] { "Erros no login"};
            return RedirectToAction(nameof(Login));
        }

        public ActionResult Login(string[] erros = null)
        {
            if (spotifyNegocio.Logado)

                return RedirectToAction(nameof(Index));

            ViewBag.Erros = erros;
            return View("Acesso/Longin");
        }

    }
}
