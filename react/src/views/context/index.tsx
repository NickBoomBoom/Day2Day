import React from 'react';
import { ThemeContext} from '../../index'
class ContextPage extends React.Component {

  render() {
    return <ThemeContext.Consumer >
      {
        context => {
          console.log(context)
         return  <h2>
            {JSON.stringify(context)}
          </h2>
        }
      }
    </ThemeContext.Consumer>
  }
}

export default ContextPage