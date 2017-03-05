webpackJsonp([0,3],{

/***/ 1083:
/***/ (function(module, exports, __webpack_require__) {

module.exports = __webpack_require__(477);


/***/ }),

/***/ 125:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__web_socket_service__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__generic_http_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__models_ws_models_server_response_model__ = __webpack_require__(254);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ChatService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var ChatService = (function (_super) {
    __extends(ChatService, _super);
    // private request: Conversation;
    // private me: ConversationUser;
    // public conversation: Conversation[];
    function ChatService(weService, http) {
        var _this = this;
        _super.call(this);
        this.weService = weService;
        this.http = http;
        this.connected = false;
        // this.conversation = [];
        // this.genericAPI_url = 'http://localhost:3311/';
        // this.request = {
        //     id: '',
        //     me: null,
        //     chatters: [],
        //     subject: '',
        //     messages: [],
        //     lastResponseType: '',
        //     requestAction: ''
        // };
        // this.me = new ConversationUser();
        this.ws = this.weService.connect(this.genericWS_url)
            .map(function (response) {
            _this.connected = true;
            var serverResponseJSON = JSON.parse(response.data);
            console.log('data received');
            console.dir(serverResponseJSON);
            // Check if  server responded correctly with JSON
            if (!serverResponseJSON) {
                return null;
            }
            if (serverResponseJSON.type === 'handshake') {
                var serverResponse = new __WEBPACK_IMPORTED_MODULE_5__models_ws_models_server_response_model__["a" /* ServerResponse */]();
                serverResponse.type = 'handshake';
                return serverResponse;
            }
            if (serverResponseJSON.type === 'GET') {
                var serverResponse = new __WEBPACK_IMPORTED_MODULE_5__models_ws_models_server_response_model__["a" /* ServerResponse */]();
                serverResponse.type = 'GET';
                serverResponse.status = serverResponseJSON.status;
                serverResponse.message = serverResponseJSON.message;
                serverResponse.data = serverResponseJSON.data;
                serverResponse.dataType = serverResponseJSON.dataType;
                return serverResponse;
            }
            if (serverResponseJSON.type === 'UpdateMessage') {
                var serverResponse = new __WEBPACK_IMPORTED_MODULE_5__models_ws_models_server_response_model__["a" /* ServerResponse */]();
                serverResponse.type = serverResponseJSON.type;
                serverResponse.status = serverResponseJSON.status;
                serverResponse.message = serverResponseJSON.message;
                serverResponse.data = serverResponseJSON.data;
                serverResponse.dataType = serverResponseJSON.dataType;
                return serverResponse;
            }
        });
        this.ws.subscribe(function (response) {
            console.log('global subscribe');
        });
    }
    ChatService.prototype.getConversationList = function () {
        console.log('Requesting Conversation List.....');
        var request = new __WEBPACK_IMPORTED_MODULE_5__models_ws_models_server_response_model__["a" /* ServerResponse */]();
        request.type = 'GetConversationList';
        request.sender = this.getMyId();
        this.ws.next(request);
    };
    ChatService.prototype.getMyId = function () {
        if (localStorage.getItem('currentUser')) {
            var user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) {
                return '';
            }
            if (!user._id) {
                return '';
            }
            return user._id;
        }
        else {
            return '';
        }
    };
    // private initializeMe() {
    //     let user = JSON.parse(localStorage.getItem('currentUser'));
    //     if (user) {
    //         this.me.fName = user.fName;
    //         this.me.lName = user.lName;
    //         this.me.id = user._id;
    //         this.me.status = '';
    //     } else {
    //         // Router.redirect
    //     }
    // }
    ChatService.prototype.startConversation = function (candidateId, subjectJobId, senderId) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.genericAPI_url + '/messenger/startconversation', { candidate: candidateId, subjectJob: subjectJobId, sender: senderId }, options)
            .map(this.startConversationDataExtractor)
            .catch(this.handleError);
    };
    ChatService.prototype.startConversationDataExtractor = function (res) {
        var body = res.json();
        var conversationId = '';
        if (body.conversation) {
            conversationId = body.conversation.conversationId;
        }
        return conversationId;
    };
    ChatService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Rx__["Observable"].throw(errMsg);
    };
    ChatService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__web_socket_service__["a" /* WebSocketService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__web_socket_service__["a" /* WebSocketService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _b) || Object])
    ], ChatService);
    return ChatService;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_4__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/chat.service.js.map

/***/ }),

/***/ 126:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobPost; });
var JobPost = (function () {
    function JobPost() {
        this.id = '';
        this.jobCategory = '';
        this.jobSubCategory = '';
        this.owner = '';
        this.jobTitle = '';
        this.jobDescription = '';
        this.deadline = '';
        this.budget = '';
        this.paymentType = '';
        this.projectType = '';
        this.status = '';
        this.requirements = [];
        this.candidates = [];
        this.imageURLList = [];
        this.atachmentList = [];
        this.currency = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.proposals = [];
    }
    return JobPost;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/job.js.map

/***/ }),

/***/ 177:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Chatter; });
var Chatter = (function () {
    function Chatter() {
        this.Id = '';
        this.fName = '';
        this.lName = '';
    }
    return Chatter;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/chatter.model.js.map

/***/ }),

/***/ 250:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_http_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_job_category__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_job__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_duration__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__models_currency__ = __webpack_require__(252);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};











var GenericService = (function (_super) {
    __extends(GenericService, _super);
    function GenericService(http) {
        _super.call(this);
        this.http = http;
    }
    GenericService.prototype.getCategoryList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.genericAPI_url + '/category')
            .map(this.extractData)
            .catch(this.handleError);
    };
    GenericService.prototype.extractData = function (res) {
        console.log('response for Get Category......');
        //console.dir(res);
        var body = res.json();
        console.dir(body);
        var categoryList = [];
        for (var _i = 0, _a = body.category; _i < _a.length; _i++) {
            var cat = _a[_i];
            var newCategory = new __WEBPACK_IMPORTED_MODULE_6__models_job_category__["a" /* JobCategory */]();
            newCategory.id = cat._id;
            newCategory.categoryVarName = cat.categoryVarName;
            newCategory.type = cat.type;
            for (var _b = 0, _c = cat.subCategory; _b < _c.length; _b++) {
                var subCat = _c[_b];
                var newSubCategory = new __WEBPACK_IMPORTED_MODULE_6__models_job_category__["a" /* JobCategory */]();
                newSubCategory.id = subCat._id;
                newSubCategory.categoryVarName = subCat.categoryVarName;
                newSubCategory.type = subCat.type;
                newCategory.subCategory.push(newSubCategory);
            }
            categoryList.push(newCategory);
        }
        return categoryList;
    };
    GenericService.prototype.getDurationList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.genericAPI_url + '/duration')
            .map(this.extractDurationData)
            .catch(this.handleError);
    };
    GenericService.prototype.extractDurationData = function (res) {
        var body = res.json();
        var durList = [];
        if (body.duration) {
            for (var _i = 0, _a = body.duration; _i < _a.length; _i++) {
                var dur = _a[_i];
                var duration = new __WEBPACK_IMPORTED_MODULE_8__models_duration__["a" /* Duration */]();
                duration.id = dur._id;
                duration.duration = dur.duration;
                duration.durationValue = dur.durationValue;
                durList.push(duration);
            }
        }
        return durList;
    };
    GenericService.prototype.getCurrencyList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.genericAPI_url + '/currency')
            .map(this.extractCurrencyData)
            .catch(this.handleError);
    };
    GenericService.prototype.extractCurrencyData = function (res) {
        var body = res.json();
        var curList = [];
        if (body.currency) {
            for (var _i = 0, _a = body.currency; _i < _a.length; _i++) {
                var cur = _a[_i];
                var currency = new __WEBPACK_IMPORTED_MODULE_9__models_currency__["a" /* Currency */]();
                currency.id = cur._id;
                currency.country = cur.country;
                currency.currency = cur.currency;
                currency.country = cur.country;
                curList.push(currency);
            }
        }
        return curList;
    };
    GenericService.prototype.searchForJob = function (search) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.genericAPI_url + '/employer/searchresult', { search: search }, options)
            .map(this.extractSearchData)
            .catch(this.handleError);
    };
    GenericService.prototype.extractSearchData = function (res) {
        console.dir(res.json());
        var body = res.json();
        var jobArray = [];
        if (body.searchResult) {
            for (var _i = 0, _a = body.searchResult; _i < _a.length; _i++) {
                var bob = _a[_i];
                if (bob) {
                    var newJob = new __WEBPACK_IMPORTED_MODULE_7__models_job__["a" /* JobPost */]();
                    newJob.id = bob._id;
                    newJob.createdAt = bob.createdAt;
                    newJob.updatedAt = bob.updatedAt;
                    newJob.deadline = bob.deadLine;
                    newJob.jobTitle = bob.jobTitle;
                    newJob.jobDescription = bob.jobDescription;
                    newJob.paymentType = bob.paymentType;
                    newJob.projectType = bob.projectType;
                    jobArray.push(newJob);
                }
            }
            return jobArray;
        }
        else {
            return jobArray;
        }
    };
    GenericService.prototype.getJobWithID = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.genericAPI_url + '/job/' + id)
            .map(this.getJobWithIDExtractor)
            .catch(this.handleError);
    };
    GenericService.prototype.getJobWithIDExtractor = function (res) {
        console.dir(res);
        var body = res.json();
        console.dir(body);
        var job = new __WEBPACK_IMPORTED_MODULE_7__models_job__["a" /* JobPost */]();
        if (body.result) {
            job.id = body.result._id;
            job.jobCategory = body.result.jobCategory;
            job.jobSubCategory = body.result.jobSubCategory;
            job.owner = body.result.owner;
            job.jobTitle = body.result.jobTitle;
            job.jobDescription = body.result.jobDescription;
            job.deadline = body.result.deadLine;
            job.budget = body.result.budget;
            job.paymentType = body.result.paymentType;
            job.projectType = body.result.projectType;
            job.status = body.result.status;
            job.requirements = body.result.requirements;
            job.candidates = body.result.candidates;
            job.imageURLList = body.result.imageURLList;
            job.atachmentList = body.result.atachmentList;
            job.currency = body.result.currency;
            job.createdAt = body.result.createdAt;
            job.updatedAt = body.result.updatedAt;
            for (var _i = 0, _a = body.result.proposals; _i < _a.length; _i++) {
                var proposer = _a[_i];
                job.proposals.push(proposer.candidate);
            }
        }
        return job;
    };
    GenericService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    GenericService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], GenericService);
    return GenericService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/generic.service.js.map

/***/ }),

/***/ 251:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_http_service__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Authentication; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var Authentication = (function (_super) {
    __extends(Authentication, _super);
    //____________________________________________________________
    function Authentication(http) {
        _super.call(this);
        this.http = http;
        this.self = this;
    }
    //____________________________________________________________
    Authentication.prototype.logIn = function () {
        if (this.userName && this.password) {
            var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
            var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
            return this.http.post(this.genericAPI_url + '/logIn', { userName: this.userName, password: this.password }, options)
                .map(this.extractData)
                .catch(this.handleError);
        }
        else {
            console.log('!!!!!!!!!!!!');
        }
    };
    Authentication.prototype.logOut = function () {
        localStorage.removeItem('currentUser');
    };
    Authentication.prototype.extractData = function (res) {
        var body = res.json();
        //console.log(this);
        console.log('data is received');
        console.dir(JSON.stringify(body));
        if (body.user) {
            localStorage.setItem('currentUser', JSON.stringify(body.user));
        }
        //console.dir(JSON.parse(localStorage.getItem('currentUser')));
        return body || {};
    };
    Authentication.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    Authentication.prototype.customError = function (err) {
        //return Observable.throw(err);
        return null;
    };
    // Save user to local sorage
    Authentication.prototype.saveUserToLocalStorage = function (user) {
        //localStorage.setItem('currentUser',user);
        return true;
    };
    Authentication.prototype.myFunction = function () {
        console.log('invoked');
    };
    Authentication = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], Authentication);
    return Authentication;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/authentication.service.js.map

/***/ }),

/***/ 252:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Currency; });
var Currency = (function () {
    function Currency() {
        this.id = '';
        this.country = '';
        this.currency = '';
        this.currencySymbol = '';
    }
    return Currency;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/currency.js.map

/***/ }),

/***/ 253:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Duration; });
var Duration = (function () {
    function Duration() {
        this.id = '';
        this.duration = '';
        this.durationValue = '';
    }
    return Duration;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/duration.js.map

/***/ }),

/***/ 254:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return ServerResponse; });
var ServerResponse = (function () {
    function ServerResponse() {
        this.type = '';
        this.status = '';
        this.message = '';
        this.data = [];
        this.dataType = '';
        this.sender = '';
    }
    return ServerResponse;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/server.response.model.js.map

/***/ }),

/***/ 372:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeAccountComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployeeAccountComponent = (function () {
    function EmployeeAccountComponent() {
        this.title = 'app works!';
    }
    EmployeeAccountComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(790),
            styles: [__webpack_require__(760)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeAccountComponent);
    return EmployeeAccountComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/account.component.js.map

/***/ }),

/***/ 373:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeHistoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployeeHistoryComponent = (function () {
    function EmployeeHistoryComponent() {
        this.title = 'app works!';
    }
    EmployeeHistoryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(792),
            styles: [__webpack_require__(762)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeHistoryComponent);
    return EmployeeHistoryComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/history.component.js.map

/***/ }),

/***/ 374:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_models_search_model__ = __webpack_require__(603);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_http_generic_service__ = __webpack_require__(250);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeHomeComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmployeeHomeComponent = (function (_super) {
    __extends(EmployeeHomeComponent, _super);
    function EmployeeHomeComponent(genericService) {
        var _this = this;
        _super.call(this);
        this.genericService = genericService;
        this.title = 'app works!';
        console.log('constructor ivnoked......');
        this.searchModel = new __WEBPACK_IMPORTED_MODULE_1__modules_models_search_model__["a" /* SearchModel */]();
        this.jobCategory = [];
        this.subCategory = [];
        this.jobList = [];
        this.categorySelected = false;
        this.genericService.getCategoryList()
            .subscribe(function (res) {
            _this.jobCategory = res;
        }, function (err) {
            console.dir(err);
        });
        this.onSubmit();
    }
    EmployeeHomeComponent.prototype.ngOnInit = function () {
        console.log('!!!!!!!!!!  INIT');
    };
    EmployeeHomeComponent.prototype.onChange = function (newValue) {
        console.log('select changed');
        console.dir(newValue);
        if (newValue) {
            this.categorySelected = true;
            for (var _i = 0, _a = this.jobCategory; _i < _a.length; _i++) {
                var cat = _a[_i];
                if (cat.id === newValue) {
                    console.dir(cat.subCategory);
                    this.subCategory = cat.subCategory;
                    this.searchModel.category = newValue;
                }
            }
        }
        else {
            this.searchModel.category = '';
            this.categorySelected = false;
        }
    };
    EmployeeHomeComponent.prototype.subCategoryChanged = function (val) {
        if (val) {
            this.searchModel.subCategory = val;
        }
        else {
            this.searchModel.subCategory = '';
        }
    };
    EmployeeHomeComponent.prototype.onSubmit = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            this.searchModel.owner = user._id;
        }
        console.dir(this.searchModel);
        this.genericService.searchForJob(this.searchModel)
            .subscribe(function (res) {
            _this.jobList = res;
            console.dir(res);
        }, function (err) {
            console.dir(err);
        });
    };
    EmployeeHomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(793),
            styles: [__webpack_require__(763)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__modules_http_generic_service__["a" /* GenericService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__modules_http_generic_service__["a" /* GenericService */]) === 'function' && _a) || Object])
    ], EmployeeHomeComponent);
    return EmployeeHomeComponent;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* OnInit */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/home-component.js.map

/***/ }),

/***/ 375:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_models_ws_models_server_response_model__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_models_ws_models_conversation_model__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_models_ws_models_message_model__ = __webpack_require__(409);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeMessengerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployeeMessengerComponent = (function () {
    function EmployeeMessengerComponent(chatService) {
        this.chatService = chatService;
        this.title = 'app works!';
        this.conversationList = [];
    }
    EmployeeMessengerComponent.prototype.ngOnInit = function () {
        if (this.chatService.connected) {
            console.log('Connected.....');
            console.log('requesting conversation list');
            this.chatService.getConversationList();
        }
        this.subscribeChatService();
        console.log('ng init!!!!!!!!!!!');
    };
    EmployeeMessengerComponent.prototype.subscribeChatService = function () {
        var _this = this;
        this.chatService.ws.subscribe(function (response) {
            console.log('subscribing in messenger.....');
            console.dir(response);
            if (!response) {
                return null;
            }
            if (response.type === 'handshake') {
                _this.chatService.getConversationList();
            }
            if (response.dataType === 'ConversationList') {
                _this.initializeConversationList(response);
            }
            if (response.dataType === 'UpdateMessage') {
                _this.updateMessage(response);
            }
        });
    };
    EmployeeMessengerComponent.prototype.initializeConversationList = function (response) {
        console.log('initializing conversation list .....');
        var myId = this.getMyId();
        if (response.data) {
            for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                var conversation = _a[_i];
                var newConversation = new __WEBPACK_IMPORTED_MODULE_3__modules_models_ws_models_conversation_model__["a" /* Conversation */]();
                newConversation.Id = conversation._id;
                newConversation.subject.Id = conversation.subject._id;
                newConversation.subject.title = conversation.subject.jobTitle;
                // Chatters
                for (var _b = 0, _c = conversation.chatters; _b < _c.length; _b++) {
                    var chatter = _c[_b];
                    if (chatter._id === myId) {
                        newConversation.me.Id = chatter._id;
                        newConversation.me.fName = chatter.fName;
                        newConversation.me.lName = chatter.lName;
                    }
                    else {
                        var newChatter = new __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__["a" /* Chatter */]();
                        newChatter.Id = chatter._id;
                        newChatter.fName = chatter.fName;
                        newChatter.lName = chatter.lName;
                        newConversation.otherChatters.push(newChatter);
                    }
                }
                for (var _d = 0, _e = conversation.message; _d < _e.length; _d++) {
                    var message = _e[_d];
                    var newMessage = new __WEBPACK_IMPORTED_MODULE_5__modules_models_ws_models_message_model__["a" /* Message */]();
                    newMessage.id = message._id;
                    newMessage.createdAt = message.createdAt;
                    newMessage.updatedAt = message.updatedAt;
                    newMessage.text = message.text;
                    if (message.sender) {
                        for (var _f = 0, _g = newConversation.otherChatters; _f < _g.length; _f++) {
                            var chatter = _g[_f];
                            if (chatter.Id === message.sender) {
                                newMessage.sender.Id = chatter.Id;
                                newMessage.sender.fName = chatter.fName;
                                newMessage.sender.lName = chatter.lName;
                            }
                        }
                        if (newConversation.me.Id === message.sender) {
                            newMessage.sender.Id = newConversation.me.Id;
                            newMessage.sender.fName = newConversation.me.fName;
                            newMessage.sender.lName = newConversation.me.lName;
                        }
                    }
                    if (message.seenBy) {
                        for (var _h = 0, _j = message.seenBy; _h < _j.length; _h++) {
                            var seenBy = _j[_h];
                            var seen = new __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__["a" /* Chatter */]();
                            seen.Id = seenBy._id;
                            seen.fName = seenBy.fName;
                            seen.lName = seenBy.lName;
                            newMessage.seenBy.push(seen);
                        }
                    }
                    newMessage.deliveredAt = message.deliveredAt;
                    newConversation.message.push(newMessage);
                }
                this.conversationList.push(newConversation);
            }
            console.dir(this.conversationList);
        }
        else {
            console.log('NO DATA!!!');
        }
    };
    EmployeeMessengerComponent.prototype.updateMessage = function (response) {
        console.log('response arrived...');
        console.dir(response);
        if (!response.data) {
            return null;
        }
        for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
            var data = _a[_i];
            for (var _b = 0, _c = this.conversationList; _b < _c.length; _b++) {
                var conversation = _c[_b];
                if (conversation.Id === data.conversationId) {
                    var newMessage = new __WEBPACK_IMPORTED_MODULE_5__modules_models_ws_models_message_model__["a" /* Message */]();
                    newMessage.id = data.message._id;
                    newMessage.text = data.message.text;
                    if (data.message.sender) {
                        newMessage.sender.Id = data.message.sender._id;
                        newMessage.sender.fName = data.message.sender.fName;
                        newMessage.sender.lName = data.message.sender.lName;
                    }
                    if (data.message.seenBy) {
                        for (var _d = 0, _e = data.message.seenBy; _d < _e.length; _d++) {
                            var seenBy = _e[_d];
                            var seen = new __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__["a" /* Chatter */]();
                            seen.Id = seenBy._id;
                            seen.fName = seenBy.fName;
                            seen.lName = seenBy.lName;
                            newMessage.seenBy.push(seen);
                        }
                    }
                    conversation.message.push(newMessage);
                }
            }
        }
    };
    EmployeeMessengerComponent.prototype.getMyId = function () {
        if (localStorage.getItem('currentUser')) {
            var user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) {
                return '';
            }
            if (!user._id) {
                return '';
            }
            return user._id;
        }
        else {
            return '';
        }
    };
    EmployeeMessengerComponent.prototype.sendMessage = function (conversationId, senderId, subjectId, event) {
        console.log('sending message .....');
        console.log('conversation ' + conversationId);
        console.log('sender ' + senderId);
        console.log('subject ' + subjectId);
        var text = event.target[0].value;
        event.target[0].value = '';
        var request = new __WEBPACK_IMPORTED_MODULE_2__modules_models_ws_models_server_response_model__["a" /* ServerResponse */]();
        request.type = 'NewMessage';
        request.status = '';
        request.message = '';
        request.data = [
            {
                conversationId: conversationId,
                senderId: senderId,
                subjectId: subjectId,
                text: text
            }
        ];
        request.dataType = 'NewMessage';
        request.sender = senderId;
        this.chatService.ws.next(request);
    };
    EmployeeMessengerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(794),
            styles: [__webpack_require__(764)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__["a" /* ChatService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__["a" /* ChatService */]) === 'function' && _a) || Object])
    ], EmployeeMessengerComponent);
    return EmployeeMessengerComponent;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/messenger.component.js.map

