from rest_framework import viewsets, generics
from rest_framework.permissions import IsAuthenticated, AllowAny
from rest_framework.decorators import api_view, permission_classes
from rest_framework.response import Response
from rest_framework import status
from django.contrib.auth.models import User
from .models import Categoria, Producto, Pedido
from .serializers import CategoriaSerializer, ProductoSerializer, PedidoSerializer
from .permissions import EsAdminOLectura

# --- VISTAS DE PRODUCTOS Y CATEGORÍAS (Solo Admin edita) ---

class CategoriaViewSet(viewsets.ModelViewSet):
    queryset = Categoria.objects.all()
    serializer_class = CategoriaSerializer
    permission_classes = [EsAdminOLectura]

class ProductoViewSet(viewsets.ModelViewSet):
    queryset = Producto.objects.all()
    serializer_class = ProductoSerializer
    permission_classes = [EsAdminOLectura]

# --- VISTAS DE PEDIDOS Y CARRITO (Clientes) ---

class PedidoViewSet(viewsets.ModelViewSet):
    serializer_class = PedidoSerializer
    permission_classes = [IsAuthenticated] # Exige estar logueado

    def get_queryset(self):
        # Si es Admin, ve todos los pedidos
        if self.request.user.is_staff:
            return Pedido.objects.all()
        # Si es cliente normal, solo ve SUS pedidos
        return Pedido.objects.filter(cliente=self.request.user.username)

    def perform_create(self, serializer):
        # Al crear un pedido, se asigna automáticamente al usuario logueado
        serializer.save(cliente=self.request.user.username, correo=self.request.user.email)

# --- VISTA PARA REGISTRAR NUEVOS CLIENTES ---

class RegistroClienteView(generics.CreateAPIView):
    queryset = User.objects.all()
    permission_classes = [AllowAny] # Cualquiera puede registrarse

    def create(self, request, *args, **kwargs):
        data = request.data
        if User.objects.filter(username=data.get('username')).exists():
            return Response({"error": "El usuario ya existe"}, status=status.HTTP_400_BAD_REQUEST)
        
        user = User.objects.create_user(
            username=data.get('username'),
            email=data.get('email'),
            password=data.get('password')
        )
        return Response({"mensaje": "Cliente registrado exitosamente"}, status=status.HTTP_201_CREATED)

# --- NUEVA VISTA PARA OBTENER EL NOMBRE DESDE LA BD ---

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def obtener_perfil(request):
    user = request.user
    return Response({
        'username': user.username,
        'email': user.email,
        'is_staff': user.is_staff
    })