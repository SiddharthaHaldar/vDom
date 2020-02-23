let data = {price : 1, count : 5}
let target, total, salePrice

class Dep{
	constructor(){
		this.storage = [];
	}
	depend(){console.log(target);
		if(target && !this.storage.includes(target)){
			
			this.storage.push(target);
		}else{console.log("target already present");}
	}
	notify(){
		this.storage.forEach(run=>{console.log("Inside notify()");console.log(run);run()});
	}
}

Object.keys(data).forEach(key=>{
	let val = data[key];
	const dep = new Dep();
	Object.defineProperty(data,key,{
	get(){
		console.log("Get " +key+"'s value ");
		dep.depend();
		return val;
	},
	set(newVal){
		val = newVal;
		dep.notify();
	}
})})

function watcher(myFunc){
	target = myFunc;console.log("Before firing target");
	target();console.log("After firing target");
	target = null;
}


watcher(()=>{total = data.price * data.count});

watcher(()=>{salePrice  = data.price * 0.9});
