from django.contrib.auth.backends import ModelBackend
from django.contrib.auth import get_user_model

class EmailBackend(ModelBackend):
    def authenticate(self, request, username=None, password=None, **kwargs):
        UserModel = get_user_model()
        try:
            # El frontend envía el correo dentro del campo 'username'
            user = UserModel.objects.get(email=username)
        except UserModel.DoesNotExist:
            # Si falla, intenta buscarlo por nombre de usuario tradicional
            try:
                user = UserModel.objects.get(username=username)
            except UserModel.DoesNotExist:
                return None
        
        # Si encuentra al usuario, verifica la contraseña
        if user.check_password(password):
            return user
        return None