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
	return node
}

const vApp = function(count){
	return createElement("div",{
	attrs:{
		id: "app"
	},
	children:[
		'HELLO WORLD',
		createElement("img",{
			attrs:{
				src : "https://media.giphy.com/media/cuPm4p4pClZVC/giphy.gif",
				id : "myimg"
			}
		})
	]
})
}

let myVapp = vApp(6);
let renderedElement = render(myVapp);

console.log(myVapp);
console.log(renderedElement);

let app = document.getElementById("app");
console.log(app)

mount(renderedElement,document.getElementById("app"));