import './index.css';

export default function Navigation() {
  return (
    <ul className='nav'>
      <li className='nav-item'><a href='/films'>Фільми</a></li>
      <li className='nav-item'><a href='/sellers'>Продавці</a></li>
      <li className='nav-item'><a href='/viewers'>Глядачі</a></li>
      <li className='nav-item'><a href='/tickets'>Квитки</a></li>
      <li className='nav-item'><a href='/orders'>Замовлення</a></li>
    </ul>
  )
}
