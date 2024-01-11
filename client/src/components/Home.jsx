import Todos from "./Todos"

const Home = (props) => {
  return (
    <Todos showAlert={props.showAlert} />
  )
}

export default Home
