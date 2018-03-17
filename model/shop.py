# -*- coding: utf-8 -*-
# Part of Odoo. See LICENSE file for full copyright and licensing details.

# 1:  imports of odoo
from odoo import models, fields, api, _


class productAttributeValue(models.Model):
    _inherit = "product.attribute.value"


    valueimage = fields.Binary("图片")



# class productAttributeValue(models.Model):
#     _inherit = "product.product"
#
#
#     attri_values = fields.Many2many(comodel_name="product.attribute",compute="_compute_value",string="属性")
#
#
#
#     @api.multi
#     @api.depends
#     _compute_value


