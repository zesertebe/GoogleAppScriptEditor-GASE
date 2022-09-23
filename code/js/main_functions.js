
class GasEditorTools {
  static randomString(length = 2) {
    let result = '';
    let CHARACTERS = 'ABCDEFGHIJKLMNOPQRSTUVWXYZabcdefghijklmnopqrstuvwxyz0123456789';
    for (let i = 0; i < length; i++) {
      result += CHARACTERS.charAt(Math.floor(Math.random() * 62));
    }
    return result;
  }
}

var gasEditorCommon = {
  appScriptIdeThemeStyle: 'appScriptIdeThemeStyle_' + GasEditorTools.randomString(4),
  folders: []
}

document.body.insertAdjacentHTML('beforeend', `<style id="${gasEditorCommon.appScriptIdeThemeStyle}"></style>`);

var appScriptIdeGlobalData = {
  themes: {},
  response: false,
  lastKey: 0,
  appScriptIdeThemeStyle: document.getElementById(gasEditorCommon.appScriptIdeThemeStyle),
  iconFolder: `<svg style="color:var(--appScriptIDE_iconFile);" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M928 444H820V330.4c0-17.7-14.3-32-32-32H473L355.7 186.2a8.15 8.15 0 0 0-5.5-2.2H96c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h698c13 0 24.8-7.9 29.7-20l134-332c1.5-3.8 2.3-7.9 2.3-12 0-17.7-14.3-32-32-32zm-180 0H238c-13 0-24.8 7.9-29.7 20L136 643.2V256h188.5l119.6 114.4H748V444z"></path></svg>`,
  iconFolderClose: `<svg style="color:var(--appScriptIDE_iconFile);" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M880 298.4H521L403.7 186.2a8.15 8.15 0 0 0-5.5-2.2H144c-17.7 0-32 14.3-32 32v592c0 17.7 14.3 32 32 32h736c17.7 0 32-14.3 32-32V330.4c0-17.7-14.3-32-32-32z"></path></svg>`,
  iconHtml: `<svg style="color: var(--appScriptIDE_iconHtml);" stroke="currentColor" fill="currentColor" stroke-width="0" viewBox="0 0 1024 1024" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><path d="M145.2 96l66 746.6L512 928l299.6-85.4L878.9 96H145.2zm595 177.1l-4.8 47.2-1.7 19.5H382.3l8.2 94.2h335.1l-3.3 24.3-21.2 242.2-1.7 16.2-187 51.6v.3h-1.2l-.3.1v-.1h-.1l-188.6-52L310.8 572h91.1l6.5 73.2 102.4 27.7h.4l102-27.6 11.4-118.6H510.9v-.1H306l-22.8-253.5-1.7-24.3h460.3l-1.6 24.3z"></path></svg>`,
  iconJs: `<svg style="color: var(--appScriptIDE_iconJs);" stroke="currentColor" fill="currentColor" stroke-width="0" role="img" viewBox="0 0 24 24" height="1em" width="1em" xmlns="http://www.w3.org/2000/svg"><title></title><path d="M0 0h24v24H0V0zm22.034 18.276c-.175-1.095-.888-2.015-3.003-2.873-.736-.345-1.554-.585-1.797-1.14-.091-.33-.105-.51-.046-.705.15-.646.915-.84 1.515-.66.39.12.75.42.976.9 1.034-.676 1.034-.676 1.755-1.125-.27-.42-.404-.601-.586-.78-.63-.705-1.469-1.065-2.834-1.034l-.705.089c-.676.165-1.32.525-1.71 1.005-1.14 1.291-.811 3.541.569 4.471 1.365 1.02 3.361 1.244 3.616 2.205.24 1.17-.87 1.545-1.966 1.41-.811-.18-1.26-.586-1.755-1.336l-1.83 1.051c.21.48.45.689.81 1.109 1.74 1.756 6.09 1.666 6.871-1.004.029-.09.24-.705.074-1.65l.046.067zm-8.983-7.245h-2.248c0 1.938-.009 3.864-.009 5.805 0 1.232.063 2.363-.138 2.711-.33.689-1.18.601-1.566.48-.396-.196-.597-.466-.83-.855-.063-.105-.11-.196-.127-.196l-1.825 1.125c.305.63.75 1.172 1.324 1.517.855.51 2.004.675 3.207.405.783-.226 1.458-.691 1.811-1.411.51-.93.402-2.07.397-3.346.012-2.054 0-4.109 0-6.179l.004-.056z"></path></svg>`,
  ulMenuElement: (content, id) => { return `<ul class="StrnGf-VfPpkd-rymPhb StrnGf-VfPpkd-rymPhb-OWXEXe-EzIYc Fcw6db GFlqGb" jsname="wIVhvb" jscontroller="jKAvqd" jsaction="mouseup:npT2md; mouseleave:JywGue; keydown:I481le; focus:AHmuwe; blur:O22p3e;rcuQ6b:rcuQ6b;" role="listbox" tabindex="0" aria-label="Archivos del proyecto" style="padding-left: 1rem;" id="${id}">${content}</ul>` },
  liMenuElement: (content, _id) => { return `<li id="${_id}" class="StrnGf-VfPpkd-rymPhb-ibnC6b lMUT6c Ftje6d" jsaction="mousedown:teoBgf; mouseup:NZPHBc; mouseleave:xq3APb; touchstart:jJiBRc; touchmove:kZeBdd; touchend:VfAz8(preventMouseEvents=true)" jsname="CmABtb" role="option" aria-selected="false">  ${content}</li>` },
  observers: [],
  apscid_themeSelect: document.getElementById('apscid_themeSelect'),
  
}


