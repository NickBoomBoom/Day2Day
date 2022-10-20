import React from 'react';
import { IProps, IState } from '../../models/hook.model'
import './index.scss'

class HookPage extends React.Component<IProps, IState>{
  constructor(props: any) {
    super(props)
    this.state = {

    }
  }
  componentDidMount() {

  }


  render() {

    return <div className='hook-root'>
    hook
    </div>
  }
}

export default HookPage;
