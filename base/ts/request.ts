import qs from 'qs'
import { cloneDeep } from 'lodash-es'
import axios, { AxiosError, AxiosInstance, AxiosRequestConfig, AxiosResponse } from 'axios'

interface RequestBuilderConfig {
  _isFullRequest?: boolean, 
  _isHideErrorToast?: boolean 
}

interface RequestBuilderProps {
  axiosInstance: AxiosInstance ; 
  config?: RequestBuilderConfig 
}

type CustomAxiosRequestConfig = RequestBuilderConfig & AxiosRequestConfig

class RequestBuilder {
  config : RequestBuilderConfig = { 
    _isFullRequest: false, 
    _isHideErrorToast: false 
  }

  axiosInstance: AxiosInstance

  constructor(props:RequestBuilderProps) {
    this.axiosInstance = props.axiosInstance

    this.config = {
      ...this.config,
      ...props.config
    }

  }

  search(url: string, params: {
    page?:number
    pageSize?: number 
    search?:string 
    sort?: { key: string; order: 'asc' | 'desc' }[]
    [key:string]:any 
  }, config?:CustomAxiosRequestConfig) {
    const newParams = cloneDeep(params)

    for (const key in newParams) {
      const value = newParams[key]

      if ([ '', null, undefined ].includes(value)) {
        Reflect.deleteProperty(newParams, key)
      }
    }

    return this.axiosInstance.get(url, {
      params: newParams, 
      paramsSerializer: (t: any) => {
        return qs.stringify(t, { arrayFormat: 'indices' })
      }, 
      ...config, 
      ...this.config
    })
  }

  full() {
    return new RequestBuilder(
      {
        axiosInstance: this.axiosInstance,
        config: { 
          ...this.config,
          _isFullRequest: true 
        }
      } 
    )
  }

  silent() {
    return new RequestBuilder(
      {
        axiosInstance: this.axiosInstance,
        config: { 
          ...this.config,
          _isHideErrorToast: true

        }
      })
  }

  get(url: string, params?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.get(url, {
      params,
      ...config,
      ...this.config 
    })
  }

  post(url: string, params?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.post(url, params, { ...config,
      ...this.config })
  }

  patch(url: string, params?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.patch(url, params, { ...config,
      ...this.config })
  }

  delete(url: string, params?: any, config?: CustomAxiosRequestConfig) {
    return this.axiosInstance.delete(url, {
      data: params,
      ...config,
      ...this.config
    })
  }

}

const TIMEOUT = 0
const RE_LOGIN_CODE = [ 401 ]

const axiosInstance = axios.create({
  timeout: TIMEOUT,
  headers: {
    'Content-Type': 'application/json'
  }
})

// 请求拦截器
axiosInstance.interceptors.request.use((config) => {
  const adminStore = AdminStore()

  if (!config.baseURL) {
    config.baseURL = adminStore.getWebAddress.apiAddress
  }
  config.headers['token'] = adminStore.token || ''

  config.headers['deviceId'] = adminStore.deviceId || ''

  config.headers['version'] = adminStore.version || ''
  
  return config
}, (error) => {
  return Promise.reject(error)
})

function handleError(message:string, hide:boolean = false) {
  if (!hide) {
    ElMessage.error({
      showClose: true,
      message
    })
  }
}

axiosInstance.interceptors.response.use(
  (response: AxiosResponse) => {
    const { config, data } = response
    const { _isFullRequest } = config as CustomAxiosRequestConfig

    // 是否全量返回
    if (_isFullRequest) {
      return response
    } 

    // jcjy 数据结构判断
    const isMatch = Object.prototype.hasOwnProperty.call(data, 'err') && (Object.prototype.hasOwnProperty.call(data, 'data') || Object.prototype.hasOwnProperty.call(data, 'errMsg'))

    if (isMatch) {
      const { data: newData, err, errMsg } = data 

      if (err > 0) {
        const errText = `${err}:${errMsg}`

        if (RE_LOGIN_CODE.includes(err)) {
          alert('当前登录过期')
        }  
        throw new Error(errText)
      } else {
        return newData 
      }
    } else {
      // 不符合 jcjy 结构的 直接返回 response 全量数据
      return response
    }
  },
  (err:AxiosError) => {
    const { message, config } = err 
    const { _isHideErrorToast } = config as CustomAxiosRequestConfig

    handleError(message, _isHideErrorToast)
    return Promise.reject(err)

  }
)

export const jcjyRequest = new RequestBuilder(
  {
    axiosInstance 
  }
)
 