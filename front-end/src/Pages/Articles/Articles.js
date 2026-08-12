import React, { useEffect, useState } from 'react'
import './Articles.css'
import Topbar from '../../Components/Topbar/Topbar'
import Navbar from '../../Components/Navbar/Navbar'
import Breadcrumb from '../../Components/Breadcrumb/Breadcrumb'
import Paginiation from '../../Components/Paginiation/Paginiation'
import Footer from '../../Components/Footer/Footer'
import ArticleBox from '../../Components/ArticleBox/ArticleBox'

export default function Articles() {

    const [articles,setArticles] = useState([])
    const [shownArticles, setShownArticles] = useState([])

    useEffect(() => {
            fetch(`http://localhost:4000/v1/articles`).then((res) => res.json()).then((result) => {
                console.log('result:', result);
                
                setArticles(result)
            })
        }, [])

  return (
    <>
    <Topbar />
                <Navbar />
    
                <Breadcrumb
                    links={[
                        { id: 1, title: 'خانه', to: '' },
                        { id: 2, title: 'تمامی دوره ها', to: 'courses' },
                    ]}
                />

                
            <section className="courses">
                <div className="container">
                    <div className="courses-content">
                        <div className="container"></div>
                        <div className="row">
                            {
                                shownArticles.filter(article => article.publish === 1).map((article) => (
                                    <ArticleBox {...article}/>
                                ))
                            }
                        </div>
                    </div>
                </div>
            </section>

            <Paginiation
            items = {articles}
            itemsCount = {3}
            pathname="/article"
            setShownCourses = {setShownArticles}
            />
            <Footer />
    </>
  )
}
