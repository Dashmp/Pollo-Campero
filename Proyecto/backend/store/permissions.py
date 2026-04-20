# store/permissions.py
from rest_framework import permissions

class EsAdminOLectura(permissions.BasePermission):
    """
    Permite a cualquier usuario (incluso no logueados) VER los productos.
    Pero SOLO permite a los Administradores CREAR, EDITAR o ELIMINAR.
    """
    def has_permission(self, request, view):
        # Si es una petición segura (GET, HEAD, OPTIONS), permitimos el paso
        if request.method in permissions.SAFE_METHODS:
            return True
        # Si es POST, PUT, DELETE, exigimos que sea Administrador
        return bool(request.user and request.user.is_staff)