function addFooter() {
  let footer = document.createElement('DIV');
  footer.id = 'asideFooterCredits';
  footer.classList.add('appScriptIDE_footer');
  let i4Xqqd = document.getElementsByClassName('I4Xqqd')
  i4Xqqd[0].appendChild(footer);
  footer.innerHTML = `Proximamente`;
}

function addThemePicker() {
  let divContainer = document.getElementsByClassName('INSTk')[0];
  let select = `
  <div class="RO63ad" data-tt="Seleccionar el tema para el editor">
    <div class="VfPpkd-dgl2Hf-ppHlrf-sM5MNb">
      <select name="" id="apscid_themeSelect" class="apscid_themeSelect">
        <option selected disabled style="color: #fff;">Seleccione un tema</option>
        <option value="guna">Guna</option>
        <option value="light_theme">Claro</option>
      </select>
    </div>
  </div>
  `
  divContainer.innerHTML = select;
}



function addScripts() {
  let script = '';
  let all = document.getElementsByTagName('*');
  let default_styles = [].concat(all);
  let all_length = all.length;
  script = `
  <script id="asideScript">
  apscid_themeSelect.addEventListener('click',event=>{
  
  if(apscid_themeSelect.value == 'dark_theme'){
  for(x=0;x<all_length;x++){
    all[x].style.color = '#fff';
    all[x].style.backgroundColor = '#111';
    }
    }
    
    })
    </script>
    `
  document.body.insertAdjacentHTML('beforeend', script);
}

const startPage = (evt) => {
  if (document.querySelectorAll("[jsname='cFQkCb']")[0]) {
    addFooter();
    addThemePicker();
    addScripts();
    return true;
  }
  console.error('Lo sentimos pero no fue posible inicializar las funciones personalizadas del IDE.');
  return false; 
}

appScriptIdeGlobalData.response = startPage();

async function setTheme(name) {
  if(appScriptIdeGlobalData.themes[name] != undefined){
    appScriptIdeGlobalData.appScriptIdeThemeStyle.innerHTML = appScriptIdeGlobalData.themes[name];
    return true;
  }
  fetch(chrome.runtime.getURL(`code/css/${name}.css`))
  .then(res=>{
    res.text().then(text=>{
      appScriptIdeGlobalData.appScriptIdeThemeStyle.innerHTML = text;
      appScriptIdeGlobalData.themes[name] = text;
    })
  })
}

function addScriptInPage(fileName) {
  let scriptElement = document.createElement('script');
  scriptElement.src = chrome.runtime.getURL(fileName);
  scriptElement.onload = () => {scriptElement.remove()};
  (document.head || document.documentElement).appendChild(scriptElement);
}

document.getElementsByClassName('XsAZmb')[0].children[0].addEventListener('change', e => {setTimeout(() => {addFoldersToIDE()}, 2000)})

