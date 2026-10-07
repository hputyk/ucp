import React, { useState, useEffect } from 'react';
import './App.css';

import logoUcp from './assets/logoUCP.png';
import heroBg from './assets/hero-bg.png';
import qrCode from './assets/qr-code.jpg';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll(); // проверка при загрузке
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    { id: '01', subtitle: 'UCP EXPORT', title: 'СРЕДСТВА ЗАЩИТЫ И ОБОРУДОВАНИЕ' },
    { id: '02', subtitle: 'IRTCENTRE', title: 'КРАТКОСРОЧНЫЕ КУРСЫ' },
    { id: '03', subtitle: 'ОБУЧЕНИЕ', title: 'ВЫСШЕЕ ОБРАЗОВАНИЕ' },
    { id: '04', subtitle: '', title: 'ИСПЫТАТЕЛЬНАЯ ДЕЯТЕЛЬНОСТЬ' },
    { id: '05', subtitle: '', title: 'ИННОВАЦИОННОЕ ОБОРУДОВАНИЕ' },
  ];

  return (
    <div className="site-container">
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="dark-overlay"></div>

        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
          <div className="header-inner">
            <div className="logo-area">
              <img src={logoUcp} alt="UCP Expert" className="main-logo" />
            </div>
            <nav className="nav-menu">
              <a href="#production">Продукция</a>
              <a href="#courses">Краткосрочные курсы</a>
              <a href="#higher-edu">Высшее образование</a>
              <a href="#testing">Испытательная деятельность</a>
              <a href="#innovation">Инновационное оборудование</a>
            </nav>
            <div className="header-right">
              <span className="lang-icon">🌐</span>
              <button className="contact-btn">Связаться</button>
            </div>
          </div>
        </header>

        <div className="hero-content">
          <div className="hero-center-graphics">
            <img src={logoUcp} alt="UCP Expert" className="hero-center-logo" />
            <p className="hero-slogan">БЕЗОПАСНОСТЬ. ЗНАНИЯ. ТЕХНОЛОГИИ. БЕЗ ГРАНИЦ.</p>
          </div>

          <div className="cards-wrapper">
            <div className="cards-grid">
              {cards.map((card) => (
                <div key={card.id} className="nav-card">
                  <div className="card-top">
                    <span className="card-number">{card.id}</span>
                  </div>
                  <div className="card-body">
                    {card.subtitle && <span className="card-subtitle">{card.subtitle}</span>}
                    <h3 className="card-title">{card.title}</h3>
                  </div>
                  <div className="card-footer">
                    <button className="arrow-circle-btn">&rarr;</button>
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>

        <div className="bottom-blend-gradient"></div>
      </section>

      <footer className="footer-section">
        <div className="footer-inner">
          <div className="footer-col col-brand">
            <div className="footer-logo-row">
              <span className="footer-logo-circle"></span>
              <div>
                <strong>UCPEXPORT</strong>
                <p className="sub-dept">Университет гражданской защиты МЧС</p>
              </div>
            </div>
            <p className="footer-desc">
              Официальный экспортер боевой одежды и экипировки пожарных-спасателей,
              международных образовательных программ IRTCentre (NFPA, ICAO, IAEA, INSARAG)
              и испытательных услуг.
            </p>
            <div className="cert-tags">
              <span>ТР ЕАЭС 043/2017</span>
              <span>INSARAG / NFPA</span>
              <span>ISO 9001</span>
            </div>
          </div>

          <div className="footer-col col-links">
            <h4>РАЗДЕЛЫ ПОРТАЛА</h4>
            <ul>
              <li>1. Боевая одежда (Light, Optimal, Max, Pro)</li>
              <li>2. IRTCentre курсы (NFPA, ICAO, РХБ)</li>
              <li>3. Высшее образование (Бакалавриат / Маг.)</li>
              <li>4. Испытания (Термоманекен, Тепло-Холод)</li>
              <li><a href="#matrix" className="matrix-link">Сравнительная матрица (A01 - D05)</a></li>
            </ul>
          </div>

          <div className="footer-col col-contacts">
            <h4>ЭКСПОРТНЫЙ ОТДЕЛ</h4>
            <p className="phone-link">📞 +375 29 384-86-67</p>
            <p className="email-link">✉️ export@ucp.by</p>
            <p className="web-link">🌐 ucp.by</p>
            <p className="address-text">
              📍 Республика Беларусь, г. Минск,<br />
              ул. Машиностроителей, 25
            </p>
          </div>

          <div className="footer-col col-qr">
            <h4>QR-КОД КАТАЛОГА</h4>
            <div className="qr-box-container">
              <img src={qrCode} alt="QR Code" className="qr-image" />
              <div className="qr-text-side">
                <strong>UCP.BY</strong>
                <p>+375 29 384-86-67</p>
                <span className="catalog-date">КАТАЛОГ 2024-2026</span>
              </div>
            </div>
            <button className="order-btn">Оформить заявку</button>
          </div>
        </div>

        <div className="footer-bottom-bar">
          <p>© 2026 Университет гражданской защиты МЧС Беларуси (UCP EXPORT). Все права защищены.</p>
          <a href="#top" className="to-top-link">Наверх ↑</a>
        </div>
      </footer>
    </div>
  );
}

export default App;