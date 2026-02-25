/**
 * DICTIONARY — Global Navigation & Utilities
 * 모든 entry 페이지가 이 파일을 공유한다.
 */

/* ============================================================
   사이드바 네비게이션 데이터
   새 항목 추가 시 여기만 수정하면 전체 사이드바에 반영됨
   ============================================================ */
const NAV_STRUCTURE = [
  {
    label: 'HTML',
    color: '#e34c26',
    items: [
      { name: 'button', path: '01_html/01_semantic/button.html',      desc: '시맨틱 태그' },
      { name: 'input',  path: '01_html/02_forms/input.html',          desc: '폼 요소' },
      { name: 'aria',   path: '01_html/03_accessibility/aria-label.html', desc: '접근성' },
      { name: 'meta',   path: '01_html/04_seo/meta-tags.html',        desc: 'SEO' },
    ]
  },
  {
    label: 'CSS',
    color: '#264de4',
    items: [
      { name: 'box-model',   path: '02_css/01_core/box-model.html',          desc: '기초 이론' },
      { name: 'flexbox',     path: '02_css/02_layout/flexbox.html',           desc: '레이아웃' },
      { name: 'media-query', path: '02_css/03_responsive/media-query.html',   desc: '반응형' },
      { name: 'transition',  path: '02_css/04_animation/transition.html',     desc: '애니메이션' },
      { name: 'utility',     path: '02_css/05_tailwind/utility-classes.html', desc: 'Tailwind' },
    ]
  },
  {
    label: 'JavaScript',
    color: '#f7df1e',
    items: [
      { name: 'array-methods', path: '03_javascript/01_vanilla/array-methods.html', desc: 'Vanilla JS' },
      { name: 'fetch / async', path: '03_javascript/02_async/fetch.html',            desc: '비동기' },
      { name: 'useState',      path: '03_javascript/03_react/useState.html',         desc: 'React' },
      { name: '$.selector',   path: '03_javascript/04_legacy_jquery/selectors.html', desc: 'jQuery' },
    ]
  },
];

/* ============================================================
   사이드바 렌더링
   각 entry 페이지의 <div id="sidebar"> 에 자동으로 채워진다.
   ============================================================ */
function renderSidebar(currentPath = '') {
  const sidebar = document.getElementById('sidebar');
  if (!sidebar) return;

  const rootPath = getRootPath();

  let html = `
    <div class="sidebar-logo">
      <span>// dict</span>ionary
    </div>
    <nav>
  `;

  NAV_STRUCTURE.forEach(group => {
    html += `<div class="sidebar-nav-group">
      <div class="sidebar-nav-label">${group.label}</div>`;

    group.items.forEach(item => {
      const isActive = window.location.pathname.endsWith(item.path.split('/').pop());
      html += `
        <a href="${rootPath}${item.path}" class="sidebar-nav-item ${isActive ? 'active' : ''}">
          <span class="dot" style="background: ${group.color}"></span>
          <span>${item.name}</span>
        </a>`;
    });

    html += `</div>`;
  });

  html += `</nav>`;
  sidebar.innerHTML = html;
}

/* ============================================================
   루트 경로 계산
   현재 파일 위치에서 dictionary/ 폴더까지의 상대 경로 반환
   예) 01_html/01_semantic/button.html → ../../
       02_css/02_layout/flexbox.html   → ../../
       index.html                      → ./
   ============================================================ */
function getRootPath() {
  const path = window.location.pathname;

  // dictionary/ 이후의 경로 추출
  const marker = 'dictionary/';
  const idx = path.indexOf(marker);
  if (idx === -1) return './';  // dictionary 폴더를 못 찾으면 현재 위치 기준

  const afterDict = path.slice(idx + marker.length); // 예: '01_html/01_semantic/button.html'
  const parts = afterDict.split('/').filter(Boolean);

  // 파일명을 제외한 폴더 깊이만큼 '../' 반복
  // parts = ['01_html', '01_semantic', 'button.html'] → 폴더 2개 → '../../'
  const depth = parts.length - 1; // 마지막은 파일명이므로 제외
  return depth > 0 ? '../'.repeat(depth) : './';
}

/* ============================================================
   코드 블록 복사 버튼
   .code-block-wrapper 안의 pre 에 자동으로 복사 버튼 추가
   ============================================================ */
