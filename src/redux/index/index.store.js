const initStore = {
    data2D: [],
    data3D: [],
    presetsData: {},
    info0: {},
    info1: {},
    info2: {},
    indexId: 0,
    StyleIndex:0,
    ClickingID:0,
    sliderShow:true,
    loading: false,
    volumeString:'',
    VolumeCalculator: false,
    toolTip: '',
    viewportType: 'normal',
    openDicomArray:[],
    rootMenu:[],
    currentRootMenu:{},
    dicom:'',
    openFile:'',
    isOpenNew:false,
    dataInfo: {},
    progressVisible:false,
    openYcm:''
}
const IndexStore = (state = initStore, action) => {
    switch (action.type) {
        //添加默认数据
        case "ADD_DATA_2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        case "ADD_DATA_3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        //窗宽窗位默认值
        case "ADD_DATA_OBG":
            return {
                ...state,
                presetsData: { ...action.data }
            }
        //右侧数据默认值
        case "ADD_DATA_INFO0":
            return {
                ...state,
                info0: { ...action.data }
            }
        //右侧数据默认值
        case "ADD_DATA_INFO1":
            return {
                ...state,
                info1: { ...action.data }
            }
        //右侧数据默认值
        case "ADD_DATA_INFO2":
            return {
                ...state,
                info2: { ...action.data }
            }
        //删除当前节点
        case "REMOVE_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "REMOVE_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //选中删除节点
        case "ACTIVES_REMOVE_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "ACTIVES_REMOVE_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //改变active选中
        case "SELECTED_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "SELECTED_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        case "TYPE_SELECTED_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "TYPE_SELECTED_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //全选反选
        case "CHOOSE_ACTIVE_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "CHOOSE_ACTIVE_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //右键选中显示
        case "SHOW_HIDE_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "SHOW_HIDE_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //显示隐藏 *眼睛
        case "DATA_SET_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "DATA_SET_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //设置颜色
        case "DATA_SET_COLOR3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "DATA_SET_COLOR2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //indexId设置
        case "CURRENT_ID":
            return {
                ...state,
                indexId: action.data
            }
        //修改节点名字
        case "REVAMP_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "REVAMP_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //器官标记
        case "MARK_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        case "MARK_NODE2D":
            return {
                ...state,
                data2D: [...action.data]
            }
        //复制
        case "COPY_NODE3D":
            return {
                ...state,
                data3D: [...action.data]
            }
        //窗宽窗位预设值
        case "WINDOW_LEVEL":
            return {
                ...state,
                presetsData: {...action.data}
            }
        //窗口交互方式
        case "STYLE_MODE":
        return {
            ...state,
            StyleIndex: action.data
        }
        case "CLICK_ID":
        return {
            ...state,
            ClickingID: action.data
        }
        //窗宽交互新值
        case "NEW_WINDOW_LEVEL":
        return {
            ...state,
            presetsData: { ...action.data }
        }
        //右侧select新值
        case "NEW_INFO0":
        return {
            ...state,
            info0: {...action.data}
        }
        case "NEW_INFO1":
        return {
            ...state,
            info1: {...action.data}
        }
        case "NEW_INFO2":
        return {
            ...state,
            info2: {...action.data}
        }
        case "RESTORE":
        return {
            ...state,
            presetsData: { ...action.data }
        }
        case "LOADING":
        return {
            ...state,
            loading: action.data
        }
        case "VOLUM_STRING":
        return {
            ...state,
            volumeString: action.data
        }
        //设置volumeCalculator显示隐藏
        case "VOLUME_CALCULATOR":
        return {
            ...state,
            VolumeCalculator: action.data
        }
        //设置消息提示
        case "TOOL_TIP":
        return {
            ...state,
            toolTip: action.data
        }
        //设置打开dicom序列
        case "Open_DicomArray":
        return {
            ...state,
            openDicomArray: action.data
        }
        //获取原始数据与重建数据列表
        case "Get_Data":
        return {
            ...state,
            rootMenu: action.data
        }
        ///当前选中项
        case "Current_RootMenu":
        return {
            ...state,
            currentRootMenu: action.data
        }
        //当前打开项
        case "Data_Info":
        return {
            ...state,
            dataInfo: action.data
        }
        //打开dicom序列路径
        case "Open_Dicom":
        return {
            ...state,
            dicom: action.data
        }
        //打开ycm路径
        case "Open_Ycm":
        return {
            ...state,
            openYcm: action.data
        }
        //打开文件路径
        case "Open_File":
        return {
            ...state,
            openFile: action.data
        }
        case "Is_Open_New":
        return {
            ...state,
            isOpenNew: action.data
        }
        case "Progress_Value":
        return {
            ...state,
            progressVisible: action.data
        }
        default:
            return state
    }
}
export default IndexStore;
