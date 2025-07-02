const APP_CONFIG = [
    
    {
        key: 'RP',
        label: 'RP',
        appAttr: 'ride-plan@',
        valueId: 'RIDE-PLAN-VALUE',
        branchRadioName: 'RP_BRANCH',
        branches: [
            { radioId: 'RP_RADIO_1', inputId: 'RP_BRANCH_1', value: 'dev', checked: true },
            { radioId: 'RP_RADIO_2', inputId: 'RP_BRANCH_2', value: 'dev', checked: false }
        ],
        applyBtnId: 'APPLY_RP',
        resetBtnId: 'RESET_RP',
        applyLabel: 'Apply RP',
        resetLabel: 'Reset RP',
        appPath: '/planning/ride-planner'
    },
    {
        key: 'SM',
        label: 'SM',
        appAttr: 'shift-manager@',
        valueId: 'SHIFT-MANAGER-VALUE',
        branchRadioName: 'SM_BRANCH',
        branches: [
            { radioId: 'SM_RADIO_1', inputId: 'SM_BRANCH_1', value: 'dev', checked: true },
            { radioId: 'SM_RADIO_2', inputId: 'SM_BRANCH_2', value: 'dev', checked: false }
        ],
        applyBtnId: 'APPLY_SM',
        resetBtnId: 'RESET_SM',
        applyLabel: 'Apply SM',
        resetLabel: 'Reset SM',
        appPath: '/shift-manager'
    },
    {
        key: 'NEO',
        label: 'NEO',
        appAttr: 'via-hub-dev@',
        valueId: 'VIA-HUB-DEV-VALUE',
        branchRadioName: 'NEO_BRANCH',
        branches: [
            { radioId: 'NEO_RADIO_1', inputId: 'NEO_BRANCH_1', value: 'dev', checked: true },
            { radioId: 'NEO_RADIO_2', inputId: 'NEO_BRANCH_2', value: 'dev', checked: false }
        ],
        applyBtnId: 'APPLY_NEO',
        resetBtnId: 'RESET_NEO',
        applyLabel: 'Apply NEO',
        resetLabel: 'Reset NEO',
        appPath: '/network-optimizer'
    },
    {
        key: 'OPTIMIZER',
        label: 'Optimizer',
        appAttr: 'rideplan-optimizer@',
        valueId: 'RIDEPLAN-OPTIMIZER-VALUE',
        branchRadioName: 'RIDEPLAN-OPTIMIZER_BRANCH',
        branches: [
            { radioId: 'RIDEPLAN-OPTIMIZER_1', inputId: 'RIDEPLAN-OPTIMIZER_BRANCH_1', value: 'dev', checked: true },
            { radioId: 'RIDEPLAN-OPTIMIZER_2', inputId: 'RIDEPLAN-OPTIMIZER_BRANCH_2', value: 'dev', checked: false }
        ],
        applyBtnId: 'APPLY_RIDEPLAN-OPTIMIZER',
        resetBtnId: 'RESET_RIDEPLAN-OPTIMIZER',
        applyLabel: 'Apply Optimizer',
        resetLabel: 'Reset',
        appPath: '/rideplan-optimizer'
    },
    {
        key: 'VOC_HUB',
        label: 'VOCHub',
        appAttr: 'voc-hub@',
        valueId: 'VOC-HUB-VALUE',
        branchRadioName: 'VOC_HUB_BRANCH',
        branches: [
            { radioId: 'VOC_HUB_1', inputId: 'VOC_HUB_BRANCH_1', value: 'dev', checked: true },
            { radioId: 'VOC_HUB_2', inputId: 'VOC_HUB_BRANCH_2', value: 'dev', checked: false }
        ],
        applyBtnId: 'APPLY-VOC-HUB',
        resetBtnId: 'RESET-VOC-HUB',
        applyLabel: 'Apply Hub',
        resetLabel: 'Reset',
        appPath: '/hub'
    },
    {
        key: 'RM',
        label: 'RM',
        appAttr: 'rider-management@',
        valueId: 'RIDER-MANAGEMENT-VALUE',
        branchRadioName: 'RM_BRANCH',
        branches: [
            { radioId: 'RM_1', inputId: 'RM_BRANCH_1', value: 'dev', checked: true },
            { radioId: 'RM_2', inputId: 'RM_BRANCH_2', value: 'dev', checked: false }
        ],
        applyBtnId: 'APPLY-RM',
        resetBtnId: 'RESET-RM',
        applyLabel: 'Apply RM',
        resetLabel: 'Reset',
        appPath: '/rider-management'
    }
];

