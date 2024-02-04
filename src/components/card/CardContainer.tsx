import { PropsWithChildren } from 'react'

interface ICardContainer {
  cardColor?:
    | 'card-primary'
    | 'card-secondary'
    | 'card-success'
    | 'card-info'
    | 'card-warning'
    | 'card-danger'
    | 'card-dark'
  className?: string
}

const CardContainer = (props: PropsWithChildren<ICardContainer>) => {
  const { className = '' } = props

  return (
    <div className={`card ${props.cardColor} ${className}`}>
      {props.children}
    </div>
  )
}

export default CardContainer
