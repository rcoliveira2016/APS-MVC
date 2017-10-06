using System;
using System.Collections.Generic;
using System.Linq;
using System.Web;
using System.Web.Mvc;
using System.Web.Routing;

namespace Convert_Playlist.Helper.Attribute
{
    public class MVCExceptionAttribute : FilterAttribute, IExceptionFilter
    {
        #region IExceptionFilter Members

        void IExceptionFilter.OnException(ExceptionContext filterContext)
        {
            if (filterContext != null && filterContext.Exception != null)
            {
                var controllerName = "Error";
                var actionName= "Erro500";

                filterContext.ExceptionHandled = true;
                filterContext.Result = new RedirectToRouteResult(
                    new RouteValueDictionary( new {
                        controller = controllerName,
                        action = actionName
                    }));
            }

        }

        #endregion
    }
}