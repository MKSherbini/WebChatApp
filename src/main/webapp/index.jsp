<%@ page contentType="text/html;charset=UTF-8" language="java" %>
<!DOCTYPE html>
<html lang="en">

<%@include file="commons/pageCommon.jsp" %>
<html>

<head>
    <%@include file="commons/headCommon.jsp" %>
    <title>${applicationScope.urlMappingConstants.getTitle(PageNames.HOME_PAGE)}</title>
</head>

<header>
    <%@include file="commons/headerCommon.jsp" %>
</header>
<body>
<a href="${applicationScope.urlMappingConstants.getControllerUrl(PageNames.SIGN_IN_PAGE)}"
   class="btn btn-primary">${applicationScope.urlMappingConstants.getTitle(PageNames.SIGN_IN_PAGE)}</a>
<a href="${applicationScope.urlMappingConstants.getControllerUrl(PageNames.AJAX_FROM_SCRATCH)}"
   class="btn btn-primary">${applicationScope.urlMappingConstants.getTitle(PageNames.AJAX_FROM_SCRATCH)}</a>
<a href="${applicationScope.urlMappingConstants.getControllerUrl(PageNames.CHAT)}"
        class="btn btn-primary">${applicationScope.urlMappingConstants.getTitle(PageNames.CHAT)}</a>

<footer>
    <%@include file="commons/footerCommon.jsp" %>
</footer>
</body>
</html>