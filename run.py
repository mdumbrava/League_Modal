import json, time, math, logging
from   cfg       import *
from   flask     import Flask, redirect, request, render_template, url_for
from   datetime  import datetime
from   flask     import make_response
from   functools import wraps, update_wrapper

app = Flask(
            __name__, 
            static_folder   = STATIC_FOLDER, 
            static_url_path = STATIC_PATH, 
            )

if not LOG_FLASK:
    log = logging.getLogger('werkzeug')
    log.disabled = True

# this helps with caching
app.config['SEND_FILE_MAX_AGE_DEFAULT'] = 43200

app.config['ENV'] = MODE

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/apileague/get_main')
def get_commts():
    return      '''
                [{"id": 1, "name": "Caitlin", "pic": "/static/media/main/caitlin.jpg"}, 
                 {"id": 2, "name": "Diana", "pic": "/static/media/main/diana.jpg"},
                 {"id": 2, "name": "Morgana", "pic": "/static/media/main/morgana.jpg"}, 
                 {"id": 3, "name": "Nami", "pic": "/static/media/main/nami.jpg"}]
                '''



def log_console(ip, time, path):
    print(  '' + ip + '\t' + time + '\t' + '' + path)

if NICE_LOG:
    @app.after_request
    def after_request_func(response):
        if PROXY:
            val_ip   = request.environ.get('HTTP_X_REAL_IP')
        else:
            val_ip   = request.environ.get('REMOTE_ADDR')
        val_path = request.path
        val_time = str(datetime.now())[:19]
        if HIDE_STATIC:
            if 'static' not in request.path:
                log_console(val_ip, val_time, val_path)
        else:
            log_console(val_ip, val_time, val_path)
        return response

if __name__ == '__main__':
   app.run(host = IP , port = PORT , debug = DEBUG)