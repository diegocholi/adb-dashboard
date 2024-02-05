interface IProgressBarComponent {
  percent: number
}

const ProgressBarComponent = (props: IProgressBarComponent) => {
  return (
    <div className='w-full bg-gray-200 rounded-full dark:bg-gray-600'>
      <div
        className='bg-blue-600 text-xs font-medium text-blue-100 text-center p-0.5 leading-none rounded-full'
        style={{ width: `${props.percent}%` }}
      >
        {props.percent}%
      </div>
    </div>
  )
}

export default ProgressBarComponent
