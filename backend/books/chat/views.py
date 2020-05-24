from django.shortcuts import render

def chat(request, username):
    context = dict()
    context['username']=username
    return render(request, 'chat.html', context)
