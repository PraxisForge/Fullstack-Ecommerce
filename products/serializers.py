from rest_framework import serializers
from .models import Product, Category

class CategorySerializer(serializers.ModelSerializer):
    class Meta:
        model = Category
        fields = ['id', 'name', 'slug', 'image']

class ProductSerializer(serializers.ModelSerializer):
    category = CategorySerializer(read_only=True)  # Nested to show category details

    class Meta:
        model = Product
        fields = [
            'id', 'name', 'slug', 'description', 
            'price', 'image', 'stock', 'category'
        ]