var Handlebars = require('handlebars')

module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda;

  return "                        <span class=\"info_title\">"
    + this.escapeExpression(alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.title : stack1), depth0))
    + "</span>\n                        <span class=\"markdown\">"
    + ((stack1 = alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.description : stack1), depth0)) != null ? stack1 : "")
    + "</span>\n";
},"3":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda, alias2=this.escapeExpression;

  return "                        <span class='info_email'>\n                            Contact: <a href=\"mailto:"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1), depth0))
    + "?subject="
    + alias2(alias1(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.title : stack1), depth0))
    + "\">"
    + alias2(alias1(((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1), depth0))
    + "</a>\n                        </span><br><br>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1;

  return "                    <span style=\"font-variant: small-caps\">api version</span>: "
    + this.escapeExpression(this.lambda(((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.version : stack1), depth0))
    + "\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "<div id=\"swagger_sidebar\">\n    <div class=\"sticky-nav-placeholder\">\n        <div class=\"sticky-nav\">\n            <div class=\"mobile-nav\">\n                <span class=\"select-label\">API Reference: </span><span data-selected-value></span>\n            </div>\n\n            <div class=\"token-generator hide\">\n                <span data-close class=\"icon-budicon-471\"></span>\n                <label for=\"input-api-token\">Url</label>\n                <input type=\"text\" autocorrect=\"off\" class=\"ui-form-control\" id=\"input_baseUrl\"\n                       placeholder=\"http://example.com/api\">\n\n                <div class=\"scope-selector\">\n                    <label for=\"scopes\">Token</label>\n\n                    <div class=\"area controls\">\n                        <input type=\"text\" autocorrect=\"off\" class=\"ui-form-control\" id=\"input_apiKey\"\n                               placeholder=\"Enter api key or token\">\n                    </div>\n\n                    <div class=\"area cta\">\n                        <div data-add-scope id=\"explore\" class=\"btn\"><span class=\"icon-budicon-519\"></span>\n                        </div>\n                    </div>\n                </div>\n\n            </div>\n            <div data-navigator>\n                <div data-resource=\"\" label=\"Tools\">\n                    <div class=\"item\" data-tg-switch=\"\">Swagger resource <span class=\"status\"></span></div>\n                </div>\n                <div id=\"resources_nav\">\n                </div>\n            </div>\n\n            <p class=\"changes-disclaimer\">\n                <span class='info' id='api_info'>\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.info : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                </span>\n\n                <span class='info' id='api_info'>\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = ((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.contact : stack1)) != null ? stack1.email : stack1),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                </span>\n\n                <span style=\"font-variant: small-caps\">base url</span>: "
    + this.escapeExpression(((helper = (helper = helpers.basePath || (depth0 != null ? depth0.basePath : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"basePath","hash":{},"data":data}) : helper)))
    + "\n"
    + ((stack1 = helpers['if'].call(depth0,((stack1 = (depth0 != null ? depth0.info : depth0)) != null ? stack1.version : stack1),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </p>\n        </div>\n    </div>\n</div>\n\n<div id='resources_container'>\n    <ul id='resources' class=\"samples-collapsed\"></ul>\n</div>\n";
},"useData":true})