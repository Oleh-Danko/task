import Spinner from '../Spinner/Spinner'
import './employees.scss'

export default function Employees({page, setPage, users, isLoading, totalPages}) {

  const renderItems = (arr) => {
    const items = arr.map(item => (
      <div className="employees__item item" key={item.id}>
        <img src={item.photo} alt="avatar" />
        <h4 className="item__name">{
          item.name.length > 25 ? item.name.slice(0, 25) + '...' : item.name
        }</h4>
        <p className="item__position">{item.position}</p>
        <a href="malite:frontend_develop@gmail.com" className="item_mail">{
          item.email.length > 25 ? item.email.slice(0, 25) + '...' : item.email
        }</a>
        <a href="tel:+380982784424" className="item__phone">{item.phone}</a>
      </div>
    ))

    return <div className="employees__items">{items}</div>
  }

  const onShowMoreUsers = () => {
    if (page !== totalPages) setPage(page + 1)
  }
  
  const elements = renderItems(users)

  return (
    <div className='employees'>
      <div className="container">
        <h2 className="employees__title title">Working with GET request</h2>
        {isLoading ? <Spinner /> : elements}
        <button 
          onClick={onShowMoreUsers} 
          className={page === totalPages ? 'hidden' : 'btn' }>
          Show more
        </button>
      </div>
    </div>
  )
}
