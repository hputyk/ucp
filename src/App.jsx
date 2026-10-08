import React, { useState, useEffect } from 'react';
import './App.css';

import logoUcp from './assets/logoUCP.png';
import heroBg from './assets/hero-bg.png';
import qrCode from './assets/qr-code.jpg';
import pojarnImg from './assets/pojarn.png';

import Sparks from '../components/Sparks';

function App() {
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  const cards = [
    { id: '01', subtitle: 'UCP EXPORT', titleStart: 'СРЕДСТВА ЗАЩИТЫ', titleAccent: 'И ОБОРУДОВАНИЕ' },
    { id: '02', subtitle: 'IRTCENTRE', titleStart: 'КРАТКОСРОЧНЫЕ', titleAccent: 'КУРСЫ' },
    { id: '03', subtitle: 'ОБУЧЕНИЕ', titleStart: 'ВЫСШЕЕ', titleAccent: 'ОБРАЗОВАНИЕ' },
    { id: '04', subtitle: '', titleStart: 'ИСПЫТАТЕЛЬНАЯ', titleAccent: 'ДЕЯТЕЛЬНОСТЬ' },
    { id: '05', subtitle: '', titleStart: 'ИННОВАЦИОННОЕ', titleAccent: 'ОБОРУДОВАНИЕ' },
  ];

  return (
    <div className="site-container">
      {/* ЭКРАН 1: HERO */}
      <section className="hero-section" style={{ backgroundImage: `url(${heroBg})` }}>
        <div className="dark-overlay"></div>

        <Sparks count={70} className="sparks-back" />

        <header className={`header ${scrolled ? 'header--scrolled' : ''}`}>
          <div className="header-inner">
            <div className="logo-area">
              <img src={logoUcp} alt="UCP Expert" className="main-logo" />
            </div>
            <nav className="nav-menu">
              <a href="#production">Продукция</a>
              <a href="#courses">Курсы</a>
              <a href="#higher-edu">Образование</a>
              <a href="#testing">Испытания</a>
              <a href="#innovation">Оборудование</a>
              <a href="#about">О нас</a>
            </nav>
            <div className="header-right">
              <button className="lang-btn" type="button">RU</button>
              <button className="contact-btn">Контакты</button>
            </div>
          </div>
        </header>

        <div className="hero-content">
          <div className="hero-center-graphics">
            <img src={logoUcp} alt="UCP Expert" className="hero-center-logo" />
            <p className="hero-slogan">
              ПРОФЕССИОНАЛЬНЫЕ РЕШЕНИЯ ДЛЯ ТЕХ,<br />
              КТО СТОИТ НА СТРАЖЕ БЕЗОПАСНОСТИ
            </p>
          </div>
        </div>

        <Sparks count={30} className="sparks-front" />

        {/* Подсказка для скролла вниз */}
        <a href="#cards" className="scroll-hint" aria-label="Прокрутить вниз">
          <span className="scroll-hint-text">Смотреть каталог</span>
          <span className="scroll-hint-arrow">↓</span>
        </a>

        {/* Плавное затемнение низа главной картинки к тёмному фону */}
        <div className="bottom-blend-gradient"></div>
      </section>

      {/* ЭКРАН 2: ПРОСТРАНСТВО ЦВЕТА ФОНА + КАРТОЧКИ */}
      <section className="cards-section" id="cards">
        <div className="cards-grid">
          {cards.map((card) => (
            <a key={card.id} className="nav-card" href={`#card-${card.id}`}>
              {/* Картинка — это и есть карточка */}
              <img src={pojarnImg} alt={card.titleAccent} className="card-image" />

              {/* Номер — сверху слева */}
              <span className="card-number">{card.id}</span>

              {/* Текст — снизу, над стрелкой */}
              <div className="card-text-layer">
                {card.subtitle && (
                  <span className="card-subtitle">{card.subtitle}</span>
                )}
                <h3 className="card-title">
                  {card.titleStart}{' '}
                  <span className="card-accent">{card.titleAccent}</span>
                </h3>
              </div>

              {/* Стрелка в кружке — слева внизу */}
              <span className="arrow-circle-btn">&rarr;</span>
            </a>
          ))}
        </div>
      </section>

      {/* ЭКРАН 3: FOOTER */}
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