function renderAppTypesTable() {
    const container = document.getElementById('app-types-table');
    if (!container) return;

    let html = `<table style="min-width: 780px; width: 780px; overflow: hidden">
        <thead>
        <tr>
            <th style="width: 60px;">App</th>
            <th style="width: 270px;">Current branch</th>
            <th>Override</th>
        </tr>
        </thead>
        <tbody>`;

    APP_CONFIG.forEach(app => {
        html += `<tr>
            <td style="max-width: 100px;">${app.label}</td>
            <td><div id="${app.valueId}" class="badge-y"></div></td>
            <td>
                <div class="full_actions">
                    <div class="actions_wp">
                        <div style="display: flex; gap: 4px">
                            <input id="${app.branches[0].radioId}" type="radio" name="${app.branchRadioName}" value="${app.branches[0].inputId}" ${app.branches[0].checked ? 'checked' : ''}/>
                            <input data-attr-app="${app.appAttr}" id="${app.branches[0].inputId}" name="${app.branchRadioName}_VALUE_1" class="field" type="text" value="${app.branches[0].value}" placeholder="Branch name..." list="INPUTS_LIST" autocomplete="on"/>
                        </div>
                        <div style="display: flex; gap: 4px">
                            <input id="${app.branches[1].radioId}" type="radio" name="${app.branchRadioName}" value="${app.branches[1].inputId}" ${app.branches[1].checked ? 'checked' : ''}/>
                            <input data-attr-app="${app.appAttr}" id="${app.branches[1].inputId}" name="${app.branchRadioName}_VALUE_2" class="field" type="text" value="${app.branches[1].value}" placeholder="Branch name..." list="INPUTS_LIST" autocomplete="on"/>
                        </div>
                    </div>
                    <div class="actions_wp">
                        <div class="ViaTooltip-childrenContainer-0-2-99 ViaButtonBase-wrapper-0-2-134">
                            <button id="${app.applyBtnId}" class="ViaButtonBase-root-0-2-135 ViaButtonBase-large-0-2-150 ViaButtonBase-animatedBackground-0-2-159 ViaButton-filled-primary-0-2-118" type="button">
                                <span style="font-size: 12px; font-weight: normal">${app.applyLabel}</span>
                            </button>
                        </div>
                        <div class="ViaTooltip-childrenContainer-0-2-99 ViaButtonBase-wrapper-0-2-134">
                            <button id="${app.resetBtnId}" class="ViaButtonBase-root-0-2-135 ViaButtonBase-large-0-2-150 ViaButtonBase-animatedBackground-0-2-159 ViaButton-ghost-destructive-0-2-124" type="button">
                                <span style="font-size: 12px; font-weight: normal">${app.resetLabel}</span>
                            </button>
                        </div>
                    </div>
                </div>
            </td>
        </tr>`;
    });

    html += '</tbody></table>';
    container.innerHTML = html;
}

