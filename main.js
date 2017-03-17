define(function (require, exports, module) {
    'use strict';

    var CodeMirror = brackets.getModule('thirdparty/CodeMirror/lib/codemirror');
    var LanguageManager = brackets.getModule('language/LanguageManager');

    CodeMirror.defineSimpleMode('razor', {
        start: [
            {regex: /(?=<!--)([\s\S]*?)(-->)/, token: ['comment', 'comment', 'comment']},
            {regex: /(\/\/)(.*)/, token: ['comment', 'comment']},
            {regex: /(?:function|return|if|for|while|else|do|this|var)\b/, token: 'keyword'},
            {regex: /@(\w+)/, token: 'keyword'},
            {regex: /(\.)(\w+)/, token: ['null', 'property']},
            {regex: /(<\/|<)(.+?)(>|\/>)/, token: ['variable-3', 'variable', 'variable-3']},
            {regex: /[-+\/*=<>!|]|(&&)/, token: 'operator'},
            {regex: /"(?:[^\\]|\\.)*?(?:"|$)/, token: 'string'},
            {regex: /0x[a-f\d]+|[-+]?(?:\.\d+|\d+\.?\d*)(?:e[-+]?\d+)?/i, token: "number"},
            {regex: /true|false|null|undefined/, token: 'atom'},
            {regex: /\@\*/, push: 'comment', token: 'comment'}
        ],
        comment: [
            {regex: /\*\@/, pop: true, token: 'comment'},
            {regex: /./, token: 'comment'}
        ]
    });

    CodeMirror.defineMIME('text/razor','razor');

    var language = LanguageManager.defineLanguage('razor', {
        name: 'Razor',
        mode: ['razor', 'text/razor'],
        fileExtensions: ['cshtml'],
        blockComment: ['@*', '*@']
    });
});
