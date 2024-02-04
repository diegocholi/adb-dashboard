import { PropsWithChildren } from 'react'

const CardFooter = (props: PropsWithChildren) => {
  return <div className='card-footer'>{props.children}</div>
}

export default CardFooter
