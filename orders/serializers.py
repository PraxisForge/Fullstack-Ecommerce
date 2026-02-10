from rest_framework import serializers
from .models import Order, OrderItem
from products.serializers import ProductSerializer

class OrderItemSerializer(serializers.ModelSerializer):
    product_name = serializers.CharField(source='product.name', read_only=True)

    class Meta:
        model = OrderItem
        fields = ['product', 'product_name', 'price', 'quantity']

class OrderSerializer(serializers.ModelSerializer):
    items = OrderItemSerializer(many=True, read_only=True)

    class Meta:
        model = Order
        # ADD 'is_paid' TO THIS LIST 👇
        fields = ['id', 'full_name', 'address', 'city', 'postal_code', 'total_price', 'items', 'is_paid', 'created_at']

    def create(self, validated_data):
        request = self.context.get('request')
        user = request.user
        order = Order.objects.create(user=user, **validated_data)
        return order