/***/ }),

/***/ 376:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeSubscribeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployeeSubscribeComponent = (function () {
    function EmployeeSubscribeComponent() {
        this.title = 'app works!';
    }
    EmployeeSubscribeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(795),
            styles: [__webpack_require__(765)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeSubscribeComponent);
    return EmployeeSubscribeComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/subscribe.component.js.map

/***/ }),

/***/ 377:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeTopWorkerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployeeTopWorkerComponent = (function () {
    function EmployeeTopWorkerComponent() {
        this.title = 'app works!';
    }
    EmployeeTopWorkerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(796),
            styles: [__webpack_require__(766)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeTopWorkerComponent);
    return EmployeeTopWorkerComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/top-workers.component.js.map

/***/ }),

/***/ 378:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_jquery__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_models_proposal__ = __webpack_require__(407);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_models_duration__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_models_currency__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__modules_http_generic_service__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__modules_http_employee_service__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__modules_models_job__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeViewWJobComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};









var EmployeeViewWJobComponent = (function (_super) {
    __extends(EmployeeViewWJobComponent, _super);
    function EmployeeViewWJobComponent(genericService, employeeJobService, route, router) {
        _super.call(this);
        this.genericService = genericService;
        this.employeeJobService = employeeJobService;
        this.route = route;
        this.router = router;
        this.title = 'app works!';
        this.proposal = new __WEBPACK_IMPORTED_MODULE_3__modules_models_proposal__["a" /* Proposal */]();
        console.dir(this.proposal);
        this.currencyList = [];
        this.durationList = [];
        this.id = this.route.snapshot.params['id'];
        this.jobPost = new __WEBPACK_IMPORTED_MODULE_8__modules_models_job__["a" /* JobPost */]();
        this.alreadyApplied = false;
        this.applyVisibility = { '': '' };
        this.changeApplyVisibility = { 'display': 'none' };
    }
    EmployeeViewWJobComponent.prototype.ngAfterViewInit = function () {
        this.addJQUERY();
    };
    EmployeeViewWJobComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.genericService.getCurrencyList()
            .subscribe(function (cur) {
            _this.currencyList = cur;
            console.dir(_this.currencyList);
            _this.proposal.currency = new __WEBPACK_IMPORTED_MODULE_5__modules_models_currency__["a" /* Currency */]();
            _this.proposal.currency.id = _this.currencyList[0].id;
        }, function (err) {
            console.dir(err);
        });
        this.genericService.getDurationList()
            .subscribe(function (dur) {
            console.dir(dur);
            _this.durationList = dur;
            _this.proposal.duration = new __WEBPACK_IMPORTED_MODULE_4__modules_models_duration__["a" /* Duration */]();
            _this.proposal.duration.id = _this.durationList[0].id;
        }, function (err) {
            console.dir(err);
        });
        this.genericService.getJobWithID(this.id)
            .subscribe(function (res) {
            console.dir(res);
            _this.jobPost = res;
            _this.checkIfProposalSent(_this.jobPost);
        }, function (err) {
            console.dir(err);
        });
    };
    EmployeeViewWJobComponent.prototype.sendProposal = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        this.proposal.candidate.id = user._id;
        this.proposal.hostJobID = this.jobPost.id;
        console.log('proposal sent');
        console.dir(this.proposal);
        this.employeeJobService.sendProposal(this.proposal)
            .subscribe(function (result) {
            console.dir(result);
        }, function (err) {
            console.dir(err);
        });
    };
    EmployeeViewWJobComponent.prototype.durationChanged = function (val) {
        console.log(val);
        if (val) {
            this.proposal.duration = val;
        }
    };
    EmployeeViewWJobComponent.prototype.currencyChanged = function (val) {
        console.log(val);
        if (val) {
            this.proposal.currency = val;
        }
    };
    EmployeeViewWJobComponent.prototype.checkIfProposalSent = function (job) {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        for (var _i = 0, _a = job.proposals; _i < _a.length; _i++) {
            var proposal = _a[_i];
            console.log(proposal + ' VS ' + user._id);
            if (proposal === user._id) {
                this.alreadyApplied = true;
                this.applyVisibility = { 'display': 'none' };
                this.changeApplyVisibility = { '': '' };
                console.log('already applied!!!');
            }
        }
    };
    EmployeeViewWJobComponent.prototype.addJQUERY = function () {
        console.log('jquery must be there');
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.taboz ul li:first').addClass('active');
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.tab-content:not(:first)').hide();
        __WEBPACK_IMPORTED_MODULE_2_jquery__('.taboz ul li a').click(function (event) {
            console.log('clicked');
            event.preventDefault();
            var content = __WEBPACK_IMPORTED_MODULE_2_jquery__(this).attr('href');
            console.dir(content);
            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).parent().addClass('active');
            __WEBPACK_IMPORTED_MODULE_2_jquery__(this).parent().siblings().removeClass('active');
            __WEBPACK_IMPORTED_MODULE_2_jquery__(content).show();
            __WEBPACK_IMPORTED_MODULE_2_jquery__(content).siblings('.tab-content').hide();
        });
    };
    EmployeeViewWJobComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(797),
            styles: [__webpack_require__(767)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_6__modules_http_generic_service__["a" /* GenericService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_6__modules_http_generic_service__["a" /* GenericService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_7__modules_http_employee_service__["a" /* EmployeeJobService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_7__modules_http_employee_service__["a" /* EmployeeJobService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], EmployeeViewWJobComponent);
    return EmployeeViewWJobComponent;
    var _a, _b, _c, _d;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* OnInit */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/view-job.component.js.map

/***/ }),

/***/ 379:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerAccountComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerAccountComponent = (function () {
    function EmployerAccountComponent() {
        this.title = 'app works!';
    }
    EmployerAccountComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(798),
            styles: [__webpack_require__(768)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerAccountComponent);
    return EmployerAccountComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/account.component.js.map

/***/ }),

/***/ 380:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerAccountAddressComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerAccountAddressComponent = (function () {
    function EmployerAccountAddressComponent() {
        this.title = 'app works!';
    }
    EmployerAccountAddressComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(799),
            styles: [__webpack_require__(769)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerAccountAddressComponent);
    return EmployerAccountAddressComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/address.js.map

/***/ }),

/***/ 381:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerAccountAssotiationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerAccountAssotiationComponent = (function () {
    function EmployerAccountAssotiationComponent() {
        this.title = 'app works!';
    }
    EmployerAccountAssotiationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(800),
            styles: [__webpack_require__(770)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerAccountAssotiationComponent);
    return EmployerAccountAssotiationComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/assotiation.js.map

/***/ }),

/***/ 382:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerAccountChangePasswordComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerAccountChangePasswordComponent = (function () {
    function EmployerAccountChangePasswordComponent() {
        this.title = 'app works!';
    }
    EmployerAccountChangePasswordComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(801),
            styles: [__webpack_require__(771)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerAccountChangePasswordComponent);
    return EmployerAccountChangePasswordComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/change-password.js.map

/***/ }),

/***/ 383:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerAccountDeactivationComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerAccountDeactivationComponent = (function () {
    function EmployerAccountDeactivationComponent() {
        this.title = 'app works!';
    }
    EmployerAccountDeactivationComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(802),
            styles: [__webpack_require__(772)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerAccountDeactivationComponent);
    return EmployerAccountDeactivationComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/deactivation.js.map

/***/ }),

/***/ 384:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerAccountPersonalInfoComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerAccountPersonalInfoComponent = (function () {
    function EmployerAccountPersonalInfoComponent() {
        this.title = 'app works!';
    }
    EmployerAccountPersonalInfoComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(803),
            styles: [__webpack_require__(773)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerAccountPersonalInfoComponent);
    return EmployerAccountPersonalInfoComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/personal-info.js.map

/***/ }),

/***/ 385:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_models_job__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EditJobComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var EditJobComponent = (function (_super) {
    __extends(EditJobComponent, _super);
    function EditJobComponent(route, jobService, categoryService, router) {
        _super.call(this);
        this.route = route;
        this.jobService = jobService;
        this.categoryService = categoryService;
        this.router = router;
        this.title = 'app works!';
        this.jobPost = new __WEBPACK_IMPORTED_MODULE_3__modules_models_job__["a" /* JobPost */]();
        this.jobCategory = [];
        this.subCategory = [];
        this.categorySelected = false;
    }
    EditJobComponent.prototype.ngOnInit = function () {
        var _this = this;
        console.log('asdasdasdasdasd');
        console.dir(this.jobPost);
        var id = this.route.snapshot.params['id'];
        console.log(id);
        this.jobService.getEmployerPosterJobWithId(id)
            .subscribe(function (res) {
            console.dir(res);
            console.log('result is ...');
            if (res) {
                _this.jobPost = res[0];
            }
            else {
                _this.router.navigate(['404']);
            }
            console.dir(_this.jobPost);
        }, function (err) {
            _this.router.navigate(['404']);
            console.log('err');
            console.dir(err);
        });
        this.categoryService.getCategoryList().subscribe(function (res) {
            console.log('Category List Recieved....');
            console.dir(res);
            _this.jobCategory = res;
            console.dir(_this.jobCategory);
        }, function (err) {
            console.log('err');
            console.dir(err);
        });
    };
    EditJobComponent.prototype.onChange = function (newValue) {
        console.log('select changed');
        console.dir(newValue);
        if (newValue) {
            this.categorySelected = true;
            this.jobPost.jobCategory = newValue;
            for (var _i = 0, _a = this.jobCategory; _i < _a.length; _i++) {
                var cat = _a[_i];
                if (cat.id === newValue) {
                    this.subCategory = cat.subCategory;
                }
            }
        }
        else {
            this.categorySelected = false;
            this.jobPost.jobCategory = '';
        }
        console.log('onchange onvoked....');
        return 'selected';
    };
    EditJobComponent.prototype.subCategoryChanged = function (value) {
        if (value) {
            this.jobPost.jobSubCategory = value;
        }
        else {
            this.jobPost.jobSubCategory = '';
        }
    };
    EditJobComponent.prototype.saveChanges = function () {
        var _this = this;
        var user = JSON.parse(localStorage.getItem('currentUser'));
        console.dir(user);
        this.jobPost.owner = user._id;
        console.log('sending data.....');
        console.dir(this.jobPost);
        this.jobService.updateJob(this.jobPost)
            .subscribe(function (res) {
            if (res) {
                _this.jobPost = res;
                console.dir(_this.jobPost);
            }
        }, function (err) {
            console.dir(err);
        });
    };
    EditJobComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            template: __webpack_require__(804),
            styles: [__webpack_require__(774)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__["c" /* JobService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__["c" /* JobService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__["b" /* CategoryService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__["b" /* CategoryService */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], EditJobComponent);
    return EditJobComponent;
    var _a, _b, _c, _d;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* OnInit */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/edit-job.component.js.map

/***/ }),

/***/ 386:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerHomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerHomeComponent = (function () {
    function EmployerHomeComponent() {
        this.title = 'app works!';
    }
    EmployerHomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(806),
            styles: [__webpack_require__(776)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerHomeComponent);
    return EmployerHomeComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/home-component.js.map

/***/ }),

/***/ 387:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__ = __webpack_require__(96);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerJobHistoryComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployerJobHistoryComponent = (function () {
    function EmployerJobHistoryComponent(jobService) {
        this.jobService = jobService;
        this.title = 'app works!';
        this.jobPostList = [];
    }
    EmployerJobHistoryComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.jobService.getEmployerPostedJobs().subscribe(function (res) {
            console.log('subscribing....');
            _this.jobPostList = res;
        }, function (err) {
            console.dir(err);
        });
    };
    EmployerJobHistoryComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(807),
            styles: [__webpack_require__(777)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__["c" /* JobService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__["c" /* JobService */]) === 'function' && _a) || Object])
    ], EmployerJobHistoryComponent);
    return EmployerJobHistoryComponent;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/job-history.component.js.map

/***/ }),

/***/ 388:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_models_ws_models_server_response_model__ = __webpack_require__(254);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_models_ws_models_conversation_model__ = __webpack_require__(408);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__modules_models_ws_models_message_model__ = __webpack_require__(409);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerMessengerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployerMessengerComponent = (function () {
    function EmployerMessengerComponent(chatService) {
        this.chatService = chatService;
        this.title = 'app works!';
        this.conversationList = [];
    }
    EmployerMessengerComponent.prototype.ngOnInit = function () {
        if (this.chatService.connected) {
            console.log('Connected.....');
            console.log('requesting conversation list');
            this.chatService.getConversationList();
        }
        this.subscribeChatService();
        console.log('ng init!!!!!!!!!!!');
    };
    EmployerMessengerComponent.prototype.subscribeChatService = function () {
        var _this = this;
        this.chatService.ws.subscribe(function (response) {
            console.log('subscribing in messenger.....');
            console.dir(response);
            if (!response) {
                return null;
            }
            if (response.type === 'handshake') {
                _this.chatService.getConversationList();
            }
            if (response.dataType === 'ConversationList') {
                _this.initializeConversationList(response);
            }
            if (response.dataType === 'UpdateMessage') {
                _this.updateMessage(response);
            }
        });
    };
    EmployerMessengerComponent.prototype.initializeConversationList = function (response) {
        console.log('initializing conversation list .....');
        var myId = this.getMyId();
        if (response.data) {
            for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
                var conversation = _a[_i];
                var newConversation = new __WEBPACK_IMPORTED_MODULE_3__modules_models_ws_models_conversation_model__["a" /* Conversation */]();
                newConversation.Id = conversation._id;
                newConversation.subject.Id = conversation.subject._id;
                newConversation.subject.title = conversation.subject.jobTitle;
                // Chatters
                for (var _b = 0, _c = conversation.chatters; _b < _c.length; _b++) {
                    var chatter = _c[_b];
                    if (chatter._id === myId) {
                        newConversation.me.Id = chatter._id;
                        newConversation.me.fName = chatter.fName;
                        newConversation.me.lName = chatter.lName;
                    }
                    else {
                        var newChatter = new __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__["a" /* Chatter */]();
                        newChatter.Id = chatter._id;
                        newChatter.fName = chatter.fName;
                        newChatter.lName = chatter.lName;
                        newConversation.otherChatters.push(newChatter);
                    }
                }
                for (var _d = 0, _e = conversation.message; _d < _e.length; _d++) {
                    var message = _e[_d];
                    var newMessage = new __WEBPACK_IMPORTED_MODULE_5__modules_models_ws_models_message_model__["a" /* Message */]();
                    newMessage.id = message._id;
                    newMessage.createdAt = message.createdAt;
                    newMessage.updatedAt = message.updatedAt;
                    newMessage.text = message.text;
                    if (message.sender) {
                        for (var _f = 0, _g = newConversation.otherChatters; _f < _g.length; _f++) {
                            var chatter = _g[_f];
                            if (chatter.Id === message.sender) {
                                newMessage.sender.Id = chatter.Id;
                                newMessage.sender.fName = chatter.fName;
                                newMessage.sender.lName = chatter.lName;
                            }
                        }
                        if (newConversation.me.Id === message.sender) {
                            newMessage.sender.Id = newConversation.me.Id;
                            newMessage.sender.fName = newConversation.me.fName;
                            newMessage.sender.lName = newConversation.me.lName;
                        }
                    }
                    if (message.seenBy) {
                        for (var _h = 0, _j = message.seenBy; _h < _j.length; _h++) {
                            var seenBy = _j[_h];
                            var seen = new __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__["a" /* Chatter */]();
                            seen.Id = seenBy._id;
                            seen.fName = seenBy.fName;
                            seen.lName = seenBy.lName;
                            newMessage.seenBy.push(seen);
                        }
                    }
                    newMessage.deliveredAt = message.deliveredAt;
                    newConversation.message.push(newMessage);
                }
                this.conversationList.push(newConversation);
            }
            console.dir(this.conversationList);
        }
        else {
            console.log('NO DATA!!!');
        }
    };
    EmployerMessengerComponent.prototype.updateMessage = function (response) {
        console.log('response arrived...');
        console.dir(response);
        if (!response.data) {
            return null;
        }
        for (var _i = 0, _a = response.data; _i < _a.length; _i++) {
            var data = _a[_i];
            for (var _b = 0, _c = this.conversationList; _b < _c.length; _b++) {
                var conversation = _c[_b];
                if (conversation.Id === data.conversationId) {
                    var newMessage = new __WEBPACK_IMPORTED_MODULE_5__modules_models_ws_models_message_model__["a" /* Message */]();
                    newMessage.id = data.message._id;
                    newMessage.text = data.message.text;
                    if (data.message.sender) {
                        newMessage.sender.Id = data.message.sender._id;
                        newMessage.sender.fName = data.message.sender.fName;
                        newMessage.sender.lName = data.message.sender.lName;
                    }
                    if (data.message.seenBy) {
                        for (var _d = 0, _e = data.message.seenBy; _d < _e.length; _d++) {
                            var seenBy = _e[_d];
                            var seen = new __WEBPACK_IMPORTED_MODULE_4__modules_models_ws_models_chatter_model__["a" /* Chatter */]();
                            seen.Id = seenBy._id;
                            seen.fName = seenBy.fName;
                            seen.lName = seenBy.lName;
                            newMessage.seenBy.push(seen);
                        }
                    }
                    conversation.message.push(newMessage);
                }
            }
        }
    };
    EmployerMessengerComponent.prototype.getMyId = function () {
        if (localStorage.getItem('currentUser')) {
            var user = JSON.parse(localStorage.getItem('currentUser'));
            if (!user) {
                return '';
            }
            if (!user._id) {
                return '';
            }
            return user._id;
        }
        else {
            return '';
        }
    };
    EmployerMessengerComponent.prototype.sendMessage = function (conversationId, senderId, subjectId, event) {
        console.log('sending message .....');
        console.log('conversation ' + conversationId);
        console.log('sender ' + senderId);
        console.log('subject ' + subjectId);
        var text = event.target[0].value;
        event.target[0].value = '';
        var request = new __WEBPACK_IMPORTED_MODULE_2__modules_models_ws_models_server_response_model__["a" /* ServerResponse */]();
        request.type = 'NewMessage';
        request.status = '';
        request.message = '';
        request.data = [
            {
                conversationId: conversationId,
                senderId: senderId,
                subjectId: subjectId,
                text: text
            }
        ];
        request.dataType = 'NewMessage';
        request.sender = senderId;
        this.chatService.ws.next(request);
    };
    EmployerMessengerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(808),
            styles: [__webpack_require__(778)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__["a" /* ChatService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__["a" /* ChatService */]) === 'function' && _a) || Object])
    ], EmployerMessengerComponent);
    return EmployerMessengerComponent;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/messenger.component.js.map

/***/ }),

/***/ 389:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_models_feadback__ = __webpack_require__(602);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_http_chat_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery__ = __webpack_require__(447);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_jquery___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_jquery__);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerOfferComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployerOfferComponent = (function (_super) {
    __extends(EmployerOfferComponent, _super);
    function EmployerOfferComponent(offerService, chatService, route, router) {
        _super.call(this);
        this.offerService = offerService;
        this.chatService = chatService;
        this.route = route;
        this.router = router;
        this.title = 'app works!';
        this.postedJobs = [];
        this.feadbackList = [];
    }
    EmployerOfferComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.offerService.getOfferListEmployerSpecific()
            .subscribe(function (result) {
            console.dir(result);
            _this.postedJobs = result;
            //this.initJQUERY();
        }, function (err) {
            console.dir(err);
        });
    };
    EmployerOfferComponent.prototype.ngAfterViewInit = function () {
    };
    EmployerOfferComponent.prototype.initJQUERY = function () {
        console.log('jquery must be there');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.taboz ul li:first').addClass('active');
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.tab-content:not(:first)').hide();
        __WEBPACK_IMPORTED_MODULE_5_jquery__('.taboz ul li a').click(function (event) {
            console.log('clicked!!!');
            event.preventDefault();
            var content = __WEBPACK_IMPORTED_MODULE_5_jquery__(this).attr('href');
            __WEBPACK_IMPORTED_MODULE_5_jquery__(this).parent().addClass('active');
            __WEBPACK_IMPORTED_MODULE_5_jquery__(this).parent().siblings().removeClass('active');
            __WEBPACK_IMPORTED_MODULE_5_jquery__(content).show();
            __WEBPACK_IMPORTED_MODULE_5_jquery__(content).siblings('.tab-content').hide();
        });
    };
    EmployerOfferComponent.prototype.tabContentClicked = function (event) {
        event.preventDefault();
        var content = event.target.hash;
        __WEBPACK_IMPORTED_MODULE_5_jquery__(this).parent().addClass('active');
        __WEBPACK_IMPORTED_MODULE_5_jquery__(this).parent().siblings().removeClass('active');
        __WEBPACK_IMPORTED_MODULE_5_jquery__(content).show();
        __WEBPACK_IMPORTED_MODULE_5_jquery__(content).siblings('.tab-content').hide();
    };
    EmployerOfferComponent.prototype.sendMessage = function (candidateId, subjectJobId) {
        var _this = this;
        console.log('send message');
        var user = JSON.parse(localStorage.getItem('currentUser'));
        var myId = user._id;
        this.chatService.startConversation(candidateId, subjectJobId, myId)
            .subscribe(function (response) {
            if (response) {
                _this.router.navigate(['employer/messenger/' + response]);
            }
        }, function (err) {
            console.dir(err);
        });
    };
    EmployerOfferComponent.prototype.confirmProposal = function () {
        console.log('confirmation');
    };
    EmployerOfferComponent.prototype.declineProposal = function () {
        console.log('decline');
    };
    EmployerOfferComponent.prototype.leaveFeadback = function (event, forJob, toClient) {
        console.log('leaving feadback');
        console.log('for ... ' + forJob);
        console.log('to client :  ' + toClient);
        console.log(event.target.elements[1].value);
        console.dir(event);
        var exists = false;
        var feadbackToSend;
        for (var _i = 0, _a = this.feadbackList; _i < _a.length; _i++) {
            var feadback = _a[_i];
            if (feadback.jobId === forJob && feadback.candidateId === toClient) {
                feadback.text = event.target.elements[1].value;
                exists = true;
                console.log('feadback exists');
                feadbackToSend = feadback;
            }
        }
        if (!exists) {
            var feadback = new __WEBPACK_IMPORTED_MODULE_3__modules_models_feadback__["a" /* Feadback */]();
            feadback.jobId = forJob;
            feadback.candidateId = toClient;
            feadback.text = event.target.elements[1].value;
            feadbackToSend = feadback;
            console.log('creating feadback......');
            console.dir(feadback);
            if (feadbackToSend) {
                console.log('sent.....');
            }
        }
    };
    EmployerOfferComponent.prototype.feadbackScoreChanged = function (val, forJob, toClient) {
        console.log(val);
        console.log('for ... ' + forJob);
        console.log('to client :  ' + toClient);
        var exists = false;
        for (var _i = 0, _a = this.feadbackList; _i < _a.length; _i++) {
            var feadback = _a[_i];
            if (feadback.jobId === forJob && feadback.candidateId === toClient) {
                feadback.score = val;
                exists = true;
                console.log('feadback exists');
            }
        }
        if (!exists) {
            var feadback = new __WEBPACK_IMPORTED_MODULE_3__modules_models_feadback__["a" /* Feadback */]();
            feadback.jobId = forJob;
            feadback.candidateId = toClient;
            feadback.score = val;
            this.feadbackList.push(feadback);
            console.log('creating feadback......');
            console.dir(feadback);
        }
    };
    EmployerOfferComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(809),
            styles: [__webpack_require__(779)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__["a" /* OfferService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__modules_http_employer_service__["a" /* OfferService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_4__modules_http_chat_service__["a" /* ChatService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__modules_http_chat_service__["a" /* ChatService */]) === 'function' && _b) || Object, (typeof (_c = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["c" /* ActivatedRoute */]) === 'function' && _c) || Object, (typeof (_d = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _d) || Object])
    ], EmployerOfferComponent);
    return EmployerOfferComponent;
    var _a, _b, _c, _d;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* OnInit */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/offer.component.js.map

