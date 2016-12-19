var Handlebars = require('handlebars')

module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    return "deprecated";
},"3":function(depth0,helpers,partials,data) {
    return "                <h4>Warning: Deprecated</h4>\n";
},"5":function(depth0,helpers,partials,data) {
    var stack1, helper;

  return "                <div class=\"markdown action-summary\">"
    + ((stack1 = ((helper = (helper = helpers.description || (depth0 != null ? depth0.description : depth0)) != null ? helper : helpers.helperMissing),(typeof helper === "function" ? helper.call(depth0,{"name":"description","hash":{},"data":data}) : helper))) != null ? stack1 : "")
    + "</div>\n";
},"7":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                    <h4 data-control data-parm-toggle data-toggle=\"collapse\"\n                        data-target=\"#parm-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n                        Parameters\n                    </h4>\n\n                    <div data-content class=\"operation-params collapse in\" id=\"parm-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n                    </div>\n\n";
},"9":function(depth0,helpers,partials,data) {
    return "                        <div class=\"auth\">\n";
},"11":function(depth0,helpers,partials,data) {
    var stack1;

  return "                            <div id=\"api_information_panel\" style=\"top: 526px; left: 776px; display: none;\">\n"
    + ((stack1 = helpers.each.call(depth0,depth0,{"name":"each","hash":{},"fn":this.program(12, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "                            </div>\n";
},"12":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda;

  return "                                    <div title='"
    + ((stack1 = alias1((depth0 != null ? depth0.description : depth0), depth0)) != null ? stack1 : "")
    + "'>"
    + this.escapeExpression(alias1((depth0 != null ? depth0.scope : depth0), depth0))
    + "</div>\n";
},"14":function(depth0,helpers,partials,data) {
    return "                            <button type=\"button\" class=\"api-ic ic-off btn btn-default pull-right\">Oauth</button>\n                        </div>\n";
},"16":function(depth0,helpers,partials,data) {
    return "                        <div class=\"response-content-type\"/>\n";
},"18":function(depth0,helpers,partials,data) {
    var helper, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression;

  return "                    <div style=\"margin:0;padding:0;display:inline\"></div>\n                    <h4 data-control data-toggle=\"collapse\" data-target=\"#response-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n                        Response Messages\n                    </h4>\n\n                    <div data-content class=\"responses-wrapper collapse in\" id=\"response-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n                        <table class=\"fullwidth\">\n                            <tbody class=\"operation-status\">\n                            </tbody>\n                        </table>\n                    </div>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1, helper, options, alias1=helpers.helperMissing, alias2="function", alias3=this.escapeExpression, alias4=helpers.blockHelperMissing, buffer = 
  "<ul class='operations'>\n    <li class='"
    + alias3(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"method","hash":{},"data":data}) : helper)))
    + " operation' id='"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "'>\n        <div class='content'>\n            <div class='heading'>\n                <h2 class='operation-title'>"
    + alias3(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"summary","hash":{},"data":data}) : helper)))
    + "</h2>\n\n                <h3>\n                    <span class='http_method'>\n                        <a href='#!/"
    + alias3(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"encodedParentId","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "'>"
    + alias3(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"method","hash":{},"data":data}) : helper)))
    + "</a>\n                    </span>\n                    <span class='path'>\n                        <a href='#!/"
    + alias3(((helper = (helper = helpers.encodedParentId || (depth0 != null ? depth0.encodedParentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"encodedParentId","hash":{},"data":data}) : helper)))
    + "/"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "'\n                           class=\""
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.deprecated : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\">"
    + alias3(((helper = (helper = helpers.path || (depth0 != null ? depth0.path : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"path","hash":{},"data":data}) : helper)))
    + "</a>\n                    </span>\n                </h3>\n            </div>\n\n            <a href=\"javascript:;\" class=\"toggle-samples\" data-toggle=\"tooltip\" data-placement=\"left\"\n               data-original-title title>\n                <span class=\"text\">Show samples</span><span class=\"circle-icon\"></span>\n            </a>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.deprecated : depth0),{"name":"if","hash":{},"fn":this.program(3, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.description : depth0),{"name":"if","hash":{},"fn":this.program(5, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n\n            <form accept-charset=\"UTF-8\" class=\"sandbox\">\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.parameters : depth0),{"name":"if","hash":{},"fn":this.program(7, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                <h4 data-control data-toggle=\"collapse\" data-target=\"#test-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n                    Test this endpoint\n                </h4>\n\n                <div id=\"test-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n                    <div class=\"sandbox_header collapse in\" data-content>\n                        <input class=\"submit btn btn-primary\" name=\"commit\" type=\"submit\" value=\"Try\"\n                               data-target=\"#get_clients-modal-request\">\n                        <a href=\"#\" class=\"response_hider hide\" style=\"display: inline;\">Hide Response</a>\n                        <!--small class=\"curl-copy-message hide\" style=\"display:none;\">Copied to clipboard</small-->\n                        <!--span class=\"response_throbber hide\" style=\"display: none;\"></span-->\n\n";
  stack1 = ((helper = (helper = helpers.oauth || (depth0 != null ? depth0.oauth : depth0)) != null ? helper : alias1),(options={"name":"oauth","hash":{},"fn":this.program(9, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.oauth) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  buffer += "\n"
    + ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.oauth : depth0),{"name":"each","hash":{},"fn":this.program(11, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n";
  stack1 = ((helper = (helper = helpers.oauth || (depth0 != null ? depth0.oauth : depth0)) != null ? helper : alias1),(options={"name":"oauth","hash":{},"fn":this.program(14, data, 0),"inverse":this.noop,"data":data}),(typeof helper === alias2 ? helper.call(depth0,options) : helper));
  if (!helpers.oauth) { stack1 = alias4.call(depth0,stack1,options)}
  if (stack1 != null) { buffer += stack1; }
  return buffer + "\n                    </div>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.type : depth0),{"name":"if","hash":{},"fn":this.program(16, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "\n                </div>\n\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.responseMessages : depth0),{"name":"if","hash":{},"fn":this.program(18, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "")
    + "            </form>\n\n        </div>\n\n        <div class=\"samples\">\n                <span class=\"model-signature\">\n                </span>\n        </div>\n\n        <div class=\"modal\" id=\"modal-"
    + alias3(((helper = (helper = helpers.parentId || (depth0 != null ? depth0.parentId : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"parentId","hash":{},"data":data}) : helper)))
    + "_"
    + alias3(((helper = (helper = helpers.nickname || (depth0 != null ? depth0.nickname : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"nickname","hash":{},"data":data}) : helper)))
    + "\">\n            <div class=\"modal-dialog\">\n                <div class=\"modal-content\">\n                    <div class=\"modal-header\">\n                        <button type=\"button\" class=\"close\" data-dismiss=\"modal\" aria-label=\"Close\">\n                            <span aria-hidden=\"true\">×</span>\n                        </button>\n                        <h3 class=\"modal-title\">\n                            "
    + alias3(((helper = (helper = helpers.summary || (depth0 != null ? depth0.summary : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"summary","hash":{},"data":data}) : helper)))
    + "\n                            <span class=\"http_method\">\n                                <span class=\"text\">\n                                    "
    + alias3(((helper = (helper = helpers.method || (depth0 != null ? depth0.method : depth0)) != null ? helper : alias1),(typeof helper === alias2 ? helper.call(depth0,{"name":"method","hash":{},"data":data}) : helper)))
    + "\n                                </span>\n                            </span>\n                        </h3>\n                    </div>\n                    <div class=\"modal-body\">\n                        <div class='response'>\n                            <h5>Request URL</h5>\n\n                            <div class='block request_url'></div>\n                            <h5>Response Body</h5>\n\n                            <div class='block response_body'></div>\n                            <h5>Response Code</h5>\n\n                            <div class='block response_code'></div>\n                            <h5>Response Headers</h5>\n\n                            <div class='block response_headers'></div>\n                        </div>\n                    </div>\n                </div>\n            </div>\n        </div>\n    </li>\n</ul>";
},"useData":true})