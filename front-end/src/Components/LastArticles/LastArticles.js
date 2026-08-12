import React, { useEffect, useState } from 'react'
import './LastArticles.css'
import SectionHeader from '../SectionHeader/SectionHeader'
import ArticleBox from '../ArticleBox/ArticleBox'

export default function LastArticles() {

    const [articles, setArticles] = useState([])

    useEffect(() => {
        fetch(`http://localhost:4000/v1/articles`).then((res) => res.json()).then((data) => {
            console.log('TYPE:', typeof data);
            
            console.log(data);
            setArticles(data)
        })
    },[])
    
    return (
        <section className="articles">
            <div className="container">
                <SectionHeader
                    title="جدیدترین مقاله ها"
                    desc="پیش به سوی ارتقا دانش"
                    btnTitle="تمامی مقاله ها"
                    btnHref='article/1'
                />
                <div className="articles__content">
                    <div className="row">
                        {
                            articles.filter(article => article.publish === 1).slice(0, 3).map((data) => (
                                <ArticleBox {...data}/>
                            ))
                        }
                    </div>
                </div>
            </div>
        </section>
    )
}