/***/ }),

/***/ 390:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_models_job__ = __webpack_require__(126);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerPostJobComponent; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var EmployerPostJobComponent = (function (_super) {
    __extends(EmployerPostJobComponent, _super);
    function EmployerPostJobComponent(categoryService, jobService) {
        _super.call(this);
        this.categoryService = categoryService;
        this.jobService = jobService;
        this.title = 'app works!';
        this.jobCategory = [];
        this.subCategory = [];
        this.categorySelected = false;
        this.jobPost = new __WEBPACK_IMPORTED_MODULE_2__modules_models_job__["a" /* JobPost */]();
    }
    EmployerPostJobComponent.prototype.ngOnInit = function () {
        var _this = this;
        this.categoryService.getCategoryList().subscribe(function (res) {
            console.log('Category List Recieved....');
            console.dir(res);
            _this.jobCategory = res;
            console.dir(_this.jobCategory);
        }, function (err) {
            console.dir(err);
        });
        console.log('initialized   .....');
    };
    EmployerPostJobComponent.prototype.onSubmit = function () {
        console.log('submitted');
        console.dir(this.jobPost);
        var user = JSON.parse(localStorage.getItem('currentUser'));
        console.dir(user);
        this.jobPost.owner = user._id;
        this.jobService.postNewJob(this.jobPost)
            .subscribe(function (res) {
            console.dir(res);
        }, function (err) {
            console.dir(err);
        });
    };
    EmployerPostJobComponent.prototype.onChange = function (newValue) {
        console.log('select changed');
        console.dir(newValue);
        if (newValue) {
            this.categorySelected = true;
            this.jobPost.jobCategory = newValue;
            for (var _i = 0, _a = this.jobCategory; _i < _a.length; _i++) {
                var cat = _a[_i];
                if (cat.id === newValue) {
                    this.subCategory = cat.subCategory;
                }
            }
        }
        else {
            this.categorySelected = false;
            this.jobPost.jobCategory = '';
        }
    };
    EmployerPostJobComponent.prototype.subCategoryChanged = function (value) {
        if (value) {
            this.jobPost.jobSubCategory = value;
        }
        else {
            this.jobPost.jobSubCategory = '';
        }
    };
    EmployerPostJobComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(810),
            styles: [__webpack_require__(780)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__["b" /* CategoryService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__["b" /* CategoryService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__["c" /* JobService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__modules_http_employer_service__["c" /* JobService */]) === 'function' && _b) || Object])
    ], EmployerPostJobComponent);
    return EmployerPostJobComponent;
    var _a, _b;
}(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_5" /* OnInit */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/post-job.component.js.map

/***/ }),

/***/ 391:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerSubscribeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployerSubscribeComponent = (function () {
    function EmployerSubscribeComponent() {
        this.title = 'app works!';
    }
    EmployerSubscribeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(811),
            styles: [__webpack_require__(781)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployerSubscribeComponent);
    return EmployerSubscribeComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/subscribe.component.js.map

/***/ }),

/***/ 392:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AboutUsComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AboutUsComponent = (function () {
    function AboutUsComponent() {
        this.title = 'app works!';
    }
    AboutUsComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(813),
            styles: [__webpack_require__(782)]
        }), 
        __metadata('design:paramtypes', [])
    ], AboutUsComponent);
    return AboutUsComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/about-us.component.js.map

/***/ }),

/***/ 393:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return HomeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var HomeComponent = (function () {
    function HomeComponent() {
        this.title = 'app works!';
    }
    HomeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(814),
            styles: [__webpack_require__(783)]
        }), 
        __metadata('design:paramtypes', [])
    ], HomeComponent);
    return HomeComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/home.component.js.map

/***/ }),

/***/ 394:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_http_visitor_authentication_service__ = __webpack_require__(251);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogInComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var LogInComponent = (function () {
    function LogInComponent(auth, router) {
        this.auth = auth;
        this.router = router;
        this.title = 'app works!';
    }
    LogInComponent.prototype.onSubmitLocalAuth = function () {
        var _this = this;
        console.log('Log In Request');
        console.log(this.auth.userName);
        console.log(this.auth.password);
        this.auth.logIn()
            .subscribe(function (res) {
            console.log('redirecting....');
            console.dir(res);
            _this.router.navigate(['']);
        }, function (err) {
            console.dir(err);
        });
    };
    LogInComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(815),
            styles: [__webpack_require__(784)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_2__modules_http_visitor_authentication_service__["a" /* Authentication */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_2__modules_http_visitor_authentication_service__["a" /* Authentication */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], LogInComponent);
    return LogInComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/log-in.component.js.map

/***/ }),

/***/ 395:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_employeeRegistrationModel__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_http_visitor_employee_service__ = __webpack_require__(403);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterEmployeeComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};




var RegisterEmployeeComponent = (function () {
    function RegisterEmployeeComponent(employeeService, router) {
        this.employeeService = employeeService;
        this.router = router;
        this.title = 'app works!';
        //employee : Employee = new Employee();
        this.company = new __WEBPACK_IMPORTED_MODULE_2__modules_employeeRegistrationModel__["b" /* Company */]();
        this.individual = new __WEBPACK_IMPORTED_MODULE_2__modules_employeeRegistrationModel__["c" /* Individual */]();
    }
    RegisterEmployeeComponent.prototype.onSubmitIndividual = function () {
        var _this = this;
        console.log('Submitted individual');
        console.dir(this.individual);
        this.employeeService.registerEmployee(this.individual)
            .subscribe(function (res) {
            console.log('redirecting....');
            console.dir(res);
            _this.router.navigate(['']);
        }, function (err) {
            console.dir(err);
        });
    };
    RegisterEmployeeComponent.prototype.onSubmitCompany = function () {
        console.log('submitted company');
        console.dir(this.company);
        this.employeeService.registerEmployee(this.company)
            .subscribe(function (res) {
            console.dir(res);
        }, function (err) {
            console.dir(err);
        });
    };
    RegisterEmployeeComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: '',
            template: __webpack_require__(816),
            styles: [__webpack_require__(785)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_3__modules_http_visitor_employee_service__["a" /* EmployeeService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_3__modules_http_visitor_employee_service__["a" /* EmployeeService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], RegisterEmployeeComponent);
    return RegisterEmployeeComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/register-employee.component.js.map

/***/ }),

/***/ 396:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__modules_employeeRegistrationModel__ = __webpack_require__(398);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__modules_employerRegistrationModel__ = __webpack_require__(599);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__modules_http_visitor_employer_service__ = __webpack_require__(404);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return RegisterEmployerComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};





var RegisterEmployerComponent = (function () {
    function RegisterEmployerComponent(employerService, router) {
        this.employerService = employerService;
        this.router = router;
        this.title = 'app works!';
        this.employee = new __WEBPACK_IMPORTED_MODULE_2__modules_employeeRegistrationModel__["a" /* Employee */]();
        this.employer = new __WEBPACK_IMPORTED_MODULE_3__modules_employerRegistrationModel__["a" /* Employer */]();
    }
    RegisterEmployerComponent.prototype.onSubmit = function () {
        var _this = this;
        console.log('Submitted');
        console.dir(this.employee);
        console.dir(this.employer);
        this.employerService.registerEmployer(this.employer)
            .subscribe(function (res) {
            console.log('redirecting....');
            console.dir(res);
            _this.router.navigate(['']);
        }, function (err) {
            console.dir(err);
        });
    };
    ;
    RegisterEmployerComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: '',
            template: __webpack_require__(817),
            styles: [__webpack_require__(786)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_4__modules_http_visitor_employer_service__["a" /* EmployerService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_4__modules_http_visitor_employer_service__["a" /* EmployerService */]) === 'function' && _a) || Object, (typeof (_b = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _b) || Object])
    ], RegisterEmployerComponent);
    return RegisterEmployerComponent;
    var _a, _b;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/register-employer.component.js.map

/***/ }),

/***/ 397:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SignUpComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var SignUpComponent = (function () {
    function SignUpComponent() {
        this.title = 'app works!';
    }
    SignUpComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(818),
            styles: [__webpack_require__(787)]
        }), 
        __metadata('design:paramtypes', [])
    ], SignUpComponent);
    return SignUpComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/sign-up.component.js.map

/***/ }),

/***/ 398:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Employee; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return Individual; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return Company; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var Employee = (function () {
    function Employee(userName, fName, lName, eMail, password, employeeType, businessName, controlNumber, businessType, principalOfficeAddress, registrationDate, directorFName, directorLName) {
        if (userName === void 0) { userName = ''; }
        if (fName === void 0) { fName = ''; }
        if (lName === void 0) { lName = ''; }
        if (eMail === void 0) { eMail = ''; }
        if (password === void 0) { password = ''; }
        if (employeeType === void 0) { employeeType = ''; }
        if (businessName === void 0) { businessName = ''; }
        if (controlNumber === void 0) { controlNumber = ''; }
        if (businessType === void 0) { businessType = ''; }
        if (principalOfficeAddress === void 0) { principalOfficeAddress = ''; }
        if (registrationDate === void 0) { registrationDate = ''; }
        if (directorFName === void 0) { directorFName = ''; }
        if (directorLName === void 0) { directorLName = ''; }
        this.userName = userName;
        this.fName = fName;
        this.lName = lName;
        this.eMail = eMail;
        this.password = password;
        this.employeeType = employeeType;
        this.businessName = businessName;
        this.controlNumber = controlNumber;
        this.businessType = businessType;
        this.principalOfficeAddress = principalOfficeAddress;
        this.registrationDate = registrationDate;
        this.directorFName = directorFName;
        this.directorLName = directorLName;
        this.userRole = "employee";
    }
    return Employee;
}());
var Individual = (function (_super) {
    __extends(Individual, _super);
    function Individual() {
        _super.call(this);
        this.employeeType = 'individual';
    }
    return Individual;
}(Employee));
var Company = (function (_super) {
    __extends(Company, _super);
    function Company() {
        _super.call(this);
        this.employeeType = 'company';
    }
    return Company;
}(Employee));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employeeRegistrationModel.js.map

/***/ }),

/***/ 399:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployeeGuard = (function () {
    function EmployeeGuard(router) {
        this.router = router;
    }
    EmployeeGuard.prototype.canActivate = function () {
        console.log('employee Guard');
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            if (user.userRole) {
                if (user.userRole.toString() === 'employee') {
                    console.log('employee');
                    return true;
                }
                // case when  user role  does not match
                this.router.navigate(['logIn']);
                return false;
            }
            //  Case when user exists but user role is not presented
            this.router.navigate(['notFound']);
            return false;
        }
        //  Case when unauthorized request
        console.log('no user');
        this.router.navigate(['logIn']);
        return false;
    };
    EmployeeGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], EmployeeGuard);
    return EmployeeGuard;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employee.guard.js.map

/***/ }),

/***/ 400:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployerGuard = (function () {
    function EmployerGuard(router) {
        this.router = router;
    }
    EmployerGuard.prototype.canActivate = function () {
        console.log('employer Guard');
        var user = JSON.parse(localStorage.getItem('currentUser'));
        console.log('printing user....');
        console.dir(user);
        if (user) {
            if (user.userRole) {
                if (user.userRole.toString() === 'employer') {
                    console.log('employer');
                    return true;
                }
                // case when  user role  does not match
                this.router.navigate(['logIn']);
                return false;
            }
            //  Case when user exists but user role is not presented
            this.router.navigate(['notFound']);
            return false;
        }
        //  Case when unauthorized request
        console.log('no user');
        this.router.navigate(['logIn']);
        return false;
    };
    EmployerGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], EmployerGuard);
    return EmployerGuard;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employer.guard.js.map

/***/ }),

/***/ 401:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitorGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var VisitorGuard = (function () {
    function VisitorGuard(router) {
        this.router = router;
    }
    VisitorGuard.prototype.canActivate = function () {
        console.log('visitor Guard');
        var user = JSON.parse(localStorage.getItem('currentUser'));
        console.dir(user);
        if (!user) {
            return true;
        }
        if (user.userRole === 'employer') {
            this.router.navigate(['employer']);
            return false;
        }
        if (user.userRole === 'employee') {
            this.router.navigate(['employee']);
            return false;
        }
        if (user.userRole === 'administration') {
            this.router.navigate(['administration']);
            return false;
        }
        //  case when  user exists  but  user role not presented
        this.router.navigate(['notFound']);
        return false;
    };
    VisitorGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], VisitorGuard);
    return VisitorGuard;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/visitor.guard.js.map

/***/ }),

/***/ 402:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_http_service__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeJobService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EmployeeJobService = (function (_super) {
    __extends(EmployeeJobService, _super);
    function EmployeeJobService(http) {
        _super.call(this);
        this.http = http;
    }
    EmployeeJobService.prototype.sendProposal = function (proposal) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.genericAPI_url + '/employee/sendproposal', { proposal: proposal }, options)
            .map(this.afterSendProposal)
            .catch(this.handleError);
    };
    EmployeeJobService.prototype.afterSendProposal = function (res) {
        var body = res.json();
        console.log('response arrived...');
        console.dir(body);
        return null;
    };
    EmployeeJobService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    EmployeeJobService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], EmployeeJobService);
    return EmployeeJobService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employee.service.js.map

/***/ }),

/***/ 403:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__authentication_service__ = __webpack_require__(251);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};






var EmployeeService = (function (_super) {
    __extends(EmployeeService, _super);
    //____________________________________________________________________
    function EmployeeService(http1) {
        _super.call(this, http1);
        this.http1 = http1;
    }
    //____________________________________________________________________
    EmployeeService.prototype.registerEmployee = function (employee) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http1.post(this.genericAPI_url + '/register/employee', { employee: employee }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EmployeeService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('data is received');
        console.dir(body);
        //this.saveUserToLocalStorage(body);
        return body.data || {};
    };
    EmployeeService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], EmployeeService);
    return EmployeeService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_4__authentication_service__["a" /* Authentication */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employee.service.js.map

/***/ }),

/***/ 404:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_http_service__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};







var EmployerService = (function (_super) {
    __extends(EmployerService, _super);
    function EmployerService(http) {
        _super.call(this);
        this.http = http;
    }
    EmployerService.prototype.registerEmployer = function (employer) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.genericAPI_url + '/register/employer', { employer: employer }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    EmployerService.prototype.extractData = function (res) {
        var body = res.json();
        console.log('data is received');
        console.dir(body);
        return body.data || {};
    };
    EmployerService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    EmployerService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], EmployerService);
    return EmployerService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employer.service.js.map

/***/ }),

/***/ 405:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs__ = __webpack_require__(449);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_rxjs___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_rxjs__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__generic_http_service__ = __webpack_require__(79);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return WebSocketService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};



var WebSocketService = (function (_super) {
    __extends(WebSocketService, _super);
    function WebSocketService() {
        _super.call(this);
    }
    WebSocketService.prototype.connect = function (url) {
        if (!this.socket) {
            this.socket = this.create(url);
        }
        return this.socket;
    };
    WebSocketService.prototype.create = function (url) {
        var ws = new WebSocket(url);
        var observable = __WEBPACK_IMPORTED_MODULE_1_rxjs__["Observable"].create(function (obs) {
            ws.onmessage = obs.next.bind(obs);
            ws.onerror = obs.error.bind(obs);
            ws.onclose = obs.complete.bind(obs);
            return ws.close.bind(ws);
        });
        var observer = {
            next: function (data) {
                if (ws.readyState === WebSocket.OPEN) {
                    ws.send(JSON.stringify(data));
                }
            }
        };
        return __WEBPACK_IMPORTED_MODULE_1_rxjs__["Subject"].create(observer, observable);
    };
    WebSocketService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [])
    ], WebSocketService);
    return WebSocketService;
}(__WEBPACK_IMPORTED_MODULE_2__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/web-socket.service.js.map

/***/ }),

/***/ 406:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return JobCategory; });
var JobCategory = (function () {
    function JobCategory() {
        this.id = '';
        this.categoryVarName = '';
        this.type = '';
        this.subCategory = [];
    }
    return JobCategory;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/job-category.js.map

/***/ }),

/***/ 407:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__currency__ = __webpack_require__(252);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__duration__ = __webpack_require__(253);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__candidate__ = __webpack_require__(601);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Proposal; });



var Proposal = (function () {
    function Proposal() {
        this.id = '';
        this.hostJobID = '';
        this.candidate = new __WEBPACK_IMPORTED_MODULE_2__candidate__["a" /* Candidate */]();
        this.price = '';
        this.currency = new __WEBPACK_IMPORTED_MODULE_0__currency__["a" /* Currency */]();
        this.duration = new __WEBPACK_IMPORTED_MODULE_1__duration__["a" /* Duration */]();
        this.coverLetter = '';
        this.whyToChoose = '';
        this.offerStatus = '';
    }
    return Proposal;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/proposal.js.map

/***/ }),

/***/ 408:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatter_model__ = __webpack_require__(177);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__subject_model__ = __webpack_require__(604);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Conversation; });


var Conversation = (function () {
    function Conversation() {
        this.Id = '';
        this.me = new __WEBPACK_IMPORTED_MODULE_0__chatter_model__["a" /* Chatter */]();
        this.otherChatters = [];
        this.subject = new __WEBPACK_IMPORTED_MODULE_1__subject_model__["a" /* Subject */]();
        this.message = [];
    }
    return Conversation;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/conversation.model.js.map

/***/ }),

/***/ 409:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__chatter_model__ = __webpack_require__(177);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Message; });

var Message = (function () {
    function Message() {
        this.id = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.text = '';
        this.sender = new __WEBPACK_IMPORTED_MODULE_0__chatter_model__["a" /* Chatter */]();
        this.seenBy = [];
        this.deliveredAt = '';
    }
    return Message;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/message.model.js.map

/***/ }),

/***/ 476:
/***/ (function(module, exports) {

function webpackEmptyContext(req) {
	throw new Error("Cannot find module '" + req + "'.");
}
webpackEmptyContext.keys = function() { return []; };
webpackEmptyContext.resolve = webpackEmptyContext;
module.exports = webpackEmptyContext;
webpackEmptyContext.id = 476;


/***/ }),

/***/ 477:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
Object.defineProperty(__webpack_exports__, "__esModule", { value: true });
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__polyfills_ts__ = __webpack_require__(606);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__ = __webpack_require__(563);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__environments_environment__ = __webpack_require__(605);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_app_module__ = __webpack_require__(594);





if (__WEBPACK_IMPORTED_MODULE_3__environments_environment__["a" /* environment */].production) {
    __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_2__angular_core__["a" /* enableProdMode */])();
}
__webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_platform_browser_dynamic__["a" /* platformBrowserDynamic */])().bootstrapModule(__WEBPACK_IMPORTED_MODULE_4__app_app_module__["a" /* AppModule */]);
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/main.js.map

/***/ }),

/***/ 592:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_router__ = __webpack_require__(34);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__components_visitor_about_us_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__components_visitor_home_component__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__components_visitor_log_in_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__components_visitor_sign_up_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_visitor_register_employee_component__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_visitor_register_employer_component__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_employer_home_component__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_employer_account_component__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_employer_account_personal_info__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_employer_account_address__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_employer_account_assotiation__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_employer_account_change_password__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_employer_account_deactivation__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_employer_job_history_component__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_employer_messenger_component__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_employer_post_job_component__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_employer_subscribe_component__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_employer_offer_component__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_employer_edit_job_component__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_employee_home_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_employee_account_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_employee_history_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_employee_messenger_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_employee_subscribe_component__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_employee_top_workers_component__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_employee_view_job_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__modules_guards_visitor_guard__ = __webpack_require__(401);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppRouter; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};































