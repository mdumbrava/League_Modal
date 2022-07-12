import json, time, math, logging

from cfg                      import *
from flask                    import Flask, redirect, request, render_template, url_for
from flask_sqlalchemy         import SQLAlchemy
from flask_admin              import Admin, AdminIndexView
from flask_admin.contrib.sqla import ModelView
from datetime                 import datetime
from flask                    import make_response
from functools                import wraps, update_wrapper

app = Flask(
            __name__, 
            static_folder   = STATIC_FOLDER, 
            static_url_path = STATIC_PATH, 
            )

app.config['SECRET_KEY']                     = 'ABCDEFGIJKLMNOP'
app.config['SQLALCHEMY_TRACK_MODIFICATIONS'] = False
app.config['SQLALCHEMY_DATABASE_URI']        = 'sqlite:///league_db.sql'
# this helps with caching
app.config['SEND_FILE_MAX_AGE_DEFAULT']      = 43200
app.config['ENV']                            = MODE

db = SQLAlchemy(app) 
class Champion(db.Model):
    id   = db.Column(db.Integer, primary_key=True, autoincrement=True)
    name = db.Column(db.String(50))
    pic  = db.Column(db.String(100))
class About(db.Model):
    id    = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_ch = db.Column(db.Integer)
    title = db.Column(db.String(50))
    pos   = db.Column(db.String(50))
    clas  = db.Column(db.String(50))
    desc  = db.Column(db.String(2000))
    pic   = db.Column(db.String(100))
class Abilities(db.Model):
    id    = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_ch = db.Column(db.Integer)
    icon  = db.Column(db.String(100))
    text  = db.Column(db.String(2000))
    title = db.Column(db.String(100))
class Cosmetics(db.Model):
    id    = db.Column(db.Integer, primary_key=True, autoincrement=True)
    id_ch = db.Column(db.Integer)
    pic   = db.Column(db.String(100))
# db.drop_all()
# db.create_all()

def check_admin():
    return ADMIN_ENABLE

# Flask Admin Config
class ChampionView(ModelView):
    page_size            = 100
    can_delete           = True
    can_view_details     = True
    column_list          = ['id', 'name', 'pic']
    column_editable_list = ['name', 'pic']
    column_exclude_list  = []
    def is_accessible(self):
        return check_admin()
class AboutView(ModelView):
    page_size            = 100
    can_delete           = True
    can_view_details     = True
    column_list          = ['id', 'id_ch', 'title', 'pos', 'clas', 'desc', 'pic']
    column_editable_list = ['id_ch', 'title', 'pos', 'clas', 'desc', 'pic']
    column_exclude_list  = []
    def is_accessible(self):
        return check_admin()
class AbilitiesView(ModelView):
    page_size            = 100
    can_delete           = True
    can_view_details     = True
    column_list          = ['id', 'id_ch', 'icon', 'text', 'title']
    column_editable_list = ['id_ch', 'icon', 'text', 'title']
    column_exclude_list  = []
    def is_accessible(self):
        return check_admin()
class CosmeticsView(ModelView):
    page_size            = 100
    can_delete           = True
    can_view_details     = True
    column_list          = ['id', 'id_ch', 'pic']
    column_editable_list = ['id_ch', 'pic']
    column_exclude_list  = []
    def is_accessible(self):
        return check_admin()

class MyAdminView(AdminIndexView):
    def is_accessible(self):
        return False
        # return check_admin()

admin = Admin(app, index_view=MyAdminView(), template_mode='bootstrap4', name='League Admin')
admin.add_view(ChampionView (Champion    , db.session))
admin.add_view(AboutView    (About       , db.session))
admin.add_view(AbilitiesView(Abilities   , db.session))
admin.add_view(CosmeticsView(Cosmetics   , db.session))

if not LOG_FLASK:
    log = logging.getLogger('werkzeug')
    log.disabled = True

@app.route('/')
def index():
    return app.send_static_file('index.html')

@app.route('/apileague/get_main')
def get_commts():
    data = Champion.query.all()
    lst_data =[]
    for x in data:
        obj_champ = {}
        obj_champ['id'  ] = x.id
        obj_champ['name'] = x.name
        obj_champ['pic' ] = x.pic
        lst_data.append(obj_champ)
    return json.dumps(lst_data)

@app.route('/apileague/get_champion/<id>')
def get_champion(id):
    try:
        val_id = int(id)
        data_about  = About.query.filter_by(id_ch = val_id).first()
        dct_about = {}
        dct_about['id']          = data_about.id
        dct_about['title']       = data_about.title
        dct_about['position']    = data_about.pos
        dct_about['class']       = data_about.clas
        dct_about['description'] = data_about.desc
        dct_about['pic']         = data_about.pic
        lst_about = [dct_about]
        data_abilit = Abilities.query.filter_by(id_ch = val_id).all()
        lst_abilit = []
        for x in data_abilit:
            dct_abil = {}
            dct_abil['id']    = x.id
            dct_abil['icon']  = x.icon
            dct_abil['text']  = x.text
            dct_abil['title'] = x.title
            lst_abilit.append(dct_abil)
        data_cosmet = Cosmetics.query.filter_by(id_ch = val_id).all()
        lst_cosm = []
        for x in data_cosmet:
            dct_cosm = {}
            dct_cosm['id']  = x.id
            dct_cosm['pic'] = x.pic
            lst_cosm.append(dct_cosm)
        dct_data = {}
        dct_data['about']     = dct_about
        dct_data['abilities'] = lst_abilit
        dct_data['cosmetics'] = lst_cosm
        rv = json.dumps(dct_data)
    except:
        rv = json.dumps({'value': 'No Value'})
    # return  json.dumps({'value': 'This Value Is From API: ', 'value1': 'This Second Value Is From API: '})
    return dct_data

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