document.addEventListener("DOMContentLoaded", function () {
    renderAppTypesTable();

    const branhces = APP_CONFIG.flatMap(app => app.branches.map(branch => branch.inputId));
    const branchesSelectNames = APP_CONFIG.map(app => app.branchRadioName);

    var remoteEntry = 'remoteEntry.js'
    var remotes = [
        'https://dev-local.voc.dev.ridewithvia.com:3000/remoteEntry.js',
        'https://dev-local.voc.dev.ridewithvia.com/remoteEntry.js'
    ]

    var updateCount = function (override) {
        var count = document.getElementById("APPLIED_COUNT")
        if (!override || override === '--') {
            count.innerHTML = "0"
            return
        }

        count.innerHTML = String(override.split(',').length)
    }

    var resetSpeciffic = function (radioName) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];

            var fieldId = getSelectedRadioValue(radioName);
            var env = document.getElementById(fieldId).getAttribute('data-attr-app')
            var isReload = document.getElementById('reloadCheckbox').checked;

            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [env],
                    func: function (env) {
                        localStorage.setItem('viaDebug', "true");
                        var currentOverride = localStorage.getItem("remoteOverrides") || '';

                        var newOverride = currentOverride.split(',').filter(function (i) {
                            return i && !i.includes(env)
                        }).join(',')

                        localStorage.setItem("remoteOverrides", newOverride);

                        return newOverride
                    }
                },
                function (results) {
                    onOverrideChange(results?.[0]?.result)

                    isReload && chrome.tabs.reload();
                })
        });
    }

    var applyActiveLocalStorage = function (ids) {
        var wrapper = document.getElementById('ACTIVE_LOCAL_OVERRIDES');
        if (!ids.length) {
            return
        }

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];


            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [ids],
                    func: function (ids) {
                        const activeOverrides = []
                        for (var i = 0; i < ids.length; i++) {
                            var value = localStorage.getItem(ids[i])
                            if (value) {
                                activeOverrides.push({id: ids[i], value: value})
                            }
                        }


                        return activeOverrides
                    }
                },
                function (results) {
                    if (!wrapper) {
                        return
                    }
                    wrapper.innerHTML = JSON.stringify(results[0].result)
                    var list = results[0].result

                    if (list.length > 0) {
                        wrapper.innerHTML = `<ul>
                          ${list.map(function (item) {
                                return `<li>
                                            <span class="localstorage_override" data-attr-key="${item.id}">${item.id}</span>
                                            <span class="localstorage_override_value ${item.value}">${item.value}</span>
                                            <button class="x_button remove_storage_key" data-attr-key="${item.id}">remove</button>
                                        </li>`
                            }
                        ).join('')}
                          </ul>`
                    } else {
                        wrapper.innerHTML = ''
                    }

                    var removeLocalstorageKeys = document.getElementsByClassName("remove_storage_key")
                    var localstorageOverrides = document.getElementsByClassName("localstorage_override")

                    for (let i = 0; i < removeLocalstorageKeys.length; i++) {
                        removeLocalstorageKeys[i].addEventListener("click", clearSpeccifficLocalStorage);
                    }
                    for (let i = 0; i < localstorageOverrides.length; i++) {
                        localstorageOverrides[i].addEventListener("click", onLocalstorageOverrideItemClick);
                    }
                })
        });
    }

    var updateDatalistOptions = function (id, optionsArray) {
        // Get the datalist element
        var dataList = document.getElementById(id);

        // Clear existing options
        dataList.innerHTML = '';

        // Add new options based on the array
        optionsArray.forEach(function (optionValue) {
            var option = document.createElement('option');
            option.value = optionValue;
            dataList.appendChild(option);
        });
    }

    var onLocalstorageOverrideItemClick = (e) => {
        var element = e.target;
        var key = element.getAttribute('data-attr-key');
        var input = document.getElementById('ADD_LOCAL_NAME');

        input.value = key
    }

    var clearSpeccifficLocalStorage = (e) => {
        var button = e.target;
        var key = button.getAttribute('data-attr-key');
        var wrapper = button.closest('li')
        if (!key) {
            return
        }

        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];

            var isReload = document.getElementById('reloadCheckbox').checked;

            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [key],
                    func: function (key) {
                        localStorage.removeItem(key);
                    }
                },
                function () {
                    wrapper.remove();
                    isReload && chrome.tabs.reload();
                })
        });
    }

    var applyLocalStorageKeys = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];

            var key = document.getElementById('ADD_LOCAL_NAME').value;
            var value = document.getElementById('ADD_LOCAL_VALUE').value;
            var isReload = document.getElementById('reloadCheckbox').checked;


            chrome.storage.local.get(["add_local_name_list_values"]).then(function (result) {
                const storedList = (result.add_local_name_list_values || '').split(',');

                var options = ['eng-36503:enable_v3', 'eng-32321:enable_running_rideplan_with_bff']
                    .concat(key)
                    .concat(storedList)
                    .filter((value, index, self) => {
                        return self.indexOf(value) === index;
                    });

                if (options.length > 6) {
                    options.length = 6
                }

                updateDatalistOptions('ADD_LOCAL_NAME_LIST', options)
                chrome.storage.local.set({['add_local_name_list_values']: options.join(',')});
                applyActiveLocalStorage(options);
            });

            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [key, value, isReload],
                    func: function (key, value) {
                        if (value) {
                            localStorage.setItem(key, value);
                        } else {
                            localStorage.removeItem(key);
                        }
                    }
                },
                function () {
                    isReload && chrome.tabs.reload();
                })
        });
    }

    var oneDevTool = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];
            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [],
                    func: function () {
                        var button = document.querySelector('[class*=ViaQuickActionsToolbar] button')

                        button && button.click()
                    }
                },
                function () {
                    window.close();
                })
        });
    }

    var applySpeciffic = function (radioName) {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];
            var overrides = []

            var fieldId = getSelectedRadioValue(radioName);
            var branch = document.getElementById(fieldId);
            var env = branch.getAttribute('data-attr-app')

            var value = branch.value.includes(remoteEntry) ? branch.value : branch.value.replaceAll('/', '_')
            overrides.push(env + value)

            var isReload = document.getElementById('reloadCheckbox').checked;

            if (branch.value) {
                chrome.storage.local.get(["add_inputs_list_values"]).then(function (result) {
                    const storedList = (result.add_inputs_list_values || '').split(',');

                    var options = ['feat/release-v', 'dev', 'fix/RPS-0000', remotes[0]]
                        .concat(branch.value)
                        .concat(storedList)
                        .filter((value, index, self) => {
                            return self.indexOf(value) === index;
                        });

                    if (options.length > 15) {
                        options.length = 15
                    }

                    updateDatalistOptions('INPUTS_LIST', options)
                    chrome.storage.local.set({['add_inputs_list_values']: options.join(',')});
                });
            }

            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [overrides, env],
                    func: function (overrides, env) {
                        localStorage.setItem('viaDebug', "true");
                        var currentOverride = localStorage.getItem("remoteOverrides") || '';

                        var splited = currentOverride.split(',').filter(function (i) {
                            return i && !i.includes(env)
                        }).concat(overrides)

                        var newOverride = splited.join(',')

                        localStorage.setItem("remoteOverrides", newOverride);

                        return newOverride
                    }
                },
                function (results) {
                    onOverrideChange(results?.[0]?.result)

                    isReload && chrome.tabs.reload();
                })
        });
    }

    var applyAllHandler = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];
            var overrides = []

            branchesSelectNames.forEach(function (name) {
                var fieldId = getSelectedRadioValue(name);
                var branch = document.getElementById(fieldId);
                var value = branch.value.includes(remoteEntry) ? branch.value : branch.value.replaceAll('/', '_')

                overrides.push(branch.getAttribute('data-attr-app') + value)
            })

            var isReload = document.getElementById('reloadCheckbox').checked;

            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    args: [overrides],
                    func: function (overrides) {
                        var newOverride = overrides.join(',')
                        localStorage.setItem('viaDebug', "true");
                        localStorage.setItem("remoteOverrides", newOverride);

                        return newOverride
                    }
                },
                function (results) {
                    onOverrideChange(results?.[0]?.result)

                    isReload && chrome.tabs.reload();
                })
        });
    }

    var resetAll = function () {
        var isReload = document.getElementById('reloadCheckbox').checked;
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];
            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    func: function () {
                        localStorage.removeItem('viaDebug');
                        localStorage.removeItem('remoteOverrides');
                    }
                },
                function () {
                    onOverrideChange(null)

                    isReload && chrome.tabs.reload();
                })
        });
    };

    var storeFieldValue = function (event) {
        var name = event.target.id;
        chrome.storage.local.set({[name]: event.target.value});
    };

    var storeCheckboxChecked = function (event) {
        var name = event.target.id;
        chrome.storage.local.set({[name]: event.target.checked});
    };

    var setBranchValue = function (id, newValue) {
        var branch = document.getElementById(id);
        branch.value = newValue || '';
    }

    var setDisplayValue = function (id, newValue) {
        var branch = document.getElementById(id);
        if (branch) {
            branch.innerHTML = newValue || '';
        }
    }

    function copyToClipboard(event) {
        event.preventDefault();
        var toCopy = document.getElementById("current").innerText;
        var temp = document.createElement("textarea");
        document.body.appendChild(temp);
        temp.value = toCopy;
        temp.select();
        document.execCommand("copy");
        document.body.removeChild(temp);
        document.getElementById('copied').classList.remove("hidden");
    }

    var getSelectedRadioValue = function (name) {
        const radios = document.getElementsByName(name);
        var selectedValue;

        for (let i = 0; i < radios.length; i++) {
            if (radios[i].checked) {
                // Get the value of the checked radio button
                selectedValue = radios[i].value;
                break;
            }
        }

        return selectedValue;
    }

    var onOverrideChange = function (data) {
        updateCount(data)

        setDisplayValue('VIA-HUB-DEV-VALUE', null)
        setDisplayValue('SHIFT-MANAGER-VALUE', null)
        setDisplayValue('RIDE-PLAN-VALUE', null)
        setDisplayValue('RIDEPLAN-OPTIMIZER-VALUE', null)
        setDisplayValue('VOC-HUB-VALUE', null)
        setDisplayValue('RIDER-MANAGEMENT-VALUE', null)
        if (data) {
            const split = data.split(',');
            split.forEach(function (value) {
                var splited = value.split('@');
                setDisplayValue(splited[0].toUpperCase() + '-VALUE', splited[1]);
            })
        }
    }

    var onInputFocus = function (event) {
        const radioButton = event.currentTarget.parentNode.querySelector('input[type="radio"]');
        // Check the radio button when the text input is focused
        if (radioButton) {
            radioButton.checked = true;
            chrome.storage.local.set({[radioButton.name + '-selectedType']: radioButton.value});
        }
    }

    var onActivate = function () {
        chrome.tabs.query({active: true, currentWindow: true}, function (tabs) {
            var activeTab = tabs[0];
            updateCount('--')

            chrome.scripting.executeScript({
                    target: {tabId: activeTab.id},
                    func: function () {
                        var hasDevTool = document.querySelector('[class*=ViaQuickActionsToolbar] button')

                        console.log(localStorage.getItem('remoteOverrides'))
                        return {
                            remoteOverrides: localStorage.getItem('remoteOverrides') || '--',
                            withBff: localStorage.getItem('eng-32321:enable_running_rideplan_with_bff'),
                            hasDevTool: hasDevTool
                        };
                    }
                },
                function (results) {
                    onOverrideChange(results?.[0]?.result.remoteOverrides)
                    var hasDevTool = results?.[0]?.result.hasDevTool
                    document.getElementById("ViaQuickActionsToolbar").style.display = hasDevTool ? 'block' : 'none';
                }
            );

            //restore reload checkbox state
            chrome.storage.local.get(["reloadCheckbox"]).then(function (result) {
                document.getElementById('reloadCheckbox').checked = result.reloadCheckbox;
            });

            //restore localsorerage keys ADD_LOCAL_NAME_LIST autocomplete list
            chrome.storage.local.get(["add_local_name_list_values"]).then(function (result) {
                const storedArray = result.add_local_name_list_values
                    ? result.add_local_name_list_values.split(',')
                    : ['eng-36503:enable_v3', 'eng-32321:enable_running_rideplan_with_bff'];
                updateDatalistOptions('ADD_LOCAL_NAME_LIST', storedArray)
                applyActiveLocalStorage(storedArray);
            });

            //restore localsorerage keys INPUTS_LIST inputs autocomplete list
            chrome.storage.local.get(["add_inputs_list_values"]).then(function (result) {
                const storedArray = result.add_inputs_list_values
                    ? result.add_inputs_list_values.split(',')
                    : ['feat/release-v', 'dev', 'fix/RPS-0000', remotes[0]];
                updateDatalistOptions('INPUTS_LIST', storedArray)
            });

            //restore selected option
            branchesSelectNames.forEach(function (name) {
                chrome.storage.local.get([name + "-selectedType"]).then(function (result) {
                    const radios = document.getElementsByName(name);
                    if (result[name + "-selectedType"]) {
                        radios.forEach(radio => {
                            if (radio.value === result[name + "-selectedType"]) {
                                radio.checked = true;
                            }
                        });
                    }
                });
            })

            //restore branches state
            branhces.forEach(function (name) {
                chrome.storage.local.get([name]).then(function (result) {
                    setBranchValue(name, result[name]);
                });
            })
        });
    }

    // Listeners for dynamic table elements
    branhces.forEach(function (name) {
        document.getElementById(name).addEventListener('change', storeFieldValue);
        document.getElementById(name).addEventListener('focus', onInputFocus);
    })

    branchesSelectNames.forEach(function (name) {
        document.getElementsByName(name).forEach(function (radio) {
            radio.addEventListener('change', event => {
                chrome.storage.local.set({[name + '-selectedType']: event.target.value});
            })
        })
    })

    document.getElementById('reloadCheckbox').addEventListener('change', storeCheckboxChecked);
    document.getElementById("RESET_ALL").addEventListener("click", resetAll);
    document.getElementById("APPLY_ALL").addEventListener("click", applyAllHandler);
    document.getElementById("APPLY_NEO").addEventListener("click", () => applySpeciffic('NEO_BRANCH'));
    document.getElementById("APPLY_RP").addEventListener("click", () => applySpeciffic('RP_BRANCH'));
    document.getElementById("APPLY_SM").addEventListener("click", () => applySpeciffic('SM_BRANCH'));
    document.getElementById("APPLY_RIDEPLAN-OPTIMIZER").addEventListener("click", () => applySpeciffic('RIDEPLAN-OPTIMIZER_BRANCH'));
    document.getElementById("APPLY-VOC-HUB").addEventListener("click", () => applySpeciffic('VOC_HUB_BRANCH'));
    document.getElementById("APPLY-RM").addEventListener("click", () => applySpeciffic('RM_BRANCH'));
    document.getElementById("RESET_NEO").addEventListener("click", () => resetSpeciffic('NEO_BRANCH'));
    document.getElementById("RESET_RP").addEventListener("click", () => resetSpeciffic('RP_BRANCH'));
    document.getElementById("RESET_SM").addEventListener("click", () => resetSpeciffic('SM_BRANCH'));
    document.getElementById("RESET_RIDEPLAN-OPTIMIZER").addEventListener("click", () => resetSpeciffic('RIDEPLAN-OPTIMIZER_BRANCH'));
    document.getElementById("RESET-VOC-HUB").addEventListener("click", () => resetSpeciffic('VOC_HUB_BRANCH'));
    document.getElementById("RESET-RM").addEventListener("click", () => resetSpeciffic('RM_BRANCH'));
    document.getElementById("ViaQuickActionsToolbar").addEventListener("click", oneDevTool);
    document.getElementById("APPLY_LOCAL").addEventListener("click", applyLocalStorageKeys);

    // SETTINGS MODAL LOGIC
    const settingsBtn = document.getElementById('settings-btn');
    const settingsModal = document.getElementById('settings-modal');
    const closeSettingsModal = document.getElementById('close-settings-modal');
    const settingsAppList = document.getElementById('settings-app-list');

    settingsBtn.addEventListener('click', function() {
        // Render the list of apps with checkboxes
        settingsAppList.innerHTML = APP_CONFIG.map(app => `
            <label style="display: flex; align-items: center; gap: 10px; margin-bottom: 10px;">
                <input type="checkbox" checked />
                <span>${app.label}</span>
            </label>
        `).join('');
        settingsModal.style.display = 'flex';
    });
    closeSettingsModal.addEventListener('click', function() {
        settingsModal.style.display = 'none';
    });

    onActivate();
});
