# -*- coding: utf-8 -*-
{
    'name': "Mobile Sample App",

    'summary': """
        Sample mobile application""",
    'description': """
        Sample mobile application for contact list
    """,
    'author': "Diogo Duarte",
    'website': "http://diogocduarte.github.io",
    'category': 'Mobile',
    'version': '0.1',
    'depends': ['base', 'mobile','product_configurator'],
    'data': [
        # 'security/ir.model.access.csv',
        'templates.xml',
        'template_jcmy.xml',
        'views/shop.xml',
    ],
    'application': True,
}