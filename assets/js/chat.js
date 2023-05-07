//@ts-nocheck

"use strict";
(function ($) {
    var user = {
        "name": '',
        "avatar": '',
        "emotion": '',
    }
    var chunkosAvatar = "https://i.postimg.cc/6QSWjsrv/profile.jpg";
    $.fn.chunkosChat = function (options) {
        // override options with user preferences
        var settings = $.extend({
            delay: 2000,
            autoStart: true,
            startMessageId: 1,
            dataJSON: null
        }, options);
        var container = $(this);
        startChat(container, settings.dataJSON, settings.startMessageId, settings.delay)
    }

    function startChat(container, data, startId, delay) {
        container.html('<div class="chat-inner"></div>');
        var message = findMessageInJsonById(data, startId);
        generateMessageHTML(container, data, message, delay);
    }

    function findMessageInJsonById(data, id) {
        var messages = data;
        let msg = messages.filter((el) => {
            return el.id == id
        })[0]
        if (msg) {
            return msg;
        }
    }
    function selectOption($this, container, data, delay, type) {
        $this.parents('.option-wrapper').hide();
        if (type === 'avatar' || type === "emotion") {
            var $userReply = $(`<div class="message-wrapper"><div class="chat-bubble right img">${$this.html()}</div></div>`);
            if (user?.avatar) {
                let userAvater = $(`<img src="${user?.avatar}" alt="" class="profile-pic right">`);
                $userReply.prepend(userAvater);
            }
            user[type] = $this.children('img').attr('src');
        } else {
            var $userReply = $(`<div class="message-wrapper"><div class="chat-bubble right">${$this.html()}</div></div>`);
            if (user?.avatar) {
                let userAvater = $(`<img src="${user?.avatar}" alt="" class="profile-pic right">`);
                $userReply.prepend(userAvater);
            }
            user[type] = $this.html();
        }
        container.children('.chat-inner').append($userReply);
        var nextMessageId = $this.attr('data-nextId');
        if (nextMessageId == -1) {
            alert('See you soon ' + user?.name);
            window.location.reload();
            return
        }
        var nextMessage = findMessageInJsonById(data, nextMessageId);
        generateMessageHTML(container, data, nextMessage, delay);
    }
    function playVideo($this, popupItems, container, data, delay, index) {
        $this.parents('.supaScrollBox').addClass('disabled');
        $.magnificPopup.open({
            items: popupItems,
            gallery: {
                enabled: true
            },
            iframe: {
                markup: '<div class="mfp-iframe-scaler">' +
                    '<div class="mfp-close"></div>' +
                    '<iframe class="mfp-iframe" frameborder="0" allowfullscreen></iframe>' +
                    '<div class="mfp-bottom-bar">' +
                    '<div class="mfp-title"></div>' +
                    '<div class="mfp-counter"></div>' +
                    '</div>' +
                    '</div>',
            },
            callbacks: {
                close: function () {
                    var nextMessage = findMessageInJsonById(data, 15);
                    generateMessageHTML(container, data, nextMessage, delay);   
                }
            }
        },index);
    }
    function addOptions(container, data, delay, m) {
        let $optionsContainer = $('<div class="message-wrapper option-wrapper"></div>');
        let $optionsList = $(`<div class="options choose-${m.optionType}"></div>`);
        let optionText = null;
        let optionMessageId = null;
        switch (m.optionType) {
            case 'avatar':
                m?.options.forEach(el => {
                    optionText = `<img src="${el?.value}" alt="${el?.label}" width="60" height="60" class="img-fluid">`;
                    optionMessageId = el?.nextMessageId;
                    if (optionText != "" && optionText != undefined && optionText != null) {
                        var $optionElem = $("<div data-nextId=" + optionMessageId + ">" + optionText + "</div>");
                        $optionElem.click(function () {
                            selectOption($(this), container, data, delay, m.optionType)
                        });
                        $optionsList.append($optionElem);
                    }
                })
                $optionsContainer.append($optionsList);
                return $optionsContainer;
            case 'emotion':
                m?.options.forEach(el => {
                    optionText = `<img src="${el?.value}" alt="${el?.label}" width="60" height="60" class="img-fluid">`;
                    optionMessageId = el?.nextMessageId;
                    if (optionText != "" && optionText != undefined && optionText != null) {
                        var $optionElem = $("<div data-nextId=" + optionMessageId + ">" + optionText + "</div>");
                        $optionElem.click(function () {
                            selectOption($(this), container, data, delay, m.optionType)
                        });
                        $optionsList.append($optionElem);
                    }
                })
                $optionsContainer.append($optionsList);
                return $optionsContainer;
            case 'video':
                let $bubbleWrapper = $('<div class="chat-bubble left"></div>');
                let $videoWrapper = $('<div class="supaScrollBox"></div>');
                let items = [];
                m?.options.forEach((el, index) => {
                    optionText = `<img src="${el?.label}" alt="${el?.name}" class="img-fluid">`;
                    items.push({
                        "src": el?.value,
                        "type": 'iframe'
                    })
                    if (optionText != "" && optionText != undefined && optionText != null) {
                        var $optionElem = $("<div class='item'>" + optionText + "</div>");
                        $optionElem.click(function () {
                            playVideo($(this), items, container, data, delay, index)
                        });
                        $videoWrapper.append($optionElem);
                    }
                })
                $optionsContainer.append(`<img src="${chunkosAvatar}" alt="" class="profile-pic left"></div>`);
                $bubbleWrapper.append($videoWrapper);
                $optionsContainer.append($bubbleWrapper);
                return $optionsContainer;
            default:
                m?.options.forEach(el => {
                    optionText = el?.label;
                    optionMessageId = el?.nextMessageId;
                    if (optionText != "" && optionText != undefined && optionText != null) {
                        var $optionElem = $("<div class='option-label' data-nextId=" + optionMessageId + ">" + optionText + "</div>");
                        $optionElem.click(function () {
                            user[m.optionType] = $(this).html();
                            selectOption($(this), container, data, delay, m.optionType)
                        });
                        $optionsList.append($optionElem);
                    }
                })
                $optionsContainer.append($optionsList);
                return $optionsContainer;
        }
    }

    function toggleLoader(status, container) {
        if (status == "show") {
            container.children('.chat-inner').append(`<div class="message-wrapper typing"><div class="typing-indicator"><span></span><span></span><span></span></div></div>`);
        }
        else {
            container.find('.typing').remove();
        }
    }
    function generateMessageHTML(container, messages, m, delay) {
        switch (m.messageType) {
            case 'MTIO':
                var $template = $(`<div class="message-wrapper"><div class="chat-bubble left img"><img src="${m.imageUrl}" alt="" width="60" height="60" class="img-fluid"></div></div>`);
                m?.texts.forEach(el => {
                    let $textElm = $(`<div class="chat-bubble left">${el?.text}</div>`);
                    $template.append($textElm);
                })
                break;
            case 'AMTO':
                var $template = $(`<div class="message-wrapper"><img src="${chunkosAvatar}" alt="" class="profile-pic left"></div>`);
                m?.texts.forEach(el => {
                    if (el.text?.includes("{NAME}")) {
                        el.text = el.text?.replace("{NAME}", user.name);
                    }
                    let $textElm = $(`<div class="chat-bubble left">${el?.text}</div>`);
                    $template.append($textElm);
                })
                break;
            case 'AQO':
            case 'ATO':
                var $template = $(`<div class="message-wrapper"><img src="${chunkosAvatar}" alt="" class="profile-pic left"></div>`);
                if (m.text?.includes("{NAME}")) {
                    m.text = m.text?.replace("{NAME}", user.name);
                }
                let $textElm = $(`<div class="chat-bubble left">${m?.text}</div>`);
                $template.append($textElm);

                break;
        }
        toggleLoader("show", container);
        container.scrollTop(container.prop('scrollHeight'));
        setTimeout(function () {
            toggleLoader("hide", container);
            container.children('.chat-inner').append($template);
            if (m.messageType === "MTIO" || m.messageType === "AMTO" || m.messageType === "AQO" || m.messageType === "ATO" || m.messageType === "AO") {
                container.children('.chat-inner').append(addOptions(container, messages, delay, m));
            }
            container.scrollTop(container.prop('scrollHeight'));
            if (m.nextMessageId != "") {
                var nextMessage = findMessageInJsonById(messages, m.nextMessageId)
                generateMessageHTML(container, messages, nextMessage, delay)
            }
        }, delay);
        // end delay
    }
}(jQuery));

fetch('/assets/data.json')
    .then((response) => response.json())
    .then((dataJSON) => {
    $(function () {

            $('#chat-app').chunkosChat({
                dataJSON: dataJSON,
            });
        

    });
});