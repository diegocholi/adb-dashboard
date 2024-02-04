import { PropsWithChildren } from 'react'

const CardBody = (props: PropsWithChildren) => {
  return <div className='card-body'>{props.children}</div>
}

export default CardBody
