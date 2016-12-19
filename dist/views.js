'use strict';

SwaggerUi.Views.ApiKeyButton = Backbone.View.extend({ // TODO: append this to global SwaggerUi

  events:{
    'click #apikey_button' : 'toggleApiKeyContainer',
    'click #apply_api_key' : 'applyApiKey'
  },

  initialize: function(opts){
    this.options = opts || {};
    this.router = this.options.router;
  },

  render: function(){
    var template = this.template();
    $(this.el).html(template(this.model));

    return this;
  },


  applyApiKey: function(){
    var keyAuth = new SwaggerClient.ApiKeyAuthorization(
      this.model.name,
      $('#input_apiKey_entry').val(),
      this.model.in
    );
    this.router.api.clientAuthorizations.add(this.model.name, keyAuth);
    this.router.load();
    $('#apikey_container').show();
  },

  toggleApiKeyContainer: function(){
    if ($('#apikey_container').length) {

      var elem = $('#apikey_container').first();

      if (elem.is(':visible')){
        elem.hide();
      } else {

        // hide others
        $('.auth_container').hide();
        elem.show();
      }
    }
  },

  template: function(){
    return require('./template/apikey_button_view');
  }

});
'use strict';

SwaggerUi.Views.BasicAuthButton = Backbone.View.extend({


  initialize: function (opts) {
    this.options = opts || {};
    this.router = this.options.router;
  },

  render: function(){
    var template = this.template();
    $(this.el).html(template(this.model));

    return this;
  },

  events: {
    'click #basic_auth_button' : 'togglePasswordContainer',
    'click #apply_basic_auth' : 'applyPassword'
  },

  applyPassword: function(){
    var username = $('.input_username').val();
    var password = $('.input_password').val();
    var basicAuth = new SwaggerClient.PasswordAuthorization('basic', username, password);
    this.router.api.clientAuthorizations.add(this.model.type, basicAuth);
    this.router.load();
    $('#basic_auth_container').hide();
  },

  togglePasswordContainer: function(){
    if ($('#basic_auth_container').length) {
      var elem = $('#basic_auth_container').show();
      if (elem.is(':visible')){
        elem.slideUp();
      } else {
        // hide others
        $('.auth_container').hide();
        elem.show();
      }
    }
  },

  template: function(){
    return require('./template/basic_auth_button_view');
  }

});
'use strict';

SwaggerUi.Views.ContentTypeView = Backbone.View.extend({
  initialize: function() {},

  render: function(){
    $(this.el).html(require('./template/content_type')(this.model));

    $('label[for=contentType]', $(this.el)).text('Response Content Type');

    return this;
  }
});
'use strict';

SwaggerUi.Views.HeaderView = Backbone.View.extend({
  events: {
    'click #show-pet-store-icon'    : 'showPetStore',
    'click #show-wordnik-dev-icon'  : 'showWordnikDev',
    'click #explore'                : 'showCustom',
    'keyup #input_baseUrl'          : 'showCustomOnKeyup',
    'keyup #input_apiKey'           : 'showCustomOnKeyup'
  },

  initialize: function(){},

  showPetStore: function(){
    this.trigger('update-swagger-ui', {
      url:'http://petstore.swagger.io/v2/swagger.json'
    });
  },

  showWordnikDev: function(){
    this.trigger('update-swagger-ui', {
      url: 'http://api.wordnik.com/v4/resources.json'
    });
  },

  showCustomOnKeyup: function(e){
    if (e.keyCode === 13) {
      this.showCustom();
    }
  },

  showCustom: function(e){
    if (e) {
      e.preventDefault();
    }

    this.trigger('update-swagger-ui', {
      url: $('#input_baseUrl').val(),
      apiKey: $('#input_apiKey').val()
    });
  },

  update: function(url, apiKey, trigger){
    if (trigger === undefined) {
      trigger = false;
    }

    $('#input_baseUrl').val(url);

    $('#input_apiKey').val(apiKey);
    if (trigger) {
      this.trigger('update-swagger-ui', {url:url});
    }
  }
});

'use strict';

