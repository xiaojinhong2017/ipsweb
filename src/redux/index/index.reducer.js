import reqwest from 'reqwest';
import {message} from "antd";

//设置默认二维数据
export const ndoes2D = (ndoes)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'ADD_DATA_2D',
            data:ndoes
        })
    }
}
//设置默认三维数据
export const ndoes3D = (ndoes)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'ADD_DATA_3D',
            data:ndoes
        })
    }
}
//窗口窗位默认值
export const presets = (object)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'ADD_DATA_OBG',
            data:object
        })
    }
}
//右侧滑动条
export const infoA = (object)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'ADD_DATA_INFO0',
            data:object
        })
    }
}
//右侧滑动条
export const infoB = (object)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'ADD_DATA_INFO1',
            data:object
        })
    }
}
//右侧滑动条
export const infoC = (object)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'ADD_DATA_INFO2',
            data:object
        })
    }
}
//设置颜色
export const SetColor = (index,color)=>{
    return(dispatch,getState) => {
        let data3D = window.vtk.nodeapis.getViewNodeList(3)
        let data2D = window.vtk.nodeapis.getViewNodeList(0)
        dispatch({
            type:'DATA_SET_COLOR2D',
            data:data2D
        })
        dispatch({
            type:'DATA_SET_COLOR3D',
            data:data3D
        })
    }
}

//设置显示隐藏 眼睛
export const SetNoes = (index , visible)=>{
    // console.log(index ,visible)
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
            list.forEach(function(v){
                if(v.index === index){
                    v.visible= visible
                    v.selected = 1
                }else{
                    v.selected = 0
                }
                v.type_selected = 0
                if(v.children){
                    setNodes(v.children)
                }
            })
        }
        setNodes(data3D)
        setNodes(data2D)
    }
}
//右键选择隐藏显示
export const RightKey = (type,index)=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        data3D.map(v=>{
            if(v.index===index){
                if(type){
                    v.visible = 1
                  }else{
                    v.visible = 0
                  }
            }
            return v
        })
        data2D.map(v=>{
            if(v.index===index){
                if(type){
                    v.visible = 1
                  }else{
                    v.visible = 0
                  }
            }
            return v
        })

    }
}

//保存id属性
export const currentIdR = (index)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'CURRENT_ID',
            data:index
        })
    }
}
//选中删除节点
export const ActivesRemoveCurrent = ()=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
        list.forEach(function(v ,i){
            if(v.type_selected ===1){
                window.vtk.nodeapis.removeNode(v.index);
            }
            if(v.children){
                setNodes(v.children)
            }
        })
        }
        setNodes(data3D)
        setNodes(data2D)
        let new3D = window.vtk.nodeapis.getViewNodeList(3)
        let new2D = window.vtk.nodeapis.getViewNodeList(0)
        const getNodes = function(list){
            list.forEach(function(v ,i){
                    v.type_selected = 0
                if(v.children){
                    getNodes(v.children)
                }
            })
            }
        getNodes(new3D)
        getNodes(new2D)
        dispatch({
            type:'ACTIVES_REMOVE_NODE2D',
            data:new2D
        })
        dispatch({
            type:'ACTIVES_REMOVE_NODE3D',
            data:new3D
        })
    }
}

//删除节点
export const removeCurrent = ()=>{
    return(dispatch,getState) => {
        let new3d = window.vtk.nodeapis.getViewNodeList(3)
        let new2d = window.vtk.nodeapis.getViewNodeList(0)
        console.log(new3d ,getState().IndexStore.data3D ,"dddd" )
        dispatch({
            type:'REMOVE_NODE2D',
            data:new2d
        })
        dispatch({
            type:'REMOVE_NODE3D',
            data:new3d
        })
    }
}

// 修改节点名字
export const revampName = (name,index)=>{
    return(dispatch,getState) => {
        let new3d = window.vtk.nodeapis.getViewNodeList(3)
        let new2d = window.vtk.nodeapis.getViewNodeList(0)
        dispatch({
            type:'REVAMP_NODE3D',
            data:new3d
        })
        dispatch({
            type:'REVAMP_NODE2D',
            data:new2d
        })
    }
}

//器官标记
export const LabelMarkR = (index,text)=>{
    return(dispatch,getState) => {
        let new3d = window.vtk.nodeapis.getViewNodeList(3)
        let new2d = window.vtk.nodeapis.getViewNodeList(0)
        dispatch({
            type:'MARK_NODE3D',
            data:new3d
        })
        dispatch({
            type:'MARK_NODE2D',
            data:new2d
        })
    }
}

// 右键菜单显示隐藏
export const ShowHideR = (type,index)=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
            list.forEach(function(v){
                if(v.type_selected===1){
                    if(type){
                      v.visible = 1
                    }else{
                      v.visible = 0
                    }
                  }
                if(v.children){
                    setNodes(v.children)
                }
            })
        }
        if(index===3){
            setNodes(data3D)
        }else{
            setNodes(data2D)
        }

    }
}

//全选
export const All_ChooseActives = ()=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
            list.forEach(function(row){
                row.type_selected = 1
                if(row.children){
                    setNodes(row.children)
                }
            })
        }
        setNodes(data3D)
        setNodes(data2D)
    }

}
//反选
export const Inverse_ChooseActives = ()=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
            list.forEach(function(v){
                if(v.selected ===1){
                    v.type_selected = 1
                }
                if(v.type_selected ===1){
                    v.type_selected =0
                }else{
                    v.type_selected =1
                }
                if(v.children){
                    setNodes(v.children)
                }
            })
        }
        setNodes(data3D)
        setNodes(data2D)
    }
}

