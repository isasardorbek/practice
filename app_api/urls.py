from django.urls import path

from rest_framework.routers import DefaultRouter
from rest_framework_simplejwt.views import TokenObtainPairView, TokenRefreshView
from .views import NoteViewSet

from . import views

router = DefaultRouter()
router.register(basename='users', viewset=views.UserViewSet, prefix='users')

router = DefaultRouter()
router.register(basename='notes', viewset=NoteViewSet, prefix='notes')

urlpatterns = router.urls

urlpatterns = [
    path('token/', TokenObtainPairView.as_view(), name='token_obtain_pair'),
    path('token/refresh/', TokenRefreshView.as_view(), name='token_refresh'),
] + router.urls
