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

// function diffchildren(vAppOldChildren,vAppNewChildren){
// 	let 
// }

function diff(node,vAppOld,vAppNew,idx){
	if(vAppOld === null)
	{
		let newNode = render(vAppNew);
		if(node.parentNode)
			node.parentNode.appendChild(newNode);
	}
	else if(vAppNew === null)
	{
		if(node.parentNode)
			node.parentNode.removeChild(node.childNodes[idx]);
	}
	else if(typeof vAppNew === "string")
	{
		//if()
		let newNode = nodeChecker(vAppNew);
		node.replaceWith(newNode);
	}	
	else if(vAppOld.tagName !== vAppNew.tagName){
			let newNode = render(vAppNew);
			node.replaceWith(newNode);
	}
	else if(vAppOld.children.length <= vAppNew.children.length){ 
		vAppNew.children.forEach((newvElement,index)=>{
			diff(node.childNodes[index],vAppOld.children[index]?vAppOld.children[index]:null,newvElement,index)
		})
	}
	else if(vAppOld.children.length > vAppNew.children.length){
		vAppOld.children.forEach((oldvElement,index)=>{
			diff(node.childNodes[index],oldvElement,vAppNew.children[index]?vAppNew.children[index]:null,index)
		})
	}
	return node;
}

const vApp = function(count){
	return createElement("div",{
	attrs:{
		id: "app"
	},
	children:[
		'HELLO WORLD',
		String(count),
		createElement("input"),
		createElement("img",{
			attrs:{
				src : "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
				//src : "./rainbows.gif",
				id : "myimg"
			}
		})
	]
})
}

let vAppOld = vApp(0);
let renderedElement = render(vAppOld);

console.log("vAppOld : ")
console.log(vAppOld);
console.log("renderedElement : ")
console.log(renderedElement);

let app = document.getElementById("app");
console.log(app);
let count = 1;
let vAppNew = vApp(count);
mount(renderedElement,document.getElementById("app"));
setInterval(function(){
	count += 1;
	vAppNew = vApp(count);
	//console.log("vAppNew : ")
	//console.log(vAppNew);
	//var patch = diff(vAppOld,vAppNew)
	//renderedElement = patch(renderedElement);
	//console.log(patch);
	diff(renderedElement,vAppOld,vAppNew,0)
	console.log(renderedElement);
	vAppOld = vAppNew;
},3000);