function createArrayOfFolders(parent, folders){
  folders.forEach(folder=>{
    if(folder.type == 'folder'){
      parent.insertAdjacentHTML('beforeend',appScriptIdeGlobalData.ulMenuElement(`<li style="cursor: pointer; display: grid; grid-template-columns: 1fr 4fr; grid-gap: 3px; width: fit-content;" id="${folder.id}_appScriptIDEToggleUl"> <div style="display: flex; align-items: center;">${appScriptIdeGlobalData.iconFolder}</div> <strong class="appScriptIDE_ulTitle">${folder.name}</strong></li>`, folder.id));
      document.getElementById(`${folder.id}_appScriptIDEToggleUl`).addEventListener('click', event => {
      let _parent = document.getElementById(folder.id);
      let childs = _parent.children;
      for (let i = 0; i < childs.length; i++) {
        if (i != 0) {
          _parent.children[i].classList.toggle('appScriptIDE_isHidden');
        } else {
          if(_parent.children[i].dataset.asidefolder != 'asideclose'){
            _parent.children[i].dataset.asidefolder = 'asideclose';
            _parent.children[i].children[0].innerHTML = appScriptIdeGlobalData.iconFolderClose;
          } else {
            _parent.children[i].dataset.asidefolder = '';
            _parent.children[i].children[0].innerHTML = appScriptIdeGlobalData.iconFolder;
          }
        }
      }
    })
      if(folder.children.length != 0){createArrayOfFolders(document.getElementById(folder.id), folder.children)}
    } else {
      parent.appendChild(folder.content);
      folder.content.addEventListener('click', event => {
        let _files = document.getElementsByClassName('StrnGf-VfPpkd-rymPhb-ibnC6b');   
        for (let i = 0; i < _files.length; i++) {
          _files[i].classList.remove('UeVsd');
          folder.content.classList.add('UeVsd');
        }
      })
    }
  })
}

function clearFolders(folders){
  folders.forEach(el=>{
    if(el.type == 'folder'){
      if(el.children.length != 0){clearFolders(el.children)};
      document.getElementById(el.id).remove();
    }
  })
}

function addFoldersToIDE() {
  let dxw0vf = document.getElementsByClassName('dxw0vf');
  let ulParentElement = document.getElementsByClassName('XsAZmb')[0].children[0];
  let dxw0vfLength = dxw0vf.length;
  let newHtml = '';
  let paths = [];
  for (let i = 0; i < dxw0vfLength; i++) {
    if(dxw0vf[i].title.split('.').length > 1){
      paths.push({
        name: dxw0vf[i].title,
        content: dxw0vf[i]
      });
    }
  }

  let result = [];
  let level = {result};

   paths.forEach(path => {
     path.name.split('/').reduce((r, name, i, a) => {
      if(!r[name]) {
        r[name] = {result: []};
        r.result.push({
          name,
          id: '',
          type: name.split('.')[1] != undefined ? name.split('.')[1]: 'folder',
          children: r[name].result,
          content: name.split('.')[1] != undefined ? path.content.parentElement: '',
        })
        if(r.result.at(-1).type === 'folder'){
          r.result.at(-1).id =  r.result.at(-1).name + '_' + GasEditorTools.randomString(4);
        } else {
          path.content.innerHTML = `${r.result.at(-1).type == 'html' ? appScriptIdeGlobalData.iconHtml: appScriptIdeGlobalData.iconJs} <cite>${r.result.at(-1).name}</cite>`;
        } 
      }   
      return r[name];
    }, level)
  })
  if(gasEditorCommon.folders.length != 0){clearFolders(gasEditorCommon.folders)}
  createArrayOfFolders(ulParentElement, result);
  gasEditorCommon.folders = result;
}

appScriptIdeGlobalData.apscid_themeSelectEventListener = apscid_themeSelect.addEventListener('change', event => {
    setTheme(apscid_themeSelect.value)
  })

setTheme('light_theme');
addFoldersToIDE();



/* desarrollado por
│-----------------------│
│                       │
│  (\_/)                │
│  ( •_•)               │
│  /> [̲̅$̲̅(̲̅1̲̅)̲̅$̲̅] <│
│  ("")("")             │
│-----------------------│
│    ║█║▌║█║▌│║▌█║▌║    │
│      ocancelada.dev   │
│-----------------------│
*/