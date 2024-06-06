from rest_framework.permissions import BasePermission, SAFE_METHODS

from rest_framework.serializers import ModelSerializer
from .models import Note

class NoteSerializer(ModelSerializer):
    class Meta:
        model = Note
        fields = ['id', 'title', 'description']
class IsOwnerOrSuperuser(BasePermission):
    def has_permission(self, request, view):
        return True
        # if request.method in SAFE_METHODS:
        #     return True
        #
        # if request.method == ['POST']:
        #     return request.user.is_superuser
        #
        # return False

    def has_object_permission(self, request, view, obj):
        return True
