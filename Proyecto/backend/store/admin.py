from django.contrib import admin
from .models import Categoria, Producto, Pedido, DetallePedido

# Registramos los modelos básicos
admin.site.register(Categoria)
admin.site.register(Pedido)
admin.site.register(DetallePedido)

# Registramos el producto con una vista mejorada (opcional pero recomendado)
@admin.register(Producto)
class ProductoAdmin(admin.ModelAdmin):
    list_display = ('nombre', 'categoria', 'precio', 'disponible')
    list_filter = ('categoria', 'disponible')
    search_fields = ('nombre',)