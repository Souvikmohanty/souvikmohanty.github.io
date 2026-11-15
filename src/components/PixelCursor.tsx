import { useEffect, useRef, useState } from 'react';

interface PixelCell {
  x: number;
  y: number;
  life: number;
  color: string;
  vy: number;
}

const GRID_SIZE = 12;
const MAX_CELLS = 70;

/**
 * Grid-snapped pixel pollen trail, click particle pop, and smooth-following
 * context cursor tag for `[data-cursor]` targets on desktop fine-pointer devices.
 */
export function PixelCursor() {
  const canvasRef = useRef<HTMLCanvasElement>(null);
  const tagRef = useRef<HTMLDivElement>(null);
  const [enabled, setEnabled] = useState(false);

  useEffect(() => {
    const canHover = window.matchMedia('(hover: hover) and (pointer: fine)').matches;
    const reduced = window.matchMedia('(prefers-reduced-motion: reduce)').matches;
    if (!canHover || reduced) return;

    setEnabled(true);
  }, []);

  useEffect(() => {
    if (!enabled) return;

    const canvas = canvasRef.current;
    const tag = tagRef.current;
    if (!canvas || !tag) return;

    const ctx = canvas.getContext('2d');
    if (!ctx) return;

    const cells: PixelCell[] = [];
    let lastKey = '';
    let trailRunning = false;
    let trailRafId = 0;
    let dpr = 1;

    let tx = 0;
    let ty = 0;
    let cx = 0;
    let cy = 0;
    let tagOn = false;
    let tagLoop = false;
    let tagRafId = 0;
    let seen = false;

    const resize = () => {
      dpr = Math.min(window.devicePixelRatio || 1, 2);
      canvas.width = window.innerWidth * dpr;
      canvas.height = window.innerHeight * dpr;
    };
    resize();

    const frame = () => {
      ctx.setTransform(dpr, 0, 0, dpr, 0, 0);
      ctx.clearRect(0, 0, window.innerWidth, window.innerHeight);

      for (let i = cells.length - 1; i >= 0; i--) {
        const c = cells[i];
        c.life -= 0.032;
        c.y += c.vy;
        c.vy += 0.06;

        if (c.life <= 0) {
          cells.splice(i, 1);
          continue;
        }

        ctx.globalAlpha = c.life * 0.82;
        ctx.fillStyle = c.color;
        const size = Math.max(2, Math.round((GRID_SIZE * (0.3 + 0.55 * c.life)) / 2) * 2);
        const offset = (GRID_SIZE - size) / 2;
        ctx.fillRect(c.x + offset, Math.round(c.y) + offset, size, size);
      }

      if (cells.length > 0) {
        trailRafId = requestAnimationFrame(frame);
      } else {
        trailRunning = false;
      }
    };

    const drop = (gx: number, gy: number, color: string, vy = 0) => {
      cells.push({
        x: gx * GRID_SIZE,
        y: gy * GRID_SIZE,
        life: 1,
        color,
        vy,
      });
      if (cells.length > MAX_CELLS) {
        cells.shift();
      }
      if (!trailRunning) {
        trailRunning = true;
        trailRafId = requestAnimationFrame(frame);
      }
    };

    const followTag = () => {
      cx += (tx - cx) * 0.25;
      cy += (ty - cy) * 0.25;

      const nearRight = cx + 170 > window.innerWidth;
      const offsetX = nearRight ? -18 - tag.offsetWidth : 16;
      const offsetY = cy + 56 > window.innerHeight ? -32 : 20;

      tag.style.transform = `translate3d(${(cx + offsetX).toFixed(1)}px, ${(cy + offsetY).toFixed(1)}px, 0)`;

      if (tagOn || Math.abs(tx - cx) > 0.5 || Math.abs(ty - cy) > 0.5) {
        tagRafId = requestAnimationFrame(followTag);
      } else {
        tagLoop = false;
      }
    };

    const setTag = (target: EventTarget | null) => {
      const node = target instanceof Element ? target.closest<HTMLElement>('[data-cursor]') : null;
      const label = node?.dataset.cursor ?? '';
      tagOn = Boolean(label);

      tag.style.opacity = tagOn ? '1' : '0';
      if (node && tag.textContent !== label) {
        tag.textContent = label;
      }

      if (tagOn && !tagLoop) {
        tagLoop = true;
        cx = tx;
        cy = ty;
        tagRafId = requestAnimationFrame(followTag);
      }
    };

    const onPointerMove = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;

      tx = e.clientX;
      ty = e.clientY;
      seen = true;
      setTag(e.target);

      const gx = Math.floor(e.clientX / GRID_SIZE);
      const gy = Math.floor(e.clientY / GRID_SIZE);
      const key = `${gx},${gy}`;
      if (key === lastKey) return;
      lastKey = key;

      const roll = Math.random();
      const color = roll < 0.62 ? '#F2B705' : roll < 0.85 ? '#4CAF50' : '#FFFDF7';
      drop(gx, gy, color);
    };

    const onPointerDown = (e: PointerEvent) => {
      if (e.pointerType !== 'mouse') return;

      tagOn = false;
      tag.style.opacity = '0';

      const gx = Math.floor(e.clientX / GRID_SIZE);
      const gy = Math.floor(e.clientY / GRID_SIZE);
      for (let k = 0; k < 9; k++) {
        const color = k % 3 === 0 ? '#FFFDF7' : k % 2 === 0 ? '#E59A00' : '#4CAF50';
        drop(
          gx + Math.round((Math.random() - 0.5) * 5),
          gy + Math.round((Math.random() - 0.5) * 4),
          color,
          -1 - Math.random() * 1.6,
        );
      }
    };

    const onScroll = () => {
      if (seen) {
        setTag(document.elementFromPoint(tx, ty));
      }
    };

    const onMouseLeave = () => {
      tagOn = false;
      tag.style.opacity = '0';
    };

    window.addEventListener('resize', resize, { passive: true });
    window.addEventListener('pointermove', onPointerMove, { passive: true });
    window.addEventListener('pointerdown', onPointerDown, { passive: true });
    window.addEventListener('scroll', onScroll, { passive: true });
    document.documentElement.addEventListener('mouseleave', onMouseLeave);

    return () => {
      cancelAnimationFrame(trailRafId);
      cancelAnimationFrame(tagRafId);
      window.removeEventListener('resize', resize);
      window.removeEventListener('pointermove', onPointerMove);
      window.removeEventListener('pointerdown', onPointerDown);
      window.removeEventListener('scroll', onScroll);
      document.documentElement.removeEventListener('mouseleave', onMouseLeave);
    };
  }, [enabled]);

  if (!enabled) return null;

  return (
    <>
      <canvas
        ref={canvasRef}
        aria-hidden="true"
        className="fixed inset-0 w-full h-full z-50 pointer-events-none"
      />
      <div
        ref={tagRef}
        aria-hidden="true"
        className="fixed left-0 top-0 z-[100] pointer-events-none font-pixel text-xs font-bold leading-none px-2.5 py-1.5 bg-[#FFFDF7] text-[#18261C] border-2 border-[#18261C] shadow-[2px_2px_0_#E59A00] whitespace-nowrap opacity-0 transition-opacity duration-150 will-change-transform"
      />
    </>
  );
}
