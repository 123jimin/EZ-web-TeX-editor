/**
* js/buttonList.js
* Generates the list of buttons in the editor
**/

/*
var atLocal (boolean)
  Description : Will the images used on buttons be loaded from img/ directory?
var localDirectory (String)
  Description : local directory of image file. Default : './img/'
var editButtons (Array)
  Description : List of buttons.
  Elements : An object (chunk of buttons).
    title : Title of the chunk of buttons.
    display : A 'button' to be displayed to preview the chunk of buttons.
    content : List of buttons in the chunk of buttons.
function _$_(title,texInsert,texDisp,latexRender,colspan)
  Description : this function makes an object which contains data of a button.
  Arguments
    title : title of the button
    texInsert : TeX to be inserted. Use '@' to represent the selected text. Default : title
    texDisp : TeX to be displayed. Default : texInsert
    latexRender : LaTeX renderer to be used. Use '@' to represent LaTeX. Default : Google Chart API
    colspan : Colspan value of a button. Default : 1
  Return value : An object.
    title : Title of the button.
    img : Image URL of the button.
    data : TeX to be inserted.
    colspan : colspan of the button.
*/
var atLocal = true; //see function _$_.
var localDirectory = "./img/";
//test purpose
//localDirectory = "https://github.com/123jimin/EZ-web-TeX-editor/raw/master/img/";
function _$_(title,texInsert,texDisp,latexRender,colspan){
	if(title=='<-') atLocal = false; //If list of button is completed and images are all saved,
//then atLocal = true always and this function should be modified.
	var encodeFunction = encodeURIComponent; //Encoding function to used.
	if(!title) return {'title':'','img':'','data':''}; //empty button
	if(!texInsert||texInsert==0) texInsert = title;
	if(!texDisp||texDisp==0) texDisp = texInsert;
	if(latexRender=='codecogs') latexRender = 'http://latex.codecogs.com/png.latex?@'; //CodeCogs LaTeX renderer
	if(!colspan||colspan==0) colspan=1;
	texDisp = texDisp.replace(/\@/g,'{\\small\\bigcirc}'); //Change @ to a circle.
	if(atLocal){
		latexRender = localDirectory+'@.png'; //local image file
		encodeFunction = function(s){return s.replace(/\\/g,'_')
		.replace(/( |\{|\})+/g,'').replace(/\+/g,'P').replace(/\-/g,'M').replace(/\>/g,'R')
		.replace(/\</g,'L').replace(/\=/g,'EQ').replace(/\./g,'D').replace(/([A-Z])/g,'!$1')};
	}else if(!latexRender||latexRender==0){
		latexRender = 'http://chart.googleapis.com/chart?cht=tx&chl=@'; //Default LaTeX renderer.
	}
	texDisp = latexRender.replace('@',encodeFunction(texfy(texDisp)));
	return {'title':title,'img':texDisp,'data':texInsert,'colspan':colspan};
}
var editButtons = [
//GREEK SMALL LETTERS
{
	'title':'Greek Small Letters',
	'display':_$_('alpha','alpha','alpha beta gamma'),
	'content':[
		[
			_$_('alpha'),
			_$_('beta'),
			_$_('gamma'),
			_$_('delta'),
			_$_('epsilon'),
			_$_('varepsilon')
		],
		[
			_$_('zeta'),
			_$_('eta'),
			_$_('theta'),
			_$_('vartheta'),
			_$_('iota'),
			_$_('kappa')
		],
		[
			_$_('lambda'),
			_$_('mu'),
			_$_('nu'),
			_$_('xi'),
			_$_('pi'),
			_$_('varpi')
		],
		[
			_$_('rho'),
			_$_('varrho'),
			_$_('sigma'),
			_$_('varsigma'),
			_$_('tau'),
			_$_('upsilon')
		],
		[
			_$_('phi'),
			_$_('varphi'),
			_$_('chi'),
			_$_('psi'),
			_$_('omega')
		]
	]
},
//GREEK LARGE LETTERS & HEBREW
{
	'title':'Greek Large Letters, Hebrew',
	'display':_$_('Gamma',0,'Gamma Pi aleph'),
	'content':[
		[
			_$_('Gamma'),
			_$_('Delta'),
			_$_('Theta'),
			_$_('Lambda'),
			_$_('Xi')
		],
		[
			_$_('Pi'),
			_$_('Sigma'),
			_$_('Upsilon'),
			_$_('Phi'),
			_$_('Psi')
		],
		[
			_$_('Omega'),
			_$_('aleph'),
			_$_('beth',0,0,'codecogs'),
			_$_('gimel',0,0,'codecogs'),
			_$_('daleth',0,0,'codecogs')
		]
	]
},
//CONSTRUCTIONS
{
	'title':'Constructions',
	'display':_$_('hat',0,'hat{@} grave{@} acute{@}'),
	'content':[
		[
			_$_('hat','hat{@}'),
			_$_('check','check{@}'),
			_$_('grave','grave{@}'),
			_$_('acute','acute{@}'),
			_$_('breve','breve{@}'),
			_$_('bar','bar{@}')
		],
		[
			_$_('vec','vec{@}'),
			_$_('tilde','tilde{@}'),
			_$_('dot','dot{@}'),
			_$_('ddot','ddot{@}'),
			_$_('widehat','widehat{@}','widehat{abc}',0,2)
		],
		[
			_$_('overline','overline{@}','overline{abc}',0,2),
			_$_('widetilde','widetilde{@}','widetilde{abc}',0,2),
			_$_('overbrace','overbrace{@}','overbrace{abc}',0,2)
		],
		[
			_$_('overleftarrow','overleftarrow{@}','overleftarrow{abc}','codecogs',2),
			_$_('overrightarrow','overrightarrow{@}','overrightarrow{abc}','codecogs',2),
			_$_('underbrace','underbrace{@}','underbrace{abc}',0,2)
		],
		[
			_$_('underline','underline{@}','underline{abc}',0,2),
			_$_('overset','overset{#}{@}','overset{@}{abc}'),
			_$_('underset','underset{#}{@}','underset{@}{abc}'),
		]
	]
},
//BINARY OPERATORS
{
	'title':'Binary Operators',
	'display':_$_('+-',0,'+- otimes cap'),
	'content':[
		[
			_$_('+-'),
			_$_('-+'),
			_$_('**'),
			_$_('//'),
			_$_('/\\'),
			_$_('\\/')
		],
		[
			_$_('cap'),
			_$_('cup'),
			_$_('\\-'),
			_$_('sqcap'),
			_$_('sqcup'),
			_$_('\\uplus')
		],
		[
			_$_('oplus'),
			_$_('ominus'),
			_$_('otimes'),
			_$_('odot'),
			_$_('oslash'),
			_$_('\\bigcirc')
		],
		[
			_$_('\\ast'),
			_$_('\\star'),
			_$_('\\bullet'),
			_$_('cdot'),
			_$_('\\circ'),
			_$_('\\diamond')
		],
		[
			_$_('\\wr'),
			_$_('dagger'),
			_$_('ddagger'),
			_$_('\\amalg'),
			_$_('\\triangleleft'),
			_$_('\\triangleright')
		],
		[
			_$_('\\bigtriangleup'),
			_$_('\\bigtriangledown'),
			_$_('<|',0,0,'codecogs'),
			_$_('<|=',0,0,'codecogs'),
			_$_('|>=',0,0,'codecogs'),
			_$_('|>',0,0,'codecogs')
		]
	]
},
//RELATIONS 1
{
	'title':'Relations 1',
	'display':_$_('<=',0,'<= >= subset supset'),
	'content':[
		[
			_$_('<<'),
			_$_('>>'),
			_$_('<='),
			_$_('>='),
			_$_('<!=',0,0,'codecogs'),
			_$_('>!=',0,0,'codecogs')
		],
		[
			_$_('subset'),
			_$_('supset'),
			_$_('subseteq'),
			_$_('supseteq'),
			_$_('subsetneq',0,0,'codecogs'),
			_$_('supsetneq',0,0,'codecogs')
		],
		[
			_$_('in'),
			_$_('ni'),
			_$_('sqsubset',0,0,'codecogs'),
			_$_('sqsupset',0,0,'codecogs'),
			_$_('sqsubseteq'),
			_$_('sqsupseteq')
		],
		[
			_$_('not in'),
			_$_('not ni'),
			_$_('\\prec'),
			_$_('\\succ'),
			_$_('\\preceq'),
			_$_('\\succeq')
		]
	]
},
//RELATIONS 2
{
	'title':'Relations 2',
	'display':_$_('==',0,'== ~- |-'),
	'content':[
		[
			_$_('!='),
			_$_('=='),
			_$_('propto'),
			_$_(':=',0,0,'codecogs'),
			_$_('\\doteq',0,0,'codecogs'),
			_$_('frown')
		],
		[
			_$_('sim'),
			_$_('~-'),
			_$_('~~'),
			_$_('~=',0,0,'codecogs'),
			_$_('\\asymp'),
			_$_('smile')
		],
		[
			_$_('|-'),
			_$_('mid'),
			_$_('-|'),
			_$_('||'),
			_$_('perp'),
			_$_('bowtie',0,0,'codecogs')
		]
	]
},
//ARROWS
{
	'title':'Arrows',
	'display':_$_('<-',0,'<- -> Updownarrow'),
	'content':[
		[
			_$_('<--',0,0,0,2),
			_$_('<-'),
			_$_('->'),
			_$_('-->',0,0,0,2)
		],
		[
			_$_('<===',0,0,0,2),
			_$_('<=='),
			_$_('==>'),
			_$_('===>',0,0,0,2)
		],
		[
			_$_('<->'),
			_$_('<-->',0,0,0,2),
			_$_('<==>',0,0,0,2),
			_$_('<=>')
		],
		[
			_$_('\\hookleftarrow',0,0,'codecogs'),
			_$_('~>',0,0,'codecogs'),
			_$_('|->'),
			_$_('|-->',0,0,'codecogs',2),
			_$_('\\hookrightarrow',0,0,'codecogs')
		],
		[
			_$_('\\rightharpoonup'),
			_$_('searrow'),
			_$_('downarrow'),
			_$_('Downarrow'),
			_$_('swarrow'),
			_$_('\\leftharpoonup')
		],
		[
			_$_('\\rightleftharpoons'),
			_$_(),
			_$_('updownarrow'),
			_$_('Updownarrow'),
			_$_(),
			_$_()
		],
		[
			_$_('\\rightharpoondown'),
			_$_('nearrow'),
			_$_('uparrow'),
			_$_('Uparrow'),
			_$_('nwarrow'),
			_$_('\\leftharpoondown')
		]
	]
},
//MATHBB BIG
{
	'title':'MathBB Big',
	'display':_$_('mathbb{A}',0,'mathbb{ABC}'),
	'content':[
		[
			_$_('mathbb{A}'),
			_$_('mathbb{B}'),
			_$_('mathbb{C}'),
			_$_('mathbb{D}'),
			_$_('mathbb{E}'),
			_$_('mathbb{F}'),
			_$_('mathbb{G}'),
		],
		[
			_$_('mathbb{H}'),
			_$_('mathbb{I}'),
			_$_('mathbb{J}'),
			_$_('mathbb{K}'),
			_$_('mathbb{L}'),
			_$_('mathbb{M}'),
			_$_('mathbb{N}')
		],
		[
			_$_('mathbb{O}'),
			_$_('mathbb{P}'),
			_$_('mathbb{Q}'),
			_$_('mathbb{R}'),
			_$_('mathbb{S}'),
			_$_('mathbb{T}'),
			_$_('mathbb{U}')
		],
		[
			_$_('mathbb{V}'),
			_$_('mathbb{W}'),
			_$_('mathbb{X}'),
			_$_('mathbb{Y}'),
			_$_('mathbb{Z}'),
			_$_('mathbb','mathbb{@}','mathbb{ABC}',0,2)
		]
	]
},
//MISC SYMBOLS
{
	'title':'Misc Symbols',
	'display':_$_('\\S',0,'\\S heart Re infty','codecogs'),
	'content':[
		[
			_$_('\\S'),
			_$_('emptyset'),
			_$_('LaTeX',0,0,0,3),
			_$_('TeX',0,0,0,2)
		],
		[
			_$_('forall',0,0,0,2),
			_$_('exists'),
			_$_('neg'),
			_$_('flat'),
			_$_('natural'),
			_$_('sharp')
		],
		[
			_$_('hbar',0,0,0,2),
			_$_('imath'),
			_$_('jmath'),
			_$_('\\wp'),
			_$_('Re'),
			_$_('Im')
		],
		[
			_$_('ell',0,0,0,2),
			_$_('\\prime'),
			_$_('del'),
			_$_('rd'),
			_$_('backslash'),
			_$_('\\surd')
		],
		[
			_$_('cdots',0,0,0,2),
			_$_('ldots'),
			_$_('vdots'),
			_$_('ddots'),
			_$_('\\top'),
			_$_('\\bot')
		],
		[
			_$_('infty',0,0,0,2),
			_$_('angle'),
			_$_('\\mho',0,0,'codecogs'),
			_$_('Box',0,0,'codecogs'),
			_$_('Diamond'),
			_$_('Triangle')
		],
		[
			_$_('club',0,0,0,2),
			_$_('diamond',0,0,'codecogs'),
			_$_('heart',0,0,'codecogs'),
			_$_('spade')
		]
	]
},
//Var Symbols
{
	'title':'Variable-sized symbols',
	'display':_$_('sum',0,'sum int bigcap'),
	'content':[
		[
			_$_('sum'),
			_$_('sum_{@}',0,0,'codecogs'),
			_$_('sum_{@}^{@}',0,0,'codecogs'),
			_$_('prod'),
			_$_('prod_{@}',0,0,'codecogs'),
			_$_('prod_{@}^{@}',0,0,'codecogs')
		],
		[
			_$_('int'),
			_$_('int_{@}',0,0,'codecogs'),
			_$_('int_{@}^{@}',0,0,'codecogs'),
			_$_('oint'),
			_$_('oint_{@}',0,0,'codecogs'),
			_$_('int_{@}^{@}',0,0,'codecogs')
		]
	]
}
];