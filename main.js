(function () {
  const root = document.documentElement;
  const languageButton = document.querySelector('.language-toggle');
  const menuButton = document.querySelector('.menu-toggle');
  const navigation = document.querySelector('.site-nav');
  const year = document.querySelector('#year');
  const translatedElements = document.querySelectorAll('[data-en][data-zh]');

  year.textContent = new Date().getFullYear();

  let language = localStorage.getItem('profile-language') || 'en';

  function setLanguage(nextLanguage) {
    language = nextLanguage === 'zh' ? 'zh' : 'en';
    root.lang = language === 'zh' ? 'zh-CN' : 'en';
    translatedElements.forEach((element) => {
      element.textContent = element.dataset[language];
    });
    languageButton.textContent = language === 'en' ? '中文' : 'EN';
    languageButton.setAttribute('aria-label', language === 'en' ? '切换为中文' : 'Switch to English');
    document.title = language === 'en'
      ? 'Jefferson Zhou — Academic Profile'
      : 'Jefferson Zhou — 学术主页';
    localStorage.setItem('profile-language', language);
  }

  setLanguage(language);

  languageButton.addEventListener('click', () => {
    setLanguage(language === 'en' ? 'zh' : 'en');
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
})();

