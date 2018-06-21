import axios from 'axios';
import tokens from "../utils/common.js"

let token = JSON.parse(window.localStorage.getItem('token'));
console.log(tokens)

let base = 'http://192.168.1.103:9000'
// let base = 'http://47.94.202.250:9000'

export const requestLogin = params => { return axios.post(`${base}/user/login`, params)};

export const getUserList = params => { return axios.get(`${base}/user/list`, { params: params }); };

//获取列表


export const getUserListPage = params => { return axios.get(`${base}/shop/bizShops?token=` + JSON.parse(window.localStorage.getItem('token')), { params: params });};

export const getStatePage = params => { return axios.get(`${base}/bizFormat/bizFormats?token=` + JSON.parse(window.localStorage.getItem('token')), { params: params });};

export const getFloorPage = params => { return axios.get(`${base}/floor/bizFloors?token=` + JSON.parse(window.localStorage.getItem('token')), {params: params});};

export const getActivePage = params => { return axios.get(`${base}/activity/bizActivities?token=` + JSON.parse(window.localStorage.getItem('token')), { params: params });};

export const getActiveSelect = params => { return axios.get(`${base}/activity/activities?token=` + JSON.parse(window.localStorage.getItem('token')), { params:params});}

export const getScreenPage = params => { return axios.get(`${base}/screensaverMaterial/bizScreensaverMaterials?token=` + JSON.parse(window.localStorage.getItem('token')), { params: params }); };

export const getActiveMaterialPage = params => { return axios.get(`${base}/activityMaterial/bizActivityMaterials?token=` + JSON.parse(window.localStorage.getItem('token')), { params: params }); };

export const getScreenManagementPage = params => { return axios.get(`${base}/screensaver/bizScreensavers?token=` + JSON.parse(window.localStorage.getItem('token')), { params: params }); };

export const getSerminalManagePage = params => { return axios.get(`${base}/terminal/bizTerminals?token=` + JSON.parse(window.localStorage.getItem('token')), {params:params});}

export const getPublichScreen = params => { return axios.post(`${base}/screensaver/publishedScreensaver?token=` + JSON.parse(window.localStorage.getItem('token')), params);}

export const getScreenSaver = params => { return axios.get(`${base}/screensaver/bizScreensaver/?token=` + JSON.parse(window.localStorage.getItem('token')), {params:params})}

export const getPublic = params => { return axios.get(`${base}/terminal/bizTerminalsNotPublished?token=` + JSON.parse(window.localStorage.getItem('token')),params)}

export const getMapPage = params => { return axios.get(`${base}/map/bizMaps?token=` + JSON.parse(window.localStorage.getItem('token'),{ params:params }))}

// export const getImg = params => { return axios.post(`${base}/terminal/program?token=` + JSON.parse(window.localStorage.getItem('token')),params),{
//     headers:{'Content-Type':'application/x-www-form-urlencoded' }
// }}

export const getImg = params => {return axios({url:`${base}/terminal/program?token=` + JSON.parse(window.localStorage.getItem('token')),method:'post',data:{
    // sn:terminal_number, prog:screensaver_id

},
	headers:{'Content-Type':'application/x-www-form-urlencoded'}
})
}

//删除

export const removeUser = params => { return axios.delete(`${base}/user/remove`, { params: params }); };

export const removeState = params => { return axios.delete(`${base}/bizFormat/bizFormat/?token=` + JSON.parse(window.localStorage.getItem('token')),{ params:params});};

export const removeFloor = params => { return axios.delete(`${base}/floor/bizFloor/?token=` + JSON.parse(window.localStorage.getItem('token')),{ params:params});};

export const removeActive = params => { return axios.delete(`${base}/activity/bizActivity/?token=` + JSON.parse(window.localStorage.getItem('token')),{ params:params});};

