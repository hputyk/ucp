import React, { useRef, useEffect } from 'react';

export default function Sparks({
  count = 60,
  className = '',
  color = '255, 140, 80',
  repelRadius = 90,
  repelStrength = 2.5,
}) {
  const canvasRef = useRef(null);

  useEffect(() => {
    const canvas = canvasRef.current;
    if (!canvas) return;
    const ctx = canvas.getContext('2d');

    if (window.matchMedia('(prefers-reduced-motion: reduce)').matches) return;

    let width = 0;
    let height = 0;
    let dpr = Math.min(window.devicePixelRatio || 1, 2);
    let particles = [];
    let rafId = null;
    let lastTime = performance.now();

    // Курсор: текущая и предыдущая позиция, чтобы считать отрезок пути
    const mouse = {
      x: -9999,
      y: -9999,
      prevX: -9999,
      prevY: -9999,
      active: false,
    };

    const rand = (min, max) => Math.random() * (max - min) + min;

    const createParticle = (initial = false) => {
      const x = Math.random() * width;
      const y = Math.random() * height;

      const angle = Math.random() * Math.PI * 2;
      const speed = rand(0.05, 0.3);
      const maxLife = rand(200, 520);

      return {
        x,
        y,
        vx: Math.cos(angle) * speed,
        vy: Math.sin(angle) * speed,
        size: rand(0.5, 1.7),
        life: initial ? rand(0, maxLife) : 0,
        maxLife,
        driftAngle: angle,
        driftAmount: rand(0.008, 0.03),
        pulseSpeed: rand(0.004, 0.012),
        phase: Math.random() * Math.PI * 2,
        baseSpeed: speed,
        pushX: 0,
        pushY: 0,
      };
    };

    const resize = () => {
      const rect = canvas.getBoundingClientRect();
      width = rect.width;
      height = rect.height;
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = width * dpr;
      canvas.height = height * dpr;
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
    };

    const init = () => {
      resize();
      particles = Array.from({ length: count }, () => createParticle(true));
    };

    // Кратчайшее расстояние от точки P до отрезка AB
    const distToSegment = (px, py, ax, ay, bx, by) => {
      const abx = bx - ax;
      const aby = by - ay;
      const apx = px - ax;
      const apy = py - ay;
      const abLenSq = abx * abx + aby * aby;
      let t = abLenSq > 0 ? (apx * abx + apy * aby) / abLenSq : 0;
      t = Math.max(0, Math.min(1, t));
      const cx = ax + abx * t;
      const cy = ay + aby * t;
      const dx = px - cx;
      const dy = py - cy;
      return { dist: Math.sqrt(dx * dx + dy * dy), cx, cy };
    };

    const draw = (now) => {
      const dt = Math.min((now - lastTime) / 16.67, 3);
      lastTime = now;

      ctx.clearRect(0, 0, width, height);

      // Отрезок пути курсора за последний кадр
      const hasMouseSegment =
        mouse.active &&
        (mouse.prevX !== mouse.x || mouse.prevY !== mouse.y);

      for (let i = 0; i < particles.length; i++) {
        const p = particles[i];

        // обычное блуждание
        p.driftAngle += rand(-p.driftAmount, p.driftAmount);
        p.vx = Math.cos(p.driftAngle) * p.baseSpeed;
        p.vy = Math.sin(p.driftAngle) * p.baseSpeed;

        // === Отталкивание от отрезка пути курсора ===
        if (mouse.active) {
          // если курсор сдвинулся — считаем расстояние до отрезка,
          // иначе до точки
          let dx, dy, dist;
          if (hasMouseSegment) {
            const r = distToSegment(
              p.x, p.y,
              mouse.prevX, mouse.prevY,
              mouse.x, mouse.y
            );
            dist = r.dist;
            dx = p.x - r.cx;
            dy = p.y - r.cy;
          } else {
            dx = p.x - mouse.x;
            dy = p.y - mouse.y;
            dist = Math.sqrt(dx * dx + dy * dy);
          }

          if (dist < repelRadius && dist > 0.001) {
            const t = 1 - dist / repelRadius;
            const falloff = t * t;
            const nx = dx / dist;
            const ny = dy / dist;

            // мгновенное выталкивание — сразу, без накопления
            const shift = falloff * repelStrength;
            p.x += nx * shift;
            p.y += ny * shift;

            // немного импульса для отскока
            p.pushX += nx * falloff * repelStrength * 0.5;
            p.pushY += ny * falloff * repelStrength * 0.5;
          }
        }

        // применяем импульс с затуханием
        p.x += p.pushX * dt;
        p.y += p.pushY * dt;
        p.pushX *= 0.8;
        p.pushY *= 0.8;

        p.x += p.vx * dt;
        p.y += p.vy * dt;
        p.life += dt;
        p.phase += p.pulseSpeed * dt;

        // пульсация и прозрачность
        const pulse = 1 + 0.12 * Math.sin(p.phase);
        const lifeRatio = p.life / p.maxLife;
        const fade = Math.sin(Math.min(lifeRatio, 1) * Math.PI);
        const alpha = Math.max(0, fade) * 0.55 * pulse;

        // удержание в границах
        const margin = 40;
        if (p.x < margin) p.driftAngle += (Math.random() * 0.4) * (margin - p.x) / margin;
        if (p.x > width - margin) p.driftAngle -= (Math.random() * 0.4) * (p.x - (width - margin)) / margin;
        if (p.y < margin) p.driftAngle += (Math.random() * 0.4) * (margin - p.y) / margin;
        if (p.y > height - margin) p.driftAngle -= (Math.random() * 0.4) * (p.y - (height - margin)) / margin;

        if (p.life >= p.maxLife) {
          particles[i] = createParticle(false);
          continue;
        }

        // свечение
        const glowRadius = p.size * 8;
        const glow = ctx.createRadialGradient(p.x, p.y, 0, p.x, p.y, glowRadius);
        glow.addColorStop(0, `rgba(${color}, ${alpha})`);
        glow.addColorStop(0.5, `rgba(${color}, ${alpha * 0.28})`);
        glow.addColorStop(1, `rgba(${color}, 0)`);

        ctx.fillStyle = glow;
        ctx.beginPath();
        ctx.arc(p.x, p.y, glowRadius, 0, Math.PI * 2);
        ctx.fill();

        // ядро
        ctx.fillStyle = `rgba(255, 240, 220, ${alpha * 0.7})`;
        ctx.beginPath();
        ctx.arc(p.x, p.y, p.size * 0.8, 0, Math.PI * 2);
        ctx.fill();
      }

      // запоминаем позицию курсора для следующего кадра
      mouse.prevX = mouse.x;
      mouse.prevY = mouse.y;

      rafId = requestAnimationFrame(draw);
    };

    // === Обработчики курсора ===
    const onPointerMove = (e) => {
      const rect = canvas.getBoundingClientRect();
      const nx = e.clientX - rect.left;
      const ny = e.clientY - rect.top;
      if (!mouse.active) {
        // при первом появлении — и prev, и текущая равны
        mouse.prevX = nx;
        mouse.prevY = ny;
      }
      mouse.x = nx;
      mouse.y = ny;
      mouse.active = true;
    };

    const onPointerLeave = () => {
      mouse.active = false;
      mouse.x = mouse.prevX = -9999;
      mouse.y = mouse.prevY = -9999;
    };

    init();
    rafId = requestAnimationFrame(draw);

    const onResize = () => {
      resize();
      particles = Array.from({ length: count }, () => createParticle(true));
    };

    window.addEventListener('resize', onResize);
    window.addEventListener('pointermove', onPointerMove);
    window.addEventListener('pointerleave', onPointerLeave);
    document.addEventListener('mouseleave', onPointerLeave);

    return () => {
      cancelAnimationFrame(rafId);
      window.removeEventListener('resize', onResize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerleave', onPointerLeave);
      document.removeEventListener('mouseleave', onPointerLeave);
    };
  }, [count, color, repelRadius, repelStrength]);

  return <canvas ref={canvasRef} className={`sparks-layer ${className}`} />;
}