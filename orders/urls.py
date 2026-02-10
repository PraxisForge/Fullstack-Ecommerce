from django.urls import path
from . import views

urlpatterns = [
    path('create/', views.create_order, name='create_order'),
    path('my-orders/', views.get_my_orders, name='my_orders'), # <--- Add this
    path('<int:order_id>/pay/', views.mark_order_paid, name='pay_order'), # <--- Add this
]