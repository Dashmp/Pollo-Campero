from djongo import models

class Categoria(models.Model):
    nombre = models.CharField(max_length=100) # Ej: Banquetes, Bebidas, Snacks
    descripcion = models.TextField(blank=True, null=True)

    def __str__(self):
        return self.nombre

class Producto(models.Model):
    categoria = models.ForeignKey(Categoria, related_name='productos', on_delete=models.CASCADE)
    nombre = models.CharField(max_length=200) # Ej: Combo Mr. Pollo, Lunch Campero
    descripcion = models.TextField()
    precio = models.DecimalField(max_digits=10, decimal_places=2)
    imagen_url = models.CharField(max_length=500, blank=True) # Ruta de assets en Angular
    disponible = models.BooleanField(default=True)

    def __str__(self):
        return self.nombre

class Pedido(models.Model):
    cliente = models.CharField(max_length=200)
    correo = models.EmailField(blank=True)
    total = models.DecimalField(max_digits=10, decimal_places=2)
    fecha_creacion = models.DateTimeField(auto_now_add=True)
    estado = models.CharField(max_length=50, default='Pendiente')

class DetallePedido(models.Model):
    pedido = models.ForeignKey(Pedido, related_name='detalles', on_delete=models.CASCADE)
    producto = models.ForeignKey(Producto, on_delete=models.CASCADE)
    cantidad = models.IntegerField()
    subtotal = models.DecimalField(max_digits=10, decimal_places=2)