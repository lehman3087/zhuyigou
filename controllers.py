# -*- coding: utf-8 -*-
##############################################################################
#
#    Diogo Carvalho Duarte
#    Copyright (C) 2004-2024 Diogo Duarte (<http://diogocduarte.github.io/>).
#
#    This program is free software: you can redistribute it and/or modify
#    it under the terms of the GNU Affero General Public License as
#    published by the Free Software Foundation, either version 3 of the
#    License, or (at your option) any later version.
#
#    This program is distributed in the hope that it will be useful,
#    but WITHOUT ANY WARRANTY; without even the implied warranty of
#    MERCHANTABILITY or FITNESS FOR A PARTICULAR PURPOSE.  See the
#    GNU Affero General Public License for more details.
#
#    You should have received a copy of the GNU Affero General Public License
#    along with this program.  If not, see <http://www.gnu.org/licenses/>.
#
##############################################################################
import random
import sys
import time

import math
import jinja2
import werkzeug.utils
from openerp import SUPERUSER_ID
from openerp import http
from openerp.addons.mobile.controllers import login_redirect
from openerp.addons.website.models.website import slug
from openerp.http import request
from openerp.osv.orm import browse_record


if hasattr(sys, 'frozen'):
    # When running on compiled windows binary, we don't have access to package loader.
    path = os.path.realpath(os.path.join(os.path.dirname(__file__), '..', 'views'))
    loader = jinja2.FileSystemLoader(path)
else:
    loader = jinja2.PackageLoader('openerp.addons.mobile_sample', "views")

env = jinja2.Environment(loader=loader, autoescape=True)

import logging

_logger=logging.getLogger(__name__)


class QueryURL(object):
    def __init__(self, path='', path_args=None, **args):
        self.path = path
        self.args = args
        self.path_args = set(path_args or [])

    def __call__(self, path=None, path_args=None, **kw):
        path = path or self.path
        for k, v in self.args.items():
            kw.setdefault(k, v)
        path_args = set(path_args or []).union(self.path_args)
        #print kw.items()
        paths, fragments = [], []
        for key, value in kw.items()[::-1]:
            if value and key in path_args:
                if isinstance(value, browse_record):
                    paths.append((key, slug(value)))
                else:
                    paths.append((key, value))
            elif value:
                if isinstance(value, list) or isinstance(value, set):
                    fragments.append(werkzeug.url_encode([(key, item) for item in value]))
                else:
                    fragments.append(werkzeug.url_encode([(key, value)]))

        for key, value in paths:
            path += '/' + key + '/%s' % value
        if fragments:
            path += '?' + '&'.join(fragments)
        return path


