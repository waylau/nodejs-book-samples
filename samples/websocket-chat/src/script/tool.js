// 浏览器的兼容性校验
window.$ = (tag, all) => {
  if (!tag) {
    console.warn('请检查传入的css选择器是否正确')
    return null
  }
  if (!document.querySelector) {
    console.warn('浏览器不支持querySelector')
    return null
  }
  if (all) {
    return document.querySelectorAll(tag)
  } else {
    return document.querySelector(tag)
  }
}

// Ajax请求处理
$.ajax = function (json) {
  if (!json) return;
  let type = json.type.toUpperCase();
  let url = json.url;
  let data = json.data;
  let success = json.success;
  let error = json.error;


  // IE6, IE5 浏览器兼容执行代码
  let xmlHttp = window.XMLHttpRequest ? new XMLHttpRequest() : new ActiveXObject("Microsoft.XMLHTTP");
  /*
   * open: 规定请求的类型、URL 以及是否异步处理请求。
   * method：请求的类型；GET 或 POST
   * rl：文件在服务器上的位置
   * async：true（异步）(默认) 或 false（同步）
  */
  if (type === "GET") {
    if (data) {
      let res = Object.keys(data).map((key) => `${key}=${data[key]}`).join('&');
      url += ('?' + res);
    }
    xmlHttp.open(type, url, true);
    xmlHttp.send();
  }
  /*
   * send: 将请求发送到服务器。
   * string：仅用于 POST 请求
  */
  if (type === 'POST') {
    xmlHttp.open(type, url, true);
    xmlHttp.setRequestHeader('Content-type', "application/x-www-form-urlencoded");
    xmlHttp.send(data);
  }

  /*
   * onreadystatechange: 当readyState属性改变时，就会调用该函数。
   * readyState: 存有 XMLHttpRequest 的状态。从 0 到 4 发生变化。
   * 0: 请求未初始化
   * 1: 服务器连接已建立
   * 2: 请求已接收
   * 3: 请求处理中
   * 4: 请求已完成，且响应已就绪
   * status：
   * 200: "OK"
   * 404: 未找到页面
  */
  xmlHttp.onload = function () {
    // 304 客户端已经执行了GET，但文件未变化
    // 206 资源下载未完成时  一般用于媒体资源的下载
    if (xmlHttp.status === 200 || xmlHttp.status === 304 || xmlHttp.status === 206) {
      // responseText	获得字符串形式的响应数据。
      // responseXML	获得 XML 形式的响应数据。
      const res = JSON.parse(xmlHttp.responseText)
      if (xmlHttp.responseText && res && res.code === 0) {
        success && success(res.data);
      } else {
        alert('网络请求故障，请重试！')
      }
    } else {
      error && error(xmlHttp.responseText)
    }
  }

}