var routes = [
    {
        path: '',
        component: __WEBPACK_IMPORTED_MODULE_2__components_visitor_home_component__["a" /* HomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_29__modules_guards_visitor_guard__["a" /* VisitorGuard */]]
    },
    {
        path: 'aboutUs',
        component: __WEBPACK_IMPORTED_MODULE_1__components_visitor_about_us_component__["a" /* AboutUsComponent */]
    },
    {
        path: 'logIn',
        component: __WEBPACK_IMPORTED_MODULE_3__components_visitor_log_in_component__["a" /* LogInComponent */]
    },
    {
        path: 'signUp',
        component: __WEBPACK_IMPORTED_MODULE_4__components_visitor_sign_up_component__["a" /* SignUpComponent */]
    },
    {
        path: 'registerEmployer',
        component: __WEBPACK_IMPORTED_MODULE_6__components_visitor_register_employer_component__["a" /* RegisterEmployerComponent */]
    },
    {
        path: 'registerEmployee',
        component: __WEBPACK_IMPORTED_MODULE_5__components_visitor_register_employee_component__["a" /* RegisterEmployeeComponent */]
    },
    //  Employer Routes
    {
        path: 'employer',
        component: __WEBPACK_IMPORTED_MODULE_7__components_employer_home_component__["a" /* EmployerHomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/postJob',
        component: __WEBPACK_IMPORTED_MODULE_16__components_employer_post_job_component__["a" /* EmployerPostJobComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/clientJobHistory',
        component: __WEBPACK_IMPORTED_MODULE_14__components_employer_job_history_component__["a" /* EmployerJobHistoryComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/edit-job/:id',
        component: __WEBPACK_IMPORTED_MODULE_19__components_employer_edit_job_component__["a" /* EditJobComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/subscribes',
        component: __WEBPACK_IMPORTED_MODULE_17__components_employer_subscribe_component__["a" /* EmployerSubscribeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/messenger',
        component: __WEBPACK_IMPORTED_MODULE_15__components_employer_messenger_component__["a" /* EmployerMessengerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/messenger/:id',
        component: __WEBPACK_IMPORTED_MODULE_15__components_employer_messenger_component__["a" /* EmployerMessengerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/offers',
        component: __WEBPACK_IMPORTED_MODULE_18__components_employer_offer_component__["a" /* EmployerOfferComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]]
    },
    {
        path: 'employer/account',
        component: __WEBPACK_IMPORTED_MODULE_8__components_employer_account_component__["a" /* EmployerAccountComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_28__modules_guards_employer_guard__["a" /* EmployerGuard */]],
        children: [
            { path: '',
                component: __WEBPACK_IMPORTED_MODULE_9__components_employer_account_personal_info__["a" /* EmployerAccountPersonalInfoComponent */],
                outlet: 'account',
                pathMatch: 'full' },
            { path: 'addresses',
                component: __WEBPACK_IMPORTED_MODULE_10__components_employer_account_address__["a" /* EmployerAccountAddressComponent */],
                outlet: 'account' },
            { path: 'assotiation',
                component: __WEBPACK_IMPORTED_MODULE_11__components_employer_account_assotiation__["a" /* EmployerAccountAssotiationComponent */],
                outlet: 'account' },
            { path: 'changepassword',
                component: __WEBPACK_IMPORTED_MODULE_12__components_employer_account_change_password__["a" /* EmployerAccountChangePasswordComponent */],
                outlet: 'account' },
            { path: 'deactivation',
                component: __WEBPACK_IMPORTED_MODULE_13__components_employer_account_deactivation__["a" /* EmployerAccountDeactivationComponent */],
                outlet: 'account' }
        ]
    },
    // Employee Routes
    {
        path: 'employee',
        component: __WEBPACK_IMPORTED_MODULE_20__components_employee_home_component__["a" /* EmployeeHomeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    },
    {
        path: 'employee/history',
        component: __WEBPACK_IMPORTED_MODULE_22__components_employee_history_component__["a" /* EmployeeHistoryComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    },
    {
        path: 'employee/messenger',
        component: __WEBPACK_IMPORTED_MODULE_23__components_employee_messenger_component__["a" /* EmployeeMessengerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    },
    {
        path: 'employee/account',
        component: __WEBPACK_IMPORTED_MODULE_21__components_employee_account_component__["a" /* EmployeeAccountComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    },
    {
        path: 'employee/topworker',
        component: __WEBPACK_IMPORTED_MODULE_25__components_employee_top_workers_component__["a" /* EmployeeTopWorkerComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    },
    {
        path: 'employee/subscribes',
        component: __WEBPACK_IMPORTED_MODULE_24__components_employee_subscribe_component__["a" /* EmployeeSubscribeComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    },
    {
        path: 'employee/viewjob/:jobName/:id',
        component: __WEBPACK_IMPORTED_MODULE_26__components_employee_view_job_component__["a" /* EmployeeViewWJobComponent */],
        canActivate: [__WEBPACK_IMPORTED_MODULE_27__modules_guards_employee_guard__["a" /* EmployeeGuard */]]
    }
];
var AppRouter = (function () {
    function AppRouter() {
    }
    AppRouter = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_30__angular_core__["b" /* NgModule */])({
            imports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */].forRoot(routes)],
            exports: [__WEBPACK_IMPORTED_MODULE_0__angular_router__["b" /* RouterModule */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppRouter);
    return AppRouter;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/Router.component.js.map

/***/ }),

/***/ 593:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var AppComponent = (function () {
    function AppComponent() {
        this.title = 'app works!';
    }
    AppComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'app-root',
            template: __webpack_require__(789),
            styles: [__webpack_require__(759)]
        }), 
        __metadata('design:paramtypes', [])
    ], AppComponent);
    return AppComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/app.component.js.map

/***/ }),

/***/ 594:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__ = __webpack_require__(174);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2__angular_forms__ = __webpack_require__(554);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4__app_component__ = __webpack_require__(593);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__components_log_out_component__ = __webpack_require__(597);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__components_visitor_about_us_component__ = __webpack_require__(392);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__components_visitor_home_component__ = __webpack_require__(393);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__components_visitor_log_in_component__ = __webpack_require__(394);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9__components_visitor_sign_up_component__ = __webpack_require__(397);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10__components_visitor_visitor_navbar_component__ = __webpack_require__(598);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11__components_employee_employee_navbar_component__ = __webpack_require__(595);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12__components_employer_employer_navbar_component__ = __webpack_require__(596);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13__components_visitor_register_employee_component__ = __webpack_require__(395);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14__components_visitor_register_employer_component__ = __webpack_require__(396);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15__components_employer_home_component__ = __webpack_require__(386);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_16__components_employer_account_component__ = __webpack_require__(379);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_17__components_employer_account_personal_info__ = __webpack_require__(384);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_18__components_employer_account_address__ = __webpack_require__(380);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_19__components_employer_account_assotiation__ = __webpack_require__(381);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_20__components_employer_account_change_password__ = __webpack_require__(382);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_21__components_employer_account_deactivation__ = __webpack_require__(383);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_22__components_employer_job_history_component__ = __webpack_require__(387);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_23__components_employer_messenger_component__ = __webpack_require__(388);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_24__components_employer_post_job_component__ = __webpack_require__(390);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_25__components_employer_subscribe_component__ = __webpack_require__(391);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_26__components_employer_offer_component__ = __webpack_require__(389);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_27__components_employer_edit_job_component__ = __webpack_require__(385);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_28__components_employee_home_component__ = __webpack_require__(374);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_29__components_employee_account_component__ = __webpack_require__(372);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_30__components_employee_history_component__ = __webpack_require__(373);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_31__components_employee_messenger_component__ = __webpack_require__(375);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_32__components_employee_subscribe_component__ = __webpack_require__(376);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_33__components_employee_top_workers_component__ = __webpack_require__(377);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_34__components_employee_view_job_component__ = __webpack_require__(378);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_35__modules_http_visitor_employer_service__ = __webpack_require__(404);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_36__modules_http_visitor_employee_service__ = __webpack_require__(403);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_37__modules_http_visitor_authentication_service__ = __webpack_require__(251);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_38__modules_http_employer_service__ = __webpack_require__(96);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_39__modules_http_generic_service__ = __webpack_require__(250);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_40__Router_component__ = __webpack_require__(592);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_41__modules_http_chat_service__ = __webpack_require__(125);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_42__modules_http_web_socket_service__ = __webpack_require__(405);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_43__modules_http_employee_service__ = __webpack_require__(402);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_44__modules_guards_admin_guard__ = __webpack_require__(600);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_45__modules_guards_employee_guard__ = __webpack_require__(399);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_46__modules_guards_employer_guard__ = __webpack_require__(400);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_47__modules_guards_visitor_guard__ = __webpack_require__(401);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AppModule; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

















































var AppModule = (function () {
    function AppModule() {
    }
    AppModule = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_1__angular_core__["b" /* NgModule */])({
            declarations: [
                //General
                __WEBPACK_IMPORTED_MODULE_5__components_log_out_component__["a" /* LogOutComponent */],
                __WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */],
                // Visitor
                __WEBPACK_IMPORTED_MODULE_6__components_visitor_about_us_component__["a" /* AboutUsComponent */],
                __WEBPACK_IMPORTED_MODULE_7__components_visitor_home_component__["a" /* HomeComponent */],
                __WEBPACK_IMPORTED_MODULE_8__components_visitor_log_in_component__["a" /* LogInComponent */],
                __WEBPACK_IMPORTED_MODULE_9__components_visitor_sign_up_component__["a" /* SignUpComponent */],
                __WEBPACK_IMPORTED_MODULE_10__components_visitor_visitor_navbar_component__["a" /* VisitorNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_11__components_employee_employee_navbar_component__["a" /* EmployeeNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_12__components_employer_employer_navbar_component__["a" /* EmployerNavbarComponent */],
                __WEBPACK_IMPORTED_MODULE_13__components_visitor_register_employee_component__["a" /* RegisterEmployeeComponent */],
                __WEBPACK_IMPORTED_MODULE_14__components_visitor_register_employer_component__["a" /* RegisterEmployerComponent */],
                // Employer
                __WEBPACK_IMPORTED_MODULE_15__components_employer_home_component__["a" /* EmployerHomeComponent */],
                __WEBPACK_IMPORTED_MODULE_16__components_employer_account_component__["a" /* EmployerAccountComponent */],
                //++++++++++++++++++++++++++++
                __WEBPACK_IMPORTED_MODULE_17__components_employer_account_personal_info__["a" /* EmployerAccountPersonalInfoComponent */],
                __WEBPACK_IMPORTED_MODULE_18__components_employer_account_address__["a" /* EmployerAccountAddressComponent */],
                __WEBPACK_IMPORTED_MODULE_19__components_employer_account_assotiation__["a" /* EmployerAccountAssotiationComponent */],
                __WEBPACK_IMPORTED_MODULE_20__components_employer_account_change_password__["a" /* EmployerAccountChangePasswordComponent */],
                __WEBPACK_IMPORTED_MODULE_21__components_employer_account_deactivation__["a" /* EmployerAccountDeactivationComponent */],
                //____________________________
                __WEBPACK_IMPORTED_MODULE_22__components_employer_job_history_component__["a" /* EmployerJobHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_23__components_employer_messenger_component__["a" /* EmployerMessengerComponent */],
                __WEBPACK_IMPORTED_MODULE_24__components_employer_post_job_component__["a" /* EmployerPostJobComponent */],
                __WEBPACK_IMPORTED_MODULE_25__components_employer_subscribe_component__["a" /* EmployerSubscribeComponent */],
                __WEBPACK_IMPORTED_MODULE_26__components_employer_offer_component__["a" /* EmployerOfferComponent */],
                __WEBPACK_IMPORTED_MODULE_27__components_employer_edit_job_component__["a" /* EditJobComponent */],
                // Employee 
                __WEBPACK_IMPORTED_MODULE_28__components_employee_home_component__["a" /* EmployeeHomeComponent */],
                __WEBPACK_IMPORTED_MODULE_29__components_employee_account_component__["a" /* EmployeeAccountComponent */],
                __WEBPACK_IMPORTED_MODULE_30__components_employee_history_component__["a" /* EmployeeHistoryComponent */],
                __WEBPACK_IMPORTED_MODULE_31__components_employee_messenger_component__["a" /* EmployeeMessengerComponent */],
                __WEBPACK_IMPORTED_MODULE_32__components_employee_subscribe_component__["a" /* EmployeeSubscribeComponent */],
                __WEBPACK_IMPORTED_MODULE_33__components_employee_top_workers_component__["a" /* EmployeeTopWorkerComponent */],
                __WEBPACK_IMPORTED_MODULE_34__components_employee_view_job_component__["a" /* EmployeeViewWJobComponent */]
            ],
            imports: [
                __WEBPACK_IMPORTED_MODULE_0__angular_platform_browser__["a" /* BrowserModule */],
                __WEBPACK_IMPORTED_MODULE_2__angular_forms__["a" /* FormsModule */],
                __WEBPACK_IMPORTED_MODULE_3__angular_http__["a" /* HttpModule */],
                __WEBPACK_IMPORTED_MODULE_40__Router_component__["a" /* AppRouter */]
            ],
            providers: [
                //
                __WEBPACK_IMPORTED_MODULE_35__modules_http_visitor_employer_service__["a" /* EmployerService */], __WEBPACK_IMPORTED_MODULE_36__modules_http_visitor_employee_service__["a" /* EmployeeService */], __WEBPACK_IMPORTED_MODULE_37__modules_http_visitor_authentication_service__["a" /* Authentication */],
                __WEBPACK_IMPORTED_MODULE_41__modules_http_chat_service__["a" /* ChatService */], __WEBPACK_IMPORTED_MODULE_42__modules_http_web_socket_service__["a" /* WebSocketService */], __WEBPACK_IMPORTED_MODULE_39__modules_http_generic_service__["a" /* GenericService */],
                __WEBPACK_IMPORTED_MODULE_43__modules_http_employee_service__["a" /* EmployeeJobService */], __WEBPACK_IMPORTED_MODULE_38__modules_http_employer_service__["a" /* OfferService */],
                //Guards
                __WEBPACK_IMPORTED_MODULE_44__modules_guards_admin_guard__["a" /* AdminGuard */], __WEBPACK_IMPORTED_MODULE_46__modules_guards_employer_guard__["a" /* EmployerGuard */], __WEBPACK_IMPORTED_MODULE_45__modules_guards_employee_guard__["a" /* EmployeeGuard */], __WEBPACK_IMPORTED_MODULE_47__modules_guards_visitor_guard__["a" /* VisitorGuard */],
                //registered
                __WEBPACK_IMPORTED_MODULE_38__modules_http_employer_service__["b" /* CategoryService */], __WEBPACK_IMPORTED_MODULE_38__modules_http_employer_service__["c" /* JobService */]
            ],
            bootstrap: [__WEBPACK_IMPORTED_MODULE_4__app_component__["a" /* AppComponent */]]
        }), 
        __metadata('design:paramtypes', [])
    ], AppModule);
    return AppModule;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/app.module.js.map

/***/ }),

/***/ 595:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployeeNavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var EmployeeNavbarComponent = (function () {
    function EmployeeNavbarComponent() {
        this.title = 'app works!';
    }
    EmployeeNavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'employee',
            template: __webpack_require__(791),
            styles: [__webpack_require__(761)]
        }), 
        __metadata('design:paramtypes', [])
    ], EmployeeNavbarComponent);
    return EmployeeNavbarComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employee-navbar.component.js.map

/***/ }),

/***/ 596:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__ = __webpack_require__(125);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return EmployerNavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var EmployerNavbarComponent = (function () {
    function EmployerNavbarComponent(chatService) {
        this.chatService = chatService;
        this.title = 'app works!';
    }
    EmployerNavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'employer',
            template: __webpack_require__(805),
            styles: [__webpack_require__(775)]
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__["a" /* ChatService */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__modules_http_chat_service__["a" /* ChatService */]) === 'function' && _a) || Object])
    ], EmployerNavbarComponent);
    return EmployerNavbarComponent;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employer-navbar.component.js.map

/***/ }),

/***/ 597:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return LogOutComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var LogOutComponent = (function () {
    function LogOutComponent(router) {
        this.router = router;
    }
    LogOutComponent.prototype.logOut = function () {
        localStorage.removeItem('currentUser');
        this.router.navigate(['logIn']);
    };
    LogOutComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'log-out',
            template: __webpack_require__(812)
        }), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], LogOutComponent);
    return LogOutComponent;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/log-out.component.js.map

/***/ }),

/***/ 598:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return VisitorNavbarComponent; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};

var VisitorNavbarComponent = (function () {
    function VisitorNavbarComponent() {
        this.title = 'app works!';
    }
    VisitorNavbarComponent = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["_4" /* Component */])({
            selector: 'visitor',
            template: __webpack_require__(819),
            styles: [__webpack_require__(788)]
        }), 
        __metadata('design:paramtypes', [])
    ], VisitorNavbarComponent);
    return VisitorNavbarComponent;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/visitor-navbar.component.js.map

/***/ }),

/***/ 599:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Employer; });
var Employer = (function () {
    function Employer(userName, fName, lName, eMail, password) {
        if (userName === void 0) { userName = ''; }
        if (fName === void 0) { fName = ''; }
        if (lName === void 0) { lName = ''; }
        if (eMail === void 0) { eMail = ''; }
        if (password === void 0) { password = ''; }
        this.userName = userName;
        this.fName = fName;
        this.lName = lName;
        this.eMail = eMail;
        this.password = password;
        this.userRole = 'employer';
    }
    return Employer;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employerRegistrationModel.js.map

/***/ }),

/***/ 600:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_router__ = __webpack_require__(34);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return AdminGuard; });
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};


var AdminGuard = (function () {
    function AdminGuard(router) {
        this.router = router;
    }
    AdminGuard.prototype.canActivate = function () {
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            if (user.userRole) {
                if (user.userRole === 'admin') {
                    return true;
                }
                return false;
            }
            return false;
        }
        return false;
    };
    AdminGuard = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_router__["a" /* Router */]) === 'function' && _a) || Object])
    ], AdminGuard);
    return AdminGuard;
    var _a;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/admin.guard.js.map

/***/ }),

/***/ 601:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Candidate; });
var Candidate = (function () {
    function Candidate() {
        this.id = '';
        this.contactPhone = '';
        this.createdAt = '';
        this.updatedAt = '';
        this.userName = '';
        this.email = '';
        this.fName = '';
        this.lName = '';
        this.userRole = '';
        this.feadback = [];
        this.portfolio = [];
        this.services = [];
        this.subscribes = [];
        this.subscribers = [];
    }
    return Candidate;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/candidate.js.map

/***/ }),

/***/ 602:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Feadback; });
var Feadback = (function () {
    function Feadback() {
        this.jobId = '';
        this.proposalId = '';
        this.candidateId = '';
        this.ownerId = '';
        this.score = '0';
        this.text = '';
    }
    return Feadback;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/feadback.js.map

/***/ }),

/***/ 603:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return SearchModel; });
var SearchModel = (function () {
    function SearchModel() {
        this.owner = '';
        this.searchString = '';
        this.category = '';
        this.subCategory = '';
    }
    return SearchModel;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/search.model.js.map

/***/ }),

/***/ 604:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return Subject; });
var Subject = (function () {
    function Subject() {
        this.Id = '';
        this.title = '';
    }
    return Subject;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/subject.model.js.map

/***/ }),

/***/ 605:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return environment; });
// The file contents for the current environment will overwrite these during build.
// The build system defaults to the dev environment which uses `environment.ts`, but if you do
// `ng build --env=prod` then `environment.prod.ts` will be used instead.
// The list of which env maps to which file can be found in `angular-cli.json`.
var environment = {
    production: false
};
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/environment.js.map

/***/ }),

/***/ 606:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__ = __webpack_require__(620);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_0_core_js_es6_symbol__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__ = __webpack_require__(613);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1_core_js_es6_object___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_1_core_js_es6_object__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__ = __webpack_require__(609);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_core_js_es6_function___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_core_js_es6_function__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__ = __webpack_require__(615);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_core_js_es6_parse_int__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__ = __webpack_require__(614);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_core_js_es6_parse_float__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__ = __webpack_require__(612);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5_core_js_es6_number___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_5_core_js_es6_number__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__ = __webpack_require__(611);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6_core_js_es6_math___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_6_core_js_es6_math__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__ = __webpack_require__(619);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7_core_js_es6_string___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_7_core_js_es6_string__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__ = __webpack_require__(608);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8_core_js_es6_date___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_8_core_js_es6_date__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__ = __webpack_require__(607);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_9_core_js_es6_array___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_9_core_js_es6_array__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__ = __webpack_require__(617);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_10_core_js_es6_regexp__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__ = __webpack_require__(610);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_11_core_js_es6_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_11_core_js_es6_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__ = __webpack_require__(618);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_12_core_js_es6_set___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_12_core_js_es6_set__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__ = __webpack_require__(616);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_13_core_js_es6_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__ = __webpack_require__(621);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_14_core_js_es7_reflect__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__ = __webpack_require__(1082);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_15_zone_js_dist_zone__);
















//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/polyfills.js.map

/***/ }),

