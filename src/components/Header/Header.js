import './header.scss'

export default function Header() {
  return (
    <header className='header'>
			<div className="header__wrapper">
				<div className="header__logo">
					<img src="./img/logo.png" alt="logo" />
					<div className="header__descr">TESTTASK</div>
				</div>
				<div className="header__btn">
					<button className='btn'>Users</button>
					<button className='btn'>Sign up</button>
				</div>
			</div>
    </header>
  )
}
