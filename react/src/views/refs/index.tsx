import React from 'react';

class RefsPage extends React.Component<any, any>{
  constructor(props: any) {
    super(props)
    this.state = {
      inputRefs: React.createRef()
    }
  }

  handleChage = (e:any) => {
    console.log(e, this.state.inputRefs.current.value)
  }

  render() {
    const { inputRefs } = this.state
    return <div className="refs-root">
      <input type="text" ref={inputRefs} onChange={this.handleChage}/>
    </div>
  }
}

export default RefsPage