/***/ 759:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 760:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 761:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 762:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 763:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 764:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 765:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 766:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 767:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 768:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 769:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 770:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 771:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 772:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 773:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 774:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 775:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 776:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 777:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 778:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 779:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 780:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 781:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 782:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 783:
/***/ (function(module, exports) {

module.exports = "\n.outerpadding{\n    padding:10% 0%;}\n.boximg{\n\tposition:relative;\n\toverflow:hidden;\n\t}\n\t\n.boximg img{\n\t\t-webkit-transition:all ease-in 500ms;\n\t\ttransition:all ease-in 500ms;\n\t\tborder:1px solid #fff;\n\t}\t\n.boximg img:hover{\n\t-webkit-transform:scale(1.3,1.3);\n\t        transform:scale(1.3,1.3);\n\tcursor:pointer;\n\t\n\t}\t\n\t\n.boximg:hover{\n\tborder:1px solid #fff;\n\t}\t\n\t\n.date{\n\t left: 0;\n    position: absolute;\n    top: 15px;\n\tpadding:5px;\n\tbackground-color:teal;\n\topacity:0;\n\t-webkit-transition:all ease-in 300ms;\n\ttransition:all ease-in 300ms;\n\t\n\t}\t\n\t\n.likebut{\n\t  background: none repeat scroll 0 0 teal;\n    height: 25px;\n    padding: 7px;\n    position: absolute;\n    right: 5px;\n    top: 130px;\n    width: 25px;\n\topacity:0.4;\n\t-webkit-transition:all ease-in 300ms;\n\ttransition:all ease-in 300ms;\n\t}\n\t\n\t\n.boximg:hover .date{\n\topacity:1;\n\t\n\t}\t\n.boximg:hover .likebut{\n\topacity:1;\n\t\n}"

/***/ }),

/***/ 784:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 785:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 786:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 787:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 788:
/***/ (function(module, exports) {

module.exports = ""

/***/ }),

/***/ 789:
/***/ (function(module, exports) {

module.exports = "\n<!--\n<employee></employee>\n<employer></employer>-->\n\n<router-outlet></router-outlet>"

/***/ }),

/***/ 79:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return GenericHttp; });
var GenericHttp = (function () {
    function GenericHttp() {
        this.httpProtocol = 'http:';
        this.httpsProtocol = 'https:';
        this.wsProtocol = 'ws:';
        this.serverIP = 'geolimgo.herokuapp.com';
        this.serverPort = '3311';
        this.server = this.serverIP; //+ ':' + this.serverPort;
        this.genericAPI_url = this.httpProtocol + '//' + this.server + '/api';
        this.genericWS_url = this.wsProtocol + '//' + this.server;
    }
    return GenericHttp;
}());
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/generic.http.service.js.map

/***/ }),

/***/ 790:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n\nAccount"

/***/ }),

/***/ 791:
/***/ (function(module, exports) {

module.exports = "<header>\n    <div class=\"navbar-wrapper\">\n        <nav class=\"navbar navbar-inverse navbar-static-top black-color\" role=\"navigation\">\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n                                    <span class=\"sr-only\">Toggle navigation</span>\n                                    <span class=\"icon-bar\"></span>\n                                    <span class=\"icon-bar\"></span>\n                                    <span class=\"icon-bar\"></span>\n                                </button>\n                </div>\n                <div class=\"container-fluid\" id=\"\">\n                    <div class=\"navbar-header\">\n                        <a [routerLink]=\"['/']\"><img src=\"./public/images/logo.png\" alt=\"\"></a>\n                    </div>\n\n                   <ul class=\"nav navbar-nav\">\n                                  <li><a routerLink=\"/\">Home</a> </li>\n                                  <li><a routerLink=\"/employee/history\">History</a> </li>\n                                  <!-- <li><a href=\"toprank\"></a> </li>\n                                  <li><a href=\"blog\"></a> </li> -->\n                                  <!-- <li><a href=\"about\">About Us</a> </li> -->\n                                  <!-- <li class=\"dropdown\">\n\n                                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">History\n                                    <span class=\"caret\"></span></a>\n                                    <ul class=\"dropdown-menu\">\n                                      <li><a href=\"#\">Proposals</a></li>\n                                      <li><a href=\"#\">Interviewing</a></li>\n                                      <li><a href=\"#\">Active Jobs</a></li>\n                                      <li><a href=\"#\">Finished Jobs</a></li>                                        \n                                    </ul>\n                                  </li> -->\n                                  <li><a routerLink=\"/employee/topworker\">Top Workers</a> </li>\n                                  <li><a routerLink=\"/employee/messenger\">Message</a> </li>\n                                  <li><a routerLink=\"/employee/subscribes\">Subscribes</a> </li>\n                                  <li><a routerLink=\"/employee/account\">Account</a> </li>\n                                  \n                                 <!--  <li class=\"dropdown\">\n                                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">Profile\n                                    <span class=\"caret\"></span></a>\n                                    <ul class=\"dropdown-menu\">\n                                      <li><a href=\"#\">About your company</a></li>\n                                      <li><a href=\"#\">Manage Workers</a></li>\n                                      <li><a href=\"#\">Accouunt</a></li>\n                                      <li><a href=\"#\">Settings</a></li>  \n                                    </ul>\n                                  </li> -->\n                                  \n\n\n                                   \n                                </ul>\n                                <log-out></log-out>\n                </div>\n            </div>\n        </nav>\n    </div>\n</header>"

/***/ }),

/***/ 792:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n\nHistory"

/***/ }),

/***/ 793:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n<div style=\"display:inline-flex\">\n    <div style=\"display: inline-block;width:20%\">\n\n        <div class=\"container\" style=\"padding-left:0px;width:100%\">\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n\n\n                    <form (ngSubmit)=\"onSubmit()\" #searchForm=\"ngForm\">\n\n\n                        <div class=\"input-group\" id=\"adv-search\" style=\"display: inline-block\">\n\n\n\n\n                            <div class=\"form-group\">\n                                <label for=\"filter\">Choose Category</label>\n\n                                <select class=\"form-control\" (change)=\"onChange($event.target.value)\" name=\"category\">\n                                        <option  selected value> -- Select Category -- </option>\n                                        <option *ngFor=\"let cat of jobCategory\" value=\"{{ cat.id }}\" >{{ cat.categoryVarName }}</option>\n                                        \n                                    </select>\n                            </div>\n\n                            <div class=\"form-group\" *ngIf=\"categorySelected\">\n                                <label for=\"filter\">Choose Sub Category</label>\n\n                                <select class=\"form-control\" name=\"subcategory\" (change)=\"subCategoryChanged($event.target.value)\">\n                                        <option  selected value> -- Select sub Category -- </option>\n                                        <option *ngFor=\"let cat of subCategory\" value=\"{{ cat.id }}\" >{{ cat.categoryVarName }}</option>\n                                        \n                                    </select>\n                            </div>\n\n                            <br/>\n                            <div class=\"form-group\">\n                                <br/>\n                                <label for=\"filter\">Search By Keywords</label>\n                            </div>\n\n                            <div class=\"form-group\" style=\"display: table-row\">\n\n\n                                <input type=\"text\" [(ngModel)]=\"searchModel.searchString\" class=\"form-control\" placeholder=\"Search for snippets\" name=\"jobSearch\" />\n                                <div class=\"input-group-btn\">\n\n                                    <div class=\"btn-group\" role=\"group\">\n\n                                        <button type=\"submit\" class=\"btn btn-primary\"><span class=\"glyphicon glyphicon-search\" aria-hidden=\"true\"></span></button>\n                                    </div>\n                                </div>\n                            </div>\n\n\n\n\n                            <br/><br/><br/>\n\n\n\n\n                        </div>\n                    </form>\n\n                    <div style=\"display:table-row\">\n\n                        <h1>Recent Searches</h1>\n                        <br/>\n                        <a href=\"\">Search 1</a>\n                        <br/>\n                        <a href=\"\">Search 2</a>\n                        <br/>\n                        <a href=\"\">Search 3</a>\n                        <br/>\n                        <a href=\"\">Search 4</a>\n                        <br/>\n                        <a href=\"\">Search 5</a>\n                        <br/>\n                    </div>\n\n\n                </div>\n            </div>\n        </div>\n\n\n    </div>\n\n    <div style=\"width:80%\">\n        <div class=\"container\" style=\"width:100%\">\n            <div class=\"col-md-12\">\n\n                <div *ngFor = \"let job of jobList\">\n                    <a routerLink=\"/employee/viewjob/{{ job.jobTitle }}/{{ job.id }}\">\n                        <h1>{{ job.jobTitle }}</h1>\n                    </a>\n                    <p>{{ job.jobDescription }}</p>\n                    <div>\n                        <span class=\"badge\">Posted {{ job.createdAt }}</span>\n                        <!--<div class=\"pull-right\">\n                            <span class=\"label label-default\">alice</span>\n                            <span class=\"label label-primary\">story</span>\n                            <span class=\"label label-success\">blog</span>\n                            <span class=\"label label-info\">personal</span>\n                            <span class=\"label label-warning\">Warning</span>\n                            <span class=\"label label-danger\">Danger</span>\n                        </div>-->\n                    </div>\n                    <hr>\n                </div>\n\n\n                <!--<div>\n                    <h1>Revolution has begun!</h1>\n                    <p>'I am bound to Tahiti for more men.' 'Very good. Let me board you a moment—I come in peace.' With that\n                        he leaped from the canoe, swam to the boat; and climbing the gunwale, stood face to face with the\n                        captain. 'Cross your arms, sir; throw back your head. Now, repeat after me. As soon as Steelkilt\n                        leaves me, I swear to beach this boat on yonder island, and remain there six days. If I do not, may\n                        lightning strike me!'A pretty scholar,' laughed the Lakeman. 'Adios, Senor!' and leaping into the\n                        sea, he swam back to his comrades.</p>\n                    <div>\n                        <span class=\"badge\">Posted 2012-08-02 20:47:04</span>\n                        <div class=\"pull-right\"><span class=\"label label-default\">alice</span> <span class=\"label label-primary\">story</span> <span\n                                class=\"label label-success\">blog</span> <span class=\"label label-info\">personal</span> <span\n                                class=\"label label-warning\">Warning</span>\n                            <span class=\"label label-danger\">Danger</span></div>\n                    </div>\n                    <hr>\n                </div>-->\n\n\n            </div>\n        </div>\n    </div>\n</div>"

/***/ }),

/***/ 794:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n\n\n\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css\" rel=\"stylesheet\">\n<div class=\"container bootstrap snippet\">\n    <div class=\"row\">\n        <div class=\"col-md-4 bg-white \">\n            <div class=\" row border-bottom padding-sm\" style=\"height: 40px;\">\n                Member\n            </div>\n\n            <!-- =============================================================== -->\n            <!-- member list -->\n            <ul class=\"friend-list\">\n\n\n                <li *ngFor=\"let conversation of conversationList\" class=\"active bounceInDown\">\n                    <a href=\"#\" class=\"clearfix\">\n                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" alt=\"\" class=\"img-circle\">\n                        <div class=\"friend-name\">\n                            <strong *ngFor=\"let chatter of conversation.otherChatters\">{{chatter.fName + ' ' + chatter.lName}}</strong>\n                        </div>\n                        <!--<div class=\"last-message text-muted\">Hello, Are you there?</div>\n                \t\t<small class=\"time text-muted\">Just now</small>\n                \t\t<small class=\"chat-alert label label-danger\">1</small>-->\n                    </a>\n                </li>\n\n            </ul>\n        </div>\n\n        <!--=========================================================-->\n        <!-- selected chat -->\n        <div *ngFor=\"let conversation of conversationList\" class=\"col-md-8 bg-white \">\n            <div class=\"chat-message\">\n                <ul class=\"chat\">\n\n                    <li *ngFor=\"let message of conversation.message\" class=\"{{message.sender.Id !== conversation.me.Id ? 'left clearfix' : 'right clearfix' }}\" >\n\n                        <div *ngIf=\"message.sender.Id !== conversation.me.Id\">\n                            <span class=\"chat-img pull-left\">\n                            <img src=\"http://bootdey.com/img/Content/user_3.jpg\" alt=\"User Avatar\">\n                        </span>\n                            <div class=\"chat-body clearfix\">\n                                <div class=\"header\">\n                                    <strong class=\"primary-font\">{{message.sender.fName + ' ' +message.sender.lName }}</strong>\n                                    <small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o\"></i> 12 mins ago</small>\n                                </div>\n                                <p>\n                                    {{message.text}}\n                                </p>\n                            </div>\n                        </div>\n\n\n                        <div *ngIf=\"message.sender.Id == conversation.me.Id\">\n                            <span class=\"chat-img pull-right\">\n\t\t\t                    \t\t<img src=\"http://bootdey.com/img/Content/user_1.jpg\" alt=\"User Avatar\">\n\t\t\t                    \t</span>\n                            <div class=\"chat-body clearfix\">\n                                <div class=\"header\">\n                                    <strong class=\"primary-font\">{{message.sender.fName + ' ' +message.sender.lName }}</strong>\n                                    <small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o\"></i> 13 mins ago</small>\n                                </div>\n                                <p>\n                                    {{message.text}}\n                                </p>\n                            </div>\n                        </div>\n                    </li>\n\n\n\n\n\n                </ul>\n            </div>\n\n            <form (ngSubmit)=\"sendMessage(conversation.Id,conversation.me.Id,conversation.subject.Id,$event)\">\n                <div class=\"chat-box bg-white\">\n                    <div class=\"input-group\">\n                        <input class=\"form-control border no-shadow no-rounded\" placeholder=\"Type your message here\">\n                        <span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"btn btn-success no-rounded\" type=\"submit\" value=\"send\">\n\t\t\t\t\t\t</span>\n                    </div>\n                    <!-- /input-group -->\n                </div>\n            </form>\n\n        </div>\n\n\n    </div>\n</div>\n\n<style>\n    .bg-white {\n        background-color: #fff;\n    }\n    \n    .friend-list {\n        list-style: none;\n        margin-left: -40px;\n    }\n    \n    .friend-list li {\n        border-bottom: 1px solid #eee;\n    }\n    \n    .friend-list li a img {\n        float: left;\n        width: 45px;\n        height: 45px;\n        margin-right: 0px;\n    }\n    \n    .friend-list li a {\n        position: relative;\n        display: block;\n        padding: 10px;\n        transition: all .2s ease;\n        -webkit-transition: all .2s ease;\n        -moz-transition: all .2s ease;\n        -ms-transition: all .2s ease;\n        -o-transition: all .2s ease;\n    }\n    \n    .friend-list li.active a {\n        background-color: #f1f5fc;\n    }\n    \n    .friend-list li a .friend-name,\n    .friend-list li a .friend-name:hover {\n        color: #777;\n    }\n    \n    .friend-list li a .last-message {\n        width: 65%;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;\n    }\n    \n    .friend-list li a .time {\n        position: absolute;\n        top: 10px;\n        right: 8px;\n    }\n    \n    small,\n    .small {\n        font-size: 85%;\n    }\n    \n    .friend-list li a .chat-alert {\n        position: absolute;\n        right: 8px;\n        top: 27px;\n        font-size: 10px;\n        padding: 3px 5px;\n    }\n    \n    .chat-message {\n        padding: 60px 20px 115px;\n    }\n    \n    .chat {\n        list-style: none;\n        margin: 0;\n    }\n    \n    .chat-message {\n        background: #f9f9f9;\n    }\n    \n    .chat li img {\n        width: 45px;\n        height: 45px;\n        border-radius: 50em;\n        -moz-border-radius: 50em;\n        -webkit-border-radius: 50em;\n    }\n    \n    img {\n        max-width: 100%;\n    }\n    \n    .chat-body {\n        padding-bottom: 20px;\n    }\n    \n    .chat li.left .chat-body {\n        margin-left: 70px;\n        background-color: #fff;\n    }\n    \n    .chat li .chat-body {\n        position: relative;\n        font-size: 11px;\n        padding: 10px;\n        border: 1px solid #f1f5fc;\n        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n        -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n    }\n    \n    .chat li .chat-body .header {\n        padding-bottom: 5px;\n        border-bottom: 1px solid #f1f5fc;\n    }\n    \n    .chat li .chat-body p {\n        margin: 0;\n    }\n    \n    .chat li.left .chat-body:before {\n        position: absolute;\n        top: 10px;\n        left: -8px;\n        display: inline-block;\n        background: #fff;\n        width: 16px;\n        height: 16px;\n        border-top: 1px solid #f1f5fc;\n        border-left: 1px solid #f1f5fc;\n        content: '';\n        transform: rotate(-45deg);\n        -webkit-transform: rotate(-45deg);\n        -moz-transform: rotate(-45deg);\n        -ms-transform: rotate(-45deg);\n        -o-transform: rotate(-45deg);\n    }\n    \n    .chat li.right .chat-body:before {\n        position: absolute;\n        top: 10px;\n        right: -8px;\n        display: inline-block;\n        background: #fff;\n        width: 16px;\n        height: 16px;\n        border-top: 1px solid #f1f5fc;\n        border-right: 1px solid #f1f5fc;\n        content: '';\n        transform: rotate(45deg);\n        -webkit-transform: rotate(45deg);\n        -moz-transform: rotate(45deg);\n        -ms-transform: rotate(45deg);\n        -o-transform: rotate(45deg);\n    }\n    \n    .chat li {\n        margin: 15px 0;\n    }\n    \n    .chat li.right .chat-body {\n        margin-right: 70px;\n        background-color: #fff;\n    }\n    \n    .chat-box {\n        position: fixed;\n        bottom: 0;\n        left: 444px;\n        right: 0;\n        padding: 15px;\n        border-top: 1px solid #eee;\n        transition: all .5s ease;\n        -webkit-transition: all .5s ease;\n        -moz-transition: all .5s ease;\n        -ms-transition: all .5s ease;\n        -o-transition: all .5s ease;\n    }\n    \n    .primary-font {\n        color: #3c8dbc;\n    }\n    \n    a:hover,\n    a:active,\n    a:focus {\n        text-decoration: none;\n        outline: 0;\n    }\n</style>"

/***/ }),

/***/ 795:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n\n\nsubscribe"

/***/ }),

/***/ 796:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n\n\ntop workers"

/***/ }),

/***/ 797:
/***/ (function(module, exports) {

module.exports = "<employee></employee>\n\n\n\n\n\n<div class=\"container-fluid\">\n    <div class=\"row\">\n        <div class=\"col-md-12\">\n            <form class=\"col-md-12\">\n                <div class=\"form-group\">\n                    <!-- <input type=\"text\" class=\"form-control\" placeholder=\"Search\"> -->\n                </div>\n            </form>\n        </div>\n    </div>\n\n    <div class=\"row\">\n\n        <!--   !!!!image section!!!!   -->\n\n\n        <!--<div class=\"col-md-4\">\n\n            <div class=\"row\">\n                <div class=\"col-md-12\">\n                    <img src=\"http://placehold.it/210x210\" class=\"img-rounded\" alt=\"Cinque Terre\" width=\"210\" height=\"210\">\n                </div>\n            </div>\n            <div class=\"row\">\n                <div class=\"col-md-3\">\n                    <img src=\"http://placehold.it/70x70\" class=\"img-rounded\" alt=\"Cinque Terre\" width=\"70\" height=\"70\">\n                </div>\n                <div class=\"col-md-3\">\n                    <img src=\"http://placehold.it/70x70\" class=\"img-rounded\" alt=\"Cinque Terre\" width=\"70\" height=\"70\">\n                </div>\n                <div class=\"col-md-3\">\n                    <img src=\"http://placehold.it/70x70\" class=\"img-rounded\" alt=\"Cinque Terre\" width=\"70\" height=\"70\">\n                </div>\n            </div>\n\n        </div>-->\n\n\n        <div class=\"col-md-8\">\n            <div class=\"product-title\">\n                <h1>{{jobPost.jobTitle}}</h1>\n            </div>\n            <div class=\"product-desc\">\n\n                <h3>{{jobPost.jobDescription}}</h3>\n\n            </div>\n            <div>\n                payment type\n                <h2>{{jobPost.paymentType}}</h2>\n            </div>\n            <div class=\"product-price\">\n                Job Budget : {{jobPost.budget}}  {{jobPost.currency}}\n            </div>\n\n            <div>\n                create date\n                {{jobPost.createdAt}}\n            </div>\n            <div>\n                deadline\n                {{jobPost.deadline}}\n            </div>\n            <div>\n                project type\n                <h2>{{jobPost.projectType}}</h2>\n            </div>\n        </div>\n\n\n\n\n\n        <div class=\"row\">\n            <div class=\"col-md-12\">\n                <div class=\"nav\">\n                    <div class=\"taboz\">\n                        <ul class=\"nav nav-tabs nav_tabs\">\n                            <li class=\"active\">\n                                <a href=\"#about\" data-toggle=\"tab\">About Client</a>\n                            </li>\n\n                            <li [ngStyle] = \"changeApplyVisibility\"><a href=\"#changeproposal\" data-toggle=\"tab\">Change Proposal Terms</a>\n\n                            </li>\n\n                            <li><a href=\"#progress\" data-toggle=\"tab\">Job Progress</a>\n\n                            </li>\n\n                            <li [ngStyle] = \"applyVisibility\"><a href=\"#apply\" data-toggle=\"tab\">Apply for this job</a>\n\n                            </li>\n\n                        </ul>\n                    </div>\n                </div>\n            </div>\n        </div>\n\n\n        <div class=\"col-sm-9 tab-content\" id=\"about\">\n            <div class=\"form-group\">\n                <label class=\"form-control\">owner</label>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"form-control\">client</label>\n            </div>\n            <div class=\"form-group\">\n                <label class=\"form-control\">last visited</label>\n            </div>\n        </div>\n\n        <div class=\"col-sm-9 tab-content\" id=\"changeproposal\" *ngIf=\"alreadyApplied\">\n           Change Proposal Terms\n        </div>\n\n        <div class=\"col-sm-9 tab-content\" id=\"progress\">\n            JOB progress\n        </div>\n\n        <div class=\"col-sm-9 tab-content\" id=\"apply\" *ngIf=\"!alreadyApplied\">\n            <form (ngSubmit)=\"sendProposal()\" >\n\n               \n\n                <div class=\"form-group\">\n                    <label for=\"price\" class=\"\">Price You offer</label>\n                    <input type=\"text\" name=\"price\" id=\"price\" class=\"form-control\" required=\"required\" [(ngModel)] = \"proposal.price\" >\n                </div>\n                <div class=\"form-group\">\n                    <label for=\"CURRENCY\">CURRENCY</label>\n                    <select class=\"form-control\" id=\"CURRENCY\" name=\"CURRENCY\" required=\"required\" (change)=\"currencyChanged($event.target.value)\">\n                         <option *ngFor=\"let currency of currencyList\" value=\"{{currency.id}}\">{{currency.currency}}</option>\n                    </select>\n                </div>\n\n\n\n                <div class=\"form-group\">\n                    <label for=\"duration\">Estimated Duration</label>\n                    <select class=\"form-control\" id=\"duration\" name=\"duration\" required=\"required\" (change)=\"durationChanged($event.target.value)\">\n                         <option *ngFor=\"let duration of durationList\" value=\"{{duration.id}}\">{{duration.duration}}</option>\n                    </select>\n                </div>\n\n\n\n                <div class=\"form-group\">\n                    <label for=\"coverLetter\" class=\"\">Cover Letter</label>\n                    <textarea rows=\"5\" name=\"coverLetter\" id=\"coverLetter\" placeholder=\"Cover Letter\" class=\"form-control\" required=\"required\" [(ngModel)] = \"proposal.coverLetter\" ></textarea>\n                </div>\n\n                <div class=\"form-group\">\n                    <label for=\"whyYouFit\" class=\"\">Why are  you BEST fit for this project</label>\n                    <textarea rows=\"5\" name=\"whyYouFit\" id=\"coverLetter\" placeholder=\"\" class=\"form-control\" required=\"required\" [(ngModel)] = \"proposal.whyToChoose\" ></textarea>\n                </div>\n\n                <div class=\"form-group\">\n                    <input type=\"submit\" class=\"form-control\" value=\"Apply\">\n                </div>\n\n\n            </form>\n        </div>\n\n\n\n\n\n\n\n    </div>\n</div>"

/***/ }),

