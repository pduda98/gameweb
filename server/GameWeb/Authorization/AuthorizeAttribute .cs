namespace GameWeb.Authorization;

using Microsoft.AspNetCore.Mvc;
using Microsoft.AspNetCore.Mvc.Filters;
using GameWeb.Models.Entities;
using GameWeb.Helpers;

[AttributeUsage(AttributeTargets.Class | AttributeTargets.Method)]
public class AuthorizeAttribute : Attribute, IAuthorizationFilter
{
    public void OnAuthorization(AuthorizationFilterContext context)
    {
        var allowAnonymous = context.ActionDescriptor.EndpointMetadata.OfType<AllowAnonymousAttribute>().Any();
        var authorizeAdmin = context.ActionDescriptor.EndpointMetadata.OfType<AuthorizeAdminAttribute>().Any();
        if (allowAnonymous)
            return;

        // authorization
        var user = (User?)context.HttpContext.Items[Consts.ContextItemUserInfoName];
        if (user == null || (authorizeAdmin && user.Role.Name != Consts.UserAdminRoleName))
        {
            context.Result = new JsonResult(new { message = "Unauthorized" })
            {
                StatusCode = StatusCodes.Status401Unauthorized
            };
        }
    }
}
