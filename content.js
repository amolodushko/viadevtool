// content.js

// Specify the key you want to read from localStorage
const key = 'remoteOverrides';

// Retrieve the value from localStorage
const override = localStorage.getItem(key)
const value = override ? override.split(',') : []

for (var i = 0; i < value.length; i++) {
    const key = value[i];
    console.log(`%cRemote override: ${key}`, 'color: green; font-weight: bold; font-size: 20px;');
}

setTimeout(function () {
    const override = localStorage.getItem(key)
    const value = override ? override.split(',') : []
    if (value.length > 0) {

        var overrideButton = document.querySelector('[class*=ViaQuickActionsToolbar-root]')
        if (!overrideButton) {
            return
        }

        var overrideDiv = document.createElement('div');
        var closeThisDiv = document.createElement('div');

        overrideDiv.style.position = 'absolute';
        overrideDiv.style.display = 'inline-block';
        overrideDiv.style.borderBottom = '1px dotted black';
        overrideDiv.style.backgroundColor = '#FFF6E0';
        overrideDiv.style.color = '#946300';
        overrideDiv.style.textAlign = 'center';
        overrideDiv.style.borderRadius = '6px';
        overrideDiv.style.padding = '5px 10px';
        overrideDiv.style.zIndex = '1';
        overrideDiv.style.width = 'max-content';
        overrideDiv.style.left = '250px';

        closeThisDiv.innerHTML = 'x'
        closeThisDiv.style.width = '16px'
        closeThisDiv.style.height = '16px'
        closeThisDiv.style.borderRadius = '24px'
        closeThisDiv.style.backgroundColor = '#FFF6E0'
        closeThisDiv.style.border = '2px solid black'
        closeThisDiv.style.position = 'absolute'
        closeThisDiv.style.top = '0'
        closeThisDiv.style.right = '-30px'
        closeThisDiv.style.color = 'black'
        closeThisDiv.style.textAlign = 'center'
        closeThisDiv.style.padding = '0 1px'
        closeThisDiv.style.cursor = 'pointer';


        closeThisDiv.addEventListener('click', function () {
            overrideDiv.remove()
        })
        overrideDiv.innerHTML = value.map(v => {
            return `<div style="text-decoration: underline">${v}</div>`;
        }).join('')
        overrideDiv.appendChild(closeThisDiv)


        overrideButton.appendChild(overrideDiv)
    }
}, 5000)