/***/ 798:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n\n<div class=\"container-fluid\" >\n  <div class=\"row content\">\n    <div class=\"col-sm-3 sidenav\">\n      <p>Your Account</p>\n      <div class=\"nav\">\n        <div class=\"taboz\">\n          <ul class=\"nav nav-pills nav-stacked\">\n            <li><a  [routerLink]=\"['/employer/account']\" >Personal Information</a></li>\n            <li><a  [routerLink]=\"['/employer/account', {outlets: {'account': ['addresses']}}]\" >Address</a></li>\n            <li><a  [routerLink]=\"['/employer/account', {outlets: {'account': ['assotiation']}}]\" >Assotiate profile</a></li>\n            <li><a  [routerLink]=\"['/employer/account', {outlets: {'account': ['changepassword']}}]\" >Change Password</a></li>\n            <li><a  [routerLink]=\"['/employer/account', {outlets: {'account': ['deactivation']}}]\" >Deactivate Profile</a></li>          \n          </ul><br>\n        </div>\n      </div>\n      <div class=\"input-group hidden\">\n        <input type=\"text\" class=\"form-control\" placeholder=\"Search Blog..\">\n        <span class=\"input-group-btn\">\n          <button class=\"btn btn-default\" type=\"button\">\n            <span class=\"glyphicon glyphicon-search\"></span>\n          </button>\n        </span>\n      </div>\n    </div>\n\n\n\n<router-outlet name=\"account\"></router-outlet>\n\n \n\n\n\n\n\n\n        \n\n  </div>\n</div>\n\n<!--<script>\n $(document).ready(function () {\n    $('.taboz ul li:first').addClass('active');\n    $('.tab-content:not(:first)').hide();\n    $('.taboz ul li a').click(function (event) {\n        event.preventDefault();\n        var content = $(this).attr('href');\n        $(this).parent().addClass('active');\n        $(this).parent().siblings().removeClass('active');\n        $(content).show();\n        $(content).siblings('.tab-content').hide();\n    });\n});\n</script>-->"

/***/ }),

/***/ 799:
/***/ (function(module, exports) {

module.exports = "   <div class=\"col-sm-9 tab-content\" id=\"address\">\n\n            <div class=\"form-group\">\n              <label for=\"title\">Default Language For Account</label>\n              <input type=\"text\" name=\"email\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">Country</label>\n              <input type=\"text\" name=\"email\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">City</label>\n              <input type=\"text\" name=\"email\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">Address 1</label>\n              <input type=\"text\" name=\"email\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n\n            <div class=\"form-group\">\n              <label for=\"title\">Address 2</label>\n              <input type=\"text\" name=\"email\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-default\">Save Changes</button>\n            </div>\n    </div>"

/***/ }),

/***/ 800:
/***/ (function(module, exports) {

module.exports = "\n    <div class=\"col-sm-9 tab-content\" id=\"assotiation\">\n            <div class=\"form-group\">\n              <h3>You can  link  your  profile  to  listed Social Network Applications listed below,So  your  Log In  will  be  easier, UserName+Password authentication will be also accessible</h3>\n            </div>\n            <div class=\"form-group\">\n                  <a href=\"assosiateFacebook\">Assosiate your  profile  with facebook</a>\n            </div>\n            <div class=\"form-group\">\n                  <a href=\"assosiateGoogle\">Assosiate your  profile  with Google</a>\n            </div>\n            <div class=\"form-group\">\n                  <a href=\"assosiateLinkedin\">Assosiate your  profile  with Linkedin</a>\n            </div>\n    </div>"

/***/ }),

/***/ 801:
/***/ (function(module, exports) {

module.exports = "    <div class=\"col-sm-9 tab-content\" id=\"passwordChange\">\n      <form>\n           <div class=\"form-group\">\n              <label for=\"oldPassword\">Old Password</label>\n              <input type=\"password\" name=\"oldPassword\" id=\"title\" placeholder=\"Old Password\" class=\"form-control\" required=\"required\">\n            </div>\n\n             <div class=\"form-group\">\n              <label for=\"newPass1\">New Password</label>\n              <input type=\"password\" name=\"newPass1\" id=\"title\" placeholder=\"New Password\" class=\"form-control\" required=\"required\">\n            </div>\n             <div class=\"form-group\">\n              <label for=\"newPass2\">Type new password again</label>\n              <input type=\"password\" name=\"newPass2\" id=\"title\" placeholder=\"Type new password again\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-default\">Save  Password</button>\n            </div>\n\n      </form>\n    </div>"

/***/ }),

/***/ 802:
/***/ (function(module, exports) {

module.exports = "    <div class=\"col-sm-9 tab-content\" id=\"deactivation\">\n        <form action=\"sendDeactivationLinkToMail\" method=\"POST\">\n\n          <div class=\"form-group\">\n                  <h1>!!!Notice!!! Confirmation link  will be send to your email address (asd@mail.com) .Afted clicking  the link  your profile will be  deactivated. If you  change your mind  you can  Sign In  anytime and Your  profile will be activated again .</h1>\n          </div>\n\n          <div class=\"form-group\">\n              <label for=\"deactivationReasone\">Please provide the reasone why  you want to deactivate your profile</label>\n              <input type=\"text\" name=\"deactivationReasone\" id=\"deactivationReasone\" placeholder=\"\" class=\"form-control\" required=\"required\">\n           </div>\n           \n           <div class=\"form-group\">\n              <label for=\"password\">Password</label>\n              <input type=\"password\" name=\"password\" id=\"password\" placeholder=\"\" class=\"form-control\" required=\"required\">\n           </div>\n\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-default\">Send DEACTIVATION Link  to my email</button>\n            </div>\n      </form>\n    </div>\n"

/***/ }),

/***/ 803:
/***/ (function(module, exports) {

module.exports = "  <div class=\"col-sm-9 tab-content\" id=\"personalInfo\">\n        <form>\n\n            <div class=\"form-group\">\n                      <label for=\"clientProfileImage\">Upload Profile Image</label>\n                      <input type='file' onchange=\"readURL(this);\" id=\"inputFile\" name=\"clientProfileImage\"/>\n                      <input type=\"button\" name=\"\" id=\"clearImage\" onclick=\"removeImage()\" value=\"Remove\" style=\"display:none\">\n                      <img id=\"blah\" src=\"#\" alt=\"your image\" style=\"Display: none\"/>                    \n\n             </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">First Name</label>\n              <input type=\"text\" name=\"fName\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">Last Name</label>\n              <input type=\"text\" name=\"lName\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">EMAIL</label>\n              <input type=\"text\" name=\"email\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <label for=\"title\">Phone Number</label>\n              <input type=\"text\" name=\"phoneNumber\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n            </div>\n\n            <div class=\"form-group\">\n              <button type=\"submit\" class=\"btn btn-default\">Save Changes</button>\n            </div>\n            \n        </form>\n    </div>"

/***/ }),

/***/ 804:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n\n<h1 class=\"text-center\">Edit Job Post</h1>\n\n\n<form (ngSubmit)=\"saveChanges()\" >\n    \n    \n    \n   <div class=\"form-group\">\n        <label for=\"category\">Category</label>\n        <select class=\"form-control\" id=\"category\" name=\"category\" required=\"required\" (change)=\"onChange($event.target.value)\">\t  \t\n                  <option  selected value> -- Select Category -- </option>\n                  <option *ngFor=\"let cat of jobCategory\" value=\"{{ cat.id }}\" selected=\"{{cat.id === jobPost.jobCategory ? onChange(cat.id) : '' }}\">{{ cat.categoryVarName }}</option>\t  \t\t\n\t  \t</select>\n    </div>\n\n    <div class=\"form-group\" *ngIf=\"jobPost.jobSubCategory[0] \">\n        <label for=\"subCategory\">Sub Category</label>\n        <select class=\"form-control\" id=\"subCategory\" name=\"subCategory\"  (change)=\"subCategoryChanged($event.target.value)\">\t  \t\n                  <option  selected value> -- Select Sub Category -- </option>\n                  <option *ngFor=\"let cat of subCategory\" value=\"{{ cat.id }}\" selected=\"{{cat.id === jobPost.jobSubCategory[0] ? 'selected' : '' }}\">{{ cat.categoryVarName }}</option>\t  \t\t\n\t  \t</select>\n    </div>\n\n    <!--<div class=\"form-group\" *ngIf=\"jobPost.jobSubCategory[0] && subCategory\">\n        <label for=\"subCategory\">Sub Category</label>\n        <select class=\"form-control\" id=\"subCategory\" name=\"subCategory\"  (change)=\"subCategoryChanged($event.target.value)\">\t  \t\n                  <option  selected value> -- Select Sub Category -- </option>\n                  <option *ngFor=\"let cat of subCategory\" value=\"{{ cat.id }}\" selected=\"{{cat.id === jobPost.jobSubCategory[0] ? true : false}}\">{{ cat.categoryVarName }}</option>\t  \t\t\n\t  \t</select>\n    </div>-->\n\n    <div class=\"form-group\">\n        <label for=\"title\">Title</label>\n        <input type=\"text\" [(ngModel)]=\"jobPost.jobTitle\" name=\"title\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"description\">Description</label>\n        <textarea rows=\"5\"  [(ngModel)]=\"jobPost.jobDescription\" name=\"description\" id=\"description\" placeholder=\"Job Description\" class=\"form-control\" required=\"required\"></textarea>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"deadline\">DeadLine</label>\n        <input type=\"date\"  [(ngModel)]=\"jobPost.deadline\" name=\"deadline\" id=\"deadline\" placeholder=\"Deadline\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"budget\">Budget</label>\n        <input type=\"text\"  [(ngModel)]=\"jobPost.budget\" name=\"budget\" id=\"budget\" placeholder=\"Budget\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"paymentType\">Payment Type</label>\n        <input type=\"text\"  [(ngModel)]=\"jobPost.paymentType\" name=\"paymentType\" id=\"paymentType\" placeholder=\"Payment Type\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"projectType\">Project Type</label>\n        <input type=\"text\"  [(ngModel)]=\"jobPost.projectType\" name=\"projectType\" id=\"projectType\" placeholder=\"Project Type\" class=\"form-control\">\n    </div>\n\n\n\n    <button type=\"submit\" class=\"btn btn-default\">Save</button>\n</form>\n\n<form action=\"deleteJobPost\" method=\"post\">\n    <input type=\"hidden\" name=\"id\" value=\"\">\n    <button type=\"submit\" class=\"btn btn-default\">Delete Post</button>\n</form>"

/***/ }),

/***/ 805:
/***/ (function(module, exports) {

module.exports = "<header>\n    <div class=\"navbar-wrapper\">\n        <nav class=\"navbar navbar-inverse navbar-static-top black-color\" role=\"navigation\">\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n                                    <span class=\"sr-only\">Toggle navigation</span>\n                                    <span class=\"icon-bar\"></span>\n                                    <span class=\"icon-bar\"></span>\n                                    <span class=\"icon-bar\"></span>\n                                </button>\n                </div>\n                <div class=\"container-fluid\" id=\"\">\n                    <div class=\"navbar-header\">\n                        <a routerLink=\"/employer\"><img src=\"./public/images/logo.png\" alt=\"\"></a>\n                    </div>\n\n                    <ul class=\"nav navbar-nav\">\n                                  \n                                  <li><a routerLink=\"/employer\">Home</a> </li>\n                                  <!-- <li><a href=\"toprank\"></a> </li>\n                                  <li><a href=\"blog\"></a> </li> -->\n                                  <!-- <li><a href=\"about\">About Us</a> </li> -->\n                                  <!-- <li><a href=\"workerStatistics\">Top Workers</a> </li> -->\n                                  <li><a routerLink=\"/employer/postJob\">Post Job</a> </li>\n                                  <li><a routerLink=\"/employer/clientJobHistory\">Job History</a> </li>\n\n                                  <li><a routerLink=\"/employer/subscribes\">Subscribe</a> </li>\n                                  <li><a routerLink=\"/employer/messenger\">Messages</a> </li>\n                                  <li><a routerLink=\"/employer/offers\">Offers</a> </li>\n                                  <li><a routerLink=\"/employer/account\">Account</a> </li> \n\n\n                                  <!-- <li class=\"dropdown\">\n                                    <a class=\"dropdown-toggle\" data-toggle=\"dropdown\" href=\"#\">Profile\n                                    <span class=\"caret\"></span></a>\n                                    <ul class=\"dropdown-menu\">                                    \n                                      <li><a href=\"account\">Accouunt</a></li>\n                                      <li><a href=\"settings\">Settings</a></li>  \n                                    </ul>\n                                  </li> -->\n                                   \n                                </ul>\n                                \n                                <log-out></log-out>\n                </div>\n            </div>\n        </nav>\n    </div>\n</header>"

/***/ }),

/***/ 806:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n\nHome page for Employer"

/***/ }),

/***/ 807:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n\n\n<div class=\"container\">\n\t<div class=\"row\">\n\t\t<div class=\"span5\">\n            <table class=\"table table-striped table-condensed\">\n                  <thead>\n                  <tr>\n                      <th>Created At</th>\n                      <th>Last Modified</th>\n                      <th>Job Title</th>\n                      <th>Budget</th>\n                      <th>Dead Line</th>\n                      <th>Status</th>\n                      <th>Edit</th>                                          \n                  </tr>\n              </thead>   \n              <tbody>\n                <tr *ngFor=\"let job of jobPostList\">\n                    <td>{{ job.createdAt }}</td>\n                    <td>{{ job.updatedAt }}</td>\n                    <td>{{ job.jobTitle }}</td>\n                    <td>{{ job.budget }}</td>\n                    <td>{{ job.deadline }}</td>\n                    <td>\n                        <span class=\"label label-success\" *ngIf=\"job.status === 'active'\">Active</span>\n                        <span class=\"label label-default\" *ngIf=\"job.status === 'adminsuspended'\">Suspended By User</span>\n                        <span class=\"label label-danger\" *ngIf=\"job.status === 'usersuspended'\">Suspended By Administration</span>\n                        <span class=\"label label-warning\" *ngIf=\"job.status === 'Interviewing'\">Interviewing</span>\n                        <span class=\"label label-warning\" *ngIf=\"job.status === 'inprogress'\">In Progress</span> \n                        <span class=\"label label-success\" *ngIf=\"job.status === 'finished'\">Finished</span>                   \n                    </td>    \n                    <td><a routerLink=\"/employer/edit-job/{{job.id}}\">Edit</a></td>                                   \n                </tr>\n                                                  \n              </tbody>\n            </table>\n            </div>\n\t</div>\n</div>"

/***/ }),

/***/ 808:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n\n\n\n<link href=\"https://maxcdn.bootstrapcdn.com/font-awesome/4.3.0/css/font-awesome.min.css\" rel=\"stylesheet\">\n<div class=\"container bootstrap snippet\">\n    <div class=\"row\">\n        <div class=\"col-md-4 bg-white \">\n            <div class=\" row border-bottom padding-sm\" style=\"height: 40px;\">\n                Member\n            </div>\n\n            <!-- =============================================================== -->\n            <!-- member list -->\n            <ul class=\"friend-list\">\n\n\n                <li *ngFor=\"let conversation of conversationList\" class=\"active bounceInDown\">\n                    <a href=\"#\" class=\"clearfix\">\n                        <img src=\"http://bootdey.com/img/Content/user_1.jpg\" alt=\"\" class=\"img-circle\">\n                        <div class=\"friend-name\">\n                            <strong *ngFor=\"let chatter of conversation.otherChatters\">{{chatter.fName + ' ' + chatter.lName}}</strong>\n                        </div>\n                        <!--<div class=\"last-message text-muted\">Hello, Are you there?</div>\n                \t\t<small class=\"time text-muted\">Just now</small>\n                \t\t<small class=\"chat-alert label label-danger\">1</small>-->\n                    </a>\n                </li>\n\n            </ul>\n        </div>\n\n        <!--=========================================================-->\n        <!-- selected chat -->\n        <div *ngFor=\"let conversation of conversationList\" class=\"col-md-8 bg-white \">\n            <div class=\"chat-message\">\n                <ul class=\"chat\">\n\n                    <li *ngFor=\"let message of conversation.message\" class=\"{{message.sender.Id !== conversation.me.Id ? 'left clearfix' : 'right clearfix' }}\" >\n\n                        <div *ngIf=\"message.sender.Id !== conversation.me.Id\">\n                            <span class=\"chat-img pull-left\">\n                            <img src=\"http://bootdey.com/img/Content/user_3.jpg\" alt=\"User Avatar\">\n                        </span>\n                            <div class=\"chat-body clearfix\">\n                                <div class=\"header\">\n                                    <strong class=\"primary-font\">{{message.sender.fName + ' ' +message.sender.lName }}</strong>\n                                    <small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o\"></i> 12 mins ago</small>\n                                </div>\n                                <p>\n                                    {{message.text}}\n                                </p>\n                            </div>\n                        </div>\n\n\n                        <div *ngIf=\"message.sender.Id == conversation.me.Id\">\n                            <span class=\"chat-img pull-right\">\n\t\t\t                    \t\t<img src=\"http://bootdey.com/img/Content/user_1.jpg\" alt=\"User Avatar\">\n\t\t\t                    \t</span>\n                            <div class=\"chat-body clearfix\">\n                                <div class=\"header\">\n                                    <strong class=\"primary-font\">{{message.sender.fName + ' ' +message.sender.lName }}</strong>\n                                    <small class=\"pull-right text-muted\"><i class=\"fa fa-clock-o\"></i> 13 mins ago</small>\n                                </div>\n                                <p>\n                                    {{message.text}}\n                                </p>\n                            </div>\n                        </div>\n                    </li>\n\n\n\n\n\n                </ul>\n            </div>\n\n            <form (ngSubmit)=\"sendMessage(conversation.Id,conversation.me.Id,conversation.subject.Id,$event)\">\n                <div class=\"chat-box bg-white\">\n                    <div class=\"input-group\">\n                        <input class=\"form-control border no-shadow no-rounded\" placeholder=\"Type your message here\">\n                        <span class=\"input-group-btn\">\n\t\t\t\t\t\t\t\t\t\t\t<input class=\"btn btn-success no-rounded\" type=\"submit\" value=\"send\">\n\t\t\t\t\t\t</span>\n                    </div>\n                    <!-- /input-group -->\n                </div>\n            </form>\n\n        </div>\n\n\n    </div>\n</div>\n\n<style>\n    .bg-white {\n        background-color: #fff;\n    }\n    \n    .friend-list {\n        list-style: none;\n        margin-left: -40px;\n    }\n    \n    .friend-list li {\n        border-bottom: 1px solid #eee;\n    }\n    \n    .friend-list li a img {\n        float: left;\n        width: 45px;\n        height: 45px;\n        margin-right: 0px;\n    }\n    \n    .friend-list li a {\n        position: relative;\n        display: block;\n        padding: 10px;\n        transition: all .2s ease;\n        -webkit-transition: all .2s ease;\n        -moz-transition: all .2s ease;\n        -ms-transition: all .2s ease;\n        -o-transition: all .2s ease;\n    }\n    \n    .friend-list li.active a {\n        background-color: #f1f5fc;\n    }\n    \n    .friend-list li a .friend-name,\n    .friend-list li a .friend-name:hover {\n        color: #777;\n    }\n    \n    .friend-list li a .last-message {\n        width: 65%;\n        white-space: nowrap;\n        text-overflow: ellipsis;\n        overflow: hidden;\n    }\n    \n    .friend-list li a .time {\n        position: absolute;\n        top: 10px;\n        right: 8px;\n    }\n    \n    small,\n    .small {\n        font-size: 85%;\n    }\n    \n    .friend-list li a .chat-alert {\n        position: absolute;\n        right: 8px;\n        top: 27px;\n        font-size: 10px;\n        padding: 3px 5px;\n    }\n    \n    .chat-message {\n        padding: 60px 20px 115px;\n    }\n    \n    .chat {\n        list-style: none;\n        margin: 0;\n    }\n    \n    .chat-message {\n        background: #f9f9f9;\n    }\n    \n    .chat li img {\n        width: 45px;\n        height: 45px;\n        border-radius: 50em;\n        -moz-border-radius: 50em;\n        -webkit-border-radius: 50em;\n    }\n    \n    img {\n        max-width: 100%;\n    }\n    \n    .chat-body {\n        padding-bottom: 20px;\n    }\n    \n    .chat li.left .chat-body {\n        margin-left: 70px;\n        background-color: #fff;\n    }\n    \n    .chat li .chat-body {\n        position: relative;\n        font-size: 11px;\n        padding: 10px;\n        border: 1px solid #f1f5fc;\n        box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n        -moz-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n        -webkit-box-shadow: 0 1px 1px rgba(0, 0, 0, .05);\n    }\n    \n    .chat li .chat-body .header {\n        padding-bottom: 5px;\n        border-bottom: 1px solid #f1f5fc;\n    }\n    \n    .chat li .chat-body p {\n        margin: 0;\n    }\n    \n    .chat li.left .chat-body:before {\n        position: absolute;\n        top: 10px;\n        left: -8px;\n        display: inline-block;\n        background: #fff;\n        width: 16px;\n        height: 16px;\n        border-top: 1px solid #f1f5fc;\n        border-left: 1px solid #f1f5fc;\n        content: '';\n        transform: rotate(-45deg);\n        -webkit-transform: rotate(-45deg);\n        -moz-transform: rotate(-45deg);\n        -ms-transform: rotate(-45deg);\n        -o-transform: rotate(-45deg);\n    }\n    \n    .chat li.right .chat-body:before {\n        position: absolute;\n        top: 10px;\n        right: -8px;\n        display: inline-block;\n        background: #fff;\n        width: 16px;\n        height: 16px;\n        border-top: 1px solid #f1f5fc;\n        border-right: 1px solid #f1f5fc;\n        content: '';\n        transform: rotate(45deg);\n        -webkit-transform: rotate(45deg);\n        -moz-transform: rotate(45deg);\n        -ms-transform: rotate(45deg);\n        -o-transform: rotate(45deg);\n    }\n    \n    .chat li {\n        margin: 15px 0;\n    }\n    \n    .chat li.right .chat-body {\n        margin-right: 70px;\n        background-color: #fff;\n    }\n    \n    .chat-box {\n        position: fixed;\n        bottom: 0;\n        left: 444px;\n        right: 0;\n        padding: 15px;\n        border-top: 1px solid #eee;\n        transition: all .5s ease;\n        -webkit-transition: all .5s ease;\n        -moz-transition: all .5s ease;\n        -ms-transition: all .5s ease;\n        -o-transition: all .5s ease;\n    }\n    \n    .primary-font {\n        color: #3c8dbc;\n    }\n    \n    a:hover,\n    a:active,\n    a:focus {\n        text-decoration: none;\n        outline: 0;\n    }\n</style>"

