import React, { useState, useEffect, useRef } from 'react';
import './App.css';

import logoUcp from './assets/logoUCP.png';
import fonImg from './assets/Fon.png';
import persiImg from './assets/persi.png';
import qrCode from './assets/qr-code.jpg';
import pojarnImg from './assets/pojarn.png';

import Sparks from '../components/Sparks';

function App() {
  const [scrolled, setScrolled] = useState(false);
  const heroRef = useRef(null);

  useEffect(() => {
    const handleScroll = () => {
      setScrolled(window.scrollY > 40);
    };
    window.addEventListener('scroll', handleScroll);
    handleScroll();
    return () => window.removeEventListener('scroll', handleScroll);
  }, []);

  // «Шевеление» фона (слабо) и персонажа (чуть сильнее) при движении мыши
  useEffect(() => {
    const hero = heroRef.current;
    if (!hero) return;

    let rafId = null;

    const handleMouseMove = (e) => {
      if (rafId) return;
      rafId = requestAnimationFrame(() => {
        const rect = hero.getBoundingClientRect();
        const cx = rect.left + rect.width / 2;
        const cy = rect.top + rect.height / 2;
        const dx = (e.clientX - cx) / rect.width;
        const dy = (e.clientY - cy) / rect.height;

        // Персонаж: ±5px по X, ±4px по Y
        const moveX = dx * 10;
        const moveY = dy * 8;

        // Фон: слабее — ±2px по X, ±1.5px по Y
        const bgX = dx * 4;
        const bgY = dy * 3;

        hero.style.setProperty('--mx', `${moveX}px`);
        hero.style.setProperty('--my', `${moveY}px`);
        hero.style.setProperty('--bx', `${bgX}px`);
        hero.style.setProperty('--by', `${bgY}px`);
        rafId = null;
      });
    };

    const handleMouseLeave = () => {
      hero.style.setProperty('--mx', '0px');
      hero.style.setProperty('--my', '0px');
      hero.style.setProperty('--bx', '0px');
      hero.style.setProperty('--by', '0px');
    };

    window.addEventListener('mousemove', handleMouseMove);
    hero.addEventListener('mouseleave', handleMouseLeave);

    return () => {
      window.removeEventListener('mousemove', handleMouseMove);
      hero.removeEventListener('mouseleave', handleMouseLeave);
      if (rafId) cancelAnimationFrame(rafId);
    };
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
      {/* ЭКРАН 1: HERO */}
      <section ref={heroRef} className="hero-section">
        {/* Фоновая картинка отдельным слоем — увеличенная и «шевелится» слабо */}
        <div
          className="hero-bg-layer"
          style={{ backgroundImage: `url(${fonImg})` }}
          aria-hidden="true"
        ></div>

        <div className="dark-overlay"></div>

        {/* Персонаж поверх фона, шевелится чуть сильнее */}
        <img src={persiImg} alt="" className="persi-layer" aria-hidden="true" />

        <Sparks count={70} className="sparks-back" />

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
            <p className="hero-slogan">
              ПРОФЕССИОНАЛЬНЫЕ РЕШЕНИЯ ДЛЯ ТЕХ, КТО СТОИТ НА СТРАЖЕ БЕЗОПАСНОСТИ
            </p>
          </div>
        </div>

        <Sparks count={30} className="sparks-front" />

        {/* Подсказка для скролла вниз */}
        <a href="#cards" className="scroll-hint" aria-label="Прокрутить вниз">
          <span className="scroll-hint-text">Продолжите знакомство</span>
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
              <img src={pojarnImg} alt={card.title} className="card-image" />

              <div className="card-text-layer">
                <span className="card-number">{card.id}</span>
                <div className="card-body">
                  {card.subtitle && (
                    <span className="card-subtitle">{card.subtitle}</span>
                  )}
                  <h3 className="card-title">{card.title}</h3>
                </div>
              </div>

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