(function () {
  // Shared site shell: language, responsive navigation, and footer year.
  const root = document.documentElement;
  const languageButton = document.querySelector('.language-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const year = document.querySelector('#year');
  const translatedElements = document.querySelectorAll('[data-en][data-zh]');
  const translatedLinks = document.querySelectorAll('[data-href-en][data-href-zh]');
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
    const outlineSections = [...document.querySelectorAll('[data-outline][id]')];
    const outlineLinks = outlineSections.map((section) => {
      const item = document.createElement('li');
      const link = document.createElement('a');
      link.href = `#${section.id}`;
      link.textContent = section.textContent;
      if (section.tagName === 'H3') item.classList.add('is-subsection');
      item.appendChild(link);
      outlineList.appendChild(item);
      return link;
    });

    outlineTotal.textContent = String(outlineSections.length);

    function setOutlineOpen(isOpen) {
      outlinePanel.hidden = !isOpen;
      outlineToggle.setAttribute('aria-expanded', String(isOpen));
      if (isOpen) outlineClose.focus();
    }

    function updateOutlineState() {
      let activeIndex = 0;
      outlineSections.forEach((section, index) => {
        if (section.getBoundingClientRect().top <= 180) activeIndex = index;
      });

      outlineLinks.forEach((link, index) => {
        link.classList.toggle('is-active', index === activeIndex);
        if (index === activeIndex) link.setAttribute('aria-current', 'location');
        else link.removeAttribute('aria-current');
      });

      outlineCurrent.textContent = String(activeIndex + 1);

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
      if (!outlinePanel.hidden && !event.target.closest('.outline-control')) setOutlineOpen(false);
    });

    document.addEventListener('keydown', (event) => {
      if (event.key === 'Escape' && !outlinePanel.hidden) {
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
