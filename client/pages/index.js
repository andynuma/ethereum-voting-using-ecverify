// client/pages/index.js

import { eth, getInstance } from '../web3/provider'
import helloworld from "../web3/artifacts/helloworld.json"

export default class IndexPage extends React.Component {

    async componentDidMount(){
        const addresses = await eth.getAccounts()
        console.log(addresses)

        //onst message = await getInstance(helloworld)
        //const const
        console.log("hi")
    }

    logUser = async () => {
        //const mymessage = await setHelloworld("fuck you")
        console.log("aaaaaa")
    }

    render() {
      return (
        <div>
            <button onClick={this.logUser}>
            test
            </button>
        </div>
      )
    }
  } 