function initCopyButtons() {
  document.querySelectorAll('.code-block-wrapper').forEach(wrapper => {
    const btn = document.createElement('button');
    btn.className = 'copy-btn';
    btn.textContent = 'copy';
    btn.setAttribute('aria-label', '코드 복사');

    btn.addEventListener('click', () => {
      const code = wrapper.querySelector('.code-block');
      if (!code) return;

      // textContent에서 html 태그 제거하여 순수 텍스트만 복사
      const text = code.innerText || code.textContent;
      navigator.clipboard.writeText(text).then(() => {
        btn.textContent = 'copied!';
        btn.style.color = 'var(--accent-green)';
        setTimeout(() => {
          btn.textContent = 'copy';
          btn.style.color = '';
        }, 2000);
      }).catch(() => {
        btn.textContent = 'failed';
        btn.style.color = 'var(--accent-red)';
      });
    });

    // label 옆에 버튼 추가
    const label = wrapper.querySelector('.code-block-label');
    if (label) {
      label.parentNode.insertBefore(btn, label.nextSibling);
    } else {
      wrapper.appendChild(btn);
    }
  });
}

/* ============================================================
   복사 버튼 스타일 (JS로 주입 — 외부 CSS 파일 수정 안 해도 됨)
   ============================================================ */
function injectCopyBtnStyle() {
  const style = document.createElement('style');
  style.textContent = `
    .copy-btn {
      position: absolute;
      top: var(--space-3);
      right: 70px;
      font-family: var(--font-mono);
      font-size: var(--text-xs);
      color: var(--text-muted);
      background: var(--bg-base);
      padding: 2px var(--space-2);
      border-radius: var(--radius-sm);
      border: 1px solid var(--border-default);
      cursor: pointer;
      transition: color var(--transition-fast), border-color var(--transition-fast);
      z-index: 1;
    }
    .copy-btn:hover {
      color: var(--accent-blue);
      border-color: var(--accent-blue);
    }
  `;
  document.head.appendChild(style);
}

/* ============================================================
   TOC (Table of Contents) — 우측 섹션 네비
   .entry-section[data-toc] 속성 기반으로 자동 생성
   ============================================================ */
function initTOC() {
  const sections = document.querySelectorAll('.entry-section[data-toc]');
  if (sections.length < 2) return;

  const toc = document.createElement('div');
  toc.className = 'toc-panel';

  let tocHTML = '<div class="toc-title">이 페이지</div><ul class="toc-list">';
  sections.forEach(section => {
    const id    = section.id;
    const label = section.getAttribute('data-toc');
    tocHTML += `<li><a href="#${id}" class="toc-link">${label}</a></li>`;
  });
  tocHTML += '</ul>';
  toc.innerHTML = tocHTML;

  const style = document.createElement('style');
  style.textContent = `
    .toc-panel {
      position: fixed;
      top: var(--space-12);
      right: var(--space-8);
      width: 160px;
      font-size: var(--text-xs);
      color: var(--text-muted);
    }
    @media (max-width: 1200px) { .toc-panel { display: none; } }
    .toc-title {
      font-weight: var(--weight-bold);
      text-transform: uppercase;
      letter-spacing: 0.08em;
      margin-bottom: var(--space-3);
      color: var(--text-muted);
    }
    .toc-list { display: flex; flex-direction: column; gap: var(--space-2); }
    .toc-link { color: var(--text-muted); font-size: var(--text-xs); transition: color var(--transition-fast); }
    .toc-link:hover { color: var(--accent-blue); }
    .toc-link.active { color: var(--accent-blue); }
  `;
  document.head.appendChild(style);
  document.body.appendChild(toc);

  // 스크롤 감지 → 활성 링크 업데이트
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      const link = toc.querySelector(`a[href="#${entry.target.id}"]`);
      if (link) link.classList.toggle('active', entry.isIntersecting);
    });
  }, { rootMargin: '-20% 0px -70% 0px' });

  sections.forEach(s => observer.observe(s));
}

/* ============================================================
   초기화 — DOMContentLoaded 시 실행
   ============================================================ */
document.addEventListener('DOMContentLoaded', () => {
  renderSidebar();
  injectCopyBtnStyle();
  initCopyButtons();
  initTOC();
});


