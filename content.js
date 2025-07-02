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

// Minimal config for app path to appAttr mapping
const APP_CONFIG = [
    { appAttr: 'ride-plan@', appPath: '/planning/ride-planner' },
    { appAttr: 'shift-manager@', appPath: '/shift-manager' },
    { appAttr: 'via-hub-dev@', appPath: '/network-optimizer' },
    { appAttr: 'rideplan-optimizer@', appPath: '/rideplan-optimizer' },
    { appAttr: 'voc-hub@', appPath: '/hub' },
    { appAttr: 'rider-management@', appPath: '/rider-management' }
];

function getCurrentAppAttr() {
    const path = window.location.pathname;
    const found = APP_CONFIG.find(cfg => path.startsWith(cfg.appPath));
    return found ? found.appAttr : null;
}

setTimeout(function () {
    const key = 'remoteOverrides';
    const override = localStorage.getItem(key);
    const value = override ? override.split(',') : [];
    if (value.length > 0) {
        var headerElement = document.querySelector("#root header")
        if (!headerElement) {
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
        overrideDiv.style.left = '315px';

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

        // Find current app override
        const currentAppAttr = getCurrentAppAttr();
        let currentOverride = null;
        let otherOverrides = [];
        value.forEach(v => {
            if (currentAppAttr && v.startsWith(currentAppAttr)) {
                currentOverride = v;
            } else if (v) {
                otherOverrides.push(v);
            }
        });

        if (currentOverride) {
            overrideDiv.innerHTML = `<div style="text-decoration: underline">${currentOverride}</div>`;
        } else {
            overrideDiv.innerHTML = `<div style="font-style: italic;">No override for this app</div>`;
        }
        overrideDiv.innerHTML += `<div style="font-size: 12px; margin-top: 4px;">Other overrides: ${otherOverrides.length}</div>`;
        overrideDiv.appendChild(closeThisDiv)
        headerElement.appendChild(overrideDiv)
    }
}, 5000)





