function createElement(tagName, { attrs = {}, children = [] } = {})
{
	return{
		tagName,
		attrs,
		children,
	}
}

function render(node){
	let el = document.createElement(node.tagName);
		for(let x of Object.keys(node.attrs)){
			el.setAttribute(x,node.attrs[x])
		}

		for(let x of node.children){
			el.appendChild(nodeChecker(x));
		}
	return el;
}

function nodeChecker(vNode){
	if(typeof vNode === "string")
		return document.createTextNode(vNode);
	return render(vNode);
}

function mount(node,target){
	target.replaceWith(node);
	return node;
}

function diffchildren(vAppOldChildren,vAppNewChildren){
	let 
}

function diff(node,vAppOld,vAppNew){
	if(vAppOld.tagName !== vAppNew.tagName){
		return node =>
		{	
			let newNode = render(vAppNew);
			node.replaceWith(newNode);
			return node;
		}
	}
	else if(vAppOld.children.length <= vAppNew.children.length){
		

	}
}

const vApp = function(count){
	return createElement("div",{
	attrs:{
		id: "app"
	},
	children:[
		'HELLO WORLD',
		String(count),
		createElement("img",{
			attrs:{
				src : "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
				id : "myimg"
			}
		})
	]
})
}

let vAppOld = vApp(6);
let renderedElement = render(vAppOld);

console.log("vAppOld : ")
console.log(vAppOld);
console.log("renderedElement : ")
console.log(renderedElement);

let app = document.getElementById("app");
console.log(app);

var count = 1;
setInterval(function(){
	var vAppNew = vApp(count);
	//console.log("vAppNew : ")
	//console.log(vAppNew);
	var patch = diff(vAppOld,vAppNew)
	renderedElement = patch(renderedElement);
	//console.log(patch);
	//mount(render(vAppNew),document.getElementById("app"));
	vAppOld = vAppNew;
	count += 1;
},2000);

//mount(renderedElement,document.getElementById("app"));