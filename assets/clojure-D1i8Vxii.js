const e=Object.freeze({displayName:"Clojure",name:"clojure",patterns:[{include:"#comment"},{include:"#shebang-comment"},{include:"#quoted-sexp"},{include:"#sexp"},{include:"#keyfn"},{include:"#string"},{include:"#vector"},{include:"#set"},{include:"#map"},{include:"#regexp"},{include:"#var"},{include:"#constants"},{include:"#dynamic-variables"},{include:"#metadata"},{include:"#namespace-symbol"},{include:"#symbol"}],repository:{comment:{begin:"(?<!\\\\);",beginCaptures:{0:{name:"punctuation.definition.comment.clojure"}},end:"$",name:"comment.line.semicolon.clojure"},constants:{patterns:[{match:"(nil)(?=(\\s|\\)|\\]|\\}))",name:"constant.language.nil.clojure"},{match:"(true|false)",name:"constant.language.boolean.clojure"},{match:"(##(?:Inf|-Inf|NaN))",name:"constant.numeric.symbol.clojure"},{match:"([-+]?\\d+/\\d+)",name:"constant.numeric.ratio.clojure"},{match:"([-+]?(?:(?:3[0-6])|(?:[12]\\d)|[2-9])[rR][0-9A-Za-z]+N?)",name:"constant.numeric.arbitrary-radix.clojure"},{match:"([-+]?0[xX][0-9a-fA-F]+N?)",name:"constant.numeric.hexadecimal.clojure"},{match:"([-+]?0[0-7]+N?)",name:"constant.numeric.octal.clojure"},{match:"([-+]?\\d+(?:(\\.|(?=[eEM]))\\d*([eE][-+]?\\d+)?)M?)",name:"constant.numeric.double.clojure"},{match:"([-+]?\\d+N?)",name:"constant.numeric.long.clojure"},{include:"#keyword"}]},"dynamic-variables":{match:"\\*[\\w\\.\\-\\_\\:\\+\\=\\>\\<\\!\\?\\d]+\\*",name:"meta.symbol.dynamic.clojure"},keyfn:{patterns:[{match:"(?<=(\\s|\\(|\\[|\\{))(if(-[-\\p{Ll}\\?]*)?|when(-[-\\p{Ll}]*)?|for(-[-\\p{Ll}]*)?|cond|do|let(-[-\\p{Ll}\\?]*)?|binding|loop|recur|fn|throw[\\p{Ll}\\-]*|try|catch|finally|([\\p{Ll}]*case))(?=(\\s|\\)|\\]|\\}))",name:"storage.control.clojure"},{match:"(?<=(\\s|\\(|\\[|\\{))(declare-?|(in-)?ns|import|use|require|load|compile|(def[\\p{Ll}\\-]*))(?=(\\s|\\)|\\]|\\}))",name:"keyword.control.clojure"}]},keyword:{match:"(?<=(\\s|\\(|\\[|\\{)):[\\w\\#\\.\\-\\_\\:\\+\\=\\>\\<\\/\\!\\?\\*]+(?=(\\s|\\)|\\]|\\}|\\,))",name:"constant.keyword.clojure"},map:{begin:"(\\{)",beginCaptures:{1:{name:"punctuation.section.map.begin.clojure"}},end:"(\\}(?=[\\}\\]\\)\\s]*(?:;|$)))|(\\})",endCaptures:{1:{name:"punctuation.section.map.end.trailing.clojure"},2:{name:"punctuation.section.map.end.clojure"}},name:"meta.map.clojure",patterns:[{include:"$self"}]},metadata:{patterns:[{begin:"(\\^\\{)",beginCaptures:{1:{name:"punctuation.section.metadata.map.begin.clojure"}},end:"(\\}(?=[\\}\\]\\)\\s]*(?:;|$)))|(\\})",endCaptures:{1:{name:"punctuation.section.metadata.map.end.trailing.clojure"},2:{name:"punctuation.section.metadata.map.end.clojure"}},name:"meta.metadata.map.clojure",patterns:[{include:"$self"}]},{begin:"(\\^)",end:"(\\s)",name:"meta.metadata.simple.clojure",patterns:[{include:"#keyword"},{include:"$self"}]}]},"namespace-symbol":{patterns:[{captures:{1:{name:"meta.symbol.namespace.clojure"}},match:"([\\p{L}\\.\\-\\_\\+\\=\\>\\<\\!\\?\\*][\\w\\.\\-\\_\\:\\+\\=\\>\\<\\!\\?\\*\\d]*)/"}]},"quoted-sexp":{begin:"(['``]\\()",beginCaptures:{1:{name:"punctuation.section.expression.begin.clojure"}},end:"(\\))$|(\\)(?=[\\}\\]\\)\\s]*(?:;|$)))|(\\))",endCaptures:{1:{name:"punctuation.section.expression.end.trailing.clojure"},2:{name:"punctuation.section.expression.end.trailing.clojure"},3:{name:"punctuation.section.expression.end.clojure"}},name:"meta.quoted-expression.clojure",patterns:[{include:"$self"}]},regexp:{begin:'#"',beginCaptures:{0:{name:"punctuation.definition.regexp.begin.clojure"}},end:'"',endCaptures:{0:{name:"punctuation.definition.regexp.end.clojure"}},name:"string.regexp.clojure",patterns:[{include:"#regexp_escaped_char"}]},regexp_escaped_char:{match:"\\\\.",name:"constant.character.escape.clojure"},set:{begin:"(\\#\\{)",beginCaptures:{1:{name:"punctuation.section.set.begin.clojure"}},end:"(\\}(?=[\\}\\]\\)\\s]*(?:;|$)))|(\\})",endCaptures:{1:{name:"punctuation.section.set.end.trailing.clojure"},2:{name:"punctuation.section.set.end.clojure"}},name:"meta.set.clojure",patterns:[{include:"$self"}]},sexp:{begin:"(\\()",beginCaptures:{1:{name:"punctuation.section.expression.begin.clojure"}},end:"(\\))$|(\\)(?=[\\}\\]\\)\\s]*(?:;|$)))|(\\))",endCaptures:{1:{name:"punctuation.section.expression.end.trailing.clojure"},2:{name:"punctuation.section.expression.end.trailing.clojure"},3:{name:"punctuation.section.expression.end.clojure"}},name:"meta.expression.clojure",patterns:[{begin:"(?<=\\()(ns|declare|def[\\w\\d._:+=><!?*-]*|[\\w._:+=><!?*-][\\w\\d._:+=><!?*-]*/def[\\w\\d._:+=><!?*-]*)\\s+",beginCaptures:{1:{name:"keyword.control.clojure"}},end:"(?=\\))",name:"meta.definition.global.clojure",patterns:[{include:"#metadata"},{include:"#dynamic-variables"},{match:"([\\p{L}\\.\\-\\_\\+\\=\\>\\<\\!\\?\\*][\\w\\.\\-\\_\\:\\+\\=\\>\\<\\!\\?\\*\\d]*)",name:"entity.global.clojure"},{include:"$self"}]},{include:"#keyfn"},{include:"#constants"},{include:"#vector"},{include:"#map"},{include:"#set"},{include:"#sexp"},{captures:{1:{name:"entity.name.function.clojure"}},match:"(?<=\\()(.+?)(?=\\s|\\))",patterns:[{include:"$self"}]},{include:"$self"}]},"shebang-comment":{begin:"^(#!)",beginCaptures:{1:{name:"punctuation.definition.comment.shebang.clojure"}},end:"$",name:"comment.line.shebang.clojure"},string:{begin:'(?<!\\\\)(")',beginCaptures:{1:{name:"punctuation.definition.string.begin.clojure"}},end:'(")',endCaptures:{1:{name:"punctuation.definition.string.end.clojure"}},name:"string.quoted.double.clojure",patterns:[{match:"\\\\.",name:"constant.character.escape.clojure"}]},symbol:{patterns:[{match:"([\\p{L}\\.\\-\\_\\+\\=\\>\\<\\!\\?\\*][\\w\\.\\-\\_\\:\\+\\=\\>\\<\\!\\?\\*\\d]*)",name:"meta.symbol.clojure"}]},var:{match:"(?<=(\\s|\\(|\\[|\\{)\\#)'[\\w\\.\\-\\_\\:\\+\\=\\>\\<\\/\\!\\?\\*]+(?=(\\s|\\)|\\]|\\}))",name:"meta.var.clojure"},vector:{begin:"(\\[)",beginCaptures:{1:{name:"punctuation.section.vector.begin.clojure"}},end:"(\\](?=[\\}\\]\\)\\s]*(?:;|$)))|(\\])",endCaptures:{1:{name:"punctuation.section.vector.end.trailing.clojure"},2:{name:"punctuation.section.vector.end.clojure"}},name:"meta.vector.clojure",patterns:[{include:"$self"}]}},scopeName:"source.clojure",aliases:["clj"]});var n=[e];export{n as default};