SwaggerUi.Views.MainView = Backbone.View.extend({

  events: {
    'click .mobile-nav, [data-navigator]': 'clickSidebarNav',
    'click [data-resource]': 'clickResource',
    'click [data-tg-switch]': 'toggleToken',
    'click [data-close]': 'closeToken',
    'click #explore' : 'showCustom'
  },

  apisSorter: {
    alpha: function (a, b) {
      return a.name.localeCompare(b.name);
    }
  },
  operationsSorters: {
    alpha: function (a, b) {
      return a.path.localeCompare(b.path);
    },
    method: function (a, b) {
      return a.method.localeCompare(b.method);
    }
  },
  initialize: function (opts) {
    var sorterOption, sorterFn, key, value;
    opts = opts || {};

    this.router = opts.router;

    // Sort APIs
    if (opts.swaggerOptions.apisSorter) {
      sorterOption = opts.swaggerOptions.apisSorter;
      if (_.isFunction(sorterOption)) {
        sorterFn = sorterOption;
      } else {
        sorterFn = this.apisSorter[sorterOption];
      }
      if (_.isFunction(sorterFn)) {
        this.model.apisArray.sort(sorterFn);
      }
    }
    // Sort operations of each API
    if (opts.swaggerOptions.operationsSorter) {
      sorterOption = opts.swaggerOptions.operationsSorter;
      if (_.isFunction(sorterOption)) {
        sorterFn = sorterOption;
      } else {
        sorterFn = this.operationsSorters[sorterOption];
      }
      if (_.isFunction(sorterFn)) {
        for (key in this.model.apisArray) {
          this.model.apisArray[key].operationsArray.sort(sorterFn);
        }
      }
    }

    // set up the UI for input
    this.model.auths = [];

    for (key in this.model.securityDefinitions) {
      value = this.model.securityDefinitions[key];

      this.model.auths.push({
        name: key,
        type: value.type,
        value: value
      });
    }

    if (this.model.swaggerVersion === '2.0') {
      if ('validatorUrl' in opts.swaggerOptions) {

        // Validator URL specified explicitly
        this.model.validatorUrl = opts.swaggerOptions.validatorUrl;

      } else if (this.model.url.indexOf('localhost') > 0) {

        // Localhost override
        this.model.validatorUrl = null;

      } else {

        // Default validator
        this.model.validatorUrl = window.location.protocol + '//online.swagger.io/validator';
      }
    }
    // JSonEditor requires type='object' to be present on defined types, we add it if it's missing
    // is there any valid case were it should not be added ?
    var def;
    for(def in this.model.definitions){
      if (!this.model.definitions[def].type){
        this.model.definitions[def].type = 'object';
      }
    }
  },

  render: function () {
    if (this.model.securityDefinitions) {
      for (var name in this.model.securityDefinitions) {
        var auth = this.model.securityDefinitions[name];
        var button;

        if (auth.type === 'apiKey' && $('#apikey_button').length === 0) {
          button = new SwaggerUi.Views.ApiKeyButton({model: auth, router: this.router}).render().el;
          $('.auth_main_container').append(button);
        }

        if (auth.type === 'basicAuth' && $('#basic_auth_button').length === 0) {
          button = new SwaggerUi.Views.BasicAuthButton({model: auth, router: this.router}).render().el;
          $('.auth_main_container').append(button);
        }
      }
    }

    // Render the outer container for resources
    $(this.el).html(require('./template/main')(this.model));

    // Render each resource

    var resources = {};
    var counter = 0;
    for (var i = 0; i < this.model.apisArray.length; i++) {
      var resource = this.model.apisArray[i];
      var id = resource.name;
      while (typeof resources[id] !== 'undefined') {
        id = id + '_' + counter;
        counter += 1;
      }
      resource.id = id;
      resources[id] = resource;
      resource.nmbr = i;

      this.addResource(resource, this.model.auths);
      this.addSidebarHeader(resource, i);
    }

    $('.propWrap').hover(function onHover() {
      $('.optionsWrapper', $(this)).show();
    }, function offhover() {
      $('.optionsWrapper', $(this)).hide();
    });

    if (window.location.hash.length === 0 ) {
      var n = $(this.el).find("#resources_nav [data-resource]").first();
      n.trigger("click");
      $(window).scrollTop(0)
    }

    return this;
  },

  addResource: function (resource, auths) {
    // Render a resource and add it to resources li
    resource.id = resource.id.replace(/\s/g, '_');

    // Make all definitions available at the root of the resource so that they can
    // be loaded by the JSonEditor
    resource.definitions = this.model.definitions;
    var resourceView = new SwaggerUi.Views.ResourceView({
      model: resource,
      router: this.router,
      tagName: 'li',
      id: 'resource_' + resource.id,
      className: 'resource',
      auths: auths,
      swaggerOptions: this.options.swaggerOptions
    });
    $('#resources').append(resourceView.render().el);
  },

  addSidebarToken: function (resource, i) {
    resource.id = resource.id.replace(/\s/g, '_');
    var sidebarView = new SwaggerUi.Views.SidebarHeaderView({
      model: resource,
      tagName: 'div',
      className: function () {
        return i == 0 ? 'active' : ''
      },
      attributes: {
        "data-resource": 'resource_' + resource.name,
        "label": resource.name
      },
      router: this.router,
      swaggerOptions: this.options.swaggerOptions
    });
    $('#token-generator', $(this.el)).append(sidebarView.render().el);
  },


  addSidebarHeader: function (resource, i) {
    resource.id = resource.id.replace(/\s/g, '_');
    var sidebarView = new SwaggerUi.Views.SidebarHeaderView({
      model: resource,
      tagName: 'div',
      className: function () {
        return i == 0 ? 'active' : ''
      },
      attributes: {
        "data-resource": 'resource_' + resource.name,
        "label": resource.name
      },
      router: this.router,
      swaggerOptions: this.options.swaggerOptions
    });
    $('#resources_nav', $(this.el)).append(sidebarView.render().el);
  },

  clear: function () {
    $(this.el).html('');
  },

  clickSidebarNav: function (e) {
    $('.sticky-nav').toggleClass("nav-open")
  },

  clickResource: function (e) {
    if (!$(e.target).is(".item")) {
      var n = $(e.target).find(".item").first();
      $('.sticky-nav').find("[data-resource].active").removeClass("active");
      $(e.target).find("[data-resource]").first().addClass("active");
      n.trigger("click")
    }
  },

  toggleToken: function (e) {
    var t = $(".token-generator"),
      tg = $("[data-tg-switch]");

    t.toggleClass("hide");
    t.hasClass("hide") ? tg.removeClass("active") : tg.addClass("active");
    t.parents(".sticky-nav").trigger("mobile_nav:update")
  },

  closeToken: function (e) {
    var t = $(".token-generator"),
      tg = $("[data-tg-switch]");

    t.addClass("hide");
    tg.removeClass("active");
    t.parents(".sticky-nav").trigger("mobile_nav:update")
  },

  openToken: function (e) {
    var t = $(".token-generator"),
      tg = $("[data-tg-switch]");

    t.removeClass("hide");
    tg.removeClass("active");
    t.parents(".sticky-nav").trigger("mobile_nav:update")
  },

  showCustom: function(e){
    if (e) {
      e.preventDefault();
    }
    this.trigger('update-swagger-ui', {
      url: $('#input_baseUrl').val(),
      apiKey: $('#input_apiKey').val()
    });
  }
});

'use strict';