//改变选择active
export const Selected = (index)=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
            list.forEach(function(v){
                if(v.index === index){
                    v.selected = 1
                }else{
                    v.selected = 0
                }
                v.type_selected = 0
                if(v.children){
                    setNodes(v.children)
                }
            })
        }
        setNodes(data3D)
        setNodes(data2D)
        dispatch({
            type:'SELECTED_NODE3D',
            data:data3D
        })
        dispatch({
            type:'SELECTED_NODE2D',
            data:data2D
        })

    }
}
// 多选
export const TypeSelected = (index)=>{
    return(dispatch,getState) => {
        let data3D=getState().IndexStore.data3D
        let data2D=getState().IndexStore.data2D
        const setNodes = function(list){
            list.forEach(function(v){
                if(v.selected===1){
                    v.type_selected = 1
                }
                if(v.index === index){
                    v.type_selected = 1
                }
                if(v.children){
                    setNodes(v.children)
                }
            })
        }
        setNodes(data3D)
        setNodes(data2D)
        dispatch({
            type:'TYPE_SELECTED_NODE3D',
            data:data3D
        })
        dispatch({
            type:'TYPE_SELECTED_NODE2D',
            data:data2D
        })
    }
}
 //复制
export const CopyNode = ()=>{
    return(dispatch,getState) => {
        let new3d = window.vtk.nodeapis.getViewNodeList(3)
        dispatch({
            type:'COPY_NODE3D',
            data:new3d
        })

    }
}
// 设置窗宽预设值
export const WindowLevel = (preset ,window_level)=>{
    return(dispatch,getState) => {
        let presets = getState().IndexStore.presetsData
        var arr = []
        for (let i in window_level) {
            let o = {};
            o[i] = window_level[i];
            arr.push(o)
        }
        const Data = [];
       arr.forEach(key=>{
            if(Object.keys(key)==preset){
                Data.push(Object.values(key)[0].windowLevel)
            }
        })
        const max = {max: presets.max};
        const min = {min:presets.min};
        const window = {window:Data[0][0]};
        const level = {level:Data[0][1]};
        const obj = Object.assign({}, max, min, window , level);
        dispatch({
            type:'WINDOW_LEVEL',
            data:obj
        })

    }
}

export const StyleMode = (number)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'STYLE_MODE',
            data:number
        })

    }
}

export const ClickId = (number)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'CLICK_ID',
            data:number
        })

    }
}

export const NewWindowLevel = (object)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'NEW_WINDOW_LEVEL',
            data:object
        })

    }
}
// 右侧select
export const info = (info0,info1,info2)=>{
    return(dispatch,getState)=>{
        dispatch({
            type:'NEW_INFO0',
            data:info0
        })
        dispatch({
            type:'NEW_INFO1',
            data:info1
        })
        dispatch({
            type:'NEW_INFO2',
            data:info2
        })
    }
}
//还原窗宽窗位

export const restore = ()=>{
    return(dispatch,getState)=>{
        let ObjectStr = window.vtk.apis.getWindowLevelInfo();
        dispatch({
            type:'RESTORE',
            data:ObjectStr
        })

    }
}

//
export const loadingStore = (state)=>{
    return(dispatch,getState) => {
        dispatch({
            type: 'LOADING',
            data: state
        })
    }
}

export const setVolumeString = (string)=>{
    return(dispatch,getState) => {
        dispatch({
            type: 'VOLUM_STRING',
            data: string
        })
    }
}
//设置volumeCalculator显示隐藏
export const setVolumeCalculator = (state)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'VOLUME_CALCULATOR',
            data: state
        })
    }
}
// 设置错误提示
export const setToolTip = (message)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'TOOL_TIP',
            data: message
        })
    }
}

//设置切换期项序列
export const setOpenDicomArray = (array)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Open_DicomArray',
            data: array
        })
    }
}

//获取原始数据与重建数据列表
export const getData = ()=>{
  var url = window.requestUrl + "/dmitweb/oss/findByOrderAnd3D/"+window.orderId;
  return(dispatch,getState) => {
    reqwest({
       url: url,
       method: 'get',
       success: (data) => {
         if(data) {

               dispatch({
                   type:'Get_Data',
                   data: data.OTOrderOssObjectVOList
               })

         }else {
           message.error("数据请求失败");
         }
       },
       error: () => {
         message.error('请求失败');
       },
     });
   }
}

//当前选中项
export const setCurrentRootMenu = (obj)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Current_RootMenu',
            data: obj
        })
    }
}
//当前打开项
export const setDataInfo = (obj)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Data_Info',
            data: obj
        })
    }
}
//打开dicom序列路径
export const setOpenDicom = (path)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Open_Dicom',
            data: path
        })
    }
}
//打开文件路径
export const setOpenFile = (path)=>{
  setOpenDicomArray([]);
    return(dispatch,getState) => {
        dispatch({
            type:'Open_File',
            data: path
        })
    }
}
//打开dicom序列路径
export const setOpenYcm = (path)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Open_Ycm',
            data: path
        })
    }
}
//设置新增项是否打开
export const setIsOpenNew = (bool)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Is_Open_New',
            data: bool
        })
    }
}

//设置进度条
export const setProgressVisible = (bool)=>{
    return(dispatch,getState) => {
        dispatch({
            type:'Progress_Value',
            data: bool
        })
    }
}