/***/ }),

/***/ 809:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n\n\n<style>\n    /* Set height of the grid so .sidenav can be 100% (adjust if needed) */\n    \n    .row.content {\n        height: 100%\n    }\n    /* Set gray background color and 100% height */\n    \n    .sidenav {\n        background-color: #f1f1f1;\n        height: 100%;\n    }\n    /* Set black background color, white text and some padding */\n    \n    footer {\n        background-color: #555;\n        color: white;\n        padding: 15px;\n    }\n    /* On small screens, set height to 'auto' for sidenav and grid */\n    \n    @media screen and (max-width: 767px) {\n        .sidenav {\n            height: auto;\n            padding: 15px;\n        }\n        .row.content {\n            height: auto;\n        }\n    }\n    \n    .hidden {\n        display: none;\n    }\n</style>\n\n\n<div class=\"container-fluid\">\n    <div class=\"row content\">\n        <div class=\"col-sm-3 sidenav\">\n            <p>Offers</p>\n            <div class=\"nav\">\n                <div class=\"taboz\">\n\n                    <ul class=\"nav nav-pills nav-stacked\">\n\n                        <li *ngFor=\"let job of postedJobs\"><a href=\"#{{job.id}}\" (click)=\"tabContentClicked($event)\">{{job.jobTitle}}</a></li>\n\n\n                    </ul>\n\n                </div>\n            </div>\n        </div>\n\n\n        <div *ngFor=\"let job of postedJobs; let i=index\" class=\"col-sm-9 tab-content\" id=\"{{job.id}}\" [hidden]=\"!i==0\">{{i}} VS {{(i)==0}}\n            <div class=\"form-group\">\n\n\n\n                <h1 class=\"form-control\">{{job.jobTitle}}</h1>\n\n\n                <div *ngFor=\"let proposal of job.proposals\" class=\"panel-group\" id=\"accordion\" role=\"tablist\" aria-multiselectable=\"true\">\n                    <!--  <div class=\"panel panel-default\">\n                              <div class=\"panel-heading\" role=\"tab\" id=\"headingOne\">\n                                <h4 class=\"panel-title\">\n                                  <a data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapseOne\" aria-expanded=\"false\" aria-controls=\"collapseOne\">\n                                    Collapsible Group Item #1\n                                  </a>\n                                </h4>\n                              </div>\n                              <div id=\"collapseOne\" class=\"panel-collapse collapse in\" role=\"tabpanel\" aria-labelledby=\"headingOne\">\n                                <div class=\"panel-body\">\n                                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.\n                                </div>\n                              </div>\n                            </div> -->\n\n\n                    <div class=\"panel panel-default\">\n                        <div class=\"panel-heading\" role=\"tab\" id=\"headingTwo\">\n                            <h4 class=\"panel-title\">\n                                <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse_{{proposal.id}}\" aria-expanded=\"false\">\n\n\n                                    <strong>   \n                                                        {{proposal.candidate.fName + '  ' + proposal.candidate.lName + '   ' }}\n                                                </strong>\n                                    <div>\n                                        {{proposal.candidate.updatedAt}}\n                                    </div>\n\n                                </a>\n                            </h4>\n                        </div>\n                        <div id=\"collapse_{{proposal.id}}\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingTwo\">\n                            <div class=\"panel-body\">\n                                <div class=\"form-group\">\n\n                                    View Profile of\n                                    <a href=\"#\" target=\"_blank\">\n                                        {{proposal.candidate.fName + '  ' + proposal.candidate.lName + '   ' }}\n                                    </a>\n\n                                    <br>\n                                    <br>\n                                    <br> cover letter\n                                    <p>\n                                        {{proposal.coverLetter}}\n                                    </p>\n                                    <br/> Why Me\n                                    <p>\n                                        {{proposal.whyToChoose}}\n                                    </p>\n                                    <br/> Duration\n                                    <p>\n                                        {{proposal.duration.duration}}\n                                    </p>\n                                    <br/> Price\n                                    <p>\n                                        {{proposal.price}} {{proposal.currency.currency}}</p>\n                                    <br/>\n\n\n\n                                </div>\n\n\n                                <form (ngSubmit)=\"sendMessage(proposal.candidate.id,job.id)\">\n                                    <div class=\"form-group\">\n                                        <input type=\"submit\" value=\"Contact the Bidder\">\n                                    </div>\n                                </form>\n\n                                <form (ngSubmit)=\"confirmProposal()\">\n\n                                    <div class=\"form-group\">\n                                        <input type=\"submit\" value=\"Confirm Proposal\">\n                                    </div>\n\n                                </form>\n\n                                <form (ngSubmit)=\"declineProposal()\">\n                                    <input type=\"hidden\" name=\"proposal\" value=\"#\">\n                                    <input type=\"hidden\" name=\"candidade\" value=\"#\">\n                                    <div class=\"form-group\">\n                                        <input type=\"submit\" value=\"Decline Proposal\">\n                                    </div>\n                                </form>\n\n                                <hr/>\n\n\n                                <!--<label class=\"form-control\">Applicant was declined</label>\n\n                                <label class=\"form-control\">Applicant was accepted</label>-->\n\n                                <form (ngSubmit)=\"leaveFeadback($event,job.id,proposal.candidate.id)\">\n\n\n                                    <label class=\"form-control\">Leave Feedback</label>\n                                    <select name=\"feedback\" class=\"form-control\" (change)=\"feadbackScoreChanged($event.target.value,job.id,proposal.candidate.id)\">\n                                                    <option value=\"0\" selected>0</option>\n                                                    <option value=\"1\" >1</option>\n                                                    <option value=\"2\">2</option>\n                                                    <option value=\"3\">3</option>\n                                                    <option value=\"4\">4</option>\n                                                    <option value=\"5\">5</option>\n                                    </select>\n\n                                    <label class=\"form-control\">Write your experience</label>\n                                    <textarea name=\"feedbackText\" class=\"form-control\"></textarea>\n                                    <div class=\"form-group\">\n                                        <input type=\"submit\" value=\"Submit Feedback\">\n                                    </div>\n                                </form>\n\n                                <div class=\"form-group\">\n                                    <br/>\n                                    <br/>\n                                    <br/>\n                                    <h1 class=\"form-control\">Your feedback to Worker</h1>\n                                    <label class=\"\">feedback text</label>\n                                    <br/>\n                                    <br/>\n                                    <label>Starts  feedback score</label>\n                                </div>\n\n                            </div>\n                        </div>\n                    </div>\n\n\n\n                    <!--\n                     <div class=\"panel panel-default\">\n                              <div class=\"panel-heading\" role=\"tab\" id=\"headingThree\">\n                                <h4 class=\"panel-title\">\n                                  <a class=\"collapsed\" data-toggle=\"collapse\" data-parent=\"#accordion\" href=\"#collapse2\" aria-expanded=\"false\" aria-controls=\"collapseThree\">\n                                    Collapsible Group Item #3\n                                  </a>\n                                </h4>\n                              </div>\n                              <div id=\"collapseThree\" class=\"panel-collapse collapse\" role=\"tabpanel\" aria-labelledby=\"headingThree\">\n                                <div class=\"panel-body\">\n                                  Anim pariatur cliche reprehenderit, enim eiusmod high life accusamus terry richardson ad squid. 3 wolf moon officia aute, non cupidatat skateboard dolor brunch. Food truck quinoa nesciunt laborum eiusmod. Brunch 3 wolf moon tempor, sunt aliqua put a bird on it squid single-origin coffee nulla assumenda shoreditch et. Nihil anim keffiyeh helvetica, craft beer labore wes anderson cred nesciunt sapiente ea proident. Ad vegan excepteur butcher vice lomo. Leggings occaecat craft beer farm-to-table, raw denim aesthetic synth nesciunt you probably haven't heard of them accusamus labore sustainable VHS.\n                                </div>\n                              </div>\n                            </div> -->\n\n\n                </div>\n\n\n            </div>\n        </div>\n\n\n\n\n\n\n\n    </div>\n</div>"

/***/ }),

/***/ 810:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\n<form (ngSubmit) = \"onSubmit()\" #postJobForm = \"ngForm\" class=\"form-group\">\n    <div class=\"form-group\">\n        <label for=\"category\">Category</label>\n        <select class=\"form-control\" id=\"category\" name=\"category\" required=\"required\" (change)=\"onChange($event.target.value)\">\t  \t\n                  <option  selected value> -- Select Category -- </option>\n                  <option *ngFor=\"let cat of jobCategory\" value=\"{{ cat.id }}\">{{ cat.categoryVarName }}</option>\t  \t\t\n\t  \t</select>\n    </div>\n\n    <div class=\"form-group\" *ngIf=\"categorySelected\">\n        <label for=\"subCategory\">Sub Category</label>\n        <select class=\"form-control\" id=\"subCategory\" name=\"subCategory\"  (change)=\"subCategoryChanged($event.target.value)\">\t  \t\n                  <option  selected value> -- Select Category -- </option>\n                  <option *ngFor=\"let cat of subCategory\" value=\"{{ cat.id }}\">{{ cat.categoryVarName }}</option>\t  \t\t\n\t  \t</select>\n    </div>\n\n    <div class=\"form-group\">\n        <label for=\"title\">Title</label>\n        <input type=\"text\" [(ngModel)]=\"jobPost.jobTitle\" name=\"title\" id=\"title\" placeholder=\"Job Title\" class=\"form-control\" required=\"required\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"description\">Description</label>\n        <textarea rows=\"5\"  [(ngModel)]=\"jobPost.jobDescription\" name=\"description\" id=\"description\" placeholder=\"Job Description\" class=\"form-control\" required=\"required\"></textarea>\n    </div>\n    <div class=\"form-group\">\n        <label for=\"deadline\">DeadLine</label>\n        <input type=\"date\"  [(ngModel)]=\"jobPost.deadline\" name=\"deadline\" id=\"deadline\" placeholder=\"Deadline\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"budget\">Budget</label>\n        <input type=\"text\"  [(ngModel)]=\"jobPost.budget\" name=\"budget\" id=\"budget\" placeholder=\"Budget\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"paymentType\">Payment Type</label>\n        <input type=\"text\"  [(ngModel)]=\"jobPost.paymentType\" name=\"paymentType\" id=\"paymentType\" placeholder=\"Payment Type\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <label for=\"projectType\">Project Type</label>\n        <input type=\"text\"  [(ngModel)]=\"jobPost.projectType\" name=\"projectType\" id=\"projectType\" placeholder=\"Project Type\" class=\"form-control\">\n    </div>\n    <div class=\"form-group\">\n        <button type=\"submit\" class=\"btn btn-default\">Post New Job</button>\n    </div>\n</form>"

/***/ }),

/***/ 811:
/***/ (function(module, exports) {

module.exports = "<employer></employer>\n\n\nsubscribes"

/***/ }),

/***/ 812:
/***/ (function(module, exports) {

module.exports = "<ul class=\"nav navbar-nav navbar-right\">\n    <li>\n        <a (click) = \"logOut()\" routerLink=\"./\">Log Out</a> \n        <!--<button (click) = \"logOut()\" >Log Out</button>-->\n    </li>\n</ul>"

/***/ }),

/***/ 813:
/***/ (function(module, exports) {

module.exports = "<visitor></visitor>\n<div id=\"content\">\n    <h2>This is our page title</h2>\n\n    <p>Lorem ipsum dolor sit amet, consectetur adipiscing elit. Nullam in dui mauris. Vivamus hendrerit arcu sed erat molestie\n        vehicula. Sed auctor neque eu tellus rhoncus ut eleifend nibh porttitor. Ut in nulla enim. Phasellus molestie magna\n        non est bibendum non venenatis nisl tempor. Suspendisse dictum feugiat nisl ut dapibus. Mauris iaculis porttitor\n        posuere. Praesent id metus massa, ut blandit odio. Proin quis tortor orci. Etiam at risus et justo dignissim congue.\n        Donec congue lacinia dui, a porttitor lectus condimentum laoreet. Nunc eu ullamcorper orci. Quisque eget odio ac\n        lectus vestibulum faucibus eget in metus. In pellentesque faucibus vestibulum. Nulla at nulla justo, eget luctus\n        tortor. Nulla facilisi. Duis aliquet egestas purus in blandit. Curabitur vulputate, ligula lacinia scelerisque tempor,\n        lacus lacus ornare ante, ac egestas est urna sit amet arcu. Class aptent taciti sociosqu ad litora torquent per conubia\n        nostra, per inceptos himenaeos. Sed.</p>\n\n    <p>Molestie augue sit amet leo consequat posuere. Vestibulum ante ipsum primis in faucibus orci luctus et ultrices posuere\n        cubilia Curae; Proin vel ante a orci tempus eleifend ut et magna. Lorem ipsum dolor sit amet, consectetur adipiscing\n        elit. Vivamus luctus urna sed urna ultricies ac tempor dui sagittis. In condimentum facilisis porta. Sed nec diam\n        eu diam mattis viverra. Nulla.</p>\n\n    <p>Fringilla, orci ac euismod semper, magna diam porttitor mauris, quis sollicitudin sapien justo in libero. Vestibulum\n        mollis mauris enim. Morbi euismod magna ac lorem rutrum elementum. Donec viverra auctor lobortis. Pellentesque eu\n        est a nulla placerat dignissim. Morbi a enim in magna semper bibendum. Etiam scelerisque, nunc ac egestas consequat,\n        odio nibh euismod nulla, eget auctor orci nibh vel nisi. Aliquam erat volutpat. Mauris vel neque sit amet nunc gravida\n        congue sed sit amet purus. Quisque lacus quam, egestas ac tincidunt a, lacinia vel velit. Aenean facilisis nulla\n        vitae urna tincidunt congue sed ut dui. Morbi malesuada nulla nec purus convallis consequat. Vivamus id mollis quam.\n        Morbi ac commodo nulla. In condimentum orci id nisl volutpat bibendum. Quisque commodo hendrerit lorem quis egestas.\n        Maecenas quis tortor arcu. Vivamus rutrum nunc non neque consectetur quis placerat neque lobortis. Nam vestibulum,\n        arcu sodales feugiat consectetur, nisl orci bibendum elit, eu euismod magna sapien ut nibh. Donec semper quam scelerisque\n        tortor dictum gravida. In hac habitasse platea dictumst. Nam pulvinar, odio sed rhoncus suscipit, sem diam ultrices\n        mauris, eu.</p>\n\n    <p>Consequat purus metus eu velit. Proin metus odio, aliquam eget molestie nec, gravida ut sapien. Phasellus quis est sed\n        turpis sollicitudin venenatis sed eu odio. Praesent eget neque eu eros interdum malesuada non vel leo. Sed fringilla\n        porta ligula egestas tincidunt. Nullam risus magna, ornare vitae varius eget, scelerisque a libero. Morbi eu porttitor\n        ipsum. Nullam lorem nisi, posuere quis volutpat eget, luctus nec massa. Pellentesque aliquam lacinia tellus sit amet\n        bibendum. Ut posuere justo in enim pretium scelerisque. Etiam ornare vehicula euismod. Vestibulum at risus augue.\n        Sed non semper dolor. Sed fringilla consequat velit a porta. Pellentesque sed lectus pharetra ipsum ultricies commodo\n        non sit amet velit. Suspendisse volutpat lobortis ipsum, in scelerisque nisi iaculis a. Duis pulvinar lacinia commodo.\n        Integer in lorem id nibh luctus aliquam. Sed elementum, est ac sagittis porttitor, neque metus ultricies ante, in\n        accumsan massa nisl non metus. Vivamus sagittis quam a lacus dictum tempor. Nullam in semper ipsum. Cras a est id\n        massa malesuada tincidunt. Etiam a urna tellus. Ut rutrum vehicula dui, eu.</p>\n\n    <p>Cursus magna tincidunt pretium. Donec malesuada accumsan quam, et commodo orci viverra et. Integer tincidunt sagittis\n        lectus. Mauris ac ligula quis orci auctor tincidunt. Suspendisse odio justo, varius id posuere sit amet, iaculis\n        sit amet orci. Suspendisse potenti. Suspendisse potenti. Aliquam erat volutpat. Sed posuere dignissim odio, nec cursus\n        odio mollis et. Praesent cursus, orci ut dictum adipiscing, tellus ante porttitor leo, vel gravida lacus lorem vitae\n        est. Duis ultricies feugiat ante nec aliquam. Maecenas varius, nulla vel fermentum semper, metus nibh bibendum nunc,\n        vitae suscipit mauris velit ac nunc. Mauris nunc eros, egestas at.</p>\n</div>"

/***/ }),

/***/ 814:
/***/ (function(module, exports) {

module.exports = "<visitor></visitor>\n<h1>\n    this is home\n</h1>\n\n\n   \n<div class=\"container outerpadding\">\n<div class=\"row\">\n\n  <div class=\"col-lg-3\">\n     <div class=\"panel\">\n        <div class=\"panel-heading\" style=\"background-color:teal;color:#fff;\"><strong>Lorem Ipsum</strong></div>\n        <div class=\"panel-body\" style=\"background-color:#000;color:#fff; box-shadow:0 -12px 13px teal inset;\">\n        \n        <div class=\"boximg\">\n         <img src=\"http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bcf17c40.r92.cf1.rackcdn.com/unsplash_52c470899a2e1_1.JPG\" class=\"img-responsive\">\n         <span class=\"label label-danger date\">25 December 2015</span>\n         <span class=\"likebut glyphicon glyphicon-tag\"></span>\n         </div>\n         \n         \n   <br>\n        <p class=\"pull-left\">Lorem ipsum Lorem ipsum<br>\n           <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n            <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n             <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n              <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n               <span class=\"glyphicon glyphicon-star-empty\" style=\"font-size:18px;\"></span>\n        </p>\n     \n        <span class=\"badge pull-right\" style=\"background-color:teal\">25</span>\n      </div>\n     </div>\n  </div>\n  <div class=\"col-lg-3\">\n     <div class=\"panel\">\n        <div class=\"panel-heading\" style=\"background-color:teal;color:#fff;\"><strong>Lorem Ipsum</strong></div>\n        <div class=\"panel-body\" style=\"background-color:#000;color:#fff; box-shadow:0 -12px 13px teal inset;\">\n        \n        <div class=\"boximg\">\n         <img src=\"http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bcf17c40.r92.cf1.rackcdn.com/unsplash_52c470899a2e1_1.JPG\" class=\"img-responsive\">\n         <span class=\"label label-danger date\">25 December 2015</span>\n         <span class=\"likebut glyphicon glyphicon-tag\"></span>\n         </div>\n         \n         \n   <br>\n        <p class=\"pull-left\">Lorem ipsum Lorem ipsum<br>\n           <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n            <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n             <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n              <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n               <span class=\"glyphicon glyphicon-star-empty\" style=\"font-size:18px;\"></span>\n        </p>\n     \n        <span class=\"badge pull-right\" style=\"background-color:teal\">25</span>\n      </div>\n     </div>\n  </div>\n  <div class=\"col-lg-3\">\n     <div class=\"panel\">\n        <div class=\"panel-heading\" style=\"background-color:teal;color:#fff;\"><strong>Lorem Ipsum</strong></div>\n        <div class=\"panel-body\" style=\"background-color:#000;color:#fff; box-shadow:0 -12px 13px teal inset;\">\n        \n        <div class=\"boximg\">\n         <img src=\"http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bcf17c40.r92.cf1.rackcdn.com/unsplash_52c470899a2e1_1.JPG\" class=\"img-responsive\">\n         <span class=\"label label-danger date\">25 December 2015</span>\n         <span class=\"likebut glyphicon glyphicon-tag\"></span>\n         </div>\n         \n         \n   <br>\n        <p class=\"pull-left\">Lorem ipsum Lorem ipsum<br>\n           <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n            <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n             <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n              <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n               <span class=\"glyphicon glyphicon-star-empty\" style=\"font-size:18px;\"></span>\n        </p>\n     \n        <span class=\"badge pull-right\" style=\"background-color:teal\">25</span>\n      </div>\n     </div>\n  </div>\n  <div class=\"col-lg-3\">\n     <div class=\"panel\">\n        <div class=\"panel-heading\" style=\"background-color:teal;color:#fff;\"><strong>Lorem Ipsum</strong></div>\n        <div class=\"panel-body\" style=\"background-color:#000;color:#fff; box-shadow:0 -12px 13px teal inset;\">\n        \n        <div class=\"boximg\">\n         <img src=\"http://666a658c624a3c03a6b2-25cda059d975d2f318c03e90bcf17c40.r92.cf1.rackcdn.com/unsplash_52c470899a2e1_1.JPG\" class=\"img-responsive\">\n         <span class=\"label label-danger date\">25 December 2015</span>\n         <span class=\"likebut glyphicon glyphicon-tag\"></span>\n         </div>\n         \n         \n   <br>\n        <p class=\"pull-left\">Lorem ipsum Lorem ipsum<br>\n           <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n            <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n             <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n              <span class=\"glyphicon glyphicon-star\" style=\"font-size:18px;\"></span>\n               <span class=\"glyphicon glyphicon-star-empty\" style=\"font-size:18px;\"></span>\n        </p>\n     \n        <span class=\"badge pull-right\" style=\"background-color:teal\">25</span>\n      </div>\n     </div>\n  </div>\n </div>\n\n</div>\n\n\n"

/***/ }),

