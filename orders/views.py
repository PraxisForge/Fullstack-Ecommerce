from rest_framework.decorators import api_view, permission_classes
from rest_framework.permissions import IsAuthenticated
from rest_framework.response import Response
from rest_framework import status
from .models import Order, OrderItem
from .serializers import OrderSerializer
from products.models import Product
# Add 'get_object_or_404' to imports if not there
from django.shortcuts import get_object_or_404

@api_view(['POST'])
@permission_classes([IsAuthenticated]) # 🔒 Lock this down
def create_order(request):
    user = request.user
    data = request.data
    
    # Separate items from order data
    order_items = data.get('items', [])
    
    # 1. Validate and Save Order
    serializer = OrderSerializer(data=data, context={'request': request})
    if serializer.is_valid():
        order = serializer.save() # This calls the .create() method in your serializer

        # 2. Save Order Items
        for item in order_items:
            product = Product.objects.get(id=item['id'])
            OrderItem.objects.create(
                order=order,
                product=product,
                price=product.price, # Security: Use DB price, not frontend price
                quantity=item['quantity']
            )
        
        return Response(serializer.data, status=status.HTTP_201_CREATED)
    
    return Response(serializer.errors, status=status.HTTP_400_BAD_REQUEST)

@api_view(['GET'])
@permission_classes([IsAuthenticated])
def get_my_orders(request):
    user = request.user
    orders = Order.objects.filter(user=user).order_by('-created_at')
    serializer = OrderSerializer(orders, many=True)
    return Response(serializer.data)

@api_view(['PUT'])
@permission_classes([IsAuthenticated])
def mark_order_paid(request, order_id):
    order = get_object_or_404(Order, id=order_id, user=request.user)
    
    # Simulate payment success
    order.is_paid = True
    order.save()
    
    return Response({'status': 'Order paid successfully'})