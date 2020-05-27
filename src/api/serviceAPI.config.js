
// 统一定义接口，有利于维护
/* eslint-disable */
// const SERVERIP = "http://192.168.1.177:8080";
const SERVERIP = "http://39.108.97.209:8080";
const URL = {
  record: `${SERVERIP}/dmitweb/monitor/record`, // 监听接口
  monitorOpen: `${SERVERIP}/dmitweb/monitor/visitLog`, // 定时器监听接口
  dmitwebLogin: `${SERVERIP}/dmitweb/login/lgin`, // dmitweb接口
};

export default URL;
