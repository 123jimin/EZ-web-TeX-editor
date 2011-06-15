var eqPHolder = '\\placeholder';
var buttonInfo = {dx:80,dy:30,colNum:7};

function texfy(tex){
	//placeholder
	var i=0;
	var colArr = ['','red','orange','green','blue','cyan','purple','magenta'];
	if(eqPHolder!='')while(tex.indexOf(eqPHolder)>=0){
		var col=colArr[i%colArr.length];
		tex=tex.replace(eqPHolder,(col==''?'':'\\color{'+colArr[i%colArr.length]+'}')+'{\\small\\bigcirc}');
		i++;
	}
	//replaceRule
	tex = tex.replace(/ /g,'  ');
	for(i=0;i<replaceRule.length;i++){
		tex = tex.replace(replaceRule[i][0],' '+replaceRule[i][1]+' ');
	}
	tex = tex.replace(/\</g,' \\lt ').replace(/\>/g,' \\gt ');
	while(tex.indexOf('  ')>=0) tex = tex.replace(/  /g,' ');
	tex = tex.replace(/([^A-Za-z0-9]|^) /g,'$1');
	tex = tex.replace(/ ([^A-Za-z0-9]|$)/g,'$1');
	return tex;
}
function delegate(scope, func, data){
    return function(){func.apply(scope, Array.prototype.slice.apply(arguments).concat(data));}
}
(function(){
	function makeEditor(cName){
		cName=cName?'.'+cName:'.texEditor';
		$(cName).each(function(ind){
			var _this = $(this);
			_this.html('<div class="editor"><div class="buttons"></div><textarea class="inputPanel"/></div><div class="display"><script type="math/tex; mode=display" class="texcode"></script></div>');
			addButtons(_this.find('.buttons'),_this.find('.inputPanel'));
			_this.find('.inputPanel').data('isDragging',false).keydown(function(e){
				var t = $(this).val();
				var ts = $(this).caret().start;
				var te = $(this).caret().end;
				var tFront = t.slice(0,ts);
				var tBack = t.slice(te);
				if(e.altKey){
					if(e.keyCode==88){
						var texCode = texfy(_this.find('.inputPanel').val());
						_this.find('.inputPanel').val(texCode).caret(0,texCode.length);
					}
					return;
				}
				if(e.ctrlKey && e.keyCode!=17){
					console.log(e.keyCode);
					switch(e.keyCode){
						case 32:
							e.preventDefault();
							break;
					}
				}else if(e.keyCode==8||e.keyCode==46){
					var isDel = e.keyCode==46;
					if(ts==te)
						if(isDel)
							if(tBack.slice(0,eqPHolder.length)==eqPHolder)
								tBack = tBack.slice(eqPHolder.length);
							else tBack = tBack.slice(1);
						else
							if(tFront.slice(tFront.length-eqPHolder.length)==eqPHolder){
								tFront = tFront.slice(0,tFront.length-eqPHolder.length);
								if(ts==te) ts-=eqPHolder.length;
							}else tFront = tFront.slice(0,tFront.length-1);
					$(this).val(tFront+tBack);
					ts=isDel||ts!=te?ts:ts-1;
					$(this).caret(ts,ts);
					e.preventDefault();
				}
				setTimeout(delegate(this,handleKeydown,[_this,e]),5);
			}).mousedown(function(e){
				$(this).data('isDragging',true);
				setTimeout(delegate(this,handleMousedown,[$(this),e]),5);
			}).mouseup(function(e){
				$(this).data('isDragging',false);
			}).bind('input',handleInputDragging).bind('propertychange',handleInputDragging);
		});
	}
	function handleInputDragging(){
		if($(this).data('isDragging')){
			$(this).data('isDragging',false);
			renderEditorTeX($($(this).parents()[1]),this.value);
		}
	}
	function getImgHTML(src,alt,title){
		if(!title)title=alt;
		return '<img src="'+src+'" alt="'+alt+'" title="'+title+'"/>';
	}
	function addButtons(bRoot,textArea){
		bRoot.parent().find('.inputPanel').css('margin-top',25+~~((editButtons.length-1)/buttonInfo.colNum)*buttonInfo.dy);
		for(i=0;i<editButtons.length;i++){
			var btnData = editButtons[i];
			var wrapID = rndStr('editorButton');
			bRoot.append('<div class="buttonWrap" id="'+wrapID+'"><div class="buttonDisplay"></div><div class="buttonPopupWrap"><table class="buttonPopup"></table></div></div>');
			var bWrap = bRoot.find('#'+wrapID);
			bWrap.css('left',(i%buttonInfo.colNum)*buttonInfo.dx).css('top',~~(i/buttonInfo.colNum)*buttonInfo.dy);
			bWrap.find('.buttonDisplay').attr('id',rndStr('garbage_')).append(getImgHTML(btnData.display.img,btnData.display.title,btnData.title))
			.mouseenter(function(e){
				$(e.currentTarget).parent().find('.buttonPopupWrap').fadeIn(200);
			});
			//add buttons
			var btnPopup = bWrap.find('.buttonPopupWrap table.buttonPopup');
			for(j=0;j<btnData.content.length;j++){
				btnPopup.append('<tr class="row'+j+'"></tr>');
				var btnRow = btnPopup.find('.row'+j);
				for(k=0;k<btnData.content[j].length;k++){
					var singleBtnData = btnData.content[j][k];
					if(!singleBtnData.data){
						btnRow.append('<td class="col'+k+'"></td>');
						continue;
					}
					var colSpanTxt = '';
					if(singleBtnData.colspan&&singleBtnData.colspan>1)
						colSpanTxt = ' colspan="'+singleBtnData.colspan+'"';
					btnRow.append('<td class="col'+k+'"'+colSpanTxt+'></td>');
					var btnCell = btnRow.find('.col'+k);
					btnCell.append(getImgHTML(singleBtnData.img,singleBtnData.data,singleBtnData.title));
					btnCell.data('texCode',singleBtnData.data);
					btnCell.mousedown(function(e){
						var t = textArea.val();
						var st = textArea.caret().start;
						var se = textArea.caret().end;
						var sData = $(e.currentTarget).data('texCode');
						if(!!textArea.caret().text) sData = sData.replace(/\@/,textArea.caret().text);
						sData = sData.replace(/(\@|\#)/g,eqPHolder);
						if(t.slice(st-1,st).match(/[^ ]/)) sData = ' '+sData;
						if(t.slice(se,se+1).match(/[^ ]/)) sData += ' ';
						textArea.val(t.slice(0,st)+sData+t.slice(se));
						st+=sData.length;
						console.log(st);
						textArea.caret(st,st);
						renderEditorTeX($($(e.currentTarget).parents()[7]),textArea.val());
					}).mouseenter(function(e){
						$(e.currentTarget).animate({borderWidth:3},1).animate({opacity:1},100);
					}).mouseleave(function(e){
						$(e.currentTarget).animate({borderWidth:1},1).animate({opacity:0.6},300);
					});
				}
			}
			bWrap.find('.buttonPopupWrap').hide()
			.mouseleave(function(e){
				$(e.currentTarget).fadeOut(300);
			});
		}
	}
	function rndStr(prefix){
		return prefix+'_'+Math.random().toString().split('.')[1];
	}
	function insertString(s,i,ss){
		return s.slice(0,i)+ss+s.slice(i);
	}
	function renderEditorTeX(x,texCode){
		texCode = '\\displaylines{'+texfy(texCode)+'}';
		var tID = rndStr('texCode');
		x.find('.display').html('<script type="math/tex; mode=display" id="'+tID+'">'+texCode+'</script>');
		MathJax.Hub.Queue(["Typeset",MathJax.Hub,tID]);
	}
	function getType(s){
		if(aliasKeywords)for(i=0;i<aliasKeywords.length;i++)if(aliasKeywords[i][0]==s){s=aliasKeywords[i][1];break;}
		switch(s){
			case 'overset':
			case 'underset':
			case 'frac':
				return 'twoArg';
			case 'int':
			case 'sum':
			//case 'oint':
				return 'subsup';
			default:
				return s;
		}
	}
	function handleMousedown(x,e){
		if(x.val().length<eqPHolder.length) return;
		if(x.caret().start!=x.caret().end) return;
		for(i=0;i<eqPHolder.length;i++)
			if(x.val().slice(x.caret().start-i,x.caret().start-i+eqPHolder.length)==eqPHolder){
				x.caret(x.caret().start-i,x.caret().start-i+eqPHolder.length);
				return;
			}
	}
	function handleKeydown(x,e){
		var c=e.keyCode;
		if(c==17||c==9||c==229||c==93||c==38||c==40)return;
		var texInput = x.find('.inputPanel');
		var texCode = texInput.val();
		var st = texInput.caret().start;
		//Auto-select Placeholder
		if(c==37||c==39){
			if(c==37) st-=eqPHolder.length;
			if(texCode.slice(st,st+eqPHolder.length) == eqPHolder) texInput.caret(st,st+eqPHolder.length);
			return;
		}
		//Processing Parens (open)
		if(c==219||e.shiftKey&&c==57){
			var insParen = (c==219?e.shiftKey?'{}':'[]':'()').split('');
			var prevStr = texCode.slice(0,st-1).match(/(\W|^)([A-Za-z][A-Za-z0-9_]+)$/);
			var seln = eqPHolder.length;
			prevStr=(prevStr?prevStr[2]:"")+insParen[0];
			var tempMatch = prevStr.match(/[A-Za-z0-9]+/g);
			var identStr = tempMatch?prevStr.match(/[A-Za-z0-9]+/g)[0]:'';
			identStr = getType(identStr)+prevStr.slice(identStr.length);
			switch(identStr){
				/*Templates*/
				case 'begin{':
					texInput.val(insertString(texCode,st,eqPHolder+'} '+eqPHolder+' end{}'))
					break;
				case 'color{':
					texInput.val(insertString(texCode,st,'Green}{'+eqPHolder+'}'))
					seln = 5;
					break;
				case 'twoArg{':
					texInput.val(insertString(texCode,st,eqPHolder+'}{'+eqPHolder+'}'));
					break;
				case 'subsup_{':
					texInput.val(insertString(texCode,st,eqPHolder+'}^{'+eqPHolder+'}'));
					break;
				case 'left(':
				case 'left[':
					texInput.val(insertString(texCode,st,eqPHolder+' right'+insParen[1]));
					break;
				case 'sqrt[':
					texInput.val(insertString(texCode,st,eqPHolder+']{'+eqPHolder+'}'));
					break;
				default:
					texInput.val(insertString(texCode,st,eqPHolder+insParen[1]));
			}
			texInput.caret(st,st+seln);
			texCode = texInput.val();
		}
		
		renderEditorTeX(x,texCode);
	}
	$(document).ready(function(){makeEditor();});
}());