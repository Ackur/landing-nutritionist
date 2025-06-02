async function getIconsName() {
  try {
    const modules = await import('/images/icons/icons-symbol.svg?raw');
    const rawText = modules.default;
    const regex = /symbol\s{1,5}id="(?<name>(\w{1,10}\W?\w{1,10}){1,10})"/gm;

    let m;
    const result = [];

    while ((m = regex.exec(rawText)) !== null) {
      // This is necessary to avoid infinite loops with zero-width matches
      if (m.index === regex.lastIndex) {
        regex.lastIndex++;
      }

      // The result can be accessed through the `m`-variable.
      m.forEach((match, groupIndex) => {
        // console.log(`Found match, group ${groupIndex}: ${match}`)
        if (groupIndex === 1) {
          result.push(match);
        }
      });
    }
    return result;
  } catch (error) {
    console.log(error);
  }
}

async function init() {
  try {
    const iconNames = await getIconsName();
    const iconsContainerElem = document.querySelector('[data-app-icons]');

    iconNames.forEach((iconName) => {
      const liEL = document.createElement('li');
      liEL.classList.add('app-icons__item');
      iconsContainerElem.appendChild(liEL);

      const svgEl = document.createElementNS('http://www.w3.org/2000/svg', 'svg');
      svgEl.setAttribute('width', 34);
      svgEl.setAttribute('height', 34);
      svgEl.setAttributeNS(
        'http://www.w3.org/2000/xmlns/',
        'xmlns:xlink',
        'http://www.w3.org/1999/xlink'
      );
      svgEl.classList.add('pagination-control--icon');
      liEL.appendChild(svgEl);

      const spanEl = document.createElement('span');
      spanEl.textContent = iconName;
      liEL.appendChild(spanEl);

      const useEl = document.createElementNS('http://www.w3.org/2000/svg', 'use');
      useEl.setAttributeNS(
        'http://www.w3.org/1999/xlink',
        'href',
        `images/icons/icons-symbol.svg#${iconName}`
      );
      svgEl.appendChild(useEl);
    });
  } catch (error) {
    console.log(error);
  }
}

init();
