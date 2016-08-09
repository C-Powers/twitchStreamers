from django.shortcuts import render

# Create your views here.
def streamers(request):
    return render(request, 'streamingList/main.html', {})
