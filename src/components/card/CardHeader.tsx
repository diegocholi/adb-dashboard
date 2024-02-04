interface ICardHeader {
  title: string
  badge?: string
  badgeColor?:
    | 'badge-primary'
    | 'badge-secondary'
    | 'badge-success'
    | 'badge-info'
    | 'badge-warning'
    | 'badge-danger'
    | 'badge-dark'
}

const CardHeader = (props: ICardHeader) => {
  return (
    <div className='card-header'>
      <h3 className='card-title'>{props.title}</h3>
      <div className='card-tools ml-10'>
        <span className={`badge ${props.badgeColor}`}>{props.badge}</span>
      </div>
    </div>
  )
}

export default CardHeader