/***/ 815:
/***/ (function(module, exports) {

module.exports = "<visitor></visitor>\n\n<h1>Log In</h1>\n\n<form (ngSubmit)=\"onSubmitLocalAuth()\" #logInForm=\"ngForm\" class=\"form-group\">\n\t<input type=\"text\" [(ngModel)]=\"auth.userName\" name=\"userName\" placeholder=\"User Name\" class=\"form-control\" required>\n\t<input type=\"password\" [(ngModel)]=\"auth.password\" name=\"password\" placeholder=\"Password\" class=\"form-control\" required>\n\t\n\t<input type=\"submit\" class=\"form-control\">\n</form>\n<h1>OR</h1>\n\n<h1><a href=\"logInFacebook\">Facebook Authentication</a></h1>\n<h1><a href=\"logInGoogle\">Google Authentication</a></h1>"

/***/ }),

/***/ 816:
/***/ (function(module, exports) {

module.exports = "<visitor></visitor>\n<h1>\n\tRegister Worker\n</h1>\n\n\n\n<br/>\n\n\n\n<input type=\"radio\" name=\"whoami\" value=\"company\" checked=\"true\">Company\n\n<br/>\n\n\n<form (ngSubmit)=\"onSubmitCompany()\" #employerFormCompany=\"ngForm\" class=\"form-group\">\n\t\n\n\n\n\t<input type=\"text\" class=\"form-control\" [(ngModel)]=\"company.businessName\" name=\"businessname\" placeholder=\"Business Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.controlNumber\" name=\"controlnumber\" placeholder=\"Control Number\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.businessType\" name=\"businesstype\" placeholder=\"Business Type\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.principalOfficeAddress\" name=\"principalofficeaddress\" placeholder=\"Principal Office Address\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.registrationDate\" name=\"registrationdate\" placeholder=\"Date of Formation / Registration Date\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.userName\" name=\"userName\" placeholder=\"User Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.directorFName\" name=\"directorfname\" placeholder=\"Director First Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.directorLName\" name=\"directorlname\" placeholder=\"Director Last Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.eMail\" name=\"email\" placeholder=\"EMAIL\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.password\" name=\"password\" placeholder=\"Password\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"company.rePassword\" name=\"repassword\" placeholder=\"Type password again\" required> \n\t\n\t<br/>\n\t<input type=\"submit\" class=\"form-control\" value=\"Register Company\"> \n</form>\n\n<br/>\n<input type=\"radio\"   name=\"whoami\" value=\"individual\"> Person or group of people \n<br/>\n\n\n<form (ngSubmit)=\"onSubmitIndividual()\" #employerFormIndividual=\"ngForm\" class=\"form-group\">\t\n\n\n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"individual.userName\" name=\"userName\" placeholder=\"User Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"individual.fName\" name=\"fname\" placeholder=\"First Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"individual.lName\" name=\"lname\" placeholder=\"Last Name\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"individual.eMail\" name=\"email\" placeholder=\"EMAIL\" required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"individual.password\" name=\"password\" placeholder=\"Password\" required required> \n\t<input type=\"text\"  class=\"form-control\" [(ngModel)]=\"individual.rePassword\" name=\"repassword\" placeholder=\"Type password again\" required> \n\n\t<br/>\n\t<input type=\"submit\" class=\"form-control\" valu=\"Register Individual\"> \n</form>\n"

/***/ }),

/***/ 817:
/***/ (function(module, exports) {

module.exports = "<visitor></visitor>\n<h1>Register Client</h1>\n<form (ngSubmit)=\"onSubmit()\" #employerForm=\"ngForm\" class=\"form-group\">\n\t<input type=\"text\"  class=\"form-control\"  [(ngModel)]=\"employer.userName\" name=\"userName\" #userName=\"ngModel\" placeholder=\"User Name\" required>\n\t<div [hidden]=\"userName.valid || userName.pristine\"\n             class=\"alert alert-danger\">\n          Name is required\n    </div>\n\tTODO: remove this: {{employer.userName}}\n\t<input type=\"text\"  class=\"form-control\"  [(ngModel)]=\"employer.fName\"   name=\"fName\" #fName=\"ngModel\" placeholder=\"First Name\" required>\n\t<div [hidden]=\"fName.valid || fName.pristine\"\n             class=\"alert alert-danger\">\n          Name is required\n    </div>\n\tTODO: remove this: {{employer.fName}}\n\t<input type=\"text\"  class=\"form-control\"  [(ngModel)]=\"employer.lName\"   name=\"lName\" #lName=\"ngModel\" placeholder=\"Last Name\" required>\n\t<div [hidden]=\"lName.valid || lName.pristine\"\n             class=\"alert alert-danger\">\n          Name is required\n    </div>\n\tTODO: remove this: {{employer.lName}}\n\t<input type=\"text\"  class=\"form-control\"  [(ngModel)]=\"employer.eMail\"   name=\"eMail\" #eMail=\"ngModel\" placeholder=\"EMAIL\" required>\n\t<div [hidden]=\"eMail.valid || eMail.pristine\"\n             class=\"alert alert-danger\">\n          Name is required\n    </div>\n\tTODO: remove this: {{employer.eMail}}\n\t<input type=\"password\"  class=\"form-control\"  [(ngModel)]=\"employer.password\" name=\"password\" #password=\"ngModel\" placeholder=\"Password\" required>\n\t<div [hidden]=\"password.valid || password.pristine\"\n             class=\"alert alert-danger\">\n          Name is required\n    </div>\n\tTODO: remove this: {{employer.password}}\n\t<input type=\"password\"  class=\"form-control\"                                  name=\"repassword\"  placeholder=\"Type password again\" required>\n\n\t<input type=\"submit\">\n</form>\n<br/>\n<h1><a href=\"logInFacebook\">Facebook Authentication</a></h1>\n<br/>\n<h1><a href=\"logInGoogle\">Google Authentication</a></h1>"

/***/ }),

/***/ 818:
/***/ (function(module, exports) {

module.exports = "<visitor></visitor>\n<h1>Do you already have account? </h1> \n<a routerLink=\"../logIn\"> Log In</a>\n<h1>Or Sign Up</h1>\n\n<h3>\n\ttell us what you  want\n</h3>\n<a routerLink=\"../registerEmployer\" >Hire</a>  people   \nor\n<a routerLink=\"../registerEmployee\" >Find Job</a>"

/***/ }),

/***/ 819:
/***/ (function(module, exports) {

module.exports = "<header>\n    <div class=\"navbar-wrapper\">\n        <nav class=\"navbar navbar-inverse navbar-static-top black-color\" role=\"navigation\">\n            <div class=\"container\">\n                <div class=\"navbar-header\">\n                    <button type=\"button\" class=\"navbar-toggle collapsed\" data-toggle=\"collapse\" data-target=\"#bs-example-navbar-collapse-1\">\n                                    <span class=\"sr-only\">Toggle navigation</span>\n                                    <span class=\"icon-bar\"></span>\n                                    <span class=\"icon-bar\"></span>\n                                    <span class=\"icon-bar\"></span>\n                                </button>\n                </div>\n                <div class=\"container-fluid\" id=\"\">\n                    <div class=\"navbar-header\">\n                        <a [routerLink]=\"['/']\"><img src=\"./public/images/logo.png\" alt=\"\"></a>\n                    </div>\n\n                    <ul class=\"nav navbar-nav\">\n                        <li><a routerLink=\"/\">Home</a> </li>\n                        <!-- <li><a routerLink=\"toprank\"></a> </li>\n                                  <li><a routerLink=\"blog\"></a> </li> -->\n                        <li><a routerLink=\"/aboutUs\">About Us</a> </li>\n\n\n\n                    </ul>\n                    <ul class=\"nav navbar-nav navbar-right\">\n                        <li><a routerLink=\"/logIn\">Log In</a> </li>\n                        <li><a routerLink=\"/signUp\">Sign Up</a> </li>\n\n                    </ul>\n                </div>\n            </div>\n        </nav>\n    </div>\n</header>"

/***/ }),

/***/ 96:
/***/ (function(module, __webpack_exports__, __webpack_require__) {

"use strict";
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_0__angular_core__ = __webpack_require__(1);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_1__angular_http__ = __webpack_require__(26);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__ = __webpack_require__(0);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__ = __webpack_require__(84);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_3_rxjs_add_operator_catch__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__ = __webpack_require__(85);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map___default = __webpack_require__.n(__WEBPACK_IMPORTED_MODULE_4_rxjs_add_operator_map__);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_5__generic_http_service__ = __webpack_require__(79);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_6__models_job_category__ = __webpack_require__(406);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_7__models_job__ = __webpack_require__(126);
/* harmony import */ var __WEBPACK_IMPORTED_MODULE_8__models_proposal__ = __webpack_require__(407);
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "b", function() { return CategoryService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "c", function() { return JobService; });
/* harmony export (binding) */ __webpack_require__.d(__webpack_exports__, "a", function() { return OfferService; });
var __extends = (this && this.__extends) || function (d, b) {
    for (var p in b) if (b.hasOwnProperty(p)) d[p] = b[p];
    function __() { this.constructor = d; }
    d.prototype = b === null ? Object.create(b) : (__.prototype = b.prototype, new __());
};
var __decorate = (this && this.__decorate) || function (decorators, target, key, desc) {
    var c = arguments.length, r = c < 3 ? target : desc === null ? desc = Object.getOwnPropertyDescriptor(target, key) : desc, d;
    if (typeof Reflect === "object" && typeof Reflect.decorate === "function") r = Reflect.decorate(decorators, target, key, desc);
    else for (var i = decorators.length - 1; i >= 0; i--) if (d = decorators[i]) r = (c < 3 ? d(r) : c > 3 ? d(target, key, r) : d(target, key)) || r;
    return c > 3 && r && Object.defineProperty(target, key, r), r;
};
var __metadata = (this && this.__metadata) || function (k, v) {
    if (typeof Reflect === "object" && typeof Reflect.metadata === "function") return Reflect.metadata(k, v);
};










var CategoryService = (function (_super) {
    __extends(CategoryService, _super);
    //categoryList: JobCategory[];
    function CategoryService(http) {
        _super.call(this);
        this.http = http;
        this.url = 'http://localhost:3311/api/category';
        //this.categoryList = [];
    }
    CategoryService.prototype.getCategoryList = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.get(this.url)
            .map(this.extractData)
            .catch(this.handleError);
    };
    CategoryService.prototype.extractData = function (res) {
        console.log('response for Get Category......');
        //console.dir(res);
        var body = res.json();
        console.dir(body);
        var categoryList = [];
        for (var _i = 0, _a = body.category; _i < _a.length; _i++) {
            var cat = _a[_i];
            var newCategory = new __WEBPACK_IMPORTED_MODULE_6__models_job_category__["a" /* JobCategory */]();
            newCategory.id = cat._id;
            newCategory.categoryVarName = cat.categoryVarName;
            newCategory.type = cat.type;
            for (var _b = 0, _c = cat.subCategory; _b < _c.length; _b++) {
                var subCat = _c[_b];
                var newSubCategory = new __WEBPACK_IMPORTED_MODULE_6__models_job_category__["a" /* JobCategory */]();
                newSubCategory.id = subCat._id;
                newSubCategory.categoryVarName = subCat.categoryVarName;
                newSubCategory.type = subCat.type;
                newCategory.subCategory.push(newSubCategory);
            }
            categoryList.push(newCategory);
        }
        return categoryList;
    };
    CategoryService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    CategoryService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], CategoryService);
    return CategoryService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
var JobService = (function (_super) {
    __extends(JobService, _super);
    function JobService(http) {
        _super.call(this);
        this.http = http;
        this.url = 'http://localhost:3311/api/employer/job';
    }
    JobService.prototype.postNewJob = function (newJobPost) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post(this.url, { newJobPost: newJobPost }, options)
            .map(this.extractData)
            .catch(this.handleError);
    };
    JobService.prototype.updateJob = function (newJobPost) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        return this.http.post('http://localhost:3311/api/employer/job/update', { newJobPost: newJobPost }, options)
            .map(this.extractDataAndCreateJob)
            .catch(this.handleError);
    };
    JobService.prototype.getEmployerPostedJobs = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            return this.http.post('http://localhost:3311/api/employer/userpostedjoblist', { owner: user._id }, options)
                .map(this.extractPostedJobsData)
                .catch(this.handleError);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('No User Presented');
        }
    };
    JobService.prototype.getEmployerPosterJobWithId = function (id) {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var user = JSON.parse(localStorage.getItem('currentUser'));
        if (user) {
            return this.http.post('http://localhost:3311/api/employer/userpostedjob', { owner: user._id, jobID: id }, options)
                .map(this.extractPostedJobsData)
                .catch(this.handleError);
        }
        else {
            return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw('No User Presented');
        }
    };
    JobService.prototype.extractPostedJobsData = function (res) {
        var body = res.json();
        var jobList = [];
        //console.dir(body);
        console.log('server responded ....');
        console.dir(body.PostList);
        if (body.PostList) {
            for (var _i = 0, _a = body.PostList; _i < _a.length; _i++) {
                var post = _a[_i];
                console.dir(post);
                var newPost = new __WEBPACK_IMPORTED_MODULE_7__models_job__["a" /* JobPost */]();
                newPost.id = post._id;
                newPost.jobCategory = post.jobCategory;
                newPost.jobSubCategory = post.jobSubCategory;
                newPost.owner = post.owner;
                newPost.jobTitle = post.jobTitle;
                newPost.jobDescription = post.jobDescription;
                newPost.deadline = post.deadLine;
                newPost.budget = post.budget;
                newPost.paymentType = post.paymentType;
                newPost.projectType = post.projectType;
                newPost.status = post.status;
                newPost.requirements = post.requirements;
                newPost.candidates = post.candidates;
                newPost.imageURLList = post.imageURLList;
                newPost.atachmentList = post.atachmentList;
                newPost.currency = post.currency;
                newPost.createdAt = post.createdAt;
                newPost.updatedAt = post.updatedAt;
                jobList.push(newPost);
            }
            console.dir(jobList);
            return jobList;
        }
        else {
            console.log('!!!!!!!!');
            return null;
        }
    };
    JobService.prototype.extractDataAndCreateJob = function (res) {
        var body = res.json();
        console.dir(body);
        if (body.post) {
            var newPost = new __WEBPACK_IMPORTED_MODULE_7__models_job__["a" /* JobPost */]();
            newPost.id = body.post._id;
            newPost.jobCategory = body.post.jobCategory;
            newPost.jobSubCategory = body.post.jobSubCategory;
            newPost.owner = body.post.owner;
            newPost.jobTitle = body.post.jobTitle;
            newPost.jobDescription = body.post.jobDescription;
            newPost.deadline = body.post.deadLine;
            newPost.budget = body.post.budget;
            newPost.paymentType = body.post.paymentType;
            newPost.projectType = body.post.projectType;
            newPost.status = body.post.status;
            newPost.requirements = body.post.requirements;
            newPost.candidates = body.post.candidates;
            newPost.imageURLList = body.post.imageURLList;
            newPost.atachmentList = body.post.atachmentList;
            newPost.currency = body.post.currency;
            newPost.createdAt = body.post.createdAt;
            newPost.updatedAt = body.post.updatedAt;
            console.dir(newPost);
            return newPost;
        }
        return null;
    };
    JobService.prototype.extractData = function (res) {
        return res.json();
    };
    JobService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    JobService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], JobService);
    return JobService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
var OfferService = (function (_super) {
    __extends(OfferService, _super);
    function OfferService(http) {
        _super.call(this);
        this.http = http;
    }
    OfferService.prototype.getOfferListEmployerSpecific = function () {
        var headers = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["b" /* Headers */]({ 'Content-Type': 'application/json' });
        var options = new __WEBPACK_IMPORTED_MODULE_1__angular_http__["c" /* RequestOptions */]({ headers: headers });
        var user = JSON.parse(localStorage.getItem('currentUser'));
        return this.http.post(this.genericAPI_url + '/employer/offers', { user: user }, options)
            .map(this.getOfferListEmployerSpecificExtractor)
            .catch(this.handleError);
    };
    OfferService.prototype.getOfferListEmployerSpecificExtractor = function (res) {
        var body = res.json();
        console.dir(body);
        var jobArray = [];
        if (body.result) {
            for (var _i = 0, _a = body.result; _i < _a.length; _i++) {
                var job = _a[_i];
                var j = new __WEBPACK_IMPORTED_MODULE_7__models_job__["a" /* JobPost */]();
                j.id = job._id;
                j.jobCategory = job.jobCategory;
                j.jobSubCategory = job.jobSubCategory;
                j.owner = job.owner;
                j.jobTitle = job.jobTitle;
                j.jobDescription = job.jobDescription;
                j.deadline = job.deadLine;
                j.budget = job.budget;
                j.paymentType = job.paymentType;
                j.projectType = job.projectType;
                j.status = job.status;
                j.requirements = job.requirements;
                j.candidates = job.candidates;
                j.imageURLList = job.imageURLList;
                j.atachmentList = job.atachmentList;
                j.currency = job.currency;
                j.createdAt = job.createdAt;
                j.updatedAt = job.updatedAt;
                for (var _b = 0, _c = job.proposals; _b < _c.length; _b++) {
                    var proposal = _c[_b];
                    var p = new __WEBPACK_IMPORTED_MODULE_8__models_proposal__["a" /* Proposal */]();
                    p.id = proposal._id;
                    p.hostJobID = job._id;
                    if (proposal.candidate) {
                        p.candidate.id = proposal.candidate._id;
                        p.candidate.contactPhone = proposal.candidate.contactPhone;
                        p.candidate.createdAt = proposal.candidate.createdAt;
                        p.candidate.updatedAt = proposal.candidate.updatedAt;
                        p.candidate.userName = proposal.candidate.userName;
                        p.candidate.email = proposal.candidate.email;
                        p.candidate.fName = proposal.candidate.fName;
                        p.candidate.lName = proposal.candidate.lName;
                        p.candidate.userRole = proposal.candidate.userRole;
                        p.candidate.feadback = proposal.candidate.feadback;
                        p.candidate.portfolio = proposal.candidate.portfolio;
                        p.candidate.services = proposal.candidate.services;
                        p.candidate.subscribes = proposal.candidate.subscribes;
                        p.candidate.subscribers = proposal.candidate.subscribers;
                    }
                    p.price = proposal.price;
                    if (proposal.currency) {
                        p.currency.id = proposal.currency._id;
                        p.currency.country = proposal.currency.country;
                        p.currency.currency = proposal.currency.currency;
                        p.currency.currencySymbol = proposal.currency.currencySymbol;
                    }
                    if (proposal.duration) {
                        p.duration.id = proposal.duration._id;
                        p.duration.duration = proposal.duration.duration;
                        p.duration.durationValue = proposal.duration.durationValue;
                    }
                    p.coverLetter = proposal.coverLetter;
                    p.whyToChoose = proposal.whyToChoose;
                    p.offerStatus = proposal.offerStatus;
                    j.proposals.push(p);
                }
                jobArray.push(j);
            }
            return jobArray;
        }
        else {
            return null;
        }
    };
    OfferService.prototype.handleError = function (error) {
        var errMsg;
        if (error instanceof __WEBPACK_IMPORTED_MODULE_1__angular_http__["d" /* Response */]) {
            var body = error.json() || '';
            var err = body.error || JSON.stringify(body);
            errMsg = error.status + " - " + (error.statusText || '') + " " + err;
        }
        else {
            errMsg = error.message ? error.message : error.toString();
        }
        console.error(errMsg);
        return __WEBPACK_IMPORTED_MODULE_2_rxjs_Observable__["Observable"].throw(errMsg);
    };
    OfferService = __decorate([
        __webpack_require__.i(__WEBPACK_IMPORTED_MODULE_0__angular_core__["c" /* Injectable */])(), 
        __metadata('design:paramtypes', [(typeof (_a = typeof __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */] !== 'undefined' && __WEBPACK_IMPORTED_MODULE_1__angular_http__["e" /* Http */]) === 'function' && _a) || Object])
    ], OfferService);
    return OfferService;
    var _a;
}(__WEBPACK_IMPORTED_MODULE_5__generic_http_service__["a" /* GenericHttp */]));
//# sourceMappingURL=/home/ozkart/Desktop/ANGULAR/limbo_client/src/employer.service.js.map

/***/ })

},[1083]);
//# sourceMappingURL=main.bundle.map