export const removeActivepage = params => { return axios.delete(`${base}/activityMaterial/bizActivityMaterial/?token=` + JSON.parse(window.localStorage.getItem('token')),{ params:params});};

export const removeScreenpage = params => { return axios.delete(`${base}/screensaverMaterial/bizScreensaverMaterial/?token=` + JSON.parse(window.localStorage.getItem('token')),{ params:params});};

export const removeTerminalManage = params => { return axios.delete(`${base}/terminal/bizTerminal/?token=` + JSON.parse(window.localStorage.getItem('token')),{ params:params});};

export const removeScreenManage = params => { return axios.delete(`${base}/screensaver/bizScreensaver/?token=` + JSON.parse(window.localStorage.getItem('token')), {params:params})}

export const removeMap = params => { return axios.delete(`${base}/map/bizMap?token=` + JSON.parse(window.localStorage.getItem('token')),{params:params})}

//编辑

export const editUser = params => { return axios.put(`${base}/shop/bizShop?token=` + JSON.parse(window.localStorage.getItem('token')), params ); };

export const editState = params => { return axios.put(`${base}/bizFormat/bizFormat?token=` + JSON.parse(window.localStorage.getItem('token')), params); };

export const editFloor = params => { return axios.put(`${base}/floor/bizFloor?token=` + JSON.parse(window.localStorage.getItem('token')), params); };

export const editActive = params => { return axios.put(`${base}/activity/bizActivity?token=` + JSON.parse(window.localStorage.getItem('token')),  params); };

export const editScreen = params => { return axios.put(`${base}/screensaverMaterial/bizScreensaverMaterial?token=` + JSON.parse(window.localStorage.getItem('token')), params)};

export const editActivepage = params => { return axios.put(`${base}/activityMaterial/bizActivityMaterial?token=` + JSON.parse(window.localStorage.getItem('token')),params);};

export const editScreenpage = params => { return axios.put(`${base}/screensaver/bizScreensaver?token=` + JSON.parse(window.localStorage.getItem('token')), params)};

export const editTerminaManage = params => { return axios.put(`${base}/terminal/bizTerminal?token=` + JSON.parse(window.localStorage.getItem('token')),params)};

export const editMap = params => { return axios.put(`${base}/map/bizMap?token=` + JSON.parse(window.localStorage.getItem('token')),params)}
// export const edit
//新增

export const addUser = params => { return axios.post(`${base}/shop/bizShop?token=` + JSON.parse(window.localStorage.getItem('token')), params); };

export const addState = params => { return axios.post(`${base}/bizFormat/bizFormat/?token=` + JSON.parse(window.localStorage.getItem('token')), params);};

export const addFloor = params => { return axios.post(`${base}/floor/bizFloor/?token=` + JSON.parse(window.localStorage.getItem('token')), params);};

export const addActive = params => { return axios.post(`${base}/activity/bizActivity/?token=` + JSON.parse(window.localStorage.getItem('token')), params);};

export const addScreenManagement = params => { return axios.post(`${base}/screensaver/bizScreensaver/?token=` + JSON.parse(window.localStorage.getItem('token')), params);}

export const addTerminalManagement = params => { return axios.post(`${base}/terminal/bizTerminal/?token=` + JSON.parse(window.localStorage.getItem('token')), params);}

export const addActiveMaterial = params => { return axios.post(`${base}/activityMaterial/bizActivityMaterial/?token=` + JSON.parse(window.localStorage.getItem('token')), params);};

export const addScreenMaterial = params => { return axios.post(`${base}/screensaverMaterial/bizScreensaverMaterial/?token=` + JSON.parse(window.localStorage.getItem('token')), params);};

export const addMap = params => { return axios.post(`${base}/map/bizMap?token=` + JSON.parse(window.localStorage.getItem('token')), params)};
//启停

export const switchStart = params => { return axios.delete(`${base}/shop/bizShop/?token=` + JSON.parse(window.localStorage.getItem('token')), {params:params})}


