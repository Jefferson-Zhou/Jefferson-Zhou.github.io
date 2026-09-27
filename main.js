(function () {
  // Shared site shell: language, responsive navigation, and footer year.
  const root = document.documentElement;
  const languageButton = document.querySelector('.language-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const year = document.querySelector('#year');
  const translatedElements = document.querySelectorAll('[data-en][data-zh]');
  const translatedLinks = document.querySelectorAll('[data-href-en][data-href-zh]');
  const languageOnlyElements = document.querySelectorAll('[data-language-only]');
  const page = document.body.dataset.page || 'about';
  const articleLanguage = document.body.dataset.articleLanguage;

  if (year) year.textContent = new Date().getFullYear();

  let language = articleLanguage || localStorage.getItem('profile-language') || 'en';

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'zh' ? 'zh' : 'en';
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    translatedElements.forEach((element) => {
      element.textContent = element.dataset[language];
    });
    translatedLinks.forEach((link) => {
      link.setAttribute('href', link.dataset[`href${language === 'en' ? 'En' : 'Zh'}`]);
    });
    languageOnlyElements.forEach((element) => {
      element.hidden = element.dataset.languageOnly !== language;
    });
    languageButton.textContent = language === 'en' ? '中文' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    const titles = {
      home: {
        en: 'Writing — Jefferson Zhou',
        zh: '写作 — Jefferson Zhou'
      },
      about: {
        en: 'About — Jefferson Zhou',
        zh: '关于 — Jefferson Zhou'
      }
    };
    if (titles[page]) document.title = titles[page][language];
    localStorage.setItem('profile-language', language);
    window.dispatchEvent(new CustomEvent('languagechange', { detail: { language } }));
  }

  setLanguage(language);

  languageButton.addEventListener('click', () => {
    const nextLanguage = language === 'en' ? 'zh' : 'en';
    const counterpartUrl = document.body.dataset[nextLanguage === 'en' ? 'languageUrlEn' : 'languageUrlZh'];
    if (articleLanguage && counterpartUrl) {
      localStorage.setItem('profile-language', nextLanguage);
      window.location.href = counterpartUrl;
      return;
    }
    setLanguage(nextLanguage);
  });

  menuButton.addEventListener('click', () => {
    const isOpen = navigation.classList.toggle('is-open');
    menuButton.setAttribute('aria-expanded', String(isOpen));
  });

  navigation.addEventListener('click', (event) => {
    if (event.target.matches('a')) {
      navigation.classList.remove('is-open');
      menuButton.setAttribute('aria-expanded', 'false');
    }
  });

  const sections = document.querySelectorAll('main section[id], footer[id]');
  const navLinks = [...navigation.querySelectorAll('a')];
  const observer = new IntersectionObserver(
    (entries) => {
      const visible = entries
        .filter((entry) => entry.isIntersecting)
        .sort((a, b) => b.intersectionRatio - a.intersectionRatio)[0];
      if (!visible) return;

      navLinks.forEach((link) => {
        link.classList.toggle('is-active', link.getAttribute('href') === `#${visible.target.id}`);
      });
    },
    { rootMargin: '-20% 0px -70% 0px', threshold: [0, 0.1, 0.25] }
  );

  sections.forEach((section) => observer.observe(section));

  // Blog home: topic filters.
  const filterButtons = [...document.querySelectorAll('[data-filter]')];
  const blogRows = [...document.querySelectorAll('.blog-row[data-category]')];

  filterButtons.forEach((button) => {
    button.addEventListener('click', () => {
      const selected = button.dataset.filter;
      filterButtons.forEach((item) => item.classList.toggle('is-active', item === button));
      blogRows.forEach((row) => {
        const categories = row.dataset.category.split(' ');
        row.hidden = selected !== 'all' && !categories.includes(selected);
      });
    });
  });

  // Article pages: generated outline, active section, and reading progress.
  const outlineToggle = document.querySelector('#outline-toggle');
  const outlinePanel = document.querySelector('#outline-panel');
  const outlineClose = document.querySelector('#outline-close');
  const outlineList = document.querySelector('#outline-list');
  const outlineCurrent = document.querySelector('#outline-current');
  const outlineTotal = document.querySelector('#outline-total');
  const readingProgress = document.querySelector('#reading-progress');

  if (outlineToggle && outlinePanel && outlineList) {
    const outlineControl = outlineToggle.closest('.outline-control');
    const articleContent = document.querySelector('.article-content');
    const desktopOutline = window.matchMedia('(min-width: 1100px)');
    // Keep the sidebar inside the article so it stops at the end of the text.
    if (outlineControl && articleContent) {
      const readingLayout = document.createElement('div');
      readingLayout.className = 'article-reading-layout';
      articleContent.before(readingLayout);
      readingLayout.append(outlineControl, articleContent);
    }

    // Retain each note next to its source in the DOM; only its visual position
    // moves into the right margin on wide screens. Citations keep their IDs.
    const marginNotes = [...articleContent.querySelectorAll('.article-note')].map((note) => {
      const context = note.previousElementSibling;
      const anchor = document.createElement('div');
      anchor.className = 'article-note-anchor';
      note.before(anchor);
      anchor.append(note);
      return { note, anchor, context };
    });
    const wideNotes = window.matchMedia('(min-width: 1280px)');
    let notesFrame;

    function positionMarginNotes() {
      let previousBottom = -Infinity;
      marginNotes.forEach(({ note, anchor, context }) => {
        if (!wideNotes.matches) {
          anchor.style.removeProperty('--note-offset');
          return;
        }
        const anchorTop = anchor.getBoundingClientRect().top;
        const contextTop = context ? context.getBoundingClientRect().top : anchorTop;
        const top = Math.max(contextTop, previousBottom + 24);
        anchor.style.setProperty('--note-offset', `${top - anchorTop}px`);
        previousBottom = top + note.offsetHeight;
      });
    }

    function scheduleMarginNotes() {
      cancelAnimationFrame(notesFrame);
      notesFrame = requestAnimationFrame(positionMarginNotes);
    }

    // Font loading, images, and expandable examples can change anchor heights.
    const notesResize = new ResizeObserver(scheduleMarginNotes);
    notesResize.observe(articleContent);
    marginNotes.forEach(({ note }) => notesResize.observe(note));
    articleContent.addEventListener('load', scheduleMarginNotes, true);
    articleContent.addEventListener('toggle', scheduleMarginNotes, true);
    window.addEventListener('resize', scheduleMarginNotes);
    wideNotes.addEventListener('change', scheduleMarginNotes);
    document.fonts.ready.then(scheduleMarginNotes);
    scheduleMarginNotes();
    const outlineSections = [...document.querySelectorAll('[data-outline][id]')];
    const outlineLinks = outlineSections.map((section) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      link.textContent = section.textContent;
      const depth = Math.max(0, Number(section.tagName.slice(1)) - 2);
      item.dataset.depth = String(depth);
      if (depth > 0) item.classList.add('is-subsection');
      item.appendChild(link);
      outlineList.appendChild(item);
      return link;
    });

    outlineTotal.textContent = String(outlineSections.length);

    function setOutlineOpen(isOpen) {
      const visible = desktopOutline.matches || isOpen;
      outlinePanel.hidden = !visible;
      outlineToggle.setAttribute('aria-expanded', String(visible));
      if (isOpen && !desktopOutline.matches) outlineClose.focus();
    }

    desktopOutline.addEventListener('change', () => setOutlineOpen(false));
    setOutlineOpen(false);
    let previousActiveIndex = -1;

    function updateOutlineState() {
      let activeIndex = 0;
      const anchorOffset = parseFloat(getComputedStyle(document.documentElement).scrollPaddingTop) || 0;
      outlineSections.forEach((section, index) => {
        const headingOffset = parseFloat(getComputedStyle(section).scrollMarginTop) || 0;
        if (section.getBoundingClientRect().top <= Math.max(180, anchorOffset + headingOffset + 2)) activeIndex = index;
      });

      outlineLinks.forEach((link, index) => {
        link.classList.toggle('is-active', index === activeIndex);
        if (index === activeIndex) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      outlineCurrent.textContent = String(activeIndex + 1);

      if (desktopOutline.matches && activeIndex !== previousActiveIndex) {
        const activeLink = outlineLinks[activeIndex];
        if (activeLink) {
          const panelRect = outlinePanel.getBoundingClientRect();
          const linkRect = activeLink.getBoundingClientRect();
          if (linkRect.bottom > panelRect.bottom) outlinePanel.scrollTop += linkRect.bottom - panelRect.bottom + 12;
          else if (linkRect.top < panelRect.top + 44) outlinePanel.scrollTop -= panelRect.top + 44 - linkRect.top;
        }
      }
      previousActiveIndex = activeIndex;

      if (readingProgress) {
        const available = document.documentElement.scrollHeight - window.innerHeight;
        const progress = available > 0 ? Math.min(1, Math.max(0, window.scrollY / available)) : 0;
        readingProgress.style.width = `${progress * 100}%`;
      }
    }

    outlineToggle.addEventListener('click', () => {
      setOutlineOpen(outlineToggle.getAttribute('aria-expanded') !== 'true');
    });

    outlineClose.addEventListener('click', () => {
      setOutlineOpen(false);
      outlineToggle.focus();
    });

    outlineLinks.forEach((link) => {
      link.addEventListener('click', () => setOutlineOpen(false));
    });

    document.addEventListener('click', (event) => {
      if (!desktopOutline.matches && !outlinePanel.hidden && !event.target.closest('.outline-control')) setOutlineOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !desktopOutline.matches && !outlinePanel.hidden) {
        setOutlineOpen(false);
        outlineToggle.focus();
      }
    });

    window.addEventListener('scroll', updateOutlineState, { passive: true });
    window.addEventListener('resize', updateOutlineState);
    window.addEventListener('languagechange', () => {
      outlineSections.forEach((section, index) => {
        outlineLinks[index].textContent = section.textContent;
      });
      outlineClose.setAttribute('aria-label', language === 'en' ? 'Close outline' : '关闭大纲');
    });

    updateOutlineState();
  }
})();
