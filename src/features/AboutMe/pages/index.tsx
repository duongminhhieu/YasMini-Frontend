import { Button } from "antd"
import { useAppDispatch, useAppSelector } from "../../../hooks/useRedux"
import { decrement, increment } from "../aboutMeSlice"

export default function AboutMe() {

     // The `state` arg is correctly typed as `RootState` already
  const value = useAppSelector((state) => state.aboutMe.value)
  const dispatch = useAppDispatch()

  return (
    <>
    
    <div>About Me</div>

    <Button onClick={() => dispatch(increment())}>Increment</Button>
    <Button onClick={() => dispatch(decrement())}>Decrement</Button>

    <span>{value}</span>
    </>
  )
}
