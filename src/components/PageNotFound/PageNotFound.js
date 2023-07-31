import { Link } from 'react-router-dom'
import '../App/App.css'
import './PageNotFound.css'
import Content from '../Content/Content'

function PageNotFound({ returnPreviousPage }) {
  return (
    <Content>
      <section className='not-found'>
        <h2 className='not-found_title'>
          404
        </h2>
        <h3 className='not-found__subtitle'>
          Страница не найдена
        </h3>
        <Link onClick={returnPreviousPage} className='link not-found__return-link'>
          Назад
        </Link>
      </section>
    </Content>
  )
}

export default PageNotFound
