document.addEventListener("DOMContentLoaded", function () {
    var branhces = [
        'RP_BRANCH_1',
        'RP_BRANCH_2',
        'NEO_BRANCH_1',
        'NEO_BRANCH_2',
        'SM_BRANCH_1',
        'SM_BRANCH_2',
        'RIDEPLAN-OPTIMIZER_BRANCH_1',
        'RIDEPLAN-OPTIMIZER_BRANCH_2',
        'VOC_HUB_BRANCH_1',
        'VOC_HUB_BRANCH_2',
        'RM_BRANCH_1',
        'RM_BRANCH_2',
    ]
    var branchesSelectNames = [
        'NEO_BRANCH',
        'SM_BRANCH',
        'RP_BRANCH',
        'RIDEPLAN-OPTIMIZER_BRANCH',
        'VOC_HUB_BRANCH',
        'RM_BRANCH'
    ]

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
                    func: function (key, value) {
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


    //Listeners
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

    onActivate();
});
