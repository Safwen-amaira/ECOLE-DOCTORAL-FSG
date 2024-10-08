from rest_framework.permissions import BasePermission


class IsDoctorantUser(BasePermission):
    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated and request.user.is_doctorant)
class IsAdminfUser(BasePermission):
    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated and request.user.is_adminf)
class IsAdminsUser(BasePermission):
    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated and request.user.is_admins)
class IsAdmintUser(BasePermission):
    def has_permission(self, request, view):

        return bool(request.user and request.user.is_authenticated and request.user.is_admint)
