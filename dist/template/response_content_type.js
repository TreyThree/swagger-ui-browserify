var Handlebars = require('handlebars')

module.exports = Handlebars.template({"1":function(depth0,helpers,partials,data) {
    var stack1;

  return ((stack1 = helpers.each.call(depth0,(depth0 != null ? depth0.produces : depth0),{"name":"each","hash":{},"fn":this.program(2, data, 0),"inverse":this.noop,"data":data})) != null ? stack1 : "");
},"2":function(depth0,helpers,partials,data) {
    var stack1, alias1=this.lambda;

  return "                        <option value=\""
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "\">"
    + ((stack1 = alias1(depth0, depth0)) != null ? stack1 : "")
    + "</option>\n";
},"4":function(depth0,helpers,partials,data) {
    return "                    <option value=\"application/json\">application/json</option>\n";
},"compiler":[6,">= 2.0.0-beta.1"],"main":function(depth0,helpers,partials,data) {
    var stack1;

  return "<div class=\"parameter-item\">\n    <div class=\"param-property hide\" data-label=\"name\">Response Type</div>\n    <div class=\"param-property\" data-label=\"Response Type\">\n        <div>\n            <select class=\"parameter ui-form-control\" name=\"responseContentType\">\n"
    + ((stack1 = helpers['if'].call(depth0,(depth0 != null ? depth0.produces : depth0),{"name":"if","hash":{},"fn":this.program(1, data, 0),"inverse":this.program(4, data, 0),"data":data})) != null ? stack1 : "")
    + "            </select>\n        </div>\n    </div>\n</div>\n\n";
},"useData":true})