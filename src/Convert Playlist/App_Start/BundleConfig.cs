﻿using System.Web.Optimization;
using WebHelpers.Mvc5;

namespace Convert_Playlist.App_Start
{
    public class BundleConfig
    {
        public static void RegisterBundles(BundleCollection bundles)
        {

            RegistarBundlesHome(bundles);

            #if DEBUG
            BundleTable.EnableOptimizations = false;
            #else
            BundleTable.EnableOptimizations = true;
            #endif
        }

        public static void RegistarBundlesHome(BundleCollection bundles) {
            bundles.Add(new StyleBundle("~/Bundles/css")
                .Include("~/Content/css/bootstrap.min.css", new CssRewriteUrlTransformAbsolute())
                .Include("~/Content/css/select2.min.css")
                .Include("~/Content/css/bootstrap-datepicker3.min.css")                
                .Include("~/Content/css/bootstrap-dialog.min.css")
                .Include("~/Content/css/font-awesome.min.css", new CssRewriteUrlTransformAbsolute())
                .Include("~/Content/css/icheck/blue.min.css", new CssRewriteUrlTransformAbsolute())
                .Include("~/Content/css/AdminLTE.css", new CssRewriteUrlTransformAbsolute())
                .Include("~/Content/css/skins/skin-blue.css")
                .Include("~/Content/style/home/home.css"));

            bundles.Add(new ScriptBundle("~/Bundles/js")
                .Include("~/Content/js/plugins/jquery/jquery-2.2.4.js")
                .Include("~/Content/js/plugins/bootstrap/bootstrap.js")
                .Include("~/Content/js/plugins/bootstrap/bootstrap-dialog.min.js")
                .Include("~/Content/js/plugins/fastclick/fastclick.js")
                .Include("~/Content/js/plugins/slimscroll/jquery.slimscroll.js")
                .Include("~/Content/js/plugins/select2/select2.full.js")
                .Include("~/Content/js/plugins/moment/moment.js")
                .Include("~/Content/js/plugins/datepicker/bootstrap-datepicker.js")
                .Include("~/Content/js/plugins/icheck/icheck.js")
                .Include("~/Content/js/plugins/validator.js")
                .Include("~/Content/js/plugins/inputmask/jquery.inputmask.bundle.js")
                .Include("~/Content/js/plugins/block-ui/block-ui.js")
                .Include("~/Content/scripts/home/app.js")
                .Include("~/Content/scripts/extension/ajax-queue.js")
                .Include("~/Content/scripts/extension/ajax-extension.js")
                .Include("~/Content/scripts/extension/dialogo-extension.js")
                .Include("~/Content/scripts/spotify/playlists-item.js")
                .Include("~/Content/scripts/spotify/playlist-track.js")
                .Include("~/Content/js/app.js")
                .Include("~/Content/js/init.js"));
        }
    }
}
