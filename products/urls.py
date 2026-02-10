from django.urls import path
from . import views

urlpatterns = [
    path('products/', views.get_products, name='products'),
    path('products/<slug:slug>/', views.get_product, name='product'),
]