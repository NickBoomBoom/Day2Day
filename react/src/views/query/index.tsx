import React from 'react';
import qs from 'qs'
import url from 'url'
import { IProps, IState, IResult } from '../../models/query.model'
import './index.scss'

class QueryPage extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {
      inputValue: 'https://www.baidu.com/?a=1&a=2&b=2',
      result: []
    }
  }
  componentDidMount() {
    this.test()
  }

  inputChange = (e: any) => {
    const value: string = e.target?.value
    this.setState({
      inputValue: value
    })
  }

  test = () => {
    const { inputValue } = this.state
    let res: IResult[] = []
    // qs
    const _qs: string = inputValue.split('?')[1]
    const q = qs.parse(_qs)
    res.push({
      params: _qs,
      handle: `qs.parse(${_qs})`,
      result: JSON.stringify(q, null, 2)
    })

    // url
    const uq = url.parse(inputValue, true)
    res.push({
      params: inputValue,
      handle: `url.parse(${inputValue}, true)`,
      result: JSON.stringify(uq, null, 2)
    })

    // URLSearchParams
    const _url: string = '?' + inputValue.split('?')[1]
    const uuq = new URLSearchParams(_url)
    let uuqRes:any = {}
    for (let key of uuq.keys()) {
      uuqRes[key] = uuq.getAll(key)
    }
    res.push({
      params: _url,
      handle: `new URLSearchParams(${_url})`,
      result: JSON.stringify(uuqRes, null, 2)
    })

    this.setState({
      result: res
    })
  }

  render() {
    const { inputValue, result } = this.state
    return <div className='query-root'>
      <div className='input-box'>
        <input
          className='input'
          type="text"
          value={inputValue}
          onChange={this.inputChange}
        />
        <button onClick={this.test}>
          提取query
      </button>
      </div>
      
      <div className="result">
        <h1>
          QS, URL, URLSearchParams
        </h1>
        {
          result.map((item, index) => {
            return <div key={index} className='result-item'>
              参数:   {item.params}
              <br />
            函数:   {item.handle}
              <br />
            结果:
              <pre dangerouslySetInnerHTML={{ __html: item.result }}>
              </pre>
            </div>
          })
        }

      </div>
    </div>
  }
}

export default QueryPage;
