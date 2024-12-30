/*

获取方式：打开  https://e.dlife.cn/index.do 登录
===================
[MITM]
hostname = e.dlife.cn

【Surge脚本配置】:
===================
[Script]
电信登录地址 = type=http-request,pattern=^https:\/\/e\.dlife\.cn\/user\/loginMiddle,requires-body=1,max-size=0,script-path=https://raw.githubusercontent.com/dompling/Script/master/10000/index.js,script-update-interval=0

===================
【Loon脚本配置】:
===================
[Script]
http-request ^https:\/\/e\.dlife\.cn\/user\/loginMiddle tag=电信登录地址, script-path=https://raw.githubusercontent.com/dompling/Script/master/10000/index.js

===================
【 QX  脚本配置 】 :
===================

[rewrite_local]
^https:\/\/e\.dlife\.cn\/user\/loginMiddle  url script-request-header https://raw.githubusercontent.com/dompling/Script/master/10000/index.js

 */

const APIKey = "yy_10000";
const $ = new API(APIKey, true);
if ($request) GetCookie();

function GetCookie() {
  if ($request.url.indexOf("https://e.dlife.cn/user/loginMiddle") !== -1) {
    $.login_url = $request.url.match(/(http.+)&sign/)[1];
    $.write($.login_url, `china_telecom_loginUrl`);
    $.notify(`中国电信`, `登录地址获取成功`, $.login_url);
    $.info(`登录地址：${$.login_url}`);
  }
}

$.done();

/* prettier-ignore */
function ENV(){const isJSBox=typeof require=="function"&&typeof $jsbox!="undefined";return{isQX:typeof $task!=="undefined",isLoon:typeof $loon!=="undefined",isSurge:typeof $httpClient!=="undefined"&&typeof $utils!=="undefined",isBrowser:typeof document!=="undefined",isNode:typeof require=="function"&&!isJSBox,isJSBox,isRequest:typeof $request!=="undefined",isScriptable:typeof importModule!=="undefined",isShadowrocket:"undefined"!==typeof $rocket,isStash:"undefined"!==typeof $environment&&$environment["stash-version"]}}
/* prettier-ignore */
function HTTP(defaultOptions={baseURL:""}){const{isQX,isLoon,isSurge,isScriptable,isNode,isBrowser,isShadowrocket,isStash,}=ENV();const methods=["GET","POST","PUT","DELETE","HEAD","OPTIONS","PATCH"];const URL_REGEX=/https?:\/\/(www\.)?[-a-zA-Z0-9@:%._\+~#=]{1,256}\.[a-zA-Z0-9()]{1,6}\b([-a-zA-Z0-9()@:%_\+.~#?&//=]*)/;function send(method,options){options=typeof options==="string"?{url:options}:options;const baseURL=defaultOptions.baseURL;if(baseURL&&!URL_REGEX.test(options.url||"")){options.url=baseURL?baseURL+options.url:options.url}if(options.body&&options.headers&&!options.headers["Content-Type"]){options.headers["Content-Type"]="application/x-www-form-urlencoded"}options={...defaultOptions,...options};const timeout=options.timeout;const events={...{onRequest:()=>{},onResponse:(resp)=>resp,onTimeout:()=>{},},...options.events,};events.onRequest(method,options);let worker;if(isQX){worker=$task.fetch({method,...options})}else if(isLoon||isSurge||isNode||isShadowrocket||isStash){worker=new Promise((resolve,reject)=>{const request=isNode?require("request"):$httpClient;request[method.toLowerCase()](options,(err,response,body)=>{if(err)reject(err);else resolve({statusCode:response.status||response.statusCode,headers:response.headers,body,})})})}else if(isScriptable){const request=new Request(options.url);request.method=method;request.headers=options.headers;request.body=options.body;worker=new Promise((resolve,reject)=>{request.loadString().then((body)=>{resolve({statusCode:request.response.statusCode,headers:request.response.headers,body,})}).catch((err)=>reject(err))})}else if(isBrowser){worker=new Promise((resolve,reject)=>{fetch(options.url,{method,headers:options.headers,body:options.body,}).then((response)=>response.json()).then((response)=>resolve({statusCode:response.status,headers:response.headers,body:response.data,})).catch(reject)})}let timeoutid;const timer=timeout?new Promise((_,reject)=>{timeoutid=setTimeout(()=>{events.onTimeout();return reject(`${method}URL:${options.url}exceeds the timeout ${timeout}ms`)},timeout)}):null;return(timer?Promise.race([timer,worker]).then((res)=>{clearTimeout(timeoutid);return res}):worker).then((resp)=>events.onResponse(resp))}const http={};methods.forEach((method)=>(http[method.toLowerCase()]=(options)=>send(method,options)));return http}