SwaggerUi.Views.OperationView = Backbone.View.extend({
  invocationUrl: null,

  events: {
    'submit .sandbox': 'submitOperation',
    'click .submit': 'submitOperation',
    'click  a.toggle-samples': 'toggleSamples'
//    'mouseenter .api-ic': 'mouseEnter',
//    'mouseout .api-ic': 'mouseExit'
  },

  initialize: function (opts) {
    opts = opts || {};
    this.router = opts.router;
    this.auths = opts.auths;
    this.parentId = this.model.parentId;
    this.nickname = this.model.nickname;
    this.model.encodedParentId = encodeURIComponent(this.parentId);
    return this;
  },

  mouseEnter: function (e) {
    var elem = $(this.el).find('.content');
    var x = e.pageX;
    var y = e.pageY;
    var scX = $(window).scrollLeft();
    var scY = $(window).scrollTop();
    var scMaxX = scX + $(window).width();
    var scMaxY = scY + $(window).height();
    var wd = elem.width();
    var hgh = elem.height();

    if (x + wd > scMaxX) {
      x = scMaxX - wd;
    }

    if (x < scX) {
      x = scX;
    }

    if (y + hgh > scMaxY) {
      y = scMaxY - hgh;
    }

    if (y < scY) {
      y = scY;
    }

    var pos = {};
    pos.top = y;
    pos.left = x;
    elem.css(pos);
    $(e.currentTarget.parentNode).find('#api_information_panel').show();
  },

  mouseExit: function (e) {
    $(e.currentTarget.parentNode).find('#api_information_panel').hide();
  },

  // Note: copied from CoffeeScript compiled file
  // TODO: redactor
  render: function () {
    var a, auth, auths, code, contentTypeModel, isMethodSubmissionSupported, k, key, l, len, len1, len2, len3, len4, m, modelAuths, n, o, p, param, q, ref, ref1, ref2, ref3, ref4, ref5, responseContentTypeView, responseSignatureView, schema, schemaObj, scopeIndex, signatureModel, statusCode, successResponse, type, v, value;
    isMethodSubmissionSupported = jQuery.inArray(this.model.method, this.model.supportedSubmitMethods()) >= 0;
    if (!isMethodSubmissionSupported) {
      this.model.isReadOnly = true;
    }
    this.model.description = this.model.description || this.model.notes;
    this.model.oauth = null;

    modelAuths = this.model.authorizations || this.model.security;

    if (modelAuths) {
      if (Array.isArray(modelAuths)) {
        for (l = 0, len = modelAuths.length; l < len; l++) {
          auths = modelAuths[l];
          for (key in auths) {
            auth = auths[key];
            for (a in this.auths) {
              auth = this.auths[a];
              if (auth.type === 'oauth2') {
                this.model.oauth = {};
                this.model.oauth.scopes = [];
                ref1 = auth.value.scopes;
                for (k in ref1) {
                  v = ref1[k];
                  scopeIndex = auths[key].indexOf(k);
                  if (scopeIndex >= 0) {
                    o = {
                      scope: k,
                      description: v
                    };
                    this.model.oauth.scopes.push(o);
                  }
                }
              }
            }
          }
        }
      } else {
        for (k in modelAuths) {
          v = modelAuths[k];
          if (k === 'oauth2') {
            if (this.model.oauth === null) {
              this.model.oauth = {};
            }
            if (this.model.oauth.scopes === void 0) {
              this.model.oauth.scopes = [];
            }
            for (m = 0, len1 = v.length; m < len1; m++) {
              o = v[m];
              this.model.oauth.scopes.push(o);
            }
          }
        }
      }
    }

    if (typeof this.model.responses !== 'undefined') {
      this.model.responseMessages = [];
      ref2 = this.model.responses;
      for (code in ref2) {
        value = ref2[code];
        schema = null;
        schemaObj = this.model.responses[code].schema;
        if (schemaObj && schemaObj.$ref) {
          schema = schemaObj.$ref;
          if (schema.indexOf('#/definitions/') === 0) {
            schema = schema.substring('#/definitions/'.length);
          }
        }
        this.model.responseMessages.push({
          code: code,
          message: value.description,
          responseModel: schema
        });
      }
    }
    if (typeof this.model.responseMessages === 'undefined') {
      this.model.responseMessages = [];
    }
    signatureModel = null;
    if (this.model.successResponse) {
      successResponse = this.model.successResponse;
      for (key in successResponse) {
        value = successResponse[key];
        this.model.successCode = key;
        if (typeof value === 'object' && typeof value.createJSONSample === 'function') {
          signatureModel = {
            sampleJSON: JSON.stringify(value.createJSONSample(), void 0, 2),
            isParam: false,
            signature: value.getMockSignature(),
            type: "Response",
            id: this.parentId + '_' + this.nickname + '_succes'
          };
        }
      }
    } else if (this.model.responseClassSignature && this.model.responseClassSignature !== 'string') {
      signatureModel = {
        sampleJSON: this.model.responseSampleJSON,
        isParam: false,
        signature: this.model.responseClassSignature,
        type: "Response",
        id: this.parentId + '_' + this.nickname
      };
    }

    contentTypeModel = {
      isParam: false
    };
    contentTypeModel.consumes = this.model.consumes;
    contentTypeModel.produces = this.model.produces;

    $(this.el).html(require('./template/operation')(this.model));

    ref4 = this.model.parameters;
    for (p = 0, len3 = ref4.length; p < len3; p++) {
      param = ref4[p];
      this.addParameter(param, contentTypeModel.consumes);
      if (param.paramType === 'body' || param.in === 'body') {
        this.addBodyModel(param)
      }
    }
    if (signatureModel) {
      responseSignatureView = new SwaggerUi.Views.SignatureView({
        model: signatureModel,
        router: this.router,
        tagName: 'div',
        type: "Response",
        id: this.parentId + '_' + this.nickname + '_response'
      });
      $('.model-signature', $(this.el)).append(responseSignatureView.render().el);
    } else {
      this.model.responseClassSignature = 'string';
      $('.model-signature', $(this.el)).append(this.model.type);
    }

    ref3 = this.model.parameters;
    for (n = 0, len2 = ref3.length; n < len2; n++) {
      param = ref3[n];
      type = param.type || param.dataType || '';
      if (typeof type === 'undefined') {
        schema = param.schema;
        if (schema && schema.$ref) {
          ref = schema.$ref;
          if (ref.indexOf('#/definitions/') === 0) {
            type = ref.substring('#/definitions/'.length);
          } else {
            type = ref;
          }
        }
      }
      if (type && type.toLowerCase() === 'file') {
        if (!contentTypeModel.consumes) {
          contentTypeModel.consumes = 'multipart/form-data';
        }
      }
      param.type = type;
    }
    responseContentTypeView = new SwaggerUi.Views.ResponseContentTypeView({
      model: contentTypeModel,
      router: this.router
    });

    $('.response-content-type', $(this.el)).append(responseContentTypeView.render().el);

    ref5 = this.model.responseMessages;
    for (q = 0, len4 = ref5.length; q < len4; q++) {
      statusCode = ref5[q];
      this.addStatusCode(statusCode);
    }

    return this;
  },

  addBodyModel: function (param) {
    if (param.type === 'file') return;

    var bodySample = {
      sampleJSON: param.sampleJSON,
      isParam: true,
      signature: param.signature,
      type: "Body",
      id: this.parentId + '_' + this.nickname + '_body'
    };
    var signatureView = new SwaggerUi.Views.SignatureView({model: bodySample, tagName: 'div'});
    $('.model-signature', $(this.el)).append(signatureView.render().el);
  },


  addParameter: function (param, consumes) {
    // Render a parameter
    param.consumes = consumes;
    // Copy this param JSON spec so that it will be available for JsonEditor
    if(param.schema){
      $.extend(true, param.schema, this.model.definitions[param.type]);
      param.schema.definitions = this.model.definitions;
      // This is required for JsonEditor to display the root properly
      if(!param.schema.type){
        param.schema.type = 'object';
      }
      // This is the title that will be used by JsonEditor for the root
      // Since we already display the parameter's name in the Parameter column
      // We set this to space, we can't set it to null or space otherwise JsonEditor
      // will replace it with the text "root" which won't look good on screen
      if(!param.schema.title){
        param.schema.title = ' ';
      }
    }
    var paramView = new SwaggerUi.Views.ParameterView({
      model: param,
      tagName: 'div',
      className: 'parameter-item',
      readOnly: this.model.isReadOnly,
      swaggerOptions: this.options.swaggerOptions
  });
    $('.operation-params', $(this.el)).append(paramView.render().el);
  },

  addStatusCode: function (statusCode) {
    // Render status codes
    var statusCodeView = new SwaggerUi.Views.StatusCodeView({
      model: statusCode,
      tagName: 'tr',
      router: this.router
    });
    $('.operation-status', $(this.el)).append(statusCodeView.render().el);
  },

  // Note: copied from CoffeeScript compiled file
  // TODO: redactor
  submitOperation: function (e) {
    var error_free, form, isFileUpload, l, len, len1, len2, m, map, n, o, opts, ref1, ref2, ref3, val;
    if (e !== null) {
      e.preventDefault();
    }
    form = $('.sandbox', $(this.el));
    error_free = true;
    form.find('input.required:visible').each(function () {
      $(this).removeClass('error');
      if (jQuery.trim($(this).val()) === '') {
        $(this).addClass('error');
        $(this).wiggle({
          callback: (function (_this) {
            return function () {
              $(_this).focus();
            };
          })(this)
        });
        error_free = false;
      }
    });
    form.find('textarea.required').each(function () {
      $(this).removeClass('error');
      if (jQuery.trim($(this).val()) === '') {
        $(this).addClass('error');
        $(this).wiggle({
          callback: (function (_this) {
            return function () {
              return $(_this).focus();
            };
          })(this)
        });
        error_free = false;
      }
    });
    if (error_free) {
      map = {};
      opts = {
        parent: this
      };
      isFileUpload = false;
      ref1 = form.find('input');
      for (l = 0, len = ref1.length; l < len; l++) {
        o = ref1[l];
        if ((o.value !== null) && jQuery.trim(o.value).length > 0) {
          map[o.name] = o.value;
        }
        if (o.type === 'file') {
          map[o.name] = o.files[0];
          isFileUpload = true;
        }
      }
      ref2 = form.find('textarea');
      for (m = 0, len1 = ref2.length; m < len1; m++) {
        o = ref2[m];
        if ((o.value !== null) && jQuery.trim(o.value).length > 0) {
          map[o.name] = o.value;
        }
      }
      ref3 = form.find('select');
      for (n = 0, len2 = ref3.length; n < len2; n++) {
        o = ref3[n];
        val = this.getSelectedValue(o);
        if ((val !== null) && jQuery.trim(val).length > 0) {
          map[o.name] = val;
        }
      }
      var pi;
      for(pi = 0; pi < this.model.parameters.length; pi++){
        var p = this.model.parameters[pi];
        if( p.jsonEditor && p.jsonEditor.isEnabled()){
          var json = p.jsonEditor.getValue();
          map[p.name] = JSON.stringify(json);
        }
      }
      opts.responseContentType = $('div select[name=responseContentType]', $(this.el)).val();
      opts.requestContentType = $('div select[name=parameterContentType]', $(this.el)).val();
      $(".submit", $(this.el)).button("loading");
      if (isFileUpload) {
        return this.handleFileUpload(map, form);
      } else {
        return this.model['do'](map, opts, this.showCompleteStatus, this.showErrorStatus, this);
      }
    }
  },

  success: function (response, parent) {
    parent.showCompleteStatus(response);
  },

  // Note: This is compiled code
  // TODO: Refactor
  handleFileUpload: function (map, form) {
    var bodyParam, el, headerParams, l, len, len1, len2, len3, m, n, o, p, param, params, ref1, ref2, ref3, ref4;
    ref1 = form.serializeArray();
    for (l = 0, len = ref1.length; l < len; l++) {
      o = ref1[l];
      if ((o.value !== null) && jQuery.trim(o.value).length > 0) {
        map[o.name] = o.value;
      }
    }
    bodyParam = new FormData();
    params = 0;
    ref2 = this.model.parameters;
    for (m = 0, len1 = ref2.length; m < len1; m++) {
      param = ref2[m];
      if (param.paramType === 'form' || param['in'] === 'formData') {
        if (param.type.toLowerCase() !== 'file' && map[param.name] !== void 0) {
          bodyParam.append(param.name, map[param.name]);
        }
      }
    }
    headerParams = {};
    ref3 = this.model.parameters;
    for (n = 0, len2 = ref3.length; n < len2; n++) {
      param = ref3[n];
      if (param.paramType === 'header') {
        headerParams[param.name] = map[param.name];
      }
    }
    ref4 = form.find('input[type~="file"]');
    for (p = 0, len3 = ref4.length; p < len3; p++) {
      el = ref4[p];
      if (typeof el.files[0] !== 'undefined') {
        bodyParam.append($(el).attr('name'), el.files[0]);
        params += 1;
      }
    }
    this.invocationUrl = this.model.supportHeaderParams() ? (headerParams = this.model.getHeaderParams(map), delete headerParams['Content-Type'], this.model.urlify(map, false)) : this.model.urlify(map, true);
    $('.request_url', $(this.el)).html('<pre></pre>');
    $('.request_url pre', $(this.el)).text(this.invocationUrl);

    var clientAuths = window.swaggerUi.api.clientAuthorizations;
    if (typeof clientAuths !== 'undefined' && typeof(clientAuths.authz) !== 'undefined') {
      _.forEach(clientAuths.authz, function(auth, key) {
        if (auth.type == 'header') {
          headerParams[auth.name] = auth.value;
        }
      });
    }

    // TODO: don't use jQuery. Use SwaggerJS for handling the call.
    var obj = {
      type: this.model.method,
      url: this.invocationUrl,
      headers: headerParams,
      data: bodyParam,
      dataType: 'json',
      contentType: false,
      processData: false,
      error: (function (_this) {
        return function (data) {
          return _this.showErrorStatus(_this.wrap(data), _this);
        };
      })(this),
      success: (function (_this) {
        return function (data) {
          return _this.showResponse(data, _this);
        };
      })(this),
      complete: (function (_this) {
        return function (data) {
          return _this.showCompleteStatus(_this.wrap(data), _this);
        };
      })(this)
    };
    jQuery.ajax(obj);
    return false;
    // end of file-upload nastiness
  },
  // wraps a jquery response as a shred response

  wrap: function (data) {
    var h, headerArray, headers, i, l, len, o;
    headers = {};
    headerArray = data.getAllResponseHeaders().split('\r');
    for (l = 0, len = headerArray.length; l < len; l++) {
      i = headerArray[l];
      h = i.match(/^([^:]*?):(.*)$/);
      if (!h) {
        h = [];
      }
      h.shift();
      if (h[0] !== void 0 && h[1] !== void 0) {
        headers[h[0].trim()] = h[1].trim();
      }
    }
    o = {};
    o.content = {};
    o.content.data = data.responseText;
    o.headers = headers;
    o.request = {};
    o.request.url = this.invocationUrl;
    o.status = data.status;
    return o;
  },

  getSelectedValue: function (select) {
    if (!select.multiple) {
      return select.value;
    } else {
      var options = [];
      for (var l = 0, len = select.options.length; l < len; l++) {
        var opt = select.options[l];
        if (opt.selected) {
          options.push(opt.value);
        }
      }
      if (options.length > 0) {
        return options;
      } else {
        return null;
      }
    }
  },

  // Show response from server
  showResponse: function (response) {
    var prettyJson = JSON.stringify(response, null, '\t').replace(/\n/g, '<br>');
    $('.response_body', $(this.el)).html(_.escape(prettyJson));
  },

  // Show error from server
  showErrorStatus: function (data, parent) {
    $('#modal-' + parent.parentId + '_' + parent.nickname).modal();
    parent.showStatus(data);
  },

  // show the status codes
  showCompleteStatus: function (data, parent) {
    $('#modal-' + parent.parentId + '_' + parent.nickname).modal();
    parent.showStatus(data);
  },

  // Adapted from http://stackoverflow.com/a/2893259/454004
  // Note: directly ported from CoffeeScript
  // TODO: Cleanup CoffeeScript artifacts
  formatXml: function (xml) {
    var contexp, fn, formatted, indent, l, lastType, len, lines, ln, pad, reg, transitions, wsexp;
    reg = /(>)(<)(\/*)/g;
    wsexp = /[ ]*(.*)[ ]+\n/g;
    contexp = /(<.+>)(.+\n)/g;
    xml = xml.replace(reg, '$1\n$2$3').replace(wsexp, '$1\n').replace(contexp, '$1\n$2');
    pad = 0;
    formatted = '';
    lines = xml.split('\n');
    indent = 0;
    lastType = 'other';
    transitions = {
      'single->single': 0,
      'single->closing': -1,
      'single->opening': 0,
      'single->other': 0,
      'closing->single': 0,
      'closing->closing': -1,
      'closing->opening': 0,
      'closing->other': 0,
      'opening->single': 1,
      'opening->closing': 0,
      'opening->opening': 1,
      'opening->other': 1,
      'other->single': 0,
      'other->closing': -1,
      'other->opening': 0,
      'other->other': 0
    };
    fn = function (ln) {
      var fromTo, j, key, padding, type, types, value;
      types = {
        single: Boolean(ln.match(/<.+\/>/)),
        closing: Boolean(ln.match(/<\/.+>/)),
        opening: Boolean(ln.match(/<[^!?].*>/))
      };
      type = ((function () {
        var results;
        results = [];
        for (key in types) {
          value = types[key];
          if (value) {
            results.push(key);
          }
        }
        return results;
      })())[0];
      type = type === void 0 ? 'other' : type;
      fromTo = lastType + '->' + type;
      lastType = type;
      padding = '';
      indent += transitions[fromTo];
      padding = ((function () {
        var m, ref1, results;
        results = [];
        for (j = m = 0, ref1 = indent; 0 <= ref1 ? m < ref1 : m > ref1; j = 0 <= ref1 ? ++m : --m) {
          results.push('  ');
        }
        return results;
      })()).join('');
      if (fromTo === 'opening->closing') {
        formatted = formatted.substr(0, formatted.length - 1) + ln + '\n';
      } else {
        formatted += padding + ln + '\n';
      }
    };
    for (l = 0, len = lines.length; l < len; l++) {
      ln = lines[l];
      fn(ln);
    }
    return formatted;
  },

  // puts the response data in UI
  showStatus: function (response) {
    var url, content;
    if (response.content === undefined) {
      content = response.data;
      url = response.url;
    } else {
      content = response.content.data;
      url = response.request.url;
    }
    var headers = response.headers;

    // if server is nice, and sends content-type back, we can use it
    var contentType = null;
    if (headers) {
      contentType = headers['Content-Type'] || headers['content-type'];
      if (contentType) {
        contentType = contentType.split(';')[0].trim();
      }
    }
    $('.response_body', $(this.el)).removeClass('json');
    $('.response_body', $(this.el)).removeClass('xml');

    var supportsAudioPlayback = function (contentType) {
      var audioElement = document.createElement('audio');
      return !!(audioElement.canPlayType && audioElement.canPlayType(contentType).replace(/no/, ''));
    };

    var pre;
    var code;
    if (!content) {
      code = $('<code />').text('no content');
      pre = $('<pre class="json" />').append(code);

      // JSON
    } else if (contentType === 'application/json' || /\+json$/.test(contentType)) {
      var json = null;
      try {
        json = JSON.stringify(JSON.parse(content), null, '  ');
      } catch (_error) {
        json = 'can\'t parse JSON.  Raw result:\n\n' + content;
      }
      code = $('<code />').text(json);
      pre = $('<pre class="json" />').append(code);

      // XML
    } else if (contentType === 'application/xml' || /\+xml$/.test(contentType)) {
      code = $('<code />').text(this.formatXml(content));
      pre = $('<pre class="xml" />').append(code);

      // HTML
    } else if (contentType === 'text/html') {
      code = $('<code />').html(_.escape(content));
      pre = $('<pre class="xml" />').append(code);

      // Plain Text
    } else if (/text\/plain/.test(contentType)) {
      code = $('<code />').text(content);
      pre = $('<pre class="plain" />').append(code);


      // Image
    } else if (/^image\//.test(contentType)) {
      pre = $('<img>').attr('src', url);

      // Audio
    } else if (/^audio\//.test(contentType) && supportsAudioPlayback(contentType)) {
      pre = $('<audio controls>').append($('<source>').attr('src', url).attr('type', contentType));

      // Download
    } else if (headers['Content-Disposition'].test(/attachment/) ||
      headers['content-disposition'].test(/attachment/) ||
      headers['Content-Description'].test(/File Transfer/) ||
      headers['content-description'].test(/File Transfer/)) {

      if ('Blob' in window) {
        var type = contentType || 'text/html';
        var blob = new Blob([content], {type: type});
        var a = document.createElement('a');
        var href = window.URL.createObjectURL(blob);
        var fileName = response.url.substr(response.url.lastIndexOf('/') + 1);
        var download = [type, fileName, href].join(':');

        a.setAttribute('href', href);
        a.setAttribute('download', download);
        a.innerText = 'Download ' + fileName;

        pre = $('<div/>').append(a);
      } else {
        pre = $('<pre class="json" />').append('Download headers detected but your browser does not support downloading binary via XHR (Blob).');
      }

      // Location header based redirect download
    } else if (headers.location || headers.Location) {
      window.location = response.url;

      // Anything else (CORS)
    } else {
      code = $('<code />').text(content);
      pre = $('<pre class="json" />').append(code);
    }

    var response_body = pre;
    $('.request_url', $(this.el)).html('<pre></pre>');
    $('.request_url pre', $(this.el)).text(url);
    $('.response_code', $(this.el)).html('<pre>' + response.status + '</pre>');
    $('.response_body', $(this.el)).html(response_body);
    $('.response_headers', $(this.el)).html('<pre>' + _.escape(JSON.stringify(response.headers, null, '  ')).replace(/\n/g, '<br>') + '</pre>');
    $('.response', $(this.el)).slideDown();
    $('.response_hider', $(this.el)).show();
    $('.response_throbber', $(this.el)).hide();
    var response_body_el = $('.response_body', $(this.el))[0];

    $(".submit", $(this.el)).button("reset");

    // only highlight the response if response is less than threshold, default state is highlight response
    var opts = this.options.swaggerOptions;
    if (opts.highlightSizeThreshold && response.data.length > opts.highlightSizeThreshold) {
      return response_body_el;
    } else {
      return hljs.highlightBlock(response_body_el);
    }
  },

  toggleSamples: function (e) {
    function o(t) {
      if ("self" === t) {
        var n = $(window).scrollTop();
        return $(window).scrollTop(n)
      }
      return $(window).scrollTop(t)
    }

    var r = $("#resources"),
      n = $(e.currentTarget);

    r.toggleClass("samples-collapsed").addClass("is-collapsing");
    n.find('.text').text("Collapse samples");
    r.hasClass("samples-collapsed") && n.find('.text').text("Show samples");

    setTimeout(function () {
      var t = n.parents(".endpoint").first().offset().top;
      r.removeClass("is-collapsing");
      o(t)
    }, 500)
  }

});

'use strict';

SwaggerUi.Views.ParameterContentTypeView = Backbone.View.extend({
  initialize: function  () {},

  render: function(){
    $(this.el).html(require('./template/parameter_content_type')(this.model));

    //$('label[for=parameterContentType]', $(this.el)).text('Parameter content type:');

    return this;
  }

});
'use strict';
/*
 * [TODO] defaultProperties is not take in the required properties into consideration, this implementation respects the specs of JSON Editor v0.7.22
  {
   {
     "type": "object",
     "properties": {
     "name": {"type": "string"},
     "age": {"type": "integer"}
   },
   defaultProperties": ["name"]
  }
 */
function setDefaultProperties(obj) {
  if (obj instanceof Object) {
    for (var k in obj){
      if(obj.hasOwnProperty("type") && obj.type == "object") {
        obj.defaultProperties = obj.required ? obj.required : [];
      }
      // recursive call to setDefaultProperties
      setDefaultProperties( obj[k] );
    }
  } else {
    // not an Object, break the recursion.
  };
}

SwaggerUi.Views.ParameterView = Backbone.View.extend({
  initialize: function(){
    Handlebars.registerHelper('isArray', function(param, opts) {
      if (param.type.toLowerCase() === 'array' || param.allowMultiple) {
        opts.fn(this);
      } else {
        opts.inverse(this);
      }
    });
  },

  render: function() {
    var type = this.model.type || this.model.dataType;

    if (typeof type === 'undefined') {
      var schema = this.model.schema;
      if (schema && schema.$ref) {
        var ref = schema.$ref;
        if (ref.indexOf('#/definitions/') === 0) {
          type = ref.substring('#/definitions/'.length);
        } else {
          type = ref;
        }
      }
    }

    this.model.type = type;
    this.model.paramType = this.model.in || this.model.paramType;
    this.model.isBody = this.model.paramType === 'body' || this.model.in === 'body';
    this.model.isFile = type && type.toLowerCase() === 'file';
    this.model.default = (this.model.default || this.model.defaultValue);

    if(this.model.format === 'password') {
        this.model.inputType = 'password';
    } else {
        this.model.inputType = 'text';
    }

    if (this.model.allowableValues) {
      this.model.isList = true;
    }

    var template = this.template();
    $(this.el).html(template(this.model));

    var signatureModel = {
      sampleJSON: this.model.sampleJSON,
      isParam: true,
      signature: this.model.signature,
      defaultRendering: this.model.defaultRendering
    };

    var isParam = false;

    if( this.options.swaggerOptions.jsonEditor && this.model.isBody && this.model.schema){
      var jsonEditorOptions = this.options.swaggerOptions.jsonEditorOptions;
      var $self = $(this.el);
      if (jsonEditorOptions && jsonEditorOptions.noDefaultProperties) setDefaultProperties(this.model.schema);
      this.model.jsonEditor =
        /* global JSONEditor */
          new JSONEditor($('.editor_holder', $self)[0],
              {schema: this.model.schema, startval : this.model.default,
                ajax:true,
                disable_properties:jsonEditorOptions && jsonEditorOptions.disableProperties,
                disable_edit_json:jsonEditorOptions && jsonEditorOptions.disableEditJson,
                remove_empty_properties:jsonEditorOptions && jsonEditorOptions.removeEmptyProperties,
                iconlib: 'swagger' });
      // This is so that the signature can send back the sample to the json editor
      // TODO: SignatureView should expose an event "onSampleClicked" instead
      signatureModel.jsonEditor = this.model.jsonEditor;
      $('.body-textarea', $self).hide();
      $('.editor_holder', $self).show();
      $('.parameter-content-type', $self)
        .change(function(e){
          if(e.target.value === 'application/xml'){
            $('.body-textarea', $self).show();
            $('.editor_holder', $self).hide();
            this.model.jsonEditor.disable();
          }
          else {
            $('.body-textarea', $self).hide();
            $('.editor_holder', $self).show();
            this.model.jsonEditor.enable();
          }
        });
    }

    if (this.model.isBody) {
      isParam = true;
    }

    var contentTypeModel = {
      isParam: isParam
    };

    contentTypeModel.consumes = this.model.consumes;

    if (isParam) {
      var parameterContentTypeView = new SwaggerUi.Views.ParameterContentTypeView({model: contentTypeModel});
      $('.parameter-content-type', $(this.el)).append(parameterContentTypeView.render().el);
    }

    else {
      var responseContentTypeView = new SwaggerUi.Views.ResponseContentTypeView({model: contentTypeModel});
      $('.response-content-type', $(this.el)).append(responseContentTypeView.render().el);
    }

    return this;
  },

  // Return an appropriate template based on if the parameter is a list, readonly, required
  template: function(){
    if (this.model.isList) {
      return require('./template/param_list');
    } else {
      if (this.options.readOnly) {
        if (this.model.required) {
          return require('./template/param_readonly_required');
        } else {
          return require('./template/param_readonly');
        }
      } else {
        if (this.model.required) {
          return require('./template/param_required');
        } else {
          return require('./template/param');
        }
      }
    }
  }
});
'use strict';

SwaggerUi.Views.ResourceView = Backbone.View.extend({
  initialize: function (opts) {
    opts = opts || {};
    this.router = opts.router;
    this.auths = opts.auths;
    if ('' === this.model.description) {
      this.model.description = null;
    }
    if (this.model.description) {
      this.model.summary = this.model.description;
    }
  },

  render: function () {
    var methods = {};


    $(this.el).html(require('./template/resource')(this.model));
    // Render each operation
    for (var i = 0; i < this.model.operationsArray.length; i++) {
      var operation = this.model.operationsArray[i];
      var counter = 0;
      var id = operation.nickname;

      while (typeof methods[id] !== 'undefined') {
        id = id + '_' + counter;
        counter += 1;
      }

      methods[id] = operation;

      operation.nickname = id;
      operation.parentId = this.model.id;
      operation.definitions = this.model.definitions; // make Json Schema available for JSonEditor in this operation

      this.addOperation(operation);
    }

    return this;
  },

  addOperation: function (operation) {

    operation.number = this.number;

    // Render an operation and add it to operations li
    var operationView = new SwaggerUi.Views.OperationView({
      model: operation,
      router: this.router,
      tagName: 'li',
      className: 'endpoint',
      swaggerOptions: this.options.swaggerOptions,
      auths: this.auths
    });

    $('.endpoints', $(this.el)).append(operationView.render().el);

    this.number++;

  },

  // Generic Event handler (`Docs` is global)


  callDocs: function (fnName, e) {
    e.preventDefault();
    Docs[fnName](e.currentTarget.getAttribute('data-id'));
  }
});
'use strict';

SwaggerUi.Views.ResponseContentTypeView = Backbone.View.extend({
  initialize: function(){},

  render: function(){
    $(this.el).html(require('./template/response_content_type')(this.model));

    //$('label[for=responseContentType]', $(this.el)).text('Response Content Type');

    return this;
  }
});
'use strict';

SwaggerUi.Views.SidebarHeaderView = Backbone.View.extend({
  initialize: function (opts) {
    this.options = opts || {};
    this.router = this.options.router;
  },

  events: {
    'click [data-endpoint]': 'clickSidebarItem'
  },

  render: function () {
    $(this.el).html(require('./template/sidebar_header')(this.model));

    for (var i = 0; i < this.model.operationsArray.length; i++) {
      var item = this.model.operationsArray[i].operation;
      item.nickname = this.model.operationsArray[i].nickname;
      item.parentId = this.model.operation.parentId;
      this.addSidebarItem(item, i);
    }

    return this;
  },

  addSidebarItem: function (item, i) {
    var sidebarItemView = new SwaggerUi.Views.SidebarItemView({
      model: item,
      tagName: 'div',
      className : 'item',
      attributes: {
          "data-endpoint": item.parentId + '_' + item.nickname
      },
      router: this.router,
      swaggerOptions: this.options.swaggerOptions
    });
    $(this.el).append(sidebarItemView.render().el);
  },

  clickSidebarItem: function (e) {

    var elem = $(e.target);
    var eln = $("#" + elem.attr("data-endpoint"));

    if (elem.is(".item")) {
      scroll(elem.attr("data-endpoint"));
      setSelected(elem);
      updateUrl(eln.find(".path a").first().attr("href"))
    }

    /* scroll */
    function scroll(elem) {
      var i = $(".sticky-nav").outerHeight();
      var r = $("#" + elem).offset().top - i - 10;
      matchMedia() && (r = $("#" + elem).offset().top - 10);
      scrollT(r)
    }

    /set selected value and select operation (class) */
    function setSelected(element) {
      {
        var nav = $(".sticky-nav [data-navigator]");
        $("#" + element.attr("data-endpoint"))
      }
      nav.find("[data-resource]").removeClass("active");
      nav.find("[data-selected]").removeAttr("data-selected");
      element.closest("[data-resource]").addClass("active");
      element.attr("data-selected", "");
      $(".sticky-nav").find("[data-selected-value]").html(element.text())
    }

    /* update navigation */
    function updateUrl(element) {
      history.pushState && history.pushState(null, null, element)
    }

    function matchMedia() {
      return window.matchMedia("(min-width: 992px)").matches
    }

    function scrollT(e) {
      if ("self" === e) {
        var n = $(window).scrollTop();
        return $(window).scrollTop(n)
      }

      return $(window).scrollTop(e)
    }
  }

});
'use strict';

SwaggerUi.Views.SidebarItemView = Backbone.View.extend({

  initialize: function (opts) {
    this.options = opts || {};
    this.router = this.options.router;
  },

  render: function () {
    $(this.el).html(require('./template/sidebar_item')(this.model));
    return this;
  }

});
'use strict';

SwaggerUi.Views.SignatureView = Backbone.View.extend({
  events: {
    'mousedown .snippet': 'snippetToTextArea'
  },

  initialize: function () {
  },

  render: function () {
    $(this.el).html(require('./template/signature')(this.model));
    this.isParam = this.model.isParam;
    return this;
  },

  // handler for snippet to text area
  snippetToTextArea: function (e) {
    if (this.isParam) {
      if (e) {
        e.preventDefault();
      }

      var textArea = $('textarea', $(this.el.parentNode.parentNode.parentNode));
      if ($.trim(textArea.val()) === '') {
        textArea.val(this.model.sampleJSON);
         // TODO move this code outside of the view and expose an event instead
         if( this.model.jsonEditor && this.model.jsonEditor.isEnabled()){
            this.model.jsonEditor.setValue(JSON.parse(this.model.sampleJSON));
         }
      }
    }
  }
});
'use strict';

SwaggerUi.Views.StatusCodeView = Backbone.View.extend({
  initialize: function (opts) {
    this.options = opts || {};
    this.router = this.options.router;
  },

  render: function(){
    $(this.el).html(require('./template/status_code')(this.model));

    if (this.router.api.models.hasOwnProperty(this.model.responseModel)) {
      var responseModel = {
        sampleJSON: JSON.stringify(this.router.api.models[this.model.responseModel].createJSONSample(), null, 2),
        isParam: false,
        signature: this.router.api.models[this.model.responseModel].getMockSignature(),
      };

      var responseModelView = new SwaggerUi.Views.SignatureView({model: responseModel, tagName: 'div'});
      $('.model-signature', this.$el).append(responseModelView.render().el);
    } else {
      $('.model-signature', this.$el).html('');
    }
    return this;
  }
});