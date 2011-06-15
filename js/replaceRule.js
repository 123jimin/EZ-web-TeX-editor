var aliasKeywords = [
	['del','nabla'],
	['nl','newline'],
	['ohm','Omega'],
	['Ohm','Omega'],
	['union','cup'],
	['intersect','cap'],
	['bcap','bigcap'],
	['bcup','bigcup'],
	['bsqcup','bigsqcup'],
	['Therefore','therefore'],
	['Because','because'],
	['llfloor','left \\lfloor'],
	['rrfloor','right \\rfloor'],
	['llceil','left \\lceil'],
	['rrceil','right \\rceil'],
	['EE','exists'],
	['Forall','forall'],
	['rd','partial'],
	['heart','heartsuit'],
	['diamond','diamondsuit'],
	['club','clubsuit'],
	['spade','spadesuit'],
	['Triangle','triangle'],
	['QED','Box']
];
var noBackslashKeywords = [
/*General*/'to','not','mid','parallel','color','left','right','begin','end','mathbb','newline',
'LaTeX','TeX','unicode','prime','smile','frown','bowtie','Join','overset','underset',
'overbrace','underbrace','overleftarrow','overrightarrow','overline','underline',
'widetilde','widehat','backslash',
/*Basic*/'frac','sqrt','times','therefore','because','small','tiny','large','LARGE','huge','phantom',
'cdot','cdots','ldots','vdots','ddots','dagger','ddagger','propto','sim','lfloor','rfloor','lceil',
'rceil','langle','rangle','hbar','imath','jmath','ell','angle','prod',
/*Arrows*/'uparrow','downarrow','updownarrow','Uparrow','Downarrow','Updownarrow','nwarrow','nearrow',
'swarrow','searrow',
/*Trig*/'sin','cos','tan','csc','sec','cot','sinh','cosh','coth','arcsin','arccos','arctan',
/*LogExp*/'log','ln','lg','exp',
/*Calculus*/'sum','liminf','limsup','lim','oint','int','infty','max','min','nabla','partial',
/*S&R&L*/'lnot','in','ni','subset','subseteq','subsetneq','supsetneq','sqsubset','sqsubseteq','supset',
'supseteq','sqsubset','sqsupset','sqsupseteq','cup','cap','sqcup','sqcap','setminus','oplus','ominus',
'otimes','oslash','odot','perp','bigcap','bigcup','bigsqcup','forall','exists','neg','emptyset',
/*Accents*/'hat','acute','bar','dot','check','grave','vec','ddot','breve','tilde',
/*Greek (capital)*/'Gamma','Delta','Theta','Lambda','Xi','Pi','Sigma','Upsilon','Phi','Psi','Omega',
/*Greek (small)*/'alpha','beta','gamma','delta','epsilon','varepsilon','zeta','eta','theta','vartheta',
'iota','kappa','lambda','mu','nu','xi','pi','varpi','rho','varrho','sigma','varsigma','tau','upsilon',
'phi','varphi','chi','psi','omega',
/*Misc*/'aleph','beth','gimel','daleth','Pr','copyright','Re','Im','natural','sharp','flat',
'Box','Diamond','triangle','clubsuit','diamondsuit','heartsuit','spacesuit'
];
var replaceRule = [];
function makeReplaceRule(){
	replaceRule = [
		['\\<\\=\\=\\=','\\Longleftarrow'],
		['\\=\\=\\=\\>','\\Longrightarrow'],
		['\\<\\=\\=\\>','\\Longleftrightarrow'],
		['\\<\\-\\-\\>','\\longleftrightarrow'],
		['\\|\\-\\-\\>','\\longmapsto'],
		
		['\\.\\.\\.','\\cdots'],
		
		['\\<\\|\\=','\\unlhd'],
		['\\|\\>\\=','\\unrhd'],
		
		['\\<\\!\\=','\\lneq'],
		['\\>\\!\\=','\\gneq'],
		
		['\\!\\=\\=','\\not\\equiv'],
		['\\|\\-\\>','\\mapsto'],
		['\\<\\-\\>','\\leftrightarrow'],
		['\\<\\=\\>','\\Leftrightarrow'],
		
		['\\<\\=\\=','\\Leftarrow'],
		['\\=\\=\\>','\\Rightarrow'],
		['\\<\\-\\-','\\longleftarrow'],
		['\\-\\-\\>','\\longrightarrow'],
		['\\<\\-','\\leftarrow'],
		['\\-\\>','\\rightarrow'],
		['\\~\\>','\\leadsto'],
		
		['\\!\\=','\\neq'],
		['\\=\\=','\\equiv'],
		['\\:\\=','\\overset{\\underset{\\mathrm{def}}{}}{=}'],
		['\\~\\=','\\cong'],
		['\\~\\-','\\simeq'],
		['\\~\\~','\\approx'],
		
		['\\<\\=','\\leq'],
		['\\>\\=','\\geq'],
		['\\<\\<','\\ll'],
		['\\>\\>','\\gg'],
		
		['\\<\\|','\\lhd'],
		['\\|\\>','\\rhd'],
		['\\|\\|','\\parallel'],
		
		['\\+\\-','\\pm'],
		['\\-\\+','\\mp'],
		['\\*\\*','\\times'],
		['\\/\\/','\\div'],
		['\\\\\\-','\\setminus'],
		
		['\\\\\\/','\\vee'],
		['\\/\\\\','\\wedge'],
		['\\|\\-','\\vdash'],
		['\\|\\=','\\models'],
		['\\-\\|','\\dashv']
	];
	for(i=0;i<noBackslashKeywords.length;i++) aliasKeywords.push([noBackslashKeywords[i],noBackslashKeywords[i]]);
	for(i=0;i<aliasKeywords.length;i++) replaceRule.push(['([^A-Za-z0-9\\\\]|^)('+aliasKeywords[i][0]+')([^A-Za-z0-9]|$)','$1\\'+aliasKeywords[i][1]+'$3']);
	for(i=0;i<replaceRule.length;i++) replaceRule[i][0] = new RegExp(replaceRule[i][0],'g');
}
makeReplaceRule();