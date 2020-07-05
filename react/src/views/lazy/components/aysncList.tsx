import React from 'react';

class AsyncListCompoents extends React.Component<any, any> {
  render() {
    const { list } = this.props

    return <div className='async-list-root'>
      {
        list.map((item: any) => {
          return <h3 key={item}>
            {item}
          </h3>
        })
      }
    </div>
  }
}

export default AsyncListCompoents