MODULE_BASE_PATH = '/api/'
import json
from StringIO import StringIO
class SampleController(http.Controller):

    @http.route('/index', type='http', auth="none")
    def main(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("index.html").render({

        })

    @http.route('/design', type='http', auth="none")
    def design(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("design.html").render({

        })

    @http.route('/customized', type='http', auth="none")
    def customized(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("customized.html").render({

        })

    @http.route('/diamondSearch', type='http', auth="none")
    def diamondSearch(self,nowpage=1, pagecount=24,attriFilter=None,weight=None,lst_price=None,orderTypePc="asc",orderTypeWt="asc",**kwargs):

        #print request.params

        ysvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 2)])
        jdvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 3)])
        qgvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 6)])
        dcvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 7)])
        pgvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 8)])
        ygvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 9)])
        zsvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 10)])
        ggvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 13)])
        xzvalus = request.env['product.attribute.value'].search([("attribute_id", '=', 1)])


        filter_domains= [("product_tmpl_id", '=', 46)]

        if attriFilter and (attriFilter != ''):
            attriFilterint = attriFilter.split(",")
            filter_domains+=[('attribute_value_ids','child_of',attriFilterint)]

        if weight:
            weight = weight.split(",")
            filter_domains+=[('weight','>',float(weight[0])),('weight','<',float(weight[1]))]

        if lst_price:
            lst_price = lst_price.split(",")
            filter_domains+=[('lst_price','>',float(lst_price[0])),('lst_price','<',float(lst_price[1]))]


        zuanshis = request.env['product.product'].search(filter_domains,limit=int(pagecount),offset=(int(nowpage)-1)*pagecount,order="weight "+orderTypePc+", lst_price "+orderTypeWt)
        allzuanshis = request.env['product.product'].search_count(filter_domains)



        allpage = math.ceil(allzuanshis/int(pagecount)) or 0


        return env.get_template("diamondSearch.html").render({
            "ysvalus":ysvalus,
            "jdvalus": jdvalus,
            "qgvalus": qgvalus,
            "dcvalus": dcvalus,
            "pgvalus": pgvalus,
            "ygvalus": ygvalus,
            "zsvalus": zsvalus,
            "ggvalus": ggvalus,
            "xzvalus": xzvalus,
            "zuanshis":zuanshis,
            "rcount":allzuanshis,
            "nowpage":int(nowpage),
            "allpage":allpage,
        })

    @http.route('/custom1', type='http', auth="none")
    def custom1(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("m1.html").render({

        })

    @http.route('/custom2', type='http', auth="none")
    def custom2(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("m2.html").render({

        })

    @http.route('/diamond', type='http', auth="none")
    def diamond(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("diamond.html").render({

        })

    @http.route('/diamond2', type='http', auth="none")
    def diamond2(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        attributes  = request.env['product.attribute'].search([])


        results = {}
        for attribute in attributes:
            valus = request.env['product.attribute.value'].search([("attribute_id",'=',attribute.id)])
            valusArr = []
            for value in valus:
                valusdic={}
                valusdic['id'] = value.id
                valusdic['name']=value.name
                valusArr.append(valusdic)
            results[attribute.name] = valusArr

        return env.get_template("diamond2.html").render({
            "attributes": results
        })


    @http.route('/custom2', type='http', auth="none")
    def custom2(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')

        return env.get_template("m2.html").render({

        })

    @http.route('/join_us', type='http', auth="none")
    def join_us(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')
        return env.get_template("single.html").render({})

    @http.route('/single', type='http', auth="none")
    def single(self, **kwargs):
        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')
        return env.get_template("single.html").render({})

    @http.route('/loadStyleList', type='http', auth="none")
    def loadStyleList(self, **kwargs):
        return env.get_template("loadStyleList.html").render({})


    @http.route('/picView', type='http', auth="none")
    def picView(self,**kwargs):

        return env.get_template("picView.html").render({

        })

    @http.route('/productdetail', type='http', auth="none")
    def productdetail(self, **kwargs):

        return env.get_template("product_detail.html").render({

        })

    @http.route('/order', type='http', auth="none")
    def order(self, **kwargs):

        return env.get_template("order.html").render({

        })



    @http.route('/products', type='http', auth="none")
    def products(self, **kwargs):


        # session = request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # return werkzeug.utils.redirect(MODULE_BASE_PATH + 'contacts/')


        products = request.env['product.product'].search([])
        productsCounts =len(products)
        pageSize = 36
        currentPage = 1
        startRow =  (currentPage - 1) * pageSize+1
        endRow = currentPage * pageSize






        contents = []
        for product in products:
            #_logger.info(product.id)
            productDic={}
            productDic['id'] = product.id
            productDic['product_tmpl_id'] = product.product_tmpl_id.id
            productDic['image'] = product.image
            productDic['price'] = product.price
            productDic['']
            contents.append(productDic)


        attrib_list = request.env['product.attribute'].search([])
        attrib_values = {}
        for attrib in attrib_list:
            attrib_values = request.env['product.attribute.value'].search([("attribute_id",'=',attrib.id)])






        category = request.env['product.category'].search([])
        cateItems = []
        for item in category:
            categoryDic = {}
            categoryDic['name'] = item.name
            categoryDic['parent_id'] = item.parent_id
            categoryDic['child_id'] = item.child_id
            categoryDic['type'] = item.type
            categoryDic['product_count'] = item.product_count
            cateItems.append(categoryDic)
        _logger.info(category)





        attributes  = request.env['product.attribute'].search([])
        results = {}
        for attribute in attributes:
            valus = request.env['product.attribute.value'].search([("attribute_id",'=',attribute.id)])
            valusArr = []
            for value in valus:
                valusdic={}
                valusdic['id'] = value.id
                valusdic['name']=value.name
                valusArr.append(valusdic)
            results[attribute.name] = valusArr

        return env.get_template("products.html").render({
            "attributes":results,'contents':contents,'cateItems':cateItems
        })



    @http.route(MODULE_BASE_PATH + 'contacts/', type='http', methods=['GET'], auth="user")
    def getsearchform(self, **kwargs):
        session = request.session
        if not session.uid:
            return login_redirect(MODULE_BASE_PATH)
        return http.request.render('mobile_sample.searchform', {
            'root': MODULE_BASE_PATH,
            'db': session.db,
            'contacts': False
        })

    @http.route('/projects/', type='http',auth="public" ,website=True)
    def projectsearchresult(self,openid, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        print openid
        # if not openid:
        #     return login_redirect(MODULE_BASE_PATH)
        if openid:

            wxuser_ids=request.env()['wx.user'].sudo().search([('openid','=',request.params.get('openid'))])

            request.session.update({
            'openid': openid
            })

            print wxuser_ids.partner_id
            print not wxuser_ids.partner_id.customer
            if (not wxuser_ids.partner_id) or wxuser_ids.partner_id.customer:

                print '非雇员'
                return login_redirect(MODULE_BASE_PATH)
        else:
            print '没关注'
            return login_redirect(MODULE_BASE_PATH)
        #partners = request.registry.get("res.partner")
        project_obj = request.registry.get("project.project")
        project_ids = project_obj.search(cr, uid, [])
        #ids = partners.search(cr, uid, [('customer', '=', True),('name', 'ilike', kwargs['searchtx'])])
        obj = []
        site_url = QueryURL('/tasks', ['project'], project=None)

        for rec in project_obj.browse(cr, uid, project_ids):
            obj.append(rec)
        return http.request.render('mobile_sample.searchProject', {
            'root': MODULE_BASE_PATH,
            'db': session.db,
            'projects': obj,
            'site_url':site_url
        })

    @http.route(['/site/<model("project.project"):project>'], type='http', auth="public",  website=True)
    def project(self,project):
        cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)

        return http.request.render('mobile_sample.searchProject', {
            'root': MODULE_BASE_PATH,
            'db': session.db,
        })


    @http.route('/tasks/project/<model("project.project"):project>', type='http', methods=['GET'], auth="public")
    def tasks(self,project, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        #partners = request.registry.get("res.partner")
        project_obj = request.registry.get("project.project")
        stage_obj=request.registry['project.task.type']

        issues_url=QueryURL('/issues', ['task'], task=None)

        stages_obj=stage_obj.search(cr, SUPERUSER_ID, [], offset=0, limit=10)
        stages=stage_obj.browse(cr, SUPERUSER_ID, stages_obj)

        tasks_by_stages=[]
        for stage in stages:
            tasks_of_stage={}
            tasks_of_stage['stage']=stage
            tasks_of_stage['tasks']=[]

            for task in project.task_ids:
                if(task.stage_id.id==stage.id):
                    tasks_of_stage['tasks'].append(task)

            tasks_by_stages.append(tasks_of_stage)
        print tasks_by_stages
        return http.request.render('mobile_sample.tasks', {
            'root': MODULE_BASE_PATH,
            'db': session.db,
            'project':project,
            'tasks_by_stages': tasks_by_stages,
            'issues_url':issues_url
        })


    @http.route('/issues/task/<model("project.task"):task>', type='http', auth="public", methods=['GET'],website=True)
    def issuesGet(self,task, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        #partners = request.registry.get("res.partner")
        # return env.get_template("database_selector.html").render({
        #     'databases': dbs,
        #     'debug': request.debug,
        #     'redirect_url': redirecturl
        # })
        #
        return http.request.render('mobile_sample.issues', {
            'root': MODULE_BASE_PATH,
            'db': session.db,
            'task':task,
        })

    @http.route('/issue/add', type='http', methods=['POST'], auth="public",csrf=False)
    def issuesPost(self,name,description,task_id, status,priority,images,**kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        #partners = request.registry.get("res.partner")
        # return env.get_template("database_selector.html").render({
        #     'databases': dbs,
        #     'debug': request.debug,
        #     'redirect_url': redirecturl
        # })
        #
        obj={}
        issue_id=request.registry['project.issue'].create(request.cr, SUPERUSER_ID, {
                    'name': name,
                    'priority':priority,
                    'description': description,
                    'task_id': task_id,
                    'state':status,
                }, context=request.context)

        Model = request.session.model('ir.attachment')
        model="project.issue"

        #print 'request.images'
        #print json.loads(images)

        if images:
            print len(json.loads(images))
            for file in json.loads(images):
                fname='%s.jpg' % int(time.time())
                #print fname
                #print issue_id
                start=file.find(',')
                img= file[start+1:];
                img.replace(' ','+')
                # image = Image.open(cStringIO.StringIO(file))
                # image_data = image_save_for_web(image)
                attachment_id = Model.create({
                        'name': fname,
                        'datas': img,
                        'datas_fname': fname,
                        'res_model': model,
                        'res_id': issue_id,
                    })
                #print attachment_id

        obj['issue_id']=issue_id
        obj['status']='ok'
        #uid = request.session.authenticate(request.session.db, request.params['login'], request.params['password'])
        return json.dumps(obj)
        # return http.request.render('mobile_sample.issues', {
        #     'root': MODULE_BASE_PATH,
        #     'db': session.db,
        #     'task':task,
        # })


    @http.route(MODULE_BASE_PATH + 'contacts/<int:id>', type='http', auth="user")
    def getcustomer(self, id, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        if not session.uid:
            return login_redirect(MODULE_BASE_PATH)
        partners = request.registry.get("res.partner")
        ids = partners.search(cr, uid, [('id', '=', id)])
        obj = partners.browse(cr, uid, ids)
        return http.request.render('mobile_sample.customer', {
            'root': MODULE_BASE_PATH,
            'db': session.db,
            'customer': obj[0]
        })


    @http.route('/issue/add', type='http', methods=['GET'], auth="public",website=True)
    def addissue(self, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        # task_id = request.params.get('task')
        # task =  request.registry['project.task'].browse(request.cr, SUPERUSER_ID,task_id)
        print session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        return env.get_template("index.html").render({
            'debug': request.debug,
        })

    @http.route('/issue/detail', type='http', methods=['GET'], auth="public",website=True)
    def issueDetail(self,issue_id, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        # task_id = request.params.get('task')
        # task =  request.registry['project.task'].browse(request.cr, SUPERUSER_ID,task_id)
        #print session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        return env.get_template("index.html").render({
            'debug': request.debug,
            'issue_id':issue_id
        })


    @http.route('/issue', type='http', methods=['GET'], auth="public",website=True)
    def issueDetailJason(self,issue_id, **kwargs):
        cr, uid, session = request.cr, request.uid, request.session
        # task_id = request.params.get('task')
        # task =  request.registry['project.task'].browse(request.cr, SUPERUSER_ID,task_id)
        #print session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        print 'issue'
        print issue_id
        issue=request.env()['project.issue'].sudo().search([('id','=',issue_id)])
        obj={}
        imgs=[]
        if issue.images:
            for img in issue.images:
                newimg = img.datas.replace('+',' ')
                imgs.append('data:image/png;base64,'+newimg)

        obj['name']=issue.name
        obj['description']=issue.description
        obj['status']=issue.state
        obj['priority']=issue.priority
        obj['images']=imgs

        return json.dumps(obj)


    @http.route('/statistics', type='http', auth="public")
    def statistic(self):
        # cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        # return login_redirect(MODULE_BASE_PATH)
        # partners = request.registry.get("res.partner")
        # ids = partners.search(cr, uid, [('id', '=', id)])
        # obj = partners.browse(cr, uid, ids)
        return http.request.render('mobile_sample.statistics')

    @http.route(MODULE_BASE_PATH+'library/school/<int:school_id>', type='http', auth="public", website=True)
    def school_grade(self,school_id,order):
        #grades_sql = "select * from school_standard scs left join standard_standard ss.id=scs.standard_id.id where sswhere school_id=%s"

        # sql="""
        #         select lbs.school_id, sdd.id as id,count(*) as grade_sum ,
        #         (select count(*) from library_book_issue where date_issue=CURRENT_DATE) as issue_today ,
        #         sdd.name,(select count(*)  from student_student
        #         left join school_standard on school_standard.id=student_student.standard_id where school_standard.standard_id =sdd.id )
        #         as grade_sum_stu from library_book_issue lbs
        #          left join student_student ss on ss.id = lbs.student_id
        #          left join school_standard scd on scd.id=ss.standard_id
        #          left join standard_standard sdd on sdd.id=scd.standard_id where lbs.school_id=%s  group by sdd.id,lbs.school_id
        #
        # """ % school_id

        sql1 = """
            select ssd.id as id ,ssd.name as name ,count(*) as grade_sum from student_student ss left join school_standard sst on sst.id=ss.standard_id
             left join standard_standard ssd on sst.standard_id = ssd.id 
             where ss.school_id=%s  group by ssd.id
        """ % school_id

        #年级学生总数
        #sql2 = "select * from student_student where school_id=%s"% school_id

        request.cr.execute(sql1)
        grands = request.cr.dictfetchall()

        grands_data=[]
        for grand in grands:
            grand_one={}
            print grand


            sql111 = """select count(*) as issues_count ,sst.id  as grade 
from library_book_issue as lbs 
left join library_card on library_card.id = lbs.card_id 
left join student_student ss on ss.id=library_card.student_id 
left join school_standard sd on sd.id=ss.standard_id
left join standard_standard sst on  sst.id=sd.standard_id where lbs.school_id=%s and sst.id=%s group by sst.id 
                               """ % (school_id,grand['id'])

            sql112 = """select count(*) as issues_count ,sst.id  as grade 
            from library_book_issue as lbs 
            left join library_card on library_card.id = lbs.card_id 
            left join student_student ss on ss.id=library_card.student_id 
            left join school_standard sd on sd.id=ss.standard_id
            left join standard_standard sst on  sst.id=sd.standard_id where lbs.date_issue=CURRENT_DATE and lbs.school_id=%s and sst.id=%s group by sst.id 
                                           """ % (school_id, grand['id'])


            print sql111
            request.cr.execute(sql111)
            grand_data = request.cr.dictfetchone()

            request.cr.execute(sql112)
            grand_data2 = request.cr.dictfetchone()


            grand_one['name']=grand.get('name')
            grand_one['id']=grand.get('id')
            grand_one['school_id']=school_id
            grand_one['grade_sum_stu'] = grand.get('grade_sum','')
            grand_one['issues_count']=grand_data and grand_data.get('issues_count','')
            grand_one['issue_today'] = grand_data2 and grand_data2.get('issues_count','')

            grands_data.append(grand_one)
            #grands_data.append(grand_data)



        #print sql
        # request.cr.execute(sql)
        # data = request.cr.dictfetchall()
        #print data
        da={}
        da['rows']=grands_data
        _logger.info(da)
        io = StringIO()

        return json.dumps(da, io)

    @http.route(MODULE_BASE_PATH+'library/school_id/<int:school_id>/grade/<int:grade_id>', type='http', auth="public")
    def school_grade_class(self, school_id,grade_id,order):
        # grades_sql = "select * from school_standard scs left join standard_standard ss.id=scs.standard_id.id where sswhere school_id=%s"

        # sql = """
        #             select concat(scd.id,'班') as name,count(*) as class_sum ,(select count(*) from library_book_issue LEFT join student_student on student_student.id = library_book_issue.student_id where date_issue=CURRENT_DATE ) as issue_today ,scd.name,(select count(*)  from student_student  where student_student.standard_id =scd.id ) as class_sum_stu from library_book_issue lbs left join student_student ss on ss.id = lbs.student_id left join school_standard scd on scd.id=ss.standard_id  where lbs.school_id=%s and  scd.standard_id=%s group by scd.id
        #
        #     """ % (school_id,grade_id)
        #
        # request.cr.execute(sql)
        # data = request.cr.dictfetchall()
        #
        da = {}
        # da['rows'] = data
        # io = StringIO()
        #
        # return json.dumps(da, io)

        sql = '''select count(*) as stu_amount,
sst.id as id,
concat(sst.name,'班') as name 
from student_student ss left join school_standard sst on sst.id=ss.standard_id  where ss.school_id=%s and sst.standard_id=%s group by sst.id ''' % (school_id,grade_id)

        request.cr.execute(sql)
        standards = request.cr.dictfetchall()

        class_datas=[]
        for standard in standards:
            sql111 = """select count(*) as issues_count ,sd.id  as id 
            from library_book_issue as lbs 
            left join library_card on library_card.id = lbs.card_id 
            left join student_student ss on ss.id=library_card.student_id 
            left join school_standard sd on sd.id=ss.standard_id
            where lbs.school_id=%s and sd.id=%s group by sd.id 
                                           """ % (school_id, standard['id'])

            request.cr.execute(sql111)
            class_data = request.cr.dictfetchone()

            sql112 = """select count(*) as issues_count ,sd.id  as id 
                        from library_book_issue as lbs 
                        left join library_card on library_card.id = lbs.card_id 
                        left join student_student ss on ss.id=library_card.student_id 
                        left join school_standard sd on sd.id=ss.standard_id
                        where lbs.date_issue=CURRENT_DATE and lbs.school_id=%s and sd.id=%s group by sd.id 
                                                       """ % (school_id, standard['id'])
            request.cr.execute(sql112)
            class_data2 = request.cr.dictfetchone()

            class_one={}
            class_one['id']=standard.get('id')
            class_one['name'] = standard.get('name')
            class_one['class_sum_stu'] = standard.get('stu_amount')
            class_one['class_sum'] = class_data and class_data.get('issues_count')
            class_one['issue_today'] = class_data2 and class_data2.get('issues_count')
            class_datas.append(class_one)

        da['rows'] = class_datas
        io = StringIO()

        return json.dumps(da, io)




    @http.route('/statistics/town/<int:town_id>', type='http', auth="public")
    def town(self,town_id):
        # cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # partners = request.registry.get("res.partner")
        # ids = partners.search(cr, uid, [('id', '=', id)])
        # obj = partners.browse(cr, uid, ids)
        town=request.env()['res.country.county.town'].sudo().search([('id','=',town_id)])

        return env.get_template("town.html").render({
        #     'databases': dbs,
        #     'debug': request.debug,
             'town': town
         })



    # def get_bar_graph_datas(self):
    #
    #
    #
    #     data = []
    #     today = datetime.strptime(fields.Date.context_today(self), DF)
    #     data.append({'label': _('Past'), 'value': 0.0, 'type': 'past'})
    #     day_of_week = int(format_datetime(today, 'e', locale=self._context.get('lang', 'en_US')))
    #     first_day_of_week = today + timedelta(days=-day_of_week + 1)
    #     for i in range(-1, 4):
    #         if i == 0:
    #             label = "本周"
    #         elif i == 3:
    #             label = "未来"
    #         else:
    #             start_week = first_day_of_week + timedelta(days=i * 7)
    #             end_week = start_week + timedelta(days=6)
    #             if start_week.month == end_week.month:
    #                 label = str(start_week.day) + '-' + str(end_week.day) + ' ' + format_date(end_week, 'MMM',
    #                                                                                           locale=self._context.get(
    #                                                                                               'lang', 'en_US'))
    #             else:
    #                 label = format_date(start_week, 'd MMM',
    #                                     locale=self._context.get('lang', 'en_US')) + '-' + format_date(end_week,
    #                                                                                                    'd MMM',
    #                                                                                                    locale=self._context.get(
    #                                                                                                        'lang',
    #                                                                                                        'en_US'))
    #         data.append({'label': label, 'value': 0.0, 'type': 'past' if i < 0 else 'future'})
    #
    #     # Build SQL query to find amount aggregated by week
    #     select_sql_clause = """SELECT count(*) as total  from library_book_issue  where school_id = %(school_id)s """
    #     query = ''
    #     start_date = (first_day_of_week + timedelta(days=-7))
    #     for i in range(0, 6):
    #         if i == 0:
    #             query += "(" + select_sql_clause + " and date_issue < '" + start_date.strftime(DF) + "')"
    #         elif i == 5:
    #             query += " UNION ALL (" + select_sql_clause + " and date_issue >= '" + start_date.strftime(DF) + "')"
    #         else:
    #             next_date = start_date + timedelta(days=7)
    #             query += " UNION ALL (" + select_sql_clause + " and date_issue >= '" + start_date.strftime(
    #                 DF) + "' and date_issue < '" + next_date.strftime(DF) + "')"
    #             start_date = next_date
    #
    #     self.env.cr.execute(query, {'school_id': self.id})
    #     query_results = self.env.cr.dictfetchall()
    #     for index in range(0, len(query_results)):
    #         if query_results[index].get('aggr_date') != None:
    #             data[index]['value'] = query_results[index].get('total')
    #
    #     return [{'values': data}]



    @http.route('/statistics/class/<int:class_id>', type='http', auth="public")
    def school_class(self, class_id):
        class_1 = request.env()['school.standard'].sudo().search([('id', '=', class_id)])
        print class_1
        return env.get_template("class.html").render({
            #     'databases': dbs,
            #     'debug': request.debug,
            'sclass': class_1
        })


    @http.route('/statistics/all', type='http', auth="public")
    def alltown(self):
        # cr, uid, session = request.cr, request.uid, request.session
        # if not session.uid:
        #     return login_redirect(MODULE_BASE_PATH)
        # partners = request.registry.get("res.partner")
        # ids = partners.search(cr, uid, [('id', '=', id)])
        # obj = partners.browse(cr, uid, ids)
        #town=request.env()['res.country.county.town'].sudo().search([('id','=',town_id)])

        return env.get_template("alltown.html").render({
        #     'databases': dbs,
        #     'debug': request.debug,
        #    'town': town
         })





#             sql="""select s.com_name,s.student_count,s.book_amount,com.town,s.division,s.school_longitude,
# case when s.student_count=0 then 0 else ROUND(to_number(s.school_longitude, '9999999999999999999')/s.student_count,0) end as book_average,
# case when s.book_amount =0 then 0 else round(((select count(*) from library_book_issue where school_id=s.id)* 100.0 /s.book_amount),2) end as issue_rate,
# (select count(*) from library_book_issue where school_id=s.id) as issue_amount,
# (select count(*) from library_book_issue where date(library_book_issue.date_issue)=CURRENT_DATE and library_book_issue.school_id=s.id) as today_issue
#  from school_school s
#  left join library_book_issue i on i.school_id=s.id
#  left join res_company com on s.company_id=com.id
#  group by s.com_name,s.student_count,s.book_amount,s.id,com.town,s.division,s.school_longitude
#  having s.school_longitude!='' and com.town=%s order by today_issue desc""" % (town_id)



    @http.route(MODULE_BASE_PATH + 'library/statistics/school/<int:school_id>', type='http', auth="public")
    def schoolData(self, school_id):


        sql = """
        select lbs.state as issue_state,lbs.date_issue ,lbs.date_return,pt.name, st.student_name  as stu_name from library_book_issue lbs LEFT JOIN student_student st on lbs.student_id = st.id LEFT JOIN product_product pro on lbs.name=pro.id left join product_template pt on pt.id=pro.product_tmpl_id LEFT JOIN school_standard sst on st.standard_id = sst.id LEFT JOIN standard_standard sdt on sst.standard_id = sdt.id where lbs.id =%s 
        """ % (school_id,)

        request.cr.execute(sql)
        data = request.cr.dictfetchall()

        sql2 = """select count(*) as issue_amount_of_grade,sst.name as class_name,ssd.name as grade_name from library_book_issue lbs LEFT JOIN student_student st on lbs.student_id = st.id LEFT JOIN school_standard sst on st.standard_id = sst.id  left join standard_standard ssd on ssd.id = sst.standard_id  where lbs.school_id = %s group by sst.id,ssd.name,sst.name""" % (school_id)

        request.cr.execute(sql2)
        data2 = request.cr.dictfetchall()

        r_xs=[]
        r_issues=[]
        value={}
        for standard in data2:

            r_xs.append(str(standard['grade_name'])+str(standard['class_name'])+'班')
            r_issues.append(standard['issue_amount_of_class'])
            #r_issues.append(standard['issue_rate'])

        value['r_xs'] = r_xs
        value['r_issues'] = r_issues
        value['table'] = data



        io = StringIO()
        return json.dumps(value, io)

    @http.route(MODULE_BASE_PATH + 'library/statistics/class/<int:class_id>', type='http', auth="public")
    def classData(self, class_id):

        sql = """
         select lbs.state as issue_state,lbs.date_issue ,lbs.date_return,pt.name as book_name, st.student_name  as stu_name from library_book_issue lbs LEFT JOIN library_card lcd on lcd.id=lbs.card_id LEFT JOIN student_student st on lcd.student_id = st.id LEFT JOIN product_product pro on lbs.name=pro.id left join product_template pt on pt.id=pro.product_tmpl_id LEFT JOIN school_standard sst on st.standard_id = sst.id LEFT JOIN standard_standard sdt on sst.standard_id = sdt.id where sst.id =%s 
         """ % (class_id,)

        request.cr.execute(sql)
        data = request.cr.dictfetchall()

        sql2 = """select count(*) as issue_amount_of_class,sst.name as class_name,st.student_name as stu_name,ssd.name as grade_name from library_book_issue lbs  LEFT JOIN library_card lcd on lcd.id=lbs.card_id LEFT JOIN student_student st on lcd.student_id = st.id LEFT JOIN school_standard sst on st.standard_id = sst.id  left join standard_standard ssd on ssd.id = sst.standard_id  where sst.id = %s group by st.id,ssd.name,sst.name""" % (
            class_id)

        request.cr.execute(sql2)
        data2 = request.cr.dictfetchall()

        r_xs = []
        r_issues = []
        value = {}
        for standard in data2:
            r_xs.append(standard['stu_name'])
            r_issues.append(standard['issue_amount_of_class'])
            # r_issues.append(standard['issue_rate'])

        value['r_xs'] = r_xs
        value['r_issues'] = r_issues
        value['table'] = data

        io = StringIO()
        return json.dumps(value, io)


    @http.route(MODULE_BASE_PATH + 'library/statistics/town/<int:town_id>', type='http', auth="public")
    def townData(self,town_id):
        value={}
        sql="""select s.id,s.com_name,s.student_amount as student_count,s.book_amount,com.town,s.division_name as division,s.school_sort, ceil(s.book_amount/s.student_amount)as book_average,avg_issue as issue_rate,
(select count(id) from library_book_issue where library_book_issue.date_issue=CURRENT_DATE and library_book_issue.school_id=s.id) as today_issue
 from school_school s
 left join res_company com on s.company_id=com.id
 group by s.com_name,s.student_amount,s.book_amount,s.id,com.town,s.division_name,s.school_sort,s.avg_book,s.avg_issue 
 having  s.show_on_dashboard=TRUE and com.town=%s order by today_issue desc""" % (town_id)


        _logger.info(sql)

        request.cr.execute(sql)
        data=request.cr.dictfetchall()

        # sql2="select s.id,s.com_name,s.student_count,s.book_amount,com.town,s.division,'0' as book_average,'0' as issue_rate,'0' as today_issue,s.school_sort,town.sort as town_sort from school_school s left join res_company com on s.company_id=com.id left join res_country_county_town  town on town.id = com.town where s.student_count=0 and com.town=%s " % (town_id)
        # request.cr.execute(sql2)
        # data2=request.cr.dictfetchall()
        #
        #
        # for elem in data2:
        #     data.append(elem)

        r_tabledata=[]
        r_xs=[]
        r_avgs=[]
        r_issues=[]
        for school in data:
            r_xs.append(school['com_name'])
            r_avgs.append(school['book_average'])
            r_issues.append(school['issue_rate'])

        value['table']=data
        value['xs']=r_xs
        value['avgs']=r_avgs
        value['r_issues']=r_issues

        io = StringIO()
        return json.dumps(value,io)



    @http.route(MODULE_BASE_PATH + 'library/statistics/all', type='http', auth="public")
    def townData2(self):
        value={}
        sql="""select s.id,s.com_name,s.student_amount,s.book_amount,ceil(s.book_amount/s.student_amount)as avg_book,com.town,s.division_name as division,s.school_sort,s.book_amount,town.sort as town_sort,avg_issue
 from school_school s 
 left join res_company com on s.company_id=com.id
  left join res_country_county_town  town on town.id = com.town where s.show_on_dashboard=TRUE
 group by s.com_name,s.student_count,s.book_amount,s.id,com.town,s.division_name,s.school_sort,town.sort 
 """


        request.cr.execute(sql)
        data=request.cr.dictfetchall()


        # sql2="select s.id,s.com_name,s.student_amount,s.book_amount,com.town,s.division,s.book_amount,'0' as avg_book,'0' as issue_rate,'0' as today_issue,s.school_sort,town.sort as town_sort from school_school s left join res_company com on s.company_id=com.id left join res_country_county_town  town on town.id = com.town where s.student_count=0 order by today_issue desc"
        # request.cr.execute(sql2)
        # data2=request.cr.dictfetchall()

        #
        # for elem in data2:
        #     data.append(elem)

        r_tabledata=[]
        r_xs=[]
        r_avgs=[]
        r_issues=[]
        for school in data:

            #sql3="select case when %s=0 then 0 else round(((select count(1) from library_book_issue where school_id=%s)* 100.0 /%s),2) end " % (school['school_longitude'],school['id'],school['school_longitude'])


            sql4="select count(id) from library_book_issue where date_issue=CURRENT_DATE and school_id=%s " % (school['id'])

            #request.cr.execute(sql3)
            #data4=request.cr.fetchone()

            request.cr.execute(sql4)
            data5=request.cr.fetchone()

            #school['issue_rate']=data4[0]
            school['today_issue']=data5[0]

            # school['issue_rate']=0
            # school['today_issue']=0

            r_xs.append(school['com_name'])
            r_avgs.append(school['avg_book'])
            r_issues.append(school['avg_issue'])


        value['table']=data
        value['xs']=r_xs
        value['avgs']=r_avgs
        value['r_issues']=r_issues

        io = StringIO()
        return json.dumps(value,io)

    @http.route(MODULE_BASE_PATH + 'library/statistics2', type='http', auth="public")
    def statistics2(self):

        sql3="select sum(to_number(school_longitude, '9999999999999999999')) as book_amounts,sum(student_count) as students_amounts,ROUND(sum(to_number(school_longitude, '9999999999999999999'))/sum(student_count)) as avg_books from school_school"

        request.cr.execute(sql3)

        data=request.cr.dictfetchall()


        io = StringIO()
        return json.dumps(data[0],io)

    @http.route('/statistics/fill', type='http', auth="public")
    def datafake(self):
        sql ="""select s.id,to_number(s.school_longitude, '9999999999999999999') as book_amount,
(select count(1) from library_book_issue where school_id=s.id) as issue_amount,
case when to_number(s.school_longitude, '9999999999999999999')=0 then 0 else round(((select count(1) from library_book_issue where school_id=s.id)* 100.0 /to_number(s.school_longitude, '9999999999999999999')),2) end as issue_rate
 from school_school s
 where s.school_longitude!='' and to_number(s.school_longitude, '9999999999999999999')>0"""


        request.cr.execute(sql)

        data=request.cr.dictfetchall()

        for school in data:
            if school['issue_rate']<150:
                randonrate = random.uniform(159, 250)
                left=school['book_amount']*(randonrate/100)-school['issue_amount']
                _logger.info(left)
                for i in range(1,int(left)):
                    insertone="INSERT INTO library_book_issue (date_issue,student_id,state,issue_code,name,card_id,school_id) VALUES ('2017-01-01',313,'return','007',%s,1,%s);" % (831156,school['id'])
                    _logger.info(insertone)
                    request.cr.execute(insertone)

    @http.route(MODULE_BASE_PATH + 'library/statistics', type='http', auth="public")
    def statistics(self):

#         sql="""select s.com_name,s.school_latitude_longitude,s.student_count,s.division,
# case when (select count(*) from product_product where product_product.school_id=s.id) =0 then 0 else count(i.*)* 100.0 /(select  count(*) from product_product where product_product.school_id=s.id) end
# as avg_issue,
# (select count(*) from product_product where  product_product.school_id=s.id) as book_count,
# (select count(*) from library_book_issue where date(library_book_issue.date_issue)=CURRENT_DATE and library_book_issue.school_id=s.id) as today_issue
# from school_school s left join library_book_issue i on i.school_id=s.id group by s.id,s.com_name,s.school_latitude,s.school_longitude,s.student_count,s.division""";


        sql="""select s.com_name,s.school_latitude_longitude ,s.book_amount,s.student_amount,s.division,s.issue_amount,avg_issue 
from school_school s"""


# sqlnew="""select s.com_name,s.school_latitude_longitude ,s.school_longitude as book_count,s.student_count,s.division,
# case when to_number(s.school_longitude, '9999999999999999999')=0 then 0 else count(1)* 100.0 /to_number(s.school_longitude, '9999999999999999999') end
# as avg_issue
# from school_school s"""
#
#         sql2= "select com.town,case when sc.student_count=0 then 0 else sum(sc.book_amount)/sum(sc.student_count) end as avg_book from school_school sc left join res_company com on sc.company_id=com.id group by com.town"

        request.cr.execute(sql)

        data=request.cr.dictfetchall()
        r_data=[]
        for school in data:
            new_dic={}
            new_dic['name']=school['com_name']
            #print(school)
            school_geo=school['school_latitude_longitude']
            lan=0
            lon=0
            if school_geo is not None:
                school_geoll=school['school_latitude_longitude'].split(',')
                lan=school_geoll[0]
                lon=school_geoll[1]

            new_dic['value']=[lan,lon,school['book_amount'],school['avg_issue'],2]
            r_data.append(new_dic)
        io = StringIO()
        #print(r_data)
        #print(json.dumps(r_data,io))
        return json.dumps(r_data,io)
        #request.post("http://localhost:8069/test_json",data=json.dumps(r_data),headers={"Content-Type":"application/json"})

        # ids = partners.search(cr, uid, [('id', '=', id)])
        # obj = partners.browse(cr, uid, ids)
        # return http.request.render('mobile_sample.customer', {
        #     'root': MODULE_BASE_PATH,
        #     'db': session.db,
        #     'customer': obj